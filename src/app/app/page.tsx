import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your Timed Post account.",
};

export default function AppPage() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
            <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600">
                    <svg
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-white">Coming Soon</h1>
                <p className="mt-4 text-gray-400">
                    The Timed Post app is currently in development. Check back soon!
                </p>
                <Link
                    href="/"
                    className="mt-8 inline-flex items-center justify-center rounded-xl border border-gray-700 bg-gray-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-gray-600 hover:bg-gray-700"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
