import { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
    title: "Contact",
    description: `Get in touch with the ${siteConfig.name} team.`,
};

export default function ContactPage() {
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

                {/* Contact Form */}
                <form className="mt-12 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                            placeholder="Your name"
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
                            className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                            placeholder="you@example.com"
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
                            className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                            placeholder="Your message..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-semibold text-white transition-all hover:from-violet-500 hover:to-indigo-500"
                    >
                        Send Message
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
