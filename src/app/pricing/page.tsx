"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { pricingPlans, platforms } from "@/lib/content";
import { SectionHeader, PricingCard } from "@/components/ui";

// Platform icons component
function PlatformIcon({ name }: { name: string }) {
    const icons: Record<string, React.ReactNode> = {
        facebook: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        instagram: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
        tiktok: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
        ),
        threads: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.474 12.01v-.017c.026-3.577.876-6.43 2.521-8.483C5.845 1.205 8.598.024 12.179 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.9-.746 2.164-1.18 3.757-1.29.929-.064 1.88-.03 2.861.096.034-.708-.024-1.379-.172-1.986-.22-.902-.644-1.378-1.377-1.378-.063 0-.13.004-.2.012-.604.07-1.058.399-1.35.978l-1.79-.956c.477-.89 1.233-1.481 2.188-1.71.302-.072.62-.109.946-.109 1.312 0 2.418.593 3.025 1.624.494.838.707 1.963.616 3.356l.017.193c.823.168 1.573.417 2.234.758 1.14.588 2.016 1.48 2.605 2.651.752 1.496.861 3.956-.926 5.848-1.713 1.812-3.942 2.652-7.085 2.678zm-.573-8.841c-1.149.08-2.014.36-2.574.835-.472.399-.681.867-.653 1.472.036.758.36 1.305.935 1.581.535.255 1.216.377 1.952.34 1.508-.08 2.673-.949 2.992-2.216.126-.504.169-1.085.116-1.74-.87-.123-1.795-.18-2.768-.272z" />
            </svg>
        ),
        youtube: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    };

    return (
        <div className="w-10 h-10 rounded-full bg-[#F8FCFF] flex items-center justify-center text-[#4A4A68] hover:text-[#1C4D8D] transition-colors">
            {icons[name.toLowerCase()] || null}
        </div>
    );
}

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    return (
        <div className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <SectionHeader
                    title="Simple, transparent pricing"
                    subtitle="Start free, upgrade when you need more."
                />

                {/* Billing Toggle */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-[#0F2854]" : "text-[#6B6B8D]"}`}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                        className={`relative h-7 w-14 rounded-full transition-colors ${billingCycle === "yearly" ? "bg-[#4988C4]" : "bg-[#E5E7F0]"
                            }`}
                    >
                        <div
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${billingCycle === "yearly" ? "translate-x-8" : "translate-x-1"
                                }`}
                        />
                    </button>
                    <span className={`text-sm font-medium ${billingCycle === "yearly" ? "text-[#0F2854]" : "text-[#6B6B8D]"}`}>
                        Yearly
                        <span className="ml-1.5 rounded-full bg-[#BDE8F5] px-2 py-0.5 text-xs text-[#1C4D8D] font-semibold">
                            Save 20%
                        </span>
                    </span>
                </div>

                {/* Pricing Cards - 2 column */}
                <div className="mt-12 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
                    {pricingPlans.map((plan) => (
                        <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} />
                    ))}
                </div>

                {/* Platform icons */}
                <div className="mt-16 flex flex-col items-center">
                    <p className="text-sm text-[#6B6B8D] mb-4">Post to:</p>
                    <div className="flex items-center gap-4">
                        {platforms.map((platform) => (
                            <PlatformIcon key={platform.name} name={platform.icon} />
                        ))}
                    </div>
                </div>

                {/* Need help */}
                <p className="mt-10 text-center text-sm text-[#6B6B8D]">
                    Need help choosing?{" "}
                    <Link href="/contact" className="text-[#4988C4] hover:text-[#1C4D8D] font-medium">
                        Contact us
                    </Link>
                </p>
            </div>
        </div>
    );
}
