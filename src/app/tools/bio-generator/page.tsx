"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";

type ToneType = "professional" | "casual" | "witty" | "minimal";

// Tone options with descriptions
const toneOptions = [
    { value: "professional", label: "Professional", desc: "Polished and business-ready" },
    { value: "casual", label: "Casual & Friendly", desc: "Warm and approachable" },
    { value: "witty", label: "Witty & Fun", desc: "Clever with personality" },
    { value: "minimal", label: "Minimal & Clean", desc: "Short and impactful" },
];

// FAQ data
const faqData = [
    {
        question: "What makes a good social media bio?",
        answer: "A good bio is clear, concise, and memorable. It should tell people who you are, what you do, and why they should follow you. Include a call-to-action when relevant and keep it under 150-160 characters for most platforms.",
    },
    {
        question: "How long should my bio be?",
        answer: "It depends on the platform. Instagram allows 150 characters, Twitter/X allows 160, TikTok allows 80, and LinkedIn gives you up to 2,600 for the About section. Our generator creates bios optimized for each platform's limits.",
    },
    {
        question: "Should I include emojis in my bio?",
        answer: "Emojis can add personality and break up text, making your bio more scannable. Use 1-3 relevant emojis for casual or creative niches. For professional contexts like LinkedIn, use them sparingly or skip them entirely.",
    },
    {
        question: "How often should I update my bio?",
        answer: "Update your bio whenever your focus, achievements, or goals change significantly. Many creators update seasonally or when launching something new. A fresh bio can re-engage existing followers and attract new ones.",
    },
    {
        question: "What should I avoid in my bio?",
        answer: "Avoid clichés like 'living my best life,' excessive hashtags, too much jargon, or unverifiable claims. Don't include sensitive personal info. Keep it authentic—people can spot a fake persona quickly.",
    },
    {
        question: "Can I use the same bio on all platforms?",
        answer: "You can, but it's better to tailor each bio to the platform's culture and character limits. LinkedIn bios should be more professional, while TikTok can be playful. Adjust tone and length accordingly.",
    },
    {
        question: "Is this bio generator free?",
        answer: "Yes, completely free. No signup, no limits. Generate as many bios as you need with different tones and styles.",
    },
    {
        question: "How does the AI generate my bios?",
        answer: "Our AI analyzes your name, niche, and chosen tone to create unique, personalized bios. It considers platform best practices, character limits, and current trends to generate options that feel authentic to you.",
    },
];

// Example prompts
const examplePrompts = [
    { name: "Sarah", niche: "Fitness coach helping busy moms", tone: "casual" },
    { name: "Alex", niche: "Tech startup founder", tone: "professional" },
    { name: "Maya", niche: "Travel photographer and storyteller", tone: "witty" },
    { name: "Jordan", niche: "Vegan recipe creator", tone: "casual" },
    { name: "Chris", niche: "Personal finance educator", tone: "professional" },
    { name: "Kim", niche: "Minimalist lifestyle blogger", tone: "minimal" },
];

