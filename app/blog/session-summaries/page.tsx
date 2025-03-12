import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Session Summaries | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
    description: 'Reflect on your progress with Pomomato’s Session Summaries. AI-powered summaries help you review your notes and plan your next steps efficiently.',
    keywords: ['Session Summaries', 'AI summaries', 'study tool', 'Pomomato', 'pomodoro timer'],
    openGraph: {
        title: 'Session Summaries | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
        description: 'Reflect on your progress with Pomomato’s Session Summaries. AI-powered summaries help you review your notes and plan your next steps efficiently.',
        type: 'website',
        url: 'https://pomomato.com/blog/session-summaries',
        images: [
            {
                url: '/metadata/icon.ico',
                width: 1200,
                height: 630,
                alt: 'Session Summaries - Pomomato',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Session Summaries | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
        description: 'Reflect on your progress with Pomomato’s Session Summaries. AI-powered summaries help you review your notes and plan your next steps efficiently.',
        images: ['/metadata/icon.ico'],
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Session Summaries | Pomomato AI - Study Smarter with AI-Powered Focus Sessions",
    "description": "Reflect on your progress with Pomomato’s Session Summaries. AI-powered summaries help you review your notes and plan your next steps efficiently.",
    "url": "https://pomomato.com/blog/session-summaries",
};

export default function SessionSummariesPage() {
    return (
        <>
            <Script
                id="session-summaries-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <section className="h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-36">
                    <header className="mx-auto max-w-2xl lg:text-center">
                        <h1 className="text-base/7 font-semibold text-green-600">Session Summaries</h1>
                        <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-green-900 dark:text-green-100 sm:text-5xl lg:text-balance">
                            Reflect and Plan with AI-Powered Summaries
                        </h2>
                        <p className="mt-6 text-lg/8 text-green-700 dark:text-green-300">
                            At the end of each Pomodoro session, Pomomato AI summarizes your notes and accomplishments. Reflect on what you’ve learned and plan your next steps for maximum efficiency.
                        </p>
                    </header>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                            <article className="flex flex-col">
                                <h3 className="text-2xl font-semibold text-green-900 dark:text-green-100">How It Works</h3>
                                <p className="mt-4 text-green-700 dark:text-green-300">
                                    After each session, Pomomato AI analyzes your notes and generates a concise summary. Use these summaries to track your progress and plan future tasks.
                                </p>
                            </article>
                            <article className="flex flex-col">
                                <h3 className="text-2xl font-semibold text-green-900 dark:text-green-100">Benefits</h3>
                                <ul className="mt-4 list-disc list-inside text-green-700 dark:text-green-300">
                                    <li>Quickly review key points from your sessions.</li>
                                    <li>Track your learning and accomplishments.</li>
                                    <li>Plan your next steps with clarity.</li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}