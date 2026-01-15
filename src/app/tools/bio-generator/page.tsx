"use client";

import { useState } from "react";
import Link from "next/link";

// Bio templates organized by tone
const bioTemplates = {
    professional: [
        "{name} | {niche} specialist helping brands grow. Let's connect.",
        "{niche} expert. Sharing insights on building better brands. DM for collabs.",
        "Passionate about {niche}. Helping businesses succeed one post at a time.",
    ],
    casual: [
        "Hey, I'm {name}! 👋 {niche} enthusiast sharing the journey.",
        "{niche} lover | Creating content that vibes | Life's too short for boring bios",
        "Just {name} doing {niche} things ✨ Follow along!",
    ],
    witty: [
        "{name}: Professional {niche} nerd. Unprofessional coffee addict.",
        "Making {niche} cool again (it was always cool) | {name}",
        "50% {niche}, 50% caffeine, 100% trying my best | {name}",
    ],
    minimal: [
        "{name} • {niche}",
        "{niche} | Creating & sharing",
        "{name} — {niche} creator",
    ],
};

function generateBios(name: string, niche: string, tone: keyof typeof bioTemplates): string[] {
    const templates = bioTemplates[tone] || bioTemplates.professional;
    return templates.map((template) =>
        template
            .replace(/{name}/g, name)
            .replace(/{niche}/g, niche.toLowerCase())
    );
}

export default function BioGeneratorPage() {
    const [name, setName] = useState("");
    const [niche, setNiche] = useState("");
    const [tone, setTone] = useState<keyof typeof bioTemplates>("professional");
    const [bios, setBios] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);

    const handleGenerate = () => {
        if (name.trim() && niche.trim()) {
            setBios(generateBios(name.trim(), niche.trim(), tone));
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

    return (
        <div className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link href="/tools" className="text-sm text-[#6B6B8D] hover:text-[#0F2854]">
                        ← Back to Tools
                    </Link>
                </nav>

                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#BDE8F5] text-[#0F2854]">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-[#0F2854] sm:text-4xl">Bio Generator</h1>
                    <p className="mt-3 text-[#4A4A68]">
                        Create compelling social media bios in seconds
                    </p>
                </div>

                {/* Tool Grid */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left: Inputs */}
                    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">Your Details</h2>

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g., Sarah"
                                    className="w-full rounded-xl border border-[#E5E7F0] bg-white px-4 py-3 text-[#0F2854] placeholder-[#9090A7] focus:border-[#4988C4] focus:outline-none focus:ring-2 focus:ring-[#4988C4]/20"
                                />
                            </div>

                            <div>
                                <label htmlFor="niche" className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                    Your Niche
                                </label>
                                <input
                                    type="text"
                                    id="niche"
                                    value={niche}
                                    onChange={(e) => setNiche(e.target.value)}
                                    placeholder="e.g., Fitness, Tech, Photography"
                                    className="w-full rounded-xl border border-[#E5E7F0] bg-white px-4 py-3 text-[#0F2854] placeholder-[#9090A7] focus:border-[#4988C4] focus:outline-none focus:ring-2 focus:ring-[#4988C4]/20"
                                />
                            </div>

                            <div>
                                <label htmlFor="tone" className="mb-2 block text-sm font-medium text-[#4A4A68]">
                                    Tone
                                </label>
                                <select
                                    id="tone"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value as keyof typeof bioTemplates)}
                                    className="w-full rounded-xl border border-[#E5E7F0] bg-white px-4 py-3 text-[#0F2854] focus:border-[#4988C4] focus:outline-none focus:ring-2 focus:ring-[#4988C4]/20"
                                >
                                    <option value="professional">Professional</option>
                                    <option value="casual">Casual</option>
                                    <option value="witty">Witty</option>
                                    <option value="minimal">Minimal</option>
                                </select>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={!name.trim() || !niche.trim()}
                                className="w-full rounded-xl bg-[#1C4D8D] py-3 font-semibold text-white transition-all hover:bg-[#0F2854] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Generate Bios
                            </button>
                        </div>
                    </div>

                    {/* Right: Outputs */}
                    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)]">
                        <h2 className="mb-6 text-lg font-semibold text-[#0F2854]">Generated Bios</h2>

                        {bios.length === 0 ? (
                            <div className="flex h-64 items-center justify-center text-center text-[#9090A7]">
                                <p>Fill in your details and click Generate to see your bios here</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bios.map((bio, index) => (
                                    <div
                                        key={index}
                                        className="group relative rounded-xl border border-[#E5E7F0] bg-[#F8FCFF] p-4"
                                    >
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
                            </div>
                        )}
                    </div>
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
        </div>
    );
}
