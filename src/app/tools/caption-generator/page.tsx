"use client";

import { useState } from "react";
import Link from "next/link";

type ToneType = "casual" | "professional" | "humorous" | "inspirational" | "storytelling";
type PlatformType = "instagram" | "tiktok" | "facebook" | "twitter";

const toneOptions = [
    { value: "casual", label: "Casual", desc: "Friendly and relatable" },
    { value: "professional", label: "Professional", desc: "Polished and credible" },
    { value: "humorous", label: "Humorous", desc: "Funny and witty" },
    { value: "inspirational", label: "Inspirational", desc: "Uplifting and motivating" },
    { value: "storytelling", label: "Storytelling", desc: "Personal and engaging" },
];

const platformOptions = [
    { value: "instagram", label: "Instagram", icon: "📸" },
    { value: "tiktok", label: "TikTok", icon: "🎵" },
    { value: "facebook", label: "Facebook", icon: "📘" },
    { value: "twitter", label: "Twitter/X", icon: "🐦" },
];

const exampleTopics = [
    "Morning coffee routine",
    "Behind the scenes of my work",
    "New product announcement",
    "Travel adventure recap",
];

// FAQ data
const faqData = [
    {
        question: "How long should my caption be?",
        answer: "It depends on the platform. Instagram allows up to 2,200 characters but 150-300 words often works best. TikTok captions should be short and punchy. Twitter/X has a 280-character limit. Facebook performs well with medium-length captions.",
    },
    {
        question: "Should I use hashtags in my captions?",
        answer: "Yes, but strategically. Instagram benefits from 5-15 relevant hashtags. TikTok works well with 3-5 trending tags. Twitter/X should have 1-3 focused hashtags. Facebook performs best with minimal or no hashtags.",
    },
    {
        question: "What makes a caption engaging?",
        answer: "Great captions hook readers in the first line, tell a story or share value, include a call-to-action, and feel authentic to your voice. Ask questions and encourage comments to boost engagement.",
    },
    {
        question: "Should I use emojis in captions?",
        answer: "Emojis can increase engagement when used appropriately. They add personality and break up text. Use them to highlight key points but don't overdo it. Match the emoji style to your brand voice.",
    },
    {
        question: "How do I write a good call-to-action?",
        answer: "Be specific and direct. Instead of 'check the link', try 'Download the free guide in my bio'. Give people a clear, compelling reason to take action and make it easy for them to do so.",
    },
    {
        question: "Is this caption generator free?",
        answer: "Yes, completely free. No signup required, no limits. Generate as many captions as you need for any platform.",
    },
];

// Related tools (Instagram/multi-platform focused)
const relatedTools = [
    {
        title: "Instagram Bio Generator",
        description: "Create a memorable Instagram bio that captures your personality and attracts followers.",
        href: "/tools/bio-generator",
        category: "INSTAGRAM",
    },
    {
        title: "Hashtag Generator",
        description: "Find the perfect hashtags to increase your reach and discoverability on any platform.",
        href: "/tools/hashtag-generator",
        category: "ALL PLATFORMS",
    },
    {
        title: "Tweet Generator",
        description: "Create engaging tweets that spark conversations and grow your Twitter presence.",
        href: "/tools/tweet-generator",
        category: "TWITTER",
    },
];

export default function CaptionGeneratorPage() {
    const [topic, setTopic] = useState("");
    const [platform, setPlatform] = useState<PlatformType>("instagram");
    const [tone, setTone] = useState<ToneType>("casual");
    const [includeHashtags, setIncludeHashtags] = useState(true);
    const [includeEmoji, setIncludeEmoji] = useState(true);
    const [includeCallToAction, setIncludeCallToAction] = useState(true);
    const [captions, setCaptions] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        setIsLoading(true);
        setError(null);
        setCaptions([]);

        try {
            const response = await fetch("/api/generate-caption", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic: topic.trim(),
                    platform,
                    tone,
                    includeHashtags,
                    includeEmoji,
                    includeCallToAction,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate captions");
            }

            setCaptions(data.captions);
        } catch (err) {
            console.error("Generation error:", err);
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (caption: string, index: number) => {
        try {
            await navigator.clipboard.writeText(caption);
            setCopiedIndex(index);
            setShowToast(true);
            setTimeout(() => {
                setCopiedIndex(null);
                setShowToast(false);
            }, 2000);
        } catch {
            console.error("Failed to copy");
        }
    };

    return (
        <div className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link href="/tools" className="text-sm text-[#6B6B8D] hover:text-[#0F2854]">
                        ← Back to Free Tools
                    </Link>
                </nav>

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-[#0F2854] sm:text-4xl lg:text-5xl">
                        Caption Generator
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-[#4A4A68]">
                        Generate engaging captions for Instagram, TikTok, Facebook, and Twitter. Optimized for each platform.
                    </p>

                    <div className="mx-auto mt-6 flex flex-wrap justify-center gap-4 text-sm text-[#6B6B8D]">
                        <span className="flex items-center gap-1">
                            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            100% free
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            4 platforms
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Instant results
                        </span>
                    </div>
                </div>

                {/* Tool Section */}
                <div className="mb-16 grid gap-8 lg:grid-cols-2">
                    {/* Left: Inputs */}
                    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">Create Your Caption</h2>

                        <div className="space-y-5">
                            {/* Platform Selection */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                    Platform
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {platformOptions.map((p) => (
                                        <button
                                            key={p.value}
                                            onClick={() => setPlatform(p.value as PlatformType)}
                                            className={`rounded-xl border px-3 py-3 text-center transition-all ${platform === p.value
                                                ? "border-[#4988C4] bg-[#F0F7FF] ring-2 ring-[#4988C4]/20"
                                                : "border-[#E5E7F0] bg-white hover:border-[#4988C4]/50"
                                                }`}
                                        >
                                            <span className="block text-lg">{p.icon}</span>
                                            <span className="block text-xs font-medium text-[#0F2854]">{p.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Topic Input */}
                            <div>
                                <label htmlFor="topic" className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                    What&apos;s your post about?
                                </label>
                                <textarea
                                    id="topic"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="Describe your photo, video, or the message you want to share..."
                                    className="w-full rounded-xl border border-[#E5E7F0] bg-white px-4 py-3 text-[#0F2854] placeholder-[#9090A7] focus:border-[#4988C4] focus:outline-none focus:ring-2 focus:ring-[#4988C4]/20"
                                    rows={3}
                                />
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {exampleTopics.map((ex) => (
                                        <button
                                            key={ex}
                                            onClick={() => setTopic(ex)}
                                            className="rounded-lg bg-[#F0F7FF] px-2 py-1 text-xs text-[#4988C4] hover:bg-[#BDE8F5]"
                                        >
                                            {ex}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tone Selection */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                    Tone
                                </label>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {toneOptions.map((t) => (
                                        <button
                                            key={t.value}
                                            onClick={() => setTone(t.value as ToneType)}
                                            className={`rounded-xl border px-3 py-2 text-left transition-all ${tone === t.value
                                                ? "border-[#4988C4] bg-[#F0F7FF] ring-2 ring-[#4988C4]/20"
                                                : "border-[#E5E7F0] bg-white hover:border-[#4988C4]/50"
                                                }`}
                                        >
                                            <span className="block text-sm font-medium text-[#0F2854]">{t.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={includeHashtags}
                                        onChange={(e) => setIncludeHashtags(e.target.checked)}
                                        className="h-4 w-4 rounded border-[#E5E7F0] text-[#4988C4] focus:ring-[#4988C4]"
                                    />
                                    <span className="text-sm text-[#4A4A68]">Hashtags</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={includeEmoji}
                                        onChange={(e) => setIncludeEmoji(e.target.checked)}
                                        className="h-4 w-4 rounded border-[#E5E7F0] text-[#4988C4] focus:ring-[#4988C4]"
                                    />
                                    <span className="text-sm text-[#4A4A68]">Emojis</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={includeCallToAction}
                                        onChange={(e) => setIncludeCallToAction(e.target.checked)}
                                        className="h-4 w-4 rounded border-[#E5E7F0] text-[#4988C4] focus:ring-[#4988C4]"
                                    />
                                    <span className="text-sm text-[#4A4A68]">Call-to-action</span>
                                </label>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={!topic.trim() || isLoading}
                                className="w-full rounded-[6px] bg-[#1C4D8D] py-3.5 font-semibold text-white transition-all hover:bg-[#0F2854] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Generating...
                                    </span>
                                ) : (
                                    "Generate Captions"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right: Output */}
                    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">Your Captions</h2>

                        {error && (
                            <div className="mb-4 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-600">
                                <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E5E7F0] border-t-[#4988C4]" />
                                <p className="text-[#4A4A68]">Creating engaging captions...</p>
                            </div>
                        ) : captions.length === 0 && !error ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-3 text-center text-[#9090A7]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F7FF]">
                                    <svg className="h-6 w-6 text-[#4988C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                </div>
                                <p>Select a platform and describe your post</p>
                                <p className="text-xs">We&apos;ll create 5 unique captions for you</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {captions.map((caption, index) => (
                                    <div
                                        key={index}
                                        className="group relative rounded-xl border border-[#E5E7F0] bg-[#F8FCFF] p-4 pt-6 transition-all hover:border-[#4988C4]/30 hover:shadow-sm"
                                    >
                                        <span className="absolute left-4 top-2 text-[10px] font-medium text-[#9090A7]">
                                            {caption.length} chars
                                        </span>
                                        <p className="pr-12 text-[#4A4A68] whitespace-pre-wrap">{caption}</p>
                                        <button
                                            onClick={() => handleCopy(caption, index)}
                                            className="absolute right-3 top-3 rounded-lg p-2 text-[#6B6B8D] transition-colors hover:bg-[#BDE8F5] hover:text-[#0F2854]"
                                            title="Copy to clipboard"
                                        >
                                            {copiedIndex === index ? (
                                                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                ))}

                                {captions.length > 0 && (
                                    <button
                                        onClick={handleGenerate}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7F0] py-3 text-sm font-medium text-[#4A4A68] transition-all hover:bg-[#F8FCFF]"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Generate new captions
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Caption Tips Section */}
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-[#0F2854]">Caption Writing Tips</h2>
                    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-3 font-semibold text-[#0F2854]">✓ Do This</h3>
                                <ul className="space-y-2 text-sm text-[#4A4A68]">
                                    <li>• Hook readers in the first line</li>
                                    <li>• Tell a story or share genuine value</li>
                                    <li>• Include a clear call-to-action</li>
                                    <li>• Use line breaks to improve readability</li>
                                    <li>• Match your caption length to the platform</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-semibold text-[#0F2854]">✗ Avoid This</h3>
                                <ul className="space-y-2 text-sm text-[#4A4A68]">
                                    <li>• Starting with &quot;New post!&quot; or similar</li>
                                    <li>• Using too many hashtags in the caption</li>
                                    <li>• Writing long paragraphs without breaks</li>
                                    <li>• Being overly salesy or promotional</li>
                                    <li>• Copying the same caption across platforms</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl bg-[#F8FCFF] p-4">
                            <h3 className="mb-2 font-semibold text-[#0F2854]">Platform-Specific Tips</h3>
                            <div className="grid gap-3 text-sm text-[#4A4A68] md:grid-cols-2">
                                <div><strong>Instagram:</strong> 150-300 chars for feed, shorter for Stories. Put hashtags in first comment.</div>
                                <div><strong>TikTok:</strong> Keep it short and punchy, 2-3 lines max. Use trending sounds references.</div>
                                <div><strong>Twitter/X:</strong> 280 char limit. Be witty, ask questions, use threads for longer content.</div>
                                <div><strong>Facebook:</strong> Medium length works best. Tell stories, ask questions for engagement.</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-[#0F2854]">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {faqData.map((faq, index) => (
                            <details
                                key={index}
                                className="group rounded-xl border border-[#E5E7F0] bg-white"
                            >
                                <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-[#0F2854]">
                                    {faq.question}
                                    <svg
                                        className="h-5 w-5 text-[#9090A7] transition-transform group-open:rotate-180"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="border-t border-[#E5E7F0] p-4 text-sm text-[#4A4A68]">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#0F2854] to-[#1C4D8D] p-8 text-white md:p-12">
                    <div className="max-w-3xl">
                        <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                            Ready to schedule your captions?
                        </h2>
                        <p className="mb-6 text-lg text-white/90">
                            Use Timed Post to schedule your content across all platforms from one place.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/app"
                                className="inline-flex items-center rounded-[6px] bg-white px-6 py-3 font-semibold text-[#0F2854] transition-all hover:bg-[#BDE8F5]"
                            >
                                Try Timed Post free
                                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href="/#pricing"
                                className="inline-flex items-center rounded-[6px] border border-white/30 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
                            >
                                See pricing
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-[#0F2854]">Related Tools</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {relatedTools.map((tool) => (
                            <Link
                                key={tool.title}
                                href={tool.href}
                                className="group rounded-2xl border border-[#E5E7F0] bg-white p-6 transition-all hover:border-[#4988C4] hover:shadow-md"
                            >
                                <span className="text-xs font-medium text-[#6B6B8D]">{tool.category}</span>
                                <h3 className="mt-2 text-lg font-semibold text-[#0F2854] group-hover:text-[#4988C4]">
                                    {tool.title}
                                </h3>
                                <p className="mt-2 text-sm text-[#4A4A68]">{tool.description}</p>
                                <span className="mt-4 inline-flex items-center text-sm font-medium text-[#4988C4]">
                                    Try Now →
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            {/* Toast */}
            {showToast && (
                <div className="fixed bottom-6 right-6 z-50 animate-fade-in rounded-lg bg-[#0F2854] px-4 py-3 text-white shadow-lg">
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">Caption copied!</span>
                    </div>
                </div>
            )}
        </div>
    );
}
