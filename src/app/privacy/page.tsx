import { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: `Privacy Policy for ${siteConfig.name}`,
};

export default function PrivacyPage() {
    return (
        <div className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
                <p className="mt-4 text-gray-400">Last updated: January 2025</p>

                <div className="mt-12 space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
                        <p className="mt-4">
                            We collect information you provide directly to us, such as when you create an account,
                            use our services, or contact us for support.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white">2. How We Use Your Information</h2>
                        <p className="mt-4">
                            We use the information we collect to provide, maintain, and improve our services,
                            and to communicate with you about updates and promotions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white">3. Information Sharing</h2>
                        <p className="mt-4">
                            We do not sell, trade, or otherwise transfer your personal information to third parties
                            without your consent, except as described in this policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white">4. Data Security</h2>
                        <p className="mt-4">
                            We implement appropriate security measures to protect your personal information
                            against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white">5. Contact Us</h2>
                        <p className="mt-4">
                            If you have any questions about this Privacy Policy, please contact us at
                            privacy@timedpost.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
