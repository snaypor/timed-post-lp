interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    centered?: boolean;
}

export function SectionHeader({ title, subtitle, badge, centered = true }: SectionHeaderProps) {
    return (
        <div className={centered ? "text-center" : ""}>
            {badge && (
                <span className="mb-4 inline-block rounded-full bg-[#BDE8F5] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F2854]">
                    {badge}
                </span>
            )}
            <h2 className="text-3xl font-bold text-[#0F2854] sm:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mx-auto mt-4 max-w-2xl text-lg text-[#4A4A68]">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
