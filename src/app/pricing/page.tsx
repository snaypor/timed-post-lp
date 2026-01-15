"use client";

import Link from "next/link";
import { useState } from "react";
import { pricingPlans } from "@/lib/content";
import { SectionHeader, PricingCard } from "@/components/ui";

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    return (
        <div className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    title="Simple, transparent pricing"
                    subtitle="Start free, upgrade when you need more."
                />

                {/* Billing Toggle */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-gray-400"}`}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                        className={`relative h-7 w-14 rounded-full transition-colors ${billingCycle === "yearly" ? "bg-violet-600" : "bg-gray-700"
                            }`}
                    >
                        <div
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${billingCycle === "yearly" ? "translate-x-8" : "translate-x-1"
                                }`}
                        />
                    </button>
                    <span className={`text-sm ${billingCycle === "yearly" ? "text-white" : "text-gray-400"}`}>
                        Yearly
                        <span className="ml-1.5 rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                            Save 20%
                        </span>
                    </span>
                </div>

                {/* Pricing Cards */}
                <div className="mt-12 grid gap-8 lg:grid-cols-3">
                    {pricingPlans.map((plan) => (
                        <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} />
                    ))}
                </div>

                {/* Need help */}
                <p className="mt-10 text-center text-sm text-gray-500">
                    Need help choosing?{" "}
                    <Link href="/contact" className="text-violet-400 hover:text-violet-300">
                        Contact us
                    </Link>
                </p>
            </div>
        </div>
    );
}
