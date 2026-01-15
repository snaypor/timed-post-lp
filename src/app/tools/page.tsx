import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Free Social Media Tools",
    description: "Free tools to level up your social media game. Writing captions, resizing photos, or creating unique bios – these free tools make managing your social media content simple and stress-free.",
    openGraph: {
        title: "Free Social Media Tools | Timed Post",
        description: "Free tools to level up your social media game. Writing captions, generating bios, and more.",
    },
};

// Tool categories with their tools
const toolCategories = [
    {
        name: "General Tools",
        tools: [
            {
                title: "Bio Generator",
                description: "Create compelling social media bios instantly.",
                href: "/tools/bio-generator",
            },
            {
                title: "Hashtag Generator",
                description: "Generate trending hashtags for any platform.",
                href: "/tools/hashtag-generator",
            },
        ],
    },
    {
        name: "Instagram Tools",
        tools: [
            {
                title: "Instagram Bio Generator",
                description: "Create a memorable Instagram bio instantly.",
                href: "/tools/bio-generator",
            },
            {
                title: "Instagram Caption Generator",
                description: "Generate engaging captions for your posts.",
                href: "/tools/caption-generator",
            },
            {
                title: "Instagram Hashtag Generator",
                description: "Find trending Instagram hashtags.",
                href: "/tools/hashtag-generator",
            },
        ],
    },
    {
        name: "TikTok Tools",
        tools: [
            {
                title: "TikTok Bio Generator",
                description: "Craft a catchy TikTok bio instantly.",
                href: "/tools/bio-generator",
            },
            {
                title: "TikTok Hashtag Generator",
                description: "Discover viral TikTok hashtags.",
                href: "/tools/hashtag-generator",
            },
        ],
    },
    {
        name: "Twitter/X Tools",
        tools: [
            {
                title: "Twitter Bio Generator",
                description: "Write the perfect Twitter/X bio.",
                href: "/tools/bio-generator",
            },
            {
                title: "Tweet Generator",
                description: "Generate engaging tweets instantly.",
                href: "/tools/tweet-generator",
            },
        ],
    },
    {
        name: "LinkedIn Tools",
        tools: [
            {
                title: "LinkedIn Bio Generator",
                description: "Create a professional LinkedIn summary.",
                href: "/tools/bio-generator",
            },
            {
                title: "LinkedIn Post Generator",
                description: "Write professional LinkedIn posts.",
                href: "/tools/linkedin-post-generator",
            },
        ],
    },
];

// Coming soon tools
const comingSoonTools = [
    {
        title: "Caption Generator",
        description: "Generate perfect captions for any social media platform. Optimized for Instagram, TikTok, and Facebook.",
        icon: "✍️",
    },
    {
        title: "Image Resizer",
        description: "Resize images to the perfect dimensions for each social platform automatically.",
        icon: "🖼️",
    },
    {
        title: "Content Calendar",
        description: "Plan and visualize your content strategy with our free calendar tool.",
        icon: "📅",
    },
    {
        title: "Engagement Calculator",
        description: "Calculate your engagement rate and benchmark against industry standards.",
        icon: "📊",
    },
    {
        title: "Username Generator",
        description: "Generate unique and available usernames for any social platform.",
        icon: "👤",
    },
    {
        title: "Post Scheduler Preview",
        description: "See exactly how your posts will look before they go live.",
        icon: "👁️",
    },
];

export default function ToolsPage() {
    return (
        <div className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-3xl font-bold text-[#0F2854] sm:text-4xl lg:text-5xl">
                        Social Media Tools
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-[#4A4A68]">
                        Free tools to level up your <span className="text-[#4988C4]">social media</span> game.
                        Writing captions, resizing photos, or creating unique bios, these free tools make managing
                        your social media content simple and stress-free.
                    </p>
                </div>

                {/* Tool Categories */}
                {toolCategories.map((category, categoryIndex) => (
                    <section key={category.name} className="mb-12">
                        <h2 className="mb-6 text-xl font-bold text-[#0F2854]">{category.name}</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {category.tools.map((tool) => (
                                <Link
                                    key={tool.title}
                                    href={tool.href}
                                    className="group rounded-xl border border-[#E5E7F0] bg-white p-4 transition-all hover:border-[#4988C4] hover:shadow-md"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg text-[#4988C4]">✦</span>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-[#4988C4] group-hover:underline">
                                                {tool.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-[#6B6B8D]">{tool.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {categoryIndex < toolCategories.length - 1 && (
                            <hr className="mt-12 border-[#E5E7F0]" />
                        )}
                    </section>
                ))}

                {/* Coming Soon Section */}
                <section className="mt-20">
                    <div className="mb-8 text-center">
                        <span className="inline-block rounded-full bg-[#BDE8F5] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F2854]">
                            Coming Soon
                        </span>
                        <h2 className="mt-4 text-2xl font-bold text-[#0F2854] sm:text-3xl">
                            More Tools on the Way
                        </h2>
                        <p className="mt-2 text-[#6B6B8D]">
                            We&apos;re building more free tools to help you create better content.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {comingSoonTools.map((tool) => (
                            <div
                                key={tool.title}
                                className="rounded-xl border border-dashed border-[#E5E7F0] bg-[#FAFCFF] p-5"
                            >
                                <span className="text-2xl">{tool.icon}</span>
                                <h3 className="mt-3 font-semibold text-[#0F2854]">{tool.title}</h3>
                                <p className="mt-1 text-sm text-[#6B6B8D]">{tool.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="mt-20 rounded-2xl bg-gradient-to-br from-[#0F2854] to-[#1C4D8D] p-8 text-center text-white md:p-12">
                    <h2 className="text-2xl font-bold md:text-3xl">
                        Ready to schedule your content?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-white/80">
                        Use our tools to create great content, then schedule it all from one place with Timed Post.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/app"
                            className="inline-flex items-center rounded-[6px] bg-white px-6 py-3 font-semibold text-[#0F2854] transition-all hover:bg-[#BDE8F5]"
                        >
                            Try Timed Post free
                            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
