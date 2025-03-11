import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Terms of Service | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
    description: `Learn more about terms and conditions for using Pomomato's website and services.`,
    keywords: ['Terms of Service', 'data protection', 'Pomomato', 'terms and condition', 'terms of service'],
    openGraph: {
        title: 'Terms of Service | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
        description: `Learn more about terms and conditions for using Pomomato's website and services.`,
        type: 'website',
        url: 'https://pomomato.com/privacy',
        images: [
            {
                url: '/metadata/icon.ico',
                width: 1200,
                height: 630,
                alt: 'Terms of Service | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms of Service | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
        description: `Learn more about terms and conditions for using Pomomato's website and services.`,
        images: ['/metadata/icon.ico'],
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service | Pomomato AI - Study Smarter with AI-Powered Focus Sessions",
    "description": "Learn how Pomomato collects, uses, and protects your personal information. Read our Privacy Policy to understand your rights and how we handle your data.",
    "url": "https://pomomato.com/privacy",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Script
                id="terms-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <section className="bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-24 sm:py-32">
                <div className="flex justify-center items-center min-h-screen">
                    <div className="container mx-auto p-8 max-w-3xl text-left text-green-900 space-y-8">
                        <h1 className="text-4xl font-bold mb-6 border-b pb-2">Terms of Service</h1>
                        <p className="text-lg">Last updated: March 10, 2025</p>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">1. Introduction</h2>
                            <p>
                                Welcome to <strong>Workcoholic LLC</strong> (“Company”, “we”, “our”, “us”).
                                By accessing or using our website, you agree to comply with and be bound by
                                these Terms of Service.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">2. Use of Our Services</h2>
                            <p>By using our services, you agree that you will not:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Violate any laws or regulations</li>
                                <li>Infringe on any intellectual property rights</li>
                                <li>Engage in harmful or fraudulent activities</li>
                                <li>Attempt to disrupt our website or services</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">3. Account Responsibilities</h2>
                            <p>
                                If you create an account with us, you are responsible for maintaining the
                                confidentiality of your login information and all activities that occur under
                                your account.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">4. Termination</h2>
                            <p>
                                We reserve the right to terminate or suspend your account and access to our
                                services if you violate these Terms of Service.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
                            <p>
                                We are not responsible for any indirect, incidental, or consequential damages
                                arising from your use of our services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">6. Changes to These Terms</h2>
                            <p>
                                We may update these Terms of Service periodically. Continued use of our
                                website constitutes acceptance of any changes.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">7. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us at:
                                <strong>info@pomomato.com</strong>
                            </p>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
}