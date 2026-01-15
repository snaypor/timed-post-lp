"use client";

import { useState } from "react";
import Link from "next/link";

type ToneType = "professional" | "conversational" | "inspirational" | "educational";
type PostType = "thought_leadership" | "story" | "tips" | "announcement" | "engagement";

const toneOptions = [
    { value: "professional", label: "Professional", desc: "Polished and authoritative" },
    { value: "conversational", label: "Conversational", desc: "Friendly yet professional" },
    { value: "inspirational", label: "Inspirational", desc: "Uplifting and motivating" },
    { value: "educational", label: "Educational", desc: "Informative and clear" },
];

const postTypeOptions = [
    { value: "thought_leadership", label: "Thought Leadership", desc: "Share expert insights" },
    { value: "story", label: "Personal Story", desc: "Share an experience" },
    { value: "tips", label: "Tips & Advice", desc: "Actionable tips list" },
    { value: "announcement", label: "Announcement", desc: "Share news or updates" },
    { value: "engagement", label: "Engagement Post", desc: "Spark discussion" },
];

const exampleTopics = [
    "Lessons learned from a failed project",
    "Why company culture matters more than salary",
    "5 productivity tips for remote workers",
    "Announcing our Series A funding",
];

// FAQ data
const faqData = [
    {
        question: "How long should my LinkedIn post be?",
        answer: "LinkedIn allows up to 3,000 characters, but posts between 1,200-1,600 characters tend to perform best. The first 2-3 lines are crucial since they appear before the 'see more' cutoff. Make your hook count.",
    },
    {
        question: "What makes a LinkedIn post go viral?",
        answer: "Viral LinkedIn posts usually share genuine insights or stories, have a strong opening hook, use short paragraphs and line breaks, and end with a question or call-to-action. Posting when your network is active (typically Tuesday-Thursday mornings) helps too.",
    },
    {
        question: "Should I use hashtags on LinkedIn?",
        answer: "Use 3-5 relevant hashtags. Unlike other platforms, LinkedIn hashtags should be professional and industry-specific. Place them at the end of your post to keep the content clean and readable.",
    },
    {
        question: "What content performs best on LinkedIn?",
        answer: "Personal stories with professional lessons, career insights, industry trends, helpful tips, and behind-the-scenes content tend to get the most engagement. Authenticity and value are key.",
    },
    {
        question: "How often should I post on LinkedIn?",
        answer: "Quality over quantity. 2-3 thoughtful posts per week is better than daily low-effort content. Consistency matters more than frequency. Use scheduling tools to maintain a regular presence.",
    },
    {
        question: "Is this LinkedIn post generator free?",
        answer: "Yes, completely free. No signup required, no limits. Generate as many LinkedIn posts as you need.",
    },
];

// Related tools (LinkedIn/professional focused)
const relatedTools = [
    {
        title: "Professional Bio Generator",
        description: "Create a compelling LinkedIn bio that showcases your expertise and attracts connections.",
        href: "/tools/bio-generator",
        category: "LINKEDIN",
    },
    {
        title: "Hashtag Generator",
        description: "Find professional hashtags to boost your LinkedIn post visibility.",
        href: "/tools/hashtag-generator",
        category: "LINKEDIN",
    },
    {
        title: "Tweet Generator",
        description: "Repurpose your LinkedIn insights into engaging Twitter content.",
        href: "/tools/tweet-generator",
        category: "TWITTER",
    },
];

