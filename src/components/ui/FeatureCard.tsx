import { FeatureIcon } from "./icons";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: string;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
        <div className="group relative rounded-xl bg-white p-6 shadow-[0_4px_20px_rgba(15,40,84,0.08)] transition-all hover:shadow-[0_8px_40px_rgba(15,40,84,0.12)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#BDE8F5] text-[#0F2854]">
                <FeatureIcon name={icon} />
            </div>
            <h3 className="text-lg font-semibold text-[#0F2854]">{title}</h3>
            <p className="mt-2 text-[#4A4A68]">{description}</p>
        </div>
    );
}
