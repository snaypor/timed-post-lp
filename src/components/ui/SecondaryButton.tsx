import Link from "next/link";
import { ReactNode } from "react";

interface SecondaryButtonProps {
    href: string;
    children: ReactNode;
    className?: string;
}

export function SecondaryButton({ href, children, className = "" }: SecondaryButtonProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center rounded-[6px] border border-[#1C4D8D] bg-transparent px-7 py-3.5 text-base font-semibold text-[#1C4D8D] transition-all hover:bg-[#1C4D8D] hover:text-white ${className}`}
        >
            {children}
        </Link>
    );
}
