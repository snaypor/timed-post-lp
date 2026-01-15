"use client";

import Link from "next/link";
import { PricingPlan } from "@/lib/content";

interface PricingCardProps {
    plan: PricingPlan;
    billingCycle: "monthly" | "yearly";
}

export function PricingCard({ plan, billingCycle }: PricingCardProps) {
    const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    const annualTotal = plan.yearlyPrice * 12;

    return (
        <div className={`relative ${plan.popular ? "p-[2px] rounded-2xl animated-gradient-border" : ""}`}>
            <div
                className={`relative rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(15,40,84,0.08)] transition-all hover:shadow-[0_8px_30px_rgba(15,40,84,0.12)] flex flex-col h-full ${!plan.popular ? "border border-[#E5E7F0]" : ""
                    }`}
            >
                {/* Badge */}
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#0F2854]">{plan.name}</h3>
                    {plan.badge && (
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.popular
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                            : "bg-[#BDE8F5] text-[#1C4D8D]"
                            }`}>
                            {plan.badge}
                        </span>
                    )}
                </div>

                <p className="text-sm text-[#6B6B8D]">{plan.description}</p>

                {/* Price */}
                <div className="mt-6 mb-2">
                    <span className="text-5xl font-bold text-[#0F2854]">${price}</span>
                    <span className="text-[#6B6B8D] ml-1">/month</span>
                </div>

                {/* Annual total - only show when yearly billing is selected */}
                {billingCycle === "yearly" && (
                    <p className="text-sm text-[#6B6B8D] mb-6">
                        Billed <span className="font-medium text-[#0F2854]">${annualTotal}</span> annually
                    </p>
                )}
                {billingCycle === "monthly" && <div className="mb-6" />}

                {/* Features - flex-grow to push CTA to bottom */}
                <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <svg className="h-5 w-5 shrink-0 text-[#4988C4] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className={`text-[#4A4A68] ${feature.highlight ? "font-semibold text-[#0F2854]" : ""}`}>
                                {feature.text}
                                {/* Info icon with tooltip */}
                                {"info" in feature && feature.info && (
                                    <span className="inline-flex items-center ml-1.5 group relative">
                                        <svg className="h-4 w-4 text-[#9090A7] hover:text-[#4988C4] cursor-help transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {/* Tooltip */}
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all bg-[#0F2854] text-white text-xs rounded-lg px-3 py-2 w-48 z-10 shadow-lg">
                                            {feature.info}
                                        </span>
                                    </span>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button - gradient for popular plan */}
                <div className="mt-auto">
                    <Link
                        href="/app"
                        className={`block w-full rounded-[6px] py-3.5 text-center font-semibold transition-all ${plan.popular
                            ? "bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white hover:from-[#0F2854] hover:to-[#1C4D8D] shadow-lg shadow-[#1C4D8D]/25"
                            : "border-2 border-[#4988C4] text-[#4988C4] hover:bg-[#4988C4] hover:text-white"
                            }`}
                    >
                        {plan.cta} →
                    </Link>

                    {/* Free trial note */}
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#6B6B8D]">
                        <svg className="h-4 w-4 text-[#4988C4]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        $0.00 due today, cancel anytime
                    </div>
                </div>
            </div>
        </div>
    );
}
