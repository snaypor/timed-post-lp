import { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/content";
import { SectionHeader, FeatureIcon } from "@/components/ui";

export const metadata: Metadata = {
    title: "Free Social Media Tools",
    description: "Free tools to help you create better social media content. Generate compelling bios and trending hashtags for Instagram, TikTok, Twitter, and more.",
    openGraph: {
        title: "Free Social Media Tools | Timed Post",
        description: "Free tools to help you create better social media content. Generate compelling bios and trending hashtags.",
    },
};

export default function ToolsPage() {
    return (
        <div className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <SectionHeader
                    title="Free Social Media Tools"
                    subtitle="Powerful tools to help you create better content, completely free."
                />

                {/* Tools Grid */}
                <div className="mt-16 grid gap-6">
                    {tools.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="group flex items-center gap-6 rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)] transition-all hover:shadow-[0_8px_40px_rgba(15,40,84,0.12)]"
                        >
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#BDE8F5] text-[#0F2854] transition-colors group-hover:bg-[#4988C4] group-hover:text-white">
                                <FeatureIcon name={tool.icon} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-[#0F2854]">{tool.title}</h3>
                                <p className="mt-1 text-[#4A4A68]">{tool.description}</p>
                            </div>
                            <svg
                                className="h-6 w-6 text-[#6B6B8D] transition-colors group-hover:text-[#4988C4]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
