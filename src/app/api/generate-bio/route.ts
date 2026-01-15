import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { name, niche, tone } = await request.json();

        if (!name || typeof name !== "string" || !niche || typeof niche !== "string") {
            return NextResponse.json(
                { error: "Name and niche are required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        const toneDescriptions: Record<string, string> = {
            professional: "Professional and polished, suitable for business networking. Credible and authoritative.",
            casual: "Friendly and approachable, like talking to a friend. Uses emojis sparingly.",
            witty: "Clever and humorous, with wordplay and personality. Memorable and fun.",
            minimal: "Ultra-concise and clean. Maximum impact in minimum words.",
        };

        const toneGuide = toneDescriptions[tone] || toneDescriptions.professional;

        const systemPrompt = `You are an expert social media bio writer. Create unique, engaging bios that:
- Feel authentic and personal to the individual
- Capture attention in the first few words
- Are optimized for social media character limits (under 150 characters each)
- Match the requested tone exactly
- Avoid clichés and overused phrases
- Do not use em dashes (—). Use regular dashes, commas, or periods instead.
- Include relevant emojis when appropriate for the tone

IMPORTANT: Return ONLY a JSON array of 5 bio strings, nothing else. Example: ["Bio 1", "Bio 2", "Bio 3", "Bio 4", "Bio 5"]`;

        const userPrompt = `Generate 5 unique social media bios for:

Name: ${name}
Niche/Industry: ${niche}
Tone: ${tone} - ${toneGuide}

Each bio should be different in structure and approach. Return only a JSON array of 5 bio strings.`;

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
                max_tokens: 600,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("OpenAI API error:", errorData);
            return NextResponse.json(
                { error: "Failed to generate bios. Please try again." },
                { status: response.status }
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

        // Parse the JSON array from the response
        let bios: string[];
        try {
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                bios = JSON.parse(jsonMatch[0]);
            } else {
                // Fallback: split by newlines
                bios = content
                    .split(/\n+/)
                    .map((b: string) => b.trim().replace(/^["'\d.)\-]+\s*/, "").replace(/["']$/, ""))
                    .filter((b: string) => b.length > 10);
            }
        } catch {
            // Last resort: treat as single bio
            bios = [content.trim()];
        }

        return NextResponse.json({ bios: bios.slice(0, 5) });
    } catch (error) {
        console.error("Bio generation error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
