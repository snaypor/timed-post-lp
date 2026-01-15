import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Bio Generator — Create Stunning Social Media Bios",
    description: "Generate free social media bios for Instagram, TikTok, LinkedIn, X & more. Multiple tones, no signup required. Create your perfect bio in seconds.",
    keywords: [
        "free bio generator",
        "bio generator",
        "bio maker",
        "instagram bio generator",
        "tiktok bio generator",
        "linkedin bio generator",
        "social media bio",
        "bio ideas",
        "professional bio",
        "creative bio",
        "bio generator tool",
        "bio creator",
    ],
    openGraph: {
        title: "Free Bio Generator — Create Stunning Social Media Bios | Timed Post",
        description: "Generate free social media bios for Instagram, TikTok, LinkedIn, X & more. Multiple tones, no signup required.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Bio Generator — Create Stunning Social Media Bios",
        description: "Generate unique social media bios instantly. Professional, casual, witty, or minimal. Free and instant.",
    },
};

export default function BioGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