export default function LinkedInPostGeneratorPage() {
    const [topic, setTopic] = useState("");
    const [postType, setPostType] = useState<PostType>("thought_leadership");
    const [tone, setTone] = useState<ToneType>("professional");
    const [includeEmoji, setIncludeEmoji] = useState(false);
    const [posts, setPosts] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        setIsLoading(true);
        setError(null);
        setPosts([]);

        try {
            const response = await fetch("/api/generate-linkedin-post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic: topic.trim(),
                    postType,
                    tone,
                    includeEmoji,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate posts");
            }

            setPosts(data.posts);
        } catch (err) {
            console.error("Generation error:", err);
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (post: string, index: number) => {
        try {
            await navigator.clipboard.writeText(post);
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
                        LinkedIn Post Generator
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-[#4A4A68]">
                        Create professional LinkedIn posts that drive engagement, build authority, and grow your network.
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
                            5 post types
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
                        <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">Create Your Post</h2>

                        <div className="space-y-5">
                            {/* Topic Input */}
                            <div>
                                <label htmlFor="topic" className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                    What do you want to post about?
                                </label>
                                <textarea
                                    id="topic"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="Share your topic, insight, or the story you want to tell..."
                                    className="w-full rounded-xl border border-[#E5E7F0] bg-white px-4 py-3 text-[#0F2854] placeholder-[#9090A7] focus:border-[#4988C4] focus:outline-none focus:ring-2 focus:ring-[#4988C4]/20"
                                    rows={3}
                                />
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {exampleTopics.slice(0, 2).map((ex) => (
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

                            {/* Post Type Selection */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                    Post Type
                                </label>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {postTypeOptions.map((p) => (
                                        <button
                                            key={p.value}
                                            onClick={() => setPostType(p.value as PostType)}
                                            className={`rounded-xl border px-3 py-2 text-left transition-all ${postType === p.value
                                                ? "border-[#4988C4] bg-[#F0F7FF] ring-2 ring-[#4988C4]/20"
                                                : "border-[#E5E7F0] bg-white hover:border-[#4988C4]/50"
                                                }`}
                                        >
                                            <span className="block text-sm font-medium text-[#0F2854]">{p.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tone Selection */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                    Tone
                                </label>
                                <div className="grid grid-cols-2 gap-2">
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
                                            <span className="block text-xs text-[#9090A7]">{t.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={includeEmoji}
                                        onChange={(e) => setIncludeEmoji(e.target.checked)}
                                        className="h-4 w-4 rounded border-[#E5E7F0] text-[#4988C4] focus:ring-[#4988C4]"
                                    />
                                    <span className="text-sm text-[#4A4A68]">Include emojis (sparingly)</span>
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
                                    "Generate LinkedIn Posts"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right: Output */}
                    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">Your LinkedIn Posts</h2>

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
                                <p className="text-[#4A4A68]">Crafting professional posts...</p>
                            </div>
                        ) : posts.length === 0 && !error ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-3 text-center text-[#9090A7]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F7FF]">
                                    <svg className="h-6 w-6 text-[#4988C4]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </div>
                                <p>Enter a topic and click Generate</p>
                                <p className="text-xs">We&apos;ll create 3 unique LinkedIn posts for you</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {posts.map((post, index) => (
                                    <div
                                        key={index}
                                        className="group relative rounded-xl border border-[#E5E7F0] bg-[#F8FCFF] p-4 transition-all hover:border-[#4988C4]/30 hover:shadow-sm"
                                    >
                                        <p className="pr-12 text-sm text-[#4A4A68] whitespace-pre-wrap leading-relaxed">{post}</p>
                                        <button
                                            onClick={() => handleCopy(post, index)}
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

                                {posts.length > 0 && (
                                    <button
                                        onClick={handleGenerate}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7F0] py-3 text-sm font-medium text-[#4A4A68] transition-all hover:bg-[#F8FCFF]"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Generate new posts
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* LinkedIn Tips Section */}
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-[#0F2854]">LinkedIn Posting Tips</h2>
                    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-3 font-semibold text-[#0F2854]">✓ Do This</h3>
                                <ul className="space-y-2 text-sm text-[#4A4A68]">
                                    <li>• Start with a hook that makes people want to read more</li>
                                    <li>• Use short paragraphs and line breaks for readability</li>
                                    <li>• Share personal stories with professional lessons</li>
                                    <li>• End with a question to encourage comments</li>
                                    <li>• Reply to every comment on your posts</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-semibold text-[#0F2854]">✗ Avoid This</h3>
                                <ul className="space-y-2 text-sm text-[#4A4A68]">
                                    <li>• Starting with &quot;I&apos;m excited to announce...&quot;</li>
                                    <li>• Writing long paragraphs without breaks</li>
                                    <li>• Being overly promotional or self-serving</li>
                                    <li>• Using too many hashtags (stick to 3-5)</li>
                                    <li>• Posting without engaging with others first</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl bg-[#F8FCFF] p-4">
                            <h3 className="mb-2 font-semibold text-[#0F2854]">Post Format Tips</h3>
                            <div className="grid gap-3 text-sm text-[#4A4A68] md:grid-cols-2">
                                <div><strong>Hook:</strong> First line should grab attention and promise value.</div>
                                <div><strong>Story:</strong> Share context, challenge, or journey in short paragraphs.</div>
                                <div><strong>Insight:</strong> Deliver the lesson tried or takeaway clearly.</div>
                                <div><strong>CTA:</strong> End with a question or invitation to engage.</div>
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
                            Ready to schedule your LinkedIn posts?
                        </h2>
                        <p className="mb-6 text-lg text-white/90">
                            Stay consistent with scheduled posts across all your social platforms.
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
                        <span className="text-sm font-medium">Post copied!</span>
                    </div>
                </div>
            )}
        </div>
    );
}
