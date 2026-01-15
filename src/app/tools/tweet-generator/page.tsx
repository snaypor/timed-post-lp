"use client";

import { useState } from "react";
import Link from "next/link";

type ToneType = "informative" | "witty" | "controversial" | "inspirational" | "promotional";

const toneOptions = [
    { value: "informative", label: "Informative", desc: "Educational and helpful" },
    { value: "witty", label: "Witty & Fun", desc: "Clever with humor" },
    { value: "controversial", label: "Bold Take", desc: "Sparks discussion" },
    { value: "inspirational", label: "Inspirational", desc: "Uplifting and positive" },
    { value: "promotional", label: "Promotional", desc: "Subtle call-to-action" },
];

const exampleTopics = [
    "The future of remote work",
    "Why consistency beats perfection",
    "Hot take on tech in creative industries",
    "Morning routine that changed my life",
    "Announcing a new product launch",
];

// FAQ data
const faqData = [
    {
        question: "What makes a tweet go viral?",
        answer: "Viral tweets usually have a strong hook, evoke emotion (humor, surprise, or relatability), and are easy to share. Timing matters too. Posting when your audience is active increases engagement significantly.",
    },
    {
        question: "How long should my tweets be?",
        answer: "While Twitter allows 280 characters, tweets between 70-100 characters often get the most engagement. Short, punchy tweets are easier to read and retweet. Save longer content for threads.",
    },
    {
        question: "Should I use hashtags on Twitter?",
        answer: "Use 1-3 relevant hashtags maximum. Unlike Instagram, too many hashtags on Twitter can hurt engagement. Focus on hashtags that are trending or specific to your niche.",
    },
    {
        question: "What's the best time to tweet?",
        answer: "Generally 8-10 AM and 6-9 PM on weekdays get good engagement. But your specific audience may differ. Use Twitter Analytics to find when your followers are most active.",
    },
    {
        question: "How often should I tweet?",
        answer: "Quality over quantity. 3-5 thoughtful tweets per day is a good baseline. Consistency matters more than volume. Use scheduling tools to maintain a regular presence.",
    },
    {
        question: "Is this tweet generator free?",
        answer: "Yes, completely free. No signup required, no limits. Generate as many tweets as you need.",
    },
];

// Related tools (Twitter/X focused)
const relatedTools = [
    {
        title: "Twitter Bio Generator",
        description: "Create a compelling Twitter bio that captures attention and grows your following.",
        href: "/tools/bio-generator",
        category: "TWITTER",
    },
    {
        title: "Hashtag Generator",
        description: "Find trending hashtags to boost your tweet's visibility and reach.",
        href: "/tools/hashtag-generator",
        category: "TWITTER",
    },
    {
        title: "LinkedIn Post Generator",
        description: "Repurpose your best tweets into professional LinkedIn content.",
        href: "/tools/linkedin-post-generator",
        category: "LINKEDIN",
    },
];

