"use client";

import { useState, useEffect, FormEvent } from "react";

export default function ContactPage() {
    const [formTime, setFormTime] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    // Set form load time for timing-based anti-spam
    useEffect(() => {
        setFormTime(Date.now());
    }, []);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
            company_website: formData.get("company_website") as string, // Honeypot
            _formTime: formTime,
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus({
                    type: "success",
                    message: result.message || "Thank you for your message!",
                });
                // Reset form
                (e.target as HTMLFormElement).reset();
                setFormTime(Date.now());
            } else if (response.status === 429) {
                setSubmitStatus({
                    type: "error",
                    message: "Too many requests. Please try again later.",
                });
            } else if (result.fields) {
                // Validation error
                const fieldErrors = Object.values(result.fields).join(", ");
                setSubmitStatus({
                    type: "error",
                    message: `Please check your input: ${fieldErrors}`,
                });
            } else {
                setSubmitStatus({
                    type: "error",
                    message: result.error || "Something went wrong. Please try again.",
                });
            }
        } catch {
            setSubmitStatus({
                type: "error",
                message: "Network error. Please check your connection and try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white sm:text-5xl">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-lg text-gray-400">
                        Have a question? We&apos;d love to hear from you.
                    </p>
                </div>

                {/* Status Messages */}
                {submitStatus.type && (
                    <div
                        className={`mt-8 rounded-xl p-4 ${submitStatus.type === "success"
                                ? "bg-green-900/50 border border-green-500/30 text-green-300"
                                : "bg-red-900/50 border border-red-500/30 text-red-300"
                            }`}
                        role="alert"
                    >
                        {submitStatus.message}
                    </div>
                )}

                {/* Contact Form */}
                <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            minLength={1}
                            maxLength={100}
                            className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                            placeholder="Your name"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            maxLength={254}
                            className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                            placeholder="you@example.com"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            minLength={10}
                            maxLength={5000}
                            className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                            placeholder="Your message..."
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Honeypot field - hidden from real users */}
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            left: "-9999px",
                            width: "1px",
                            height: "1px",
                            overflow: "hidden",
                        }}
                    >
                        <label htmlFor="company_website">
                            Leave this field empty
                        </label>
                        <input
                            type="text"
                            id="company_website"
                            name="company_website"
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-semibold text-white transition-all ${isSubmitting
                                ? "cursor-not-allowed opacity-50"
                                : "hover:from-violet-500 hover:to-indigo-500"
                            }`}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>

                {/* Alternative Contact */}
                <div className="mt-12 text-center">
                    <p className="text-gray-400">
                        Or email us directly at{" "}
                        <a href="mailto:hello@timedpost.com" className="text-violet-400 hover:text-violet-300">
                            hello@timedpost.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
