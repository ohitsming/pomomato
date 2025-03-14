import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Focus Sessions | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
    description: 'Learn how Pomomato’s Focus Sessions help you maintain productivity with timed intervals, avoiding burnout and improving focus.',
    keywords: ['Focus Sessions', 'Pomodoro technique', 'productivity', 'study tool', 'Pomomato'],
    openGraph: {
        title: 'Focus Sessions | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
        description: 'Learn how Pomomato’s Focus Sessions help you maintain productivity with timed intervals, avoiding burnout and improving focus.',
        type: 'website',
        url: 'https://pomomato.com/blog/focus-sessions',
        images: [
            {
                url: '/metadata/icon.ico',
                width: 1200,
                height: 630,
                alt: 'Focus Sessions | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Focus Sessions | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
        description: 'Learn how Pomomato’s Focus Sessions help you maintain productivity with timed intervals, avoiding burnout and improving focus.',
        images: ['/metadata/icon.ico'],
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Focus Sessions | Pomomato AI - Study Smarter with AI-Powered Focus Sessions",
    "description": "Learn how Pomomato’s Focus Sessions help you maintain productivity with timed intervals, avoiding burnout and improving focus.",
    "url": "https://pomomato.com/blog/focus-sessions",
};

export default function FocusSessionsPage() {
    return (
        <>
            <Script
                id="focus-sessions-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <section className="h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-36">
                    <header className="mx-auto max-w-2xl lg:text-center">
                        <h1 className="text-base/7 font-semibold text-green-600">Focus Sessions</h1>
                        <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-green-900 dark:text-green-100 sm:text-5xl lg:text-balance">
                            Boost Productivity with Timed Focus Sessions
                        </h2>
                        <p className="mt-6 text-lg/8 text-green-700 dark:text-green-300">
                            Pomomato’s Focus Sessions use the proven Pomodoro Technique to help you stay focused and productive. Work in 25-minute intervals, take short breaks, and avoid burnout.
                        </p>
                    </header>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                            <article className="flex flex-col">
                                <h3 className="text-2xl font-semibold text-green-900 dark:text-green-100">How It Works</h3>
                                <p className="mt-4 text-green-700 dark:text-green-300">
                                    Set a timer for 25 minutes and focus on a single task. When the timer ends, take a 5-minute break. After four sessions, take a longer break to recharge.
                                </p>
                            </article>
                            <article className="flex flex-col">
                                <h3 className="text-2xl font-semibold text-green-900 dark:text-green-100">Benefits</h3>
                                <ul className="mt-4 list-disc list-inside text-green-700 dark:text-green-300">
                                    <li>Improves focus and concentration.</li>
                                    <li>Prevents burnout with regular breaks.</li>
                                    <li>Helps you track your progress over time.</li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}