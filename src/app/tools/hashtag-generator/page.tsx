"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";

// Platform options
const platforms = [
    { value: "all", label: "All Platforms" },
    { value: "instagram", label: "Instagram" },
    { value: "tiktok", label: "TikTok" },
    { value: "twitter", label: "X (Twitter)" },
    { value: "facebook", label: "Facebook" },
    { value: "youtube", label: "YouTube" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "pinterest", label: "Pinterest" },
    { value: "threads", label: "Threads" },
];

// Hashtag styles
const hashtagStyles = [
    { value: "balanced", label: "Balanced", desc: "Mix of popular and niche" },
    { value: "trending", label: "Trending", desc: "Currently popular tags" },
    { value: "niche", label: "Niche/Specific", desc: "Targeted, low competition" },
    { value: "viral", label: "Viral-style", desc: "High-reach potential" },
];

// Count options
const countOptions = [10, 15, 20, 25, 30];

// FAQ data
const faqData = [
    {
        question: "How many hashtags should I use?",
        answer: "It depends on the platform. Instagram allows up to 30 but 5-15 often works best. TikTok and Twitter work well with 3-5 relevant tags. LinkedIn performs best with 3-5 industry-specific hashtags. Always prioritize quality and relevance over quantity.",
    },
    {
        question: "What makes a good hashtag?",
        answer: "Good hashtags are relevant to your content, easy to read, and have the right balance of popularity. Mix broad hashtags (high reach) with niche ones (targeted audience). Avoid generic tags like #love or #happy unless truly relevant.",
    },
    {
        question: "Should I use trending or niche hashtags?",
        answer: "Use both. Trending hashtags give you visibility in the moment, while niche hashtags connect you with your target audience. A balanced mix of 70% niche and 30% trending often works well.",
    },
    {
        question: "Do hashtags still work in 2024?",
        answer: "Yes. While algorithms have evolved, hashtags remain a discovery tool on every major platform. They help categorize your content and make it findable by people interested in specific topics.",
    },
    {
        question: "Can I use the same hashtags on every post?",
        answer: "Avoid it. Using identical hashtags repeatedly can look spammy and may hurt engagement. Rotate your hashtag sets and keep them relevant to each specific post.",
    },
    {
        question: "Where should I place hashtags?",
        answer: "Instagram: in the caption or first comment. TikTok: in the caption. Twitter/X: within the tweet naturally. LinkedIn: at the end of your post. Threads: in the post caption.",
    },
    {
        question: "Are there hashtags I should avoid?",
        answer: "Avoid banned or flagged hashtags, overly generic tags, and anything unrelated to your content. Check if a hashtag shows content you want to be associated with before using it.",
    },
    {
        question: "Is this hashtag generator free?",
        answer: "Yes, completely free. No signup, no limits. Generate as many hashtags as you need for any platform.",
    },
];

// Example prompts
const examplePrompts = [
    { text: "Vegan meal prep ideas", platform: "Instagram" },
    { text: "Home workout routine for beginners", platform: "TikTok" },
    { text: "NYC street photography tips", platform: "All Platforms" },
    { text: "Small business marketing strategy", platform: "LinkedIn" },
    { text: "DIY home decor on a budget", platform: "Pinterest" },
    { text: "Tech product review", platform: "YouTube" },
];

