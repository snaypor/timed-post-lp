"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";
import { FooterCTA } from "./FooterCTA";
import { tools } from "@/lib/content";

interface FooterProps {
    showCTA?: boolean;
}

export function Footer({ showCTA = true }: FooterProps) {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    // Hide CTA on tool pages (/tools and /tools/*)
    const isToolPage = pathname === "/tools" || pathname?.startsWith("/tools/");
    const shouldShowCTA = showCTA && !isToolPage;

    // Get first 9 tools for the Free Tools column
    const displayedTools = tools.slice(0, 9);

    return (
        <>
            {/* Modern Footer CTA */}
            {shouldShowCTA && <FooterCTA />}

            <footer className="border-t border-[#E5E7F0] bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    {/* Footer Links Grid - 6 columns like the screenshot */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
                        {/* Column 1: Logo, Description, Social */}
                        <div className="col-span-2 md:col-span-1">
                            <img
                                src="/logo.png"
                                alt="Timed Post"
                                className="h-8 w-auto"
                            />
                            <p className="mt-4 text-sm text-[#4A4A68] leading-relaxed">
                                Plan, publish, and analyze across every platform.
                            </p>
                            {/* Social Icons */}
                            <div className="mt-4 flex items-center gap-3">
                                {/* X (Twitter) */}
                                <a
                                    href="#"
                                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7F0] text-[#4A4A68] transition-colors hover:border-[#1C4D8D] hover:text-[#1C4D8D]"
                                    aria-label="X (Twitter)"
                                >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                {/* LinkedIn */}
                                <a
                                    href="#"
                                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7F0] text-[#4A4A68] transition-colors hover:border-[#1C4D8D] hover:text-[#1C4D8D]"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Company */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#1C4D8D]">
                                Company
                            </h3>
                            <ul className="mt-4 space-y-3">
                                <li>
                                    <Link
                                        href="/#features"
                                        className="text-sm text-[#4A4A68] transition-colors hover:text-[#1C4D8D]"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#pricing"
                                        className="text-sm text-[#4A4A68] transition-colors hover:text-[#1C4D8D]"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        className="text-sm text-[#4A4A68] transition-colors hover:text-[#1C4D8D]"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-sm text-[#4A4A68] transition-colors hover:text-[#1C4D8D]"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Comparison (placeholder) */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#1C4D8D]">
                                Comparison
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {/* Links will be added later */}
                            </ul>
                        </div>

                        {/* Column 4: Placeholder (same as comparison) */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#1C4D8D]">
                                Platforms
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {/* Links will be added later */}
                            </ul>
                        </div>

                        {/* Column 5: Placeholder (same as comparison) */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#1C4D8D]">
                                Resources
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {/* Links will be added later */}
                            </ul>
                        </div>

                        {/* Column 6: Free Tools */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#1C4D8D]">
                                Free Tools
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {displayedTools.map((tool) => (
                                    <li key={tool.href}>
                                        <Link
                                            href={tool.href}
                                            className="text-sm text-[#4A4A68] transition-colors hover:text-[#1C4D8D]"
                                        >
                                            {tool.title}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        href="/tools"
                                        className="text-sm font-medium text-[#1C4D8D] transition-colors hover:text-[#2D6AB8]"
                                    >
                                        Discover 10+ More Free Tools
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="mt-12 border-t border-[#E5E7F0] pt-8">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            {/* Copyright */}
                            <p className="text-sm text-[#6B6B8D]">
                                © {currentYear} {siteConfig.name}. All Rights Reserved.
                            </p>

                            {/* Policy Links */}
                            <div className="flex items-center gap-6">
                                <Link
                                    href="/terms"
                                    className="text-sm text-[#6B6B8D] transition-colors hover:text-[#1C4D8D]"
                                >
                                    Terms of Service
                                </Link>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-[#6B6B8D] transition-colors hover:text-[#1C4D8D]"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

