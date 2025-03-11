import { BookOpenIcon, LightBulbIcon, DocumentTextIcon } from '@heroicons/react/20/solid';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'About | Pomomato AI - Study Smarter with AI-Powered Focus Sessions',
    description: 'Pomomato combines timed focus sessions, integrated note-taking, and AI-powered summaries to help you study effectively and achieve your goals.',
    keywords: ['Pomomato', 'study tool', 'focus sessions', 'AI note-taking', 'productivity'],
    openGraph: {
        title: 'About Pomomato - Study Smarter with AI-Powered Focus Sessions',
        description: 'Pomomato combines timed focus sessions, integrated note-taking, and AI-powered summaries to help you study effectively and achieve your goals.',
        type: 'website',
        url: 'https://pomomato.com/about',
        images: [
            {
                url: '/metadata/logo.png',
                width: 1200,
                height: 630,
                alt: 'Pomomato - Study Smarter',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Pomomato - Study Smarter with AI-Powered Focus Sessions',
        description: 'Pomomato combines timed focus sessions, integrated note-taking, and AI-powered summaries to help you study effectively and achieve your goals.',
        images: '/metadata/logo.png'
    },
};

const features = [
    {
        name: 'Focus Sessions',
        description:
            'Break your study or work into focused intervals, traditionally 25 minutes long, to maintain high productivity and avoid burnout.',
        href: '/blog/focus-session',
        icon: BookOpenIcon,
    },
    {
        name: 'Integrated Note-Taking',
        description:
            'Jot down notes during your Pomodoro sessions to capture ideas and key points during the pomodoro session. ',
        href: '/blog/notes',
        icon: DocumentTextIcon,
    },
    {
        name: 'Session Summaries',
        description:
            'Pomomato AI will summarize your notes and accomplishments. Reflect on what you’ve learned and plan your next steps for maximum efficiency.',
        href: '/blog/session-summaries',
        icon: LightBulbIcon,
    },
];

const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": features.map((feature) => ({
        "@type": "Question",
        "name": feature.name,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": feature.description,
        },
    })),
};

export default function AboutPage() {
    return (
        <>
            <Script
                id="faq-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
            <section className="bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-24 sm:py-32 h-[100vh]">
            <div className="mx-auto max-w-7xl px-6 lg:px-36">
                <header className="mx-auto max-w-2xl lg:text-center">
                    <h1 className="text-base/7 font-semibold text-green-600">What is Pomomato?</h1>
                    <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-green-900 dark:text-green-100 sm:text-5xl lg:text-balance">
                        Pomomato aims to help you study better
                    </h2>
                    <p className="mt-6 text-lg/8 text-green-700 dark:text-green-300">
                        Pomomato combines the power of timed focus sessions with integrated note-taking and session summaries using AI to help you study effectively, retain information, and achieve your goals.
                    </p>
                </header>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <article key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-green-900 dark:text-green-100">
                                    <feature.icon aria-label={feature.name} className="size-5 flex-none text-green-600" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-green-700 dark:text-green-300">
                                    <p className="flex-auto">{feature.description}</p>
                                    <p className="mt-6">
                                        <a href={feature.href} className="text-sm/6 font-semibold text-green-600 dark:text-green-400">
                                            Learn about <span aria-label={feature.name}>{feature.name}</span>
                                        </a>
                                    </p>
                                </dd>
                            </article>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
        </>
        
    );
}