export default function TweetGeneratorPage() {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState<ToneType>("informative");
    const [includeHashtags, setIncludeHashtags] = useState(true);
    const [includeEmoji, setIncludeEmoji] = useState(true);
    const [tweets, setTweets] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        setIsLoading(true);
        setError(null);
        setTweets([]);

        try {
            const response = await fetch("/api/generate-tweet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic: topic.trim(),
                    tone,
                    includeHashtags,
                    includeEmoji,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate tweets");
            }

            setTweets(data.tweets);
        } catch (err) {
            console.error("Generation error:", err);
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (tweet: string, index: number) => {
        try {
            await navigator.clipboard.writeText(tweet);
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
                        Tweet Generator
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-[#4A4A68]">
                        Generate engaging tweets that get likes, retweets, and replies. Perfect for growing your X/Twitter presence.
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
                            No signup
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
                        <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">What do you want to tweet about?</h2>

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="topic" className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                    Topic or Idea
                                </label>
                                <textarea
                                    id="topic"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., Why remote work is here to stay, My thoughts on productivity tools, Announcing our new feature..."
                                    className="w-full rounded-xl border border-[#E5E7F0] bg-white px-4 py-3 text-[#0F2854] placeholder-[#9090A7] focus:border-[#4988C4] focus:outline-none focus:ring-2 focus:ring-[#4988C4]/20"
                                    rows={3}
                                />
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {exampleTopics.slice(0, 3).map((ex) => (
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

                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={includeHashtags}
                                        onChange={(e) => setIncludeHashtags(e.target.checked)}
                                        className="h-4 w-4 rounded border-[#E5E7F0] text-[#4988C4] focus:ring-[#4988C4]"
                                    />
                                    <span className="text-sm text-[#4A4A68]">Include hashtags</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={includeEmoji}
                                        onChange={(e) => setIncludeEmoji(e.target.checked)}
                                        className="h-4 w-4 rounded border-[#E5E7F0] text-[#4988C4] focus:ring-[#4988C4]"
                                    />
                                    <span className="text-sm text-[#4A4A68]">Include emojis</span>
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
                                    "Generate Tweets"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right: Output */}
                    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">Your Tweets</h2>

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
                                <p className="text-[#4A4A68]">Crafting viral tweets...</p>
                            </div>
                        ) : tweets.length === 0 && !error ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-3 text-center text-[#9090A7]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F7FF]">
                                    <svg className="h-6 w-6 text-[#4988C4]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </div>
                                <p>Enter a topic and click Generate</p>
                                <p className="text-xs">We&apos;ll create 5 unique tweets for you</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {tweets.map((tweet, index) => (
                                    <div
                                        key={index}
                                        className="group relative rounded-xl border border-[#E5E7F0] bg-[#F8FCFF] p-4 pt-6 transition-all hover:border-[#4988C4]/30 hover:shadow-sm"
                                    >
                                        <span className="absolute left-4 top-2 text-[10px] font-medium text-[#9090A7]">
                                            {tweet.length}/280 chars
                                        </span>
                                        <p className="pr-12 text-[#4A4A68] whitespace-pre-wrap">{tweet}</p>
                                        <button
                                            onClick={() => handleCopy(tweet, index)}
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

                                {tweets.length > 0 && (
                                    <button
                                        onClick={handleGenerate}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7F0] py-3 text-sm font-medium text-[#4A4A68] transition-all hover:bg-[#F8FCFF]"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Generate new tweets
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Tweet Tips Section */}
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-[#0F2854]">Twitter Writing Tips</h2>
                    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-3 font-semibold text-[#0F2854]">✓ Do This</h3>
                                <ul className="space-y-2 text-sm text-[#4A4A68]">
                                    <li>• Start with a hook that stops the scroll</li>
                                    <li>• Share genuine opinions and insights</li>
                                    <li>• Use threads for longer, valuable content</li>
                                    <li>• Reply to others and join conversations</li>
                                    <li>• Post consistently at peak engagement times</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-semibold text-[#0F2854]">✗ Avoid This</h3>
                                <ul className="space-y-2 text-sm text-[#4A4A68]">
                                    <li>• Overusing hashtags (stick to 1-3 max)</li>
                                    <li>• Tweeting the same content repeatedly</li>
                                    <li>• Being overly promotional or salesy</li>
                                    <li>• Ignoring replies and mentions</li>
                                    <li>• Posting without a clear point or value</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl bg-[#F8FCFF] p-4">
                            <h3 className="mb-2 font-semibold text-[#0F2854]">Engagement Boosters</h3>
                            <div className="grid gap-3 text-sm text-[#4A4A68] md:grid-cols-2">
                                <div><strong>Ask questions:</strong> Get people to reply and share their opinions.</div>
                                <div><strong>Share data:</strong> Stats and numbers catch attention in the feed.</div>
                                <div><strong>Be controversial:</strong> Hot takes spark discussion (but stay respectful).</div>
                                <div><strong>Tell stories:</strong> Personal experiences resonate with readers.</div>
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
                            Ready to schedule your tweets?
                        </h2>
                        <p className="mb-6 text-lg text-white/90">
                            Timed Post helps you schedule tweets and posts across multiple platforms from one place.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/app"
                                className="inline-flex items-center rounded-[6px] bg-white px-6 py-3 font-semibold text-[#0F2854] transition-all hover:bg-[#BDE8F5]"
                            >
                                Start scheduling
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
                        <span className="text-sm font-medium">Tweet copied!</span>
                    </div>
                </div>
            )}
        </div>
    );
}
