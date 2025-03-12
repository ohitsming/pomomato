import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Integrated Note-Taking | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
    description: 'Capture and organize your ideas with Pomomato’s Integrated Note-Taking feature. Use AI-powered summaries to review and condense your notes effortlessly.',
    keywords: ['Integrated Note-Taking', 'AI note-taking', 'study tool', 'Pomomato', 'pomodoro timer'],
    openGraph: {
        title: 'Integrated Note-Taking | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
        description: 'Capture and organize your ideas with Pomomato’s Integrated Note-Taking feature. Use AI-powered summaries to review and condense your notes effortlessly.',
        type: 'website',
        url: 'https://pomomato.com/blog/notes',
        images: [
            {
                url: 'https://pomomato.com/metadata/icon.ico',
                width: 1200,
                height: 630,
                alt: 'Integrated Note-Taking | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Integrated Note-Taking | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
        description: 'Capture and organize your ideas with Pomomato’s Integrated Note-Taking feature. Use AI-powered summaries to review and condense your notes effortlessly.',
        images: ['https://pomomato.com/metadata/icon.ico'],
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Integrated Note-Taking | Pomomato AI - Study Smarter with AI-Powered Focus Sessions",
    "description": "Capture and organize your ideas with Pomomato’s Integrated Note-Taking feature. Use AI-powered summaries to review and condense your notes effortlessly.",
    "url": "https://pomomato.com/blog/notes",
};

export default function IntegratedNoteTakingPage() {
    return (
        <>
            <Script
                id="note-taking-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <section className="h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-36">
                    <header className="mx-auto max-w-2xl lg:text-center">
                        <h1 className="text-base/7 font-semibold text-green-600">Integrated Note-Taking</h1>
                        <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-green-900 dark:text-green-100 sm:text-5xl lg:text-balance">
                            Capture and Organize Your Ideas
                        </h2>
                        <p className="mt-6 text-lg/8 text-green-700 dark:text-green-300">
                            Pomomato’s Integrated Note-Taking feature allows you to jot down notes during your focus sessions. After the timer ends, use AI-powered summaries to review and condense your notes effortlessly.
                        </p>
                    </header>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                            <article className="flex flex-col">
                                <h3 className="text-2xl font-semibold text-green-900 dark:text-green-100">How It Works</h3>
                                <p className="mt-4 text-green-700 dark:text-green-300">
                                    Take notes during your Pomodoro sessions. After the session, Pomomato AI will summarize your notes, making it easier to review and retain information.
                                </p>
                            </article>
                            <article className="flex flex-col">
                                <h3 className="text-2xl font-semibold text-green-900 dark:text-green-100">Benefits</h3>
                                <ul className="mt-4 list-disc list-inside text-green-700 dark:text-green-300">
                                    <li>Capture ideas and key points in real-time.</li>
                                    <li>AI-powered summaries for quick reviews.</li>
                                    <li>Track your progress and learning over time.</li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}