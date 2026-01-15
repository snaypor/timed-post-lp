import Link from "next/link";
import { ReactNode } from "react";

interface PrimaryButtonProps {
    href: string;
    children: ReactNode;
    showArrow?: boolean;
    className?: string;
}

export function PrimaryButton({ href, children, showArrow = false, className = "" }: PrimaryButtonProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center rounded-full bg-[#1C4D8D] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#0F2854] hover:shadow-md ${className}`}
        >
            {children}
            {showArrow && (
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            )}
        </Link>
    );
}
