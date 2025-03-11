import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Privacy Policy | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
    description: 'Learn how Pomomato collects, uses, and protects your personal information. Read our Privacy Policy to understand your rights and how we handle your data.',
    keywords: ['Privacy Policy', 'data protection', 'Pomomato', 'GDPR', 'CCPA'],
    openGraph: {
        title: 'Privacy Policy | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
        description: 'Learn how Pomomato collects, uses, and protects your personal information. Read our Privacy Policy to understand your rights and how we handle your data.',
        type: 'website',
        url: 'https://pomomato.com/privacy',
        images: [
            {
                url: '/metadata/icon.ico',
                width: 1200,
                height: 630,
                alt: 'Privacy Policy | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
        description: 'Learn how Pomomato collects, uses, and protects your personal information. Read our Privacy Policy to understand your rights and how we handle your data.',
        images: ['/metadata/icon.ico'],
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | Pomomato AI - Study Smarter with AI-Powered Focus Sessions",
    "description": "Learn how Pomomato collects, uses, and protects your personal information. Read our Privacy Policy to understand your rights and how we handle your data.",
    "url": "https://pomomato.com/privacy",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Script
                id="privacy-policy-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <section className="bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-24 sm:py-32">
                <div className="flex justify-center items-center min-h-screen">
                    <div className="container mx-auto p-8 max-w-3xl text-left text-green-900 space-y-8">
                        <h1 className="text-4xl font-bold mb-6 border-b pb-2">Privacy Policy</h1>
                        <p className="text-lg">Last updated: March 10, 2025</p>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">1. Introduction</h2>
                            <p>
                                Welcome to <strong>Workcoholic LLC</strong> (“Company”, “we”, “our”, “us”).
                                We are committed to protecting your privacy and ensuring you have a positive
                                experience while using our website.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
                            <p>We may collect and process the following types of information:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li><strong>Personal identification information:</strong> Name, email, phone number, etc.</li>
                                <li><strong>Usage data:</strong> IP address, browser type, visit duration, etc.</li>
                                <li><strong>Cookies and tracking technologies</strong></li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                            <p>Your data is used for the following purposes:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>To provide and improve our services</li>
                                <li>To personalize user experience</li>
                                <li>For analytics and website optimization</li>
                                <li>To communicate updates and promotions</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">4. Cookies & Tracking</h2>
                            <p>
                                We use cookies and similar tracking technologies to monitor website
                                activity and enhance your browsing experience. You can manage cookie
                                preferences through your browser settings.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">5. Third-Party Services</h2>
                            <p>
                                We may use third-party services for analytics, advertising, or payment
                                processing. These providers have their own privacy policies, which we
                                encourage you to review.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">6. Data Protection & Security</h2>
                            <p>
                                We implement security measures to safeguard your personal data. However,
                                no online transmission is 100% secure, and we cannot guarantee absolute
                                security.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">7. Your Rights</h2>
                            <p>Depending on your location, you have rights over your personal data, including:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>The right to access, update, or delete your data</li>
                                <li>The right to object to data processing</li>
                                <li>The right to data portability</li>
                                <li>The right to withdraw consent</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy periodically. Changes will be posted
                                on this page with a revised date.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">9. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, you can contact us
                                at: <strong>info@pomomato.com</strong>
                            </p>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
}