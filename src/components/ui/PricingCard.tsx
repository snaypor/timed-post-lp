"use client";

import Link from "next/link";
import { PricingPlan } from "@/lib/content";

interface PricingCardProps {
    plan: PricingPlan;
    billingCycle: "monthly" | "yearly";
}

export function PricingCard({ plan, billingCycle }: PricingCardProps) {
    const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

    return (
        <div
            className={`relative rounded-xl bg-white p-8 shadow-[0_4px_20px_rgba(15,40,84,0.08)] ${plan.popular
                ? "ring-2 ring-[#4988C4]"
                : ""
                }`}
        >
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#4988C4] px-4 py-1 text-sm font-medium text-white">
                    Most popular
                </div>
            )}
            <h3 className="text-xl font-semibold text-[#0F2854]">{plan.name}</h3>
            <p className="mt-1 text-sm text-[#6B6B8D]">{plan.description}</p>
            <div className="mt-6">
                <span className="text-4xl font-bold text-[#0F2854]">${price}</span>
                <span className="text-[#6B6B8D]">/month</span>
            </div>
            {billingCycle === "yearly" && plan.monthlyPrice > 0 && (
                <p className="mt-1 text-sm text-[#6B6B8D]">
                    Billed ${plan.yearlyPrice * 12}/year
                </p>
            )}
            <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-[#4A4A68]">
                        <svg className="h-5 w-5 shrink-0 text-[#4988C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>
            <Link
                href="/app"
                className={`mt-8 block w-full rounded-[5px] py-3 text-center font-semibold transition-all ${plan.popular
                    ? "bg-[#1C4D8D] text-white hover:bg-[#0F2854]"
                    : "border border-[#E5E7F0] bg-white text-[#0F2854] hover:border-[#4988C4] hover:text-[#4988C4]"
                    }`}
            >
                {plan.cta}
            </Link>
        </div>
    );
}
