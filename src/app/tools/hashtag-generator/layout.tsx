import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Hashtag Generator — Find Trending Tags",
    description:
        "Generate free hashtags for Instagram, TikTok, X, YouTube & more. Get niche, trending, or viral hashtags in seconds. No signup required.",
    keywords: [
        "free hashtag generator",
        "hashtag generator",
        "hashtag maker",
        "instagram hashtag generator",
        "tiktok hashtags generator",
        "trending hashtags",
        "niche hashtags",
        "viral hashtags",
        "social media hashtags",
        "hashtag finder",
        "hashtag tool",
        "best hashtags",
    ],
    openGraph: {
        title: "Free Hashtag Generator — Find Trending Tags | Timed Post",
        description:
            "Generate free hashtags for Instagram, TikTok, X, YouTube & more. Get niche, trending, or viral hashtags in seconds. No signup required.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Hashtag Generator — Find Trending Tags",
        description:
            "Generate free hashtags for Instagram, TikTok, X, YouTube & more. Get niche, trending, or viral hashtags in seconds.",
    },
};

export default function HashtagGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
