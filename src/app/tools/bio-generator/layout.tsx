import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bio Generator - Create Compelling Social Media Bios",
    description: "Free bio generator tool. Create compelling social media bios for Instagram, TikTok, LinkedIn, and more. Choose from professional, casual, witty, or minimal tones.",
    openGraph: {
        title: "Bio Generator | Timed Post",
        description: "Create compelling social media bios for Instagram, TikTok, LinkedIn, and more.",
    },
};

export default function BioGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
