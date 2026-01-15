"use client";

interface FaqItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

export function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
    return (
        <div className={`rounded-xl bg-white shadow-[0_2px_8px_rgba(15,40,84,0.06)] transition-all ${isOpen ? "ring-1 ring-[#4988C4]/30" : ""}`}>
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
                <span className="font-medium text-[#0F2854]">{question}</span>
                <svg
                    className={`h-5 w-5 shrink-0 text-[#4988C4] transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-6 pb-5 text-[#4A4A68]">
                    {answer}
                </div>
            )}
        </div>
    );
}
