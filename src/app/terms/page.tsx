import { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: `Terms of Service for ${siteConfig.name}`,
};

export default function TermsPage() {
    return (
        <div className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
                <p className="mt-4 text-gray-400">Last updated: January 2026</p>

                <div className="mt-12 space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
                        <p className="mt-4">
                            By accessing and using {siteConfig.name}, you accept and agree to be bound by the terms
                            and provision of this agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white">2. Use of Service</h2>
                        <p className="mt-4">
                            You agree to use the service only for lawful purposes and in accordance with these Terms.
                            You agree not to use the service in any way that violates any applicable laws or regulations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white">3. User Accounts</h2>
                        <p className="mt-4">
                            You are responsible for maintaining the confidentiality of your account and password
                            and for restricting access to your computer or device.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white">4. Intellectual Property</h2>
                        <p className="mt-4">
                            The service and its original content, features, and functionality are owned by
                            {siteConfig.name} and are protected by international copyright, trademark, and other
                            intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white">5. Termination</h2>
                        <p className="mt-4">
                            We may terminate or suspend your account and access to the service immediately,
                            without prior notice or liability, for any reason whatsoever.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white">6. Contact Us</h2>
                        <p className="mt-4">
                            If you have any questions about these Terms, please contact us at
                            legal@timedpost.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
