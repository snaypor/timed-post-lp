import { NextRequest, NextResponse } from "next/server";
import { captionSchema, validateInput } from "@/lib/validation";
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

        const validation = validateInput(captionSchema, body);
        if (!validation.success) {
            logSecurityEvent(request, "validation_failure");
            return validation.response;
        }

        const { topic, platform, tone, includeHashtags, includeEmoji, includeCallToAction } = validation.data;

        // Check API key
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        const platformGuidelines: Record<string, string> = {
            instagram: "Instagram captions can be up to 2,200 characters but best performing are 138-150 characters. Use line breaks for readability.",
            tiktok: "TikTok captions should be short and punchy, under 150 characters. Focus on hooks and trends.",
            facebook: "Facebook allows longer posts. Aim for 40-80 characters for best engagement.",
            twitter: "Twitter/X allows 280 characters. Be concise and impactful.",
        };

        const toneDescriptions: Record<string, string> = {
            casual: "Friendly, conversational, and relatable.",
            professional: "Polished and credible while still being engaging.",
            humorous: "Funny, witty, with clever wordplay or observations.",
            inspirational: "Uplifting, motivational, and positive.",
            storytelling: "Narrative-driven, personal, and engaging.",
        };

        const platformGuide = platformGuidelines[platform] || platformGuidelines.instagram;
        const toneGuide = toneDescriptions[tone] || toneDescriptions.casual;

        const systemPrompt = `You are an expert social media copywriter specializing in ${platform}. Create engaging captions that:
- Follow platform best practices: ${platformGuide}
- Match the requested tone exactly: ${toneGuide}
- Hook readers in the first line
- Feel authentic and relatable
${includeHashtags ? "- Include 3-5 relevant hashtags at the end" : "- Do NOT include hashtags"}
${includeEmoji ? "- Use relevant emojis naturally throughout" : "- Do NOT use emojis"}
${includeCallToAction ? "- End with a clear call-to-action (question, instruction, etc.)" : ""}
- Do NOT use em dashes (—). Use regular dashes, commas, or periods instead.

IMPORTANT: Return ONLY a JSON array of 5 caption strings, nothing else. Example: ["Caption 1", "Caption 2", "Caption 3", "Caption 4", "Caption 5"]`;

        const userPrompt = `Generate 5 unique ${platform} captions for:

Topic/Description: ${topic}
Tone: ${tone}

Each caption should be different in structure and approach. Return only a JSON array of 5 caption strings.`;

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
                max_tokens: 1200,
            }),
        });

        if (!response.ok) {
            logSecurityEvent(request, "api_error", { status: response.status });
            return NextResponse.json(
                { error: "Failed to generate captions. Please try again." },
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

        let captions: string[];
        try {
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                captions = JSON.parse(jsonMatch[0]);
            } else {
                captions = content
                    .split(/\n+/)
                    .map((c: string) => c.trim().replace(/^["'\d.)\-]+\s*/, "").replace(/["']$/, ""))
                    .filter((c: string) => c.length > 10);
            }
        } catch {
            captions = [content.trim()];
        }

        return NextResponse.json({ captions: captions.slice(0, 5) });
    } catch (error) {
        // Never expose stack traces to client
        console.error("Caption generation error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
