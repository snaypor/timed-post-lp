import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { PlatformIcon } from "@/components/ui";
import { platforms } from "@/lib/content";

// Platform colors for icons (matching Header style)
const platformColors: { [key: string]: string } = {
    facebook: "#1877F2",
    instagram: "#E4405F",
    tiktok: "#000000",
    threads: "#000000",
    youtube: "#FF0000",
};

// Avatar stack for trust indicator
function AvatarStack() {
    const avatars = [
        { initials: "JD", gradient: "from-blue-400 to-purple-500" },
        { initials: "SM", gradient: "from-pink-400 to-rose-500" },
        { initials: "AK", gradient: "from-green-400 to-emerald-500" },
        { initials: "TW", gradient: "from-orange-400 to-amber-500" },
    ];

    return (
        <div className="flex -space-x-2">
            {avatars.map((avatar, index) => (
                <div
                    key={index}
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${avatar.gradient} text-xs font-semibold text-white ring-2 ring-white`}
                >
                    {avatar.initials}
                </div>
            ))}
        </div>
    );
}

// Star rating for trust indicator
function StarRating() {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className="h-4 w-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export function FooterCTA() {
    return (
        <section className="bg-gradient-to-br from-[#BDE8F5]/50 via-[#F8FCFF] to-[#BDE8F5]/40 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Main CTA Content - Full Width */}
                <div className="rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(15,40,84,0.08)] md:p-12 lg:p-16">
                    <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
                        {/* Left - Text Content */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Headline */}
                            <h2 className="text-2xl font-bold text-[#0F2854] md:text-3xl lg:text-4xl">
                                Ready to save time on social media?
                            </h2>

                            {/* Subtitle */}
                            <p className="mt-3 max-w-xl text-[#4A4A68] lg:mt-4">
                                Schedule your posts, organize your media, and keep every brand on track.
                                No tab chaos. Just clean scheduling.
                            </p>

                            {/* Platform Icons */}
                            <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
                                {platforms.map((platform) => (
                                    <div
                                        key={platform.name}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
                                        title={platform.name}
                                        style={{ color: platformColors[platform.icon] }}
                                    >
                                        <PlatformIcon name={platform.icon} className="h-5 w-5" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - CTA Buttons & Trust */}
                        <div className="flex flex-col items-center gap-6 lg:items-end">
                            {/* CTA Buttons */}
                            <div className="flex flex-col items-center gap-3 sm:flex-row">
                                {/* Primary CTA */}
                                <Link
                                    href={siteConfig.cta.primary.href}
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0F2854] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1C4D8D] hover:shadow-lg"
                                >
                                    Start 7-day Free Trial
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>

                                {/* Secondary CTA - Sign up with Google */}
                                <Link
                                    href={siteConfig.cta.primary.href}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E7F0] bg-white px-8 py-3.5 text-sm font-semibold text-[#0F2854] transition-all hover:border-[#4988C4] hover:shadow-md"
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Sign up with Google
                                </Link>
                            </div>

                            {/* Trust Indicator */}
                            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                                <AvatarStack />
                                <div className="flex items-center gap-2">
                                    <StarRating />
                                    <span className="text-sm text-[#6B6B8D]">Trusted by 2,500+ users</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
