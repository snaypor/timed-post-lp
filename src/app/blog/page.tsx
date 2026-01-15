import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blog",
    description: "Tips, insights, and updates about social media marketing and content creation.",
};

const posts = [
    {
        title: "Getting Started with Social Media Scheduling",
        excerpt: "Learn the basics of planning and scheduling your social media content for maximum engagement.",
        date: "Coming soon",
        slug: "#",
    },
    {
        title: "Best Times to Post on Each Platform",
        excerpt: "Discover the optimal posting times for Instagram, Twitter, LinkedIn, and more.",
        date: "Coming soon",
        slug: "#",
    },
    {
        title: "How to Create a Content Calendar",
        excerpt: "A step-by-step guide to planning your social media content weeks in advance.",
        date: "Coming soon",
        slug: "#",
    },
];

export default function BlogPage() {
    return (
        <div className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center">
                    <span className="inline-block rounded-full bg-[#BDE8F5] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F2854]">
                        Blog
                    </span>
                    <h1 className="mt-4 text-4xl font-bold text-[#0F2854] sm:text-5xl">
                        Latest Articles
                    </h1>
                    <p className="mt-4 text-lg text-[#4A4A68]">
                        Tips, insights, and updates about social media marketing.
                    </p>
                </div>

                {/* Posts List */}
                <div className="mt-16 space-y-8">
                    {posts.map((post, index) => (
                        <article
                            key={index}
                            className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)] transition-all hover:shadow-[0_8px_40px_rgba(15,40,84,0.12)]"
                        >
                            <div className="flex items-center gap-4 text-sm text-[#6B6B8D]">
                                <span className="rounded-full bg-[#BDE8F5] px-3 py-1 text-xs font-medium text-[#0F2854]">{post.date}</span>
                            </div>
                            <h2 className="mt-3 text-xl font-semibold text-[#0F2854]">
                                <Link href={post.slug} className="hover:text-[#4988C4]">
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="mt-2 text-[#4A4A68]">{post.excerpt}</p>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
