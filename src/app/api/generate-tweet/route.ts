import { NextRequest, NextResponse } from "next/server";
import { tweetSchema, validateInput } from "@/lib/validation";
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

        const validation = validateInput(tweetSchema, body);
        if (!validation.success) {
            logSecurityEvent(request, "validation_failure");
            return validation.response;
        }

        const { topic, tone, includeHashtags, includeEmoji } = validation.data;

        // Check API key
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        const toneDescriptions: Record<string, string> = {
            informative: "Educational and helpful, sharing valuable insights or tips.",
            witty: "Clever, humorous, and attention-grabbing with wordplay.",
            controversial: "Bold and thought-provoking, sparks discussion.",
            inspirational: "Uplifting, motivational, and positive.",
            promotional: "Highlights value and includes a subtle call-to-action.",
        };

        const toneGuide = toneDescriptions[tone] || toneDescriptions.informative;

        const systemPrompt = `You are an expert Twitter/X copywriter. Create engaging tweets that:
- Are under 280 characters each
- Grab attention in the first few words
- Feel authentic and conversational
- Match the requested tone exactly
- Encourage engagement (likes, retweets, replies)
${includeHashtags ? "- Include 1-2 relevant hashtags at the end" : "- Do NOT include hashtags"}
${includeEmoji ? "- Use 1-2 relevant emojis naturally" : "- Do NOT use emojis"}
- Do NOT use em dashes (—). Use regular dashes, commas, or periods instead.

IMPORTANT: Return ONLY a JSON array of 5 tweet strings, nothing else. Example: ["Tweet 1", "Tweet 2", "Tweet 3", "Tweet 4", "Tweet 5"]`;

        const userPrompt = `Generate 5 unique tweets about:

Topic: ${topic}
Tone: ${tone} - ${toneGuide}

Each tweet should be different in structure and approach. Return only a JSON array of 5 tweet strings.`;

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
                max_tokens: 800,
            }),
        });

        if (!response.ok) {
            logSecurityEvent(request, "api_error", { status: response.status });
            return NextResponse.json(
                { error: "Failed to generate tweets. Please try again." },
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

        let tweets: string[];
        try {
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                tweets = JSON.parse(jsonMatch[0]);
            } else {
                tweets = content
                    .split(/\n+/)
                    .map((t: string) => t.trim().replace(/^["'\d.)\-]+\s*/, "").replace(/["']$/, ""))
                    .filter((t: string) => t.length > 10);
            }
        } catch {
            tweets = [content.trim()];
        }

        return NextResponse.json({ tweets: tweets.slice(0, 5) });
    } catch (error) {
        // Never expose stack traces to client
        console.error("Tweet generation error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
