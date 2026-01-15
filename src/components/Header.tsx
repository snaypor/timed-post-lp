"use client";

import Link from "next/link";
import { useState, useEffect, JSX } from "react";
import { siteConfig } from "@/config/siteConfig";
import { platforms } from "@/lib/content";

// Platform icons component
const PlatformIcon = ({ icon, className = "w-5 h-5" }: { icon: string; className?: string }) => {
    const icons: { [key: string]: JSX.Element } = {
        twitter: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        instagram: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        youtube: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
        threads: (
            <svg className={className} viewBox="0 0 192 192" fill="currentColor">
                <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.034c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.022c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.681 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.932 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.6 96c.208-24.682 5.636-43.966 16.129-57.316 11.215-14.258 28.466-21.573 51.275-21.742 22.508.173 39.796 7.484 51.275 21.742 5.602 6.96 9.772 15.616 12.491 25.973l16.253-4.321c-3.197-12.153-8.29-22.673-15.345-31.442C147.559 11.238 126.422 2.345 97.018 2.143h-.086C67.588 2.349 46.456 11.242 32.358 28.894 16.873 48.302 9.029 75.134 8.8 96l.003.042v.036c.229 20.866 8.073 47.698 23.558 67.106 14.098 17.652 35.23 26.545 64.674 26.751h.086c24.9-.163 42.108-6.749 56.192-21.514 18.091-18.958 17.271-42.301 11.183-56.502-4.376-10.211-12.619-18.395-23.959-23.931zm-45.201 53.627c-10.459.646-21.32-4.111-22.073-14.253-.547-7.373 5.266-15.584 22.093-16.553 1.939-.112 3.838-.167 5.7-.167 6.29 0 12.168.594 17.565 1.753-1.998 22.755-14.17 28.559-23.285 29.22z" />
            </svg>
        ),
        linkedin: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        facebook: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        tiktok: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
        ),
        pinterest: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
            </svg>
        ),
        telegram: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
        ),
        bluesky: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.299-1.664-.621-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
            </svg>
        ),
    };
    return icons[icon] || null;
};

// Platform colors for icons
const platformColors: { [key: string]: string } = {
    twitter: "#000000",
    instagram: "#E4405F",
    youtube: "#FF0000",
    threads: "#000000",
    linkedin: "#0A66C2",
    facebook: "#1877F2",
    tiktok: "#000000",
    pinterest: "#BD081C",
    telegram: "#26A5E4",
    bluesky: "#0085FF",
};

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [platformsDropdownOpen, setPlatformsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll for transparency effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled
                ? "border-[#E5E7F0]/50 bg-white/85 backdrop-blur-lg"
                : "border-[#E5E7F0] bg-white/95 backdrop-blur-md"
                }`}
        >
            <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="TimedPost"
                        className="h-8 w-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    {siteConfig.navLinks.map((link) => (
                        link.label === "Platforms" ? (
                            <div key={link.href} className="relative">
                                <button
                                    type="button"
                                    className="flex items-center gap-1 text-sm font-medium text-[#4A4A68] transition-colors hover:text-[#1C4D8D]"
                                    onClick={() => setPlatformsDropdownOpen(!platformsDropdownOpen)}
                                    onMouseEnter={() => setPlatformsDropdownOpen(true)}
                                >
                                    {link.label}
                                    <svg
                                        className={`h-4 w-4 transition-transform ${platformsDropdownOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Platforms Dropdown */}
                                {platformsDropdownOpen && (
                                    <div
                                        className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-xl border border-[#E5E7F0] bg-white p-4 shadow-xl"
                                        onMouseLeave={() => setPlatformsDropdownOpen(false)}
                                    >
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-3 min-w-[320px]">
                                            {platforms.map((platform) => (
                                                <Link
                                                    key={platform.name}
                                                    href={`/platforms/${platform.icon}`}
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#4A4A68] transition-colors hover:bg-[#F5F7FA] hover:text-[#1C4D8D]"
                                                    onClick={() => setPlatformsDropdownOpen(false)}
                                                >
                                                    <span style={{ color: platformColors[platform.icon] }}>
                                                        <PlatformIcon icon={platform.icon} className="w-5 h-5" />
                                                    </span>
                                                    {platform.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-[#4A4A68] transition-colors hover:text-[#1C4D8D]"
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                </nav>

                {/* CTA Buttons */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/app"
                        className="inline-flex items-center gap-2 rounded-[5px] border border-[#E5E7F0] bg-white px-4 py-2.5 text-sm font-medium text-[#4A4A68] transition-all hover:bg-[#F5F7FA] hover:border-[#D0D5DD]"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Join with Google
                    </Link>
                    <Link
                        href={siteConfig.cta.primary.href}
                        className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-[#1C4D8D] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0F2854]"
                    >
                        Start For Free
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-[#4A4A68] hover:bg-[#BDE8F5] hover:text-[#1C4D8D] md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    {mobileMenuOpen ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t border-[#E5E7F0] bg-white md:hidden">
                    <div className="space-y-1 px-4 py-4">
                        {siteConfig.navLinks.map((link) => (
                            link.label === "Platforms" ? (
                                <div key={link.href}>
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-[#4A4A68] hover:bg-[#BDE8F5] hover:text-[#1C4D8D]"
                                        onClick={() => setPlatformsDropdownOpen(!platformsDropdownOpen)}
                                    >
                                        {link.label}
                                        <svg
                                            className={`h-4 w-4 transition-transform ${platformsDropdownOpen ? "rotate-180" : ""}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {platformsDropdownOpen && (
                                        <div className="ml-4 mt-2 grid grid-cols-2 gap-2">
                                            {platforms.map((platform) => (
                                                <Link
                                                    key={platform.name}
                                                    href={`/platforms/${platform.icon}`}
                                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#4A4A68] hover:bg-[#F5F7FA]"
                                                    onClick={() => {
                                                        setPlatformsDropdownOpen(false);
                                                        setMobileMenuOpen(false);
                                                    }}
                                                >
                                                    <span style={{ color: platformColors[platform.icon] }}>
                                                        <PlatformIcon icon={platform.icon} className="w-4 h-4" />
                                                    </span>
                                                    {platform.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block rounded-lg px-3 py-2 text-base font-medium text-[#4A4A68] hover:bg-[#BDE8F5] hover:text-[#1C4D8D]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                        <div className="mt-4 flex flex-col gap-3">
                            <Link
                                href="/app"
                                className="flex w-full items-center justify-center gap-2 rounded-[5px] border border-[#E5E7F0] bg-white px-4 py-2.5 text-sm font-medium text-[#4A4A68]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Join with Google
                            </Link>
                            <Link
                                href={siteConfig.cta.primary.href}
                                className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-[#1C4D8D] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#0F2854]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Start For Free
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
