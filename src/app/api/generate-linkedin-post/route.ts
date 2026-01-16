import { NextRequest, NextResponse } from "next/server";
import { linkedinPostSchema, validateInput } from "@/lib/validation";
import { runSecurityChecks, RATE_LIMITS, logSecurityEvent } from "@/lib/security";

export async function POST(request: NextRequest) {
    try {
        // Run security checks (origin + rate limit)
        const securityCheck = await runSecurityChecks(request, RATE_LIMITS.tools);
        if (!securityCheck.success) {
            return securityCheck.response;
        }

        // Parse and validate input
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: "Invalid JSON" },
                { status: 400 }
            );
        }

        const validation = validateInput(linkedinPostSchema, body);
        if (!validation.success) {
            logSecurityEvent(request, "validation_failure");
            return validation.response;
        }

        const { topic, postType, tone, includeEmoji } = validation.data;

        // Check API key
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        const postTypeGuidelines: Record<string, string> = {
            thought_leadership: "Share expert insights, industry trends, or unique perspectives. Position the author as a knowledgeable leader.",
            story: "Tell a personal or professional story with a lesson or insight. Use 'I' statements and be vulnerable.",
            tips: "Share actionable tips or advice in a clear, numbered format. Make it practical and implementable.",
            announcement: "Share news about achievements, launches, or updates. Be excited but professional.",
            engagement: "Ask thought-provoking questions or share opinions to spark discussion.",
        };

        const toneDescriptions: Record<string, string> = {
            professional: "Polished, credible, and authoritative while remaining approachable.",
            conversational: "Friendly and relatable while maintaining professionalism.",
            inspirational: "Uplifting, motivational, and encouraging.",
            educational: "Informative, clear, and focused on teaching.",
        };

        const postGuide = postTypeGuidelines[postType] || postTypeGuidelines.thought_leadership;
        const toneGuide = toneDescriptions[tone] || toneDescriptions.professional;

        const systemPrompt = `You are an expert LinkedIn content creator. Create engaging posts that:
- Follow LinkedIn best practices (hook in first line, line breaks for readability)
- Are 150-300 words for optimal engagement
- Start with a compelling hook (question, bold statement, or story opener)
- Use short paragraphs and line breaks
- ${postGuide}
- Match the tone: ${toneGuide}
${includeEmoji ? "- Use 1-2 relevant emojis sparingly" : "- Do NOT use emojis"}
- End with a call-to-action or question to encourage engagement
- Do NOT use hashtags (LinkedIn's algorithm doesn't favor them)
- Do NOT use em dashes (—). Use regular dashes, commas, or periods instead.

IMPORTANT: Return ONLY a JSON array of 3 post strings, nothing else. Each post should be a complete LinkedIn post ready to publish.`;

        const userPrompt = `Generate 3 unique LinkedIn posts about:

Topic: ${topic}
Post Type: ${postType}
Tone: ${tone}

Each post should be different in structure and approach. Return only a JSON array of 3 post strings.`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                temperature: 0.9,
                max_tokens: 2000,
            }),
        });

        if (!response.ok) {
            logSecurityEvent(request, "api_error", { status: response.status });
            return NextResponse.json(
                { error: "Failed to generate posts. Please try again." },
                { status: 502 }
            );
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            return NextResponse.json(
                { error: "No response from AI" },
                { status: 500 }
            );
        }

        let posts: string[];
        try {
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                posts = JSON.parse(jsonMatch[0]);
            } else {
                posts = [content.trim()];
            }
        } catch {
            posts = [content.trim()];
        }

        return NextResponse.json({ posts: posts.slice(0, 3) });
    } catch (error) {
        // Never expose stack traces to client
        console.error("LinkedIn post generation error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
