import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { topic, platform, style, count } = await request.json();

        if (!topic || typeof topic !== "string") {
            return NextResponse.json(
                { error: "Topic is required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENAI_API_KEY;
        console.log("API Key exists:", !!apiKey);
        console.log("API Key length:", apiKey?.length);
        if (!apiKey) {
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        // Build the prompt
        const platformContext = platform === "all"
            ? "works across all social media platforms"
            : `is optimized for ${platform}`;

        const styleGuides: Record<string, string> = {
            balanced: "Mix popular broad hashtags with specific niche ones. Balance discoverability with relevance.",
            trending: "Focus on currently trending, viral, and popular hashtags that maximize reach.",
            niche: "Focus on specific, targeted hashtags with lower competition that attract a dedicated audience.",
            viral: "Use high-energy, attention-grabbing hashtags designed for maximum viral potential.",
        };
        const styleGuide = styleGuides[style] || styleGuides.balanced;

        const systemPrompt = `You are a social media hashtag expert. Generate hashtags that are:
- Relevant to the user's topic
- Appropriate for the specified platform
- A mix based on the requested style
- Without the # symbol (you'll add it in the response format)
- Real hashtags that people actually use
- Not generic filler hashtags

IMPORTANT: Return ONLY a JSON array of hashtags as strings, nothing else. Example: ["fitness", "workout", "gymlife"]`;

        const userPrompt = `Generate ${count} hashtags for the topic: "${topic}"

Platform: ${platform} (${platformContext})
Style: ${style} - ${styleGuide}

Return only a JSON array of hashtag words without the # symbol.`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-5-nano",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                temperature: 0.8,
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("OpenAI API error:", errorData);
            return NextResponse.json(
                { error: "Failed to generate hashtags. Please try again." },
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
        let hashtags: string[];
        try {
            // Try to extract JSON array from the response
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                hashtags = JSON.parse(jsonMatch[0]);
            } else {
                // Fallback: split by common delimiters
                hashtags = content
                    .replace(/[\[\]"']/g, "")
                    .split(/[,\n]+/)
                    .map((h: string) => h.trim().replace(/^#/, ""))
                    .filter((h: string) => h.length > 0);
            }
        } catch {
            // Last resort: try to extract words
            hashtags = content
                .split(/[\s,\n]+/)
                .map((h: string) => h.trim().replace(/^#/, "").replace(/[^a-zA-Z0-9]/g, ""))
                .filter((h: string) => h.length > 0);
        }

        // Add # prefix and limit to requested count
        const formattedHashtags = hashtags
            .slice(0, count)
            .map((h: string) => `#${h.toLowerCase().replace(/\s+/g, "")}`);

        return NextResponse.json({ hashtags: formattedHashtags });
    } catch (error) {
        console.error("Hashtag generation error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