export default function BioGeneratorPage() {
    const [name, setName] = useState("");
    const [niche, setNiche] = useState("");
    const [tone, setTone] = useState<ToneType>("professional");
    const [bios, setBios] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!name.trim() || !niche.trim()) return;

        setIsLoading(true);
        setError(null);
        setBios([]);

        try {
            const response = await fetch("/api/generate-bio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    niche: niche.trim(),
                    tone,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate bios");
            }

            setBios(data.bios);
        } catch (err) {
            console.error("Generation error:", err);
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (bio: string, index: number) => {
        try {
            await navigator.clipboard.writeText(bio);
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

    // JSON-LD Schema
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Free Bio Generator",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        description: "Generate free social media bios for Instagram, TikTok, LinkedIn and more. AI-powered with multiple tone options.",
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
                            Free Bio Generator
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#4A4A68]">
                            Create unique, compelling social media bios in seconds. Pick your tone, describe what you do, and let AI craft the perfect bio.
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
                                4 tone styles
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
                            <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">Your Details</h2>

                            <div className="space-y-5">
                                {/* Name Input */}
                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., Sarah, Alex, Jordan"
                                        className="w-full rounded-xl border border-[#E5E7F0] bg-white px-4 py-3 text-[#0F2854] placeholder-[#9090A7] focus:border-[#4988C4] focus:outline-none focus:ring-2 focus:ring-[#4988C4]/20"
                                    />
                                </div>

                                {/* Niche Input */}
                                <div>
                                    <label htmlFor="niche" className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                        Your Niche / What You Do
                                    </label>
                                    <input
                                        type="text"
                                        id="niche"
                                        value={niche}
                                        onChange={(e) => setNiche(e.target.value)}
                                        placeholder="e.g., Fitness coach, Tech entrepreneur, Food blogger"
                                        className="w-full rounded-xl border border-[#E5E7F0] bg-white px-4 py-3 text-[#0F2854] placeholder-[#9090A7] focus:border-[#4988C4] focus:outline-none focus:ring-2 focus:ring-[#4988C4]/20"
                                        onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                                    />
                                    <p className="mt-1.5 text-xs text-[#9090A7]">
                                        Be specific for better results (e.g., &quot;vegan recipe creator&quot; instead of just &quot;food&quot;)
                                    </p>
                                </div>

                                {/* Tone Selector */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                        Tone & Style
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {toneOptions.map((t) => (
                                            <button
                                                key={t.value}
                                                onClick={() => setTone(t.value as ToneType)}
                                                className={`rounded-xl border px-4 py-3 text-left transition-all ${tone === t.value
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

                                {/* Generate Button */}
                                <button
                                    onClick={handleGenerate}
                                    disabled={!name.trim() || !niche.trim() || isLoading}
                                    className="w-full rounded-[6px] bg-[#1C4D8D] py-3.5 font-semibold text-white transition-all hover:bg-[#0F2854] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Generating with AI...
                                        </span>
                                    ) : (
                                        "Generate Bios"
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Right: Output */}
                        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                            <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">Your Bios</h2>

                            {/* Error State */}
                            {error && (
                                <div className="mb-4 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-600">
                                    <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm">{error}</p>
                                    <button
                                        onClick={handleGenerate}
                                        className="ml-auto text-sm font-medium text-red-700 hover:text-red-800"
                                    >
                                        Try again
                                    </button>
                                </div>
                            )}

                            {/* Loading State */}
                            {isLoading ? (
                                <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
                                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E5E7F0] border-t-[#4988C4]" />
                                    <p className="text-[#4A4A68]">Creating unique bios with AI...</p>
                                    <p className="text-sm text-[#9090A7]">This may take a few seconds</p>
                                </div>
                            ) : bios.length === 0 && !error ? (
                                /* Empty State */
                                <div className="flex h-64 flex-col items-center justify-center gap-3 text-center text-[#9090A7]">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F7FF]">
                                        <svg className="h-6 w-6 text-[#4988C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <p>Fill in your details and click Generate</p>
                                    <p className="text-xs">AI will create 5 unique bios tailored to you</p>
                                </div>
                            ) : (
                                /* Bios Display */
                                <div className="space-y-4">
                                    {bios.map((bio, index) => (
                                        <div
                                            key={index}
                                            className="group relative rounded-xl border border-[#E5E7F0] bg-[#F8FCFF] p-4 pt-6 transition-all hover:border-[#4988C4]/30 hover:shadow-sm"
                                        >
                                            <span className="absolute left-4 top-2 text-[10px] font-medium text-[#9090A7]">
                                                {bio.length} chars
                                            </span>
                                            <p className="pr-12 text-[#4A4A68]">{bio}</p>
                                            <button
                                                onClick={() => handleCopy(bio, index)}
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

                                    {/* Regenerate Button */}
                                    {bios.length > 0 && (
                                        <button
                                            onClick={handleGenerate}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7F0] py-3 text-sm font-medium text-[#4A4A68] transition-all hover:bg-[#F8FCFF]"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Generate new bios
                                        </button>
                                    )}

                                    {/* Tip */}
                                    <p className="text-center text-xs text-[#9090A7]">
                                        💡 Try different tones to find what resonates with your audience
                                    </p>
                                </div>
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
                                <h3 className="mb-2 font-semibold text-[#0F2854]">Tell us about you</h3>
                                <p className="text-sm text-[#6B6B8D]">
                                    Enter your name and describe what you do. The more specific, the better.
                                </p>
                            </div>
                            <div className="rounded-2xl bg-white p-6 text-center shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#BDE8F5] text-xl font-bold text-[#0F2854]">
                                    2
                                </div>
                                <h3 className="mb-2 font-semibold text-[#0F2854]">Pick your tone</h3>
                                <p className="text-sm text-[#6B6B8D]">
                                    Choose professional, casual, witty, or minimal based on your brand voice.
                                </p>
                            </div>
                            <div className="rounded-2xl bg-white p-6 text-center shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#BDE8F5] text-xl font-bold text-[#0F2854]">
                                    3
                                </div>
                                <h3 className="mb-2 font-semibold text-[#0F2854]">Copy your favorite</h3>
                                <p className="text-sm text-[#6B6B8D]">
                                    Get 5 unique bios instantly. Copy the one you love and paste it anywhere.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Best Practices */}
                    <section className="mb-16 rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <h2 className="mb-6 text-2xl font-bold text-[#0F2854]">Best Practices for Social Media Bios</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-3 font-semibold text-[#0F2854]">✓ Do This</h3>
                                <ul className="space-y-2 text-sm text-[#4A4A68]">
                                    <li>• Lead with what you do or your value proposition</li>
                                    <li>• Include a call-to-action (link, DM, follow)</li>
                                    <li>• Use keywords people might search for</li>
                                    <li>• Add personality that matches your content</li>
                                    <li>• Keep it scannable—break up with emojis or pipes</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-semibold text-[#0F2854]">✗ Avoid This</h3>
                                <ul className="space-y-2 text-sm text-[#4A4A68]">
                                    <li>• Don&apos;t use vague phrases like &quot;living my best life&quot;</li>
                                    <li>• Avoid cluttering with too many hashtags</li>
                                    <li>• Skip unverifiable superlatives like &quot;world&apos;s best&quot;</li>
                                    <li>• Don&apos;t include personal info like email or address</li>
                                    <li>• Avoid copying someone else&apos;s bio word-for-word</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl bg-[#F8FCFF] p-4">
                            <h3 className="mb-2 font-semibold text-[#0F2854]">Platform-Specific Tips</h3>
                            <div className="grid gap-3 text-sm text-[#4A4A68] md:grid-cols-2 lg:grid-cols-3">
                                <div><strong>Instagram:</strong> 150 chars, use line breaks and emojis</div>
                                <div><strong>TikTok:</strong> 80 chars, keep it fun and direct</div>
                                <div><strong>Twitter/X:</strong> 160 chars, can be playful or professional</div>
                                <div><strong>LinkedIn:</strong> 2,600 chars, focus on expertise and results</div>
                                <div><strong>YouTube:</strong> Use the About section for full story</div>
                                <div><strong>Threads:</strong> Similar to Instagram, casual tone works</div>
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
                                        setName(example.name);
                                        setNiche(example.niche);
                                        setTone(example.tone as ToneType);
                                    }}
                                    className="rounded-xl border border-[#E5E7F0] bg-white p-4 text-left transition-all hover:border-[#4988C4] hover:shadow-md"
                                >
                                    <p className="font-medium text-[#0F2854]">{example.name}</p>
                                    <p className="mt-1 text-sm text-[#4A4A68]">&ldquo;{example.niche}&rdquo;</p>
                                    <span className="mt-2 inline-block rounded-full bg-[#F0F7FF] px-2 py-0.5 text-xs text-[#4988C4]">
                                        {toneOptions.find(t => t.value === example.tone)?.label}
                                    </span>
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
                                Got a great bio? Now schedule your posts.
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
                                href="/tools/hashtag-generator"
                                className="group rounded-2xl border border-[#E5E7F0] bg-white p-6 transition-all hover:border-[#4988C4] hover:shadow-md"
                            >
                                <span className="text-xs font-medium text-[#6B6B8D]">ALL PLATFORMS</span>
                                <h3 className="mt-2 text-lg font-semibold text-[#0F2854] group-hover:text-[#4988C4]">
                                    Hashtag Generator
                                </h3>
                                <p className="mt-2 text-sm text-[#4A4A68]">Find the perfect hashtags to boost your post's reach and discoverability.</p>
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
                                <p className="mt-2 text-sm text-[#4A4A68]">Create engaging captions for Instagram, TikTok, and more.</p>
                                <span className="mt-4 inline-flex items-center text-sm font-medium text-[#4988C4]">
                                    Try Now →
                                </span>
                            </Link>
                            <Link
                                href="/tools/linkedin-post-generator"
                                className="group rounded-2xl border border-[#E5E7F0] bg-white p-6 transition-all hover:border-[#4988C4] hover:shadow-md"
                            >
                                <span className="text-xs font-medium text-[#6B6B8D]">LINKEDIN</span>
                                <h3 className="mt-2 text-lg font-semibold text-[#0F2854] group-hover:text-[#4988C4]">
                                    LinkedIn Post Generator
                                </h3>
                                <p className="mt-2 text-sm text-[#4A4A68]">Create professional LinkedIn posts that drive engagement.</p>
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
                            Copied to clipboard!
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