export default function HashtagGeneratorPage() {
    const [topic, setTopic] = useState("");
    const [platform, setPlatform] = useState("all");
    const [style, setStyle] = useState("balanced");
    const [count, setCount] = useState(20);
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [hasGenerated, setHasGenerated] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        setIsLoading(true);
        setSelectedHashtags(new Set());
        setError(null);

        try {
            const response = await fetch("/api/generate-hashtags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic: topic.trim(),
                    platform,
                    style,
                    count,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate hashtags");
            }

            setHashtags(data.hashtags);
            setHasGenerated(true);
        } catch (err) {
            console.error("Generation error:", err);
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegenerate = () => {
        handleGenerate();
    };

    const toggleHashtag = (hashtag: string) => {
        const newSelected = new Set(selectedHashtags);
        if (newSelected.has(hashtag)) {
            newSelected.delete(hashtag);
        } else {
            newSelected.add(hashtag);
        }
        setSelectedHashtags(newSelected);
    };

    const selectAll = () => {
        setSelectedHashtags(new Set(hashtags));
    };

    const deselectAll = () => {
        setSelectedHashtags(new Set());
    };

    const showCopyToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const copyAll = async () => {
        try {
            await navigator.clipboard.writeText(hashtags.join(" "));
            showCopyToast("All hashtags copied!");
        } catch {
            showCopyToast("Failed to copy");
        }
    };

    const copySelected = async () => {
        if (selectedHashtags.size === 0) {
            showCopyToast("No hashtags selected");
            return;
        }
        try {
            const selected = hashtags.filter((h) => selectedHashtags.has(h));
            await navigator.clipboard.writeText(selected.join(" "));
            showCopyToast(`${selected.length} hashtags copied!`);
        } catch {
            showCopyToast("Failed to copy");
        }
    };

    const copyAsText = async () => {
        try {
            const text = hashtags.join("\n");
            await navigator.clipboard.writeText(text);
            showCopyToast("Copied as list!");
        } catch {
            showCopyToast("Failed to copy");
        }
    };

    // JSON-LD Schema
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Free Hashtag Generator",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        description: "Generate free hashtags for Instagram, TikTok, X, YouTube and more. Get niche, trending, or viral hashtags in seconds.",
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <>
            <Script
                id="software-app-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

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
                            Free Hashtag Generator
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#4A4A68]">
                            Find the right hashtags to grow your reach. Pick your platform, choose a style, and get hashtags that actually work.
                        </p>

                        {/* TL;DR Bullets */}
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
                                9 platforms
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
                            <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">Describe Your Content</h2>

                            <div className="space-y-5">
                                {/* Keywords Input */}
                                <div>
                                    <label htmlFor="topic" className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                        Your keywords or description
                                    </label>
                                    <input
                                        type="text"
                                        id="topic"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="e.g., vegan recipes, home workout, NYC street photography"
                                        className="w-full rounded-xl border border-[#E5E7F0] bg-white px-4 py-3 text-[#0F2854] placeholder-[#9090A7] focus:border-[#4988C4] focus:outline-none focus:ring-2 focus:ring-[#4988C4]/20"
                                        onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                                    />
                                    <p className="mt-1.5 text-xs text-[#9090A7]">
                                        Describe what your post is about in a few words
                                    </p>
                                </div>

                                {/* Platform Selector */}
                                <div>
                                    <label htmlFor="platform" className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                        Platform
                                    </label>
                                    <select
                                        id="platform"
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        className="w-full rounded-xl border border-[#E5E7F0] bg-white px-4 py-3 text-[#0F2854] focus:border-[#4988C4] focus:outline-none focus:ring-2 focus:ring-[#4988C4]/20"
                                    >
                                        {platforms.map((p) => (
                                            <option key={p.value} value={p.value}>
                                                {p.label}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="mt-1.5 text-xs text-[#9090A7]">
                                        Different platforms have different hashtag cultures
                                    </p>
                                </div>

                                {/* Style Selector */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                        Hashtag Style
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {hashtagStyles.map((s) => (
                                            <button
                                                key={s.value}
                                                onClick={() => setStyle(s.value)}
                                                className={`rounded-xl border px-4 py-3 text-left transition-all ${style === s.value
                                                    ? "border-[#4988C4] bg-[#F0F7FF] ring-2 ring-[#4988C4]/20"
                                                    : "border-[#E5E7F0] bg-white hover:border-[#4988C4]/50"
                                                    }`}
                                            >
                                                <span className="block text-sm font-medium text-[#0F2854]">{s.label}</span>
                                                <span className="block text-xs text-[#9090A7]">{s.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Count Selector */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                        Number of hashtags
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {countOptions.map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => setCount(c)}
                                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${count === c
                                                    ? "bg-[#1C4D8D] text-white"
                                                    : "bg-[#F0F7FF] text-[#4A4A68] hover:bg-[#BDE8F5]"
                                                    }`}
                                            >
                                                {c}{c === 20 && <span className="ml-1 text-xs opacity-70">rec</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Generate Button */}
                                <button
                                    onClick={handleGenerate}
                                    disabled={!topic.trim() || isLoading}
                                    className="w-full rounded-[6px] bg-[#1C4D8D] py-3.5 font-semibold text-white transition-all hover:bg-[#0F2854] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isLoading ? "Finding the best hashtags..." : "Generate Hashtags"}
                                </button>
                            </div>
                        </div>

                        {/* Right: Output */}
                        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-[#0F2854]">Your Hashtags</h2>
                                {hashtags.length > 0 && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={selectedHashtags.size === hashtags.length ? deselectAll : selectAll}
                                            className="text-xs text-[#4988C4] hover:underline"
                                        >
                                            {selectedHashtags.size === hashtags.length ? "Deselect all" : "Select all"}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Empty State */}
                            {!hasGenerated && !isLoading && (
                                <div className="flex h-64 flex-col items-center justify-center text-center">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F7FF]">
                                        <svg className="h-6 w-6 text-[#9090A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                        </svg>
                                    </div>
                                    <p className="text-[#9090A7]">Enter your topic and hit Generate</p>
                                    <p className="mt-1 text-sm text-[#9090A7]/70">Your hashtags will appear here</p>
                                </div>
                            )}

                            {/* Loading State */}
                            {isLoading && (
                                <div className="flex h-64 flex-col items-center justify-center text-center">
                                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#BDE8F5] border-t-[#1C4D8D]"></div>
                                    <p className="text-[#4A4A68]">Generating hashtags...</p>
                                    <p className="mt-1 text-sm text-[#9090A7]">This may take a few seconds</p>
                                </div>
                            )}

                            {/* Error State */}
                            {error && !isLoading && (
                                <div className="flex h-64 flex-col items-center justify-center text-center">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <p className="text-[#4A4A68]">{error}</p>
                                    <button
                                        onClick={handleGenerate}
                                        className="mt-3 text-sm font-medium text-[#4988C4] hover:underline"
                                    >
                                        Try again
                                    </button>
                                </div>
                            )}

                            {/* Hashtags Display */}
                            {!isLoading && !error && hashtags.length > 0 && (
                                <>
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {hashtags.map((hashtag, index) => (
                                            <button
                                                key={index}
                                                onClick={() => toggleHashtag(hashtag)}
                                                className={`rounded-lg px-3 py-1.5 text-sm transition-all ${selectedHashtags.has(hashtag)
                                                    ? "bg-[#1C4D8D] text-white"
                                                    : "bg-[#BDE8F5] text-[#0F2854] hover:bg-[#9DD8EE]"
                                                    }`}
                                            >
                                                {hashtag}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-2 border-t border-[#E5E7F0] pt-4">
                                        <button
                                            onClick={copyAll}
                                            className="flex items-center gap-1.5 rounded-[6px] bg-[#1C4D8D] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#0F2854]"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy all
                                        </button>
                                        <button
                                            onClick={copySelected}
                                            disabled={selectedHashtags.size === 0}
                                            className="flex items-center gap-1.5 rounded-[6px] border border-[#1C4D8D] px-4 py-2 text-sm font-medium text-[#1C4D8D] transition-all hover:bg-[#F0F7FF] disabled:opacity-50"
                                        >
                                            Copy selected ({selectedHashtags.size})
                                        </button>
                                        <button
                                            onClick={copyAsText}
                                            className="flex items-center gap-1.5 rounded-[6px] border border-[#E5E7F0] px-4 py-2 text-sm font-medium text-[#4A4A68] transition-all hover:bg-[#F8FCFF]"
                                        >
                                            Copy as list
                                        </button>
                                        <button
                                            onClick={handleRegenerate}
                                            className="flex items-center gap-1.5 rounded-[6px] border border-[#E5E7F0] px-4 py-2 text-sm font-medium text-[#4A4A68] transition-all hover:bg-[#F8FCFF]"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Regenerate
                                        </button>
                                    </div>

                                    {/* Safety Note */}
                                    <p className="mt-4 text-xs text-[#9090A7]">
                                        💡 Review hashtags before posting to ensure they fit your brand and content.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* How It Works */}
                    <section className="mb-16">
                        <h2 className="mb-8 text-center text-2xl font-bold text-[#0F2854]">How It Works</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-2xl bg-white p-6 text-center shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#BDE8F5] text-xl font-bold text-[#0F2854]">
                                    1
                                </div>
                                <h3 className="mb-2 font-semibold text-[#0F2854]">Describe your content</h3>
                                <p className="text-sm text-[#6B6B8D]">
                                    Enter keywords that describe your post. Be specific for better results.
                                </p>
                            </div>
                            <div className="rounded-2xl bg-white p-6 text-center shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#BDE8F5] text-xl font-bold text-[#0F2854]">
                                    2
                                </div>
                                <h3 className="mb-2 font-semibold text-[#0F2854]">Pick platform + style</h3>
                                <p className="text-sm text-[#6B6B8D]">
                                    Choose your target platform and hashtag style for tailored suggestions.
                                </p>
                            </div>
                            <div className="rounded-2xl bg-white p-6 text-center shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#BDE8F5] text-xl font-bold text-[#0F2854]">
                                    3
                                </div>
                                <h3 className="mb-2 font-semibold text-[#0F2854]">Copy and post</h3>
                                <p className="text-sm text-[#6B6B8D]">
                                    Copy all hashtags or select your favorites. Paste them in your post caption.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Best Practices */}
                    <section className="mb-16 rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <h2 className="mb-6 text-2xl font-bold text-[#0F2854]">Best Practices for Hashtags</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-3 font-semibold text-[#0F2854]">✓ Do This</h3>
                                <ul className="space-y-2 text-sm text-[#4A4A68]">
                                    <li>• Mix broad hashtags with niche ones for balance</li>
                                    <li>• Keep hashtags relevant to your actual content</li>
                                    <li>• Rotate your hashtag sets between posts</li>
                                    <li>• Research hashtags before using them</li>
                                    <li>• Use fewer hashtags on Twitter/X and LinkedIn</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-semibold text-[#0F2854]">✗ Avoid This</h3>
                                <ul className="space-y-2 text-sm text-[#4A4A68]">
                                    <li>• Don't stuff 30 hashtags on every post</li>
                                    <li>• Avoid banned or flagged hashtags</li>
                                    <li>• Don't use hashtags unrelated to your content</li>
                                    <li>• Skip overly generic tags like #love #happy</li>
                                    <li>• Don't copy the exact same set every time</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl bg-[#F8FCFF] p-4">
                            <h3 className="mb-2 font-semibold text-[#0F2854]">Platform-Specific Tips</h3>
                            <div className="grid gap-3 text-sm text-[#4A4A68] md:grid-cols-2 lg:grid-cols-3">
                                <div><strong>Instagram:</strong> 5-15 hashtags, mix in caption or first comment</div>
                                <div><strong>TikTok:</strong> 3-5 hashtags, include FYP variations</div>
                                <div><strong>Twitter/X:</strong> 1-3 hashtags max, keep it focused</div>
                                <div><strong>LinkedIn:</strong> 3-5 industry hashtags, professional only</div>
                                <div><strong>YouTube:</strong> 3-5 in description, focus on search terms</div>
                                <div><strong>Pinterest:</strong> 2-5 hashtags, descriptive over trendy</div>
                            </div>
                        </div>
                    </section>

                    {/* Example Prompts */}
                    <section className="mb-16">
                        <h2 className="mb-6 text-2xl font-bold text-[#0F2854]">Example Prompts to Try</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {examplePrompts.map((example, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setTopic(example.text);
                                        const platformValue = platforms.find(
                                            (p) => p.label === example.platform
                                        )?.value || "all";
                                        setPlatform(platformValue);
                                    }}
                                    className="rounded-xl border border-[#E5E7F0] bg-white p-4 text-left transition-all hover:border-[#4988C4] hover:shadow-md"
                                >
                                    <p className="font-medium text-[#0F2854]">&ldquo;{example.text}&rdquo;</p>
                                    <p className="mt-1 text-sm text-[#9090A7]">{example.platform}</p>
                                </button>
                            ))}
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

                    {/* Timed Post CTA */}
                    <section className="rounded-2xl bg-gradient-to-br from-[#0F2854] to-[#1C4D8D] p-8 text-white md:p-12">
                        <div className="max-w-3xl">
                            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                                Ready to schedule your posts?
                            </h2>
                            <p className="mb-6 text-lg text-white/90">
                                Timed Post helps you schedule and manage social posts across multiple platforms from one place.
                            </p>

                            <ul className="mb-6 space-y-2 text-white/80">
                                <li className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-[#BDE8F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Connect Facebook, Instagram, Threads, TikTok, YouTube
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-[#BDE8F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Create posts with text + media, schedule date/time
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-[#BDE8F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <Link href="/#features" className="underline hover:text-white">Content calendar</Link> with drag-and-drop
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-[#BDE8F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <Link href="/#features" className="underline hover:text-white">Bulk scheduling</Link> for batch uploads
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-[#BDE8F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <Link href="/#features" className="underline hover:text-white">Media library</Link> (10GB Creator / 50GB Studio)
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-[#BDE8F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Workspaces/brands + basic analytics
                                </li>
                            </ul>

                            <p className="mb-6 text-sm text-white/60">
                                Note: Timed Post schedules and uploads content—it doesn&apos;t generate content. Analytics are basic for now.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/app"
                                    className="inline-flex items-center rounded-[6px] bg-white px-6 py-3 font-semibold text-[#0F2854] transition-all hover:bg-[#BDE8F5]"
                                >
                                    Start scheduling with Timed Post
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

                            <p className="mt-6 text-sm text-white/60">
                                <Link href="/tools" className="underline hover:text-white/80">
                                    ← Back to all free tools
                                </Link>
                            </p>
                        </div>
                    </section>

                    {/* Related Tools */}
                    <section className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold text-[#0F2854]">Related Tools</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            <Link
                                href="/tools/bio-generator"
                                className="group rounded-2xl border border-[#E5E7F0] bg-white p-6 transition-all hover:border-[#4988C4] hover:shadow-md"
                            >
                                <span className="text-xs font-medium text-[#6B6B8D]">ALL PLATFORMS</span>
                                <h3 className="mt-2 text-lg font-semibold text-[#0F2854] group-hover:text-[#4988C4]">
                                    Bio Generator
                                </h3>
                                <p className="mt-2 text-sm text-[#4A4A68]">Create a compelling bio that captures your personality and attracts followers.</p>
                                <span className="mt-4 inline-flex items-center text-sm font-medium text-[#4988C4]">
                                    Try Now →
                                </span>
                            </Link>
                            <Link
                                href="/tools/caption-generator"
                                className="group rounded-2xl border border-[#E5E7F0] bg-white p-6 transition-all hover:border-[#4988C4] hover:shadow-md"
                            >
                                <span className="text-xs font-medium text-[#6B6B8D]">INSTAGRAM</span>
                                <h3 className="mt-2 text-lg font-semibold text-[#0F2854] group-hover:text-[#4988C4]">
                                    Caption Generator
                                </h3>
                                <p className="mt-2 text-sm text-[#4A4A68]">Generate engaging captions for Instagram, TikTok, and more.</p>
                                <span className="mt-4 inline-flex items-center text-sm font-medium text-[#4988C4]">
                                    Try Now →
                                </span>
                            </Link>
                            <Link
                                href="/tools/tweet-generator"
                                className="group rounded-2xl border border-[#E5E7F0] bg-white p-6 transition-all hover:border-[#4988C4] hover:shadow-md"
                            >
                                <span className="text-xs font-medium text-[#6B6B8D]">TWITTER</span>
                                <h3 className="mt-2 text-lg font-semibold text-[#0F2854] group-hover:text-[#4988C4]">
                                    Tweet Generator
                                </h3>
                                <p className="mt-2 text-sm text-[#4A4A68]">Create viral tweets that spark conversations and grow your presence.</p>
                                <span className="mt-4 inline-flex items-center text-sm font-medium text-[#4988C4]">
                                    Try Now →
                                </span>
                            </Link>
                        </div>
                    </section>
                </div>

                {/* Toast */}
                {showToast && (
                    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[#1C4D8D] px-4 py-3 text-sm text-white shadow-lg">
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {toastMessage}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
