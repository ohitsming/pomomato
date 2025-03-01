import { BookOpenIcon, LightBulbIcon, DocumentTextIcon } from '@heroicons/react/20/solid';

const features = [
    {
        name: 'Focus Sessions',
        description:
            'Break your study or work into focused intervals, traditionally 25 minutes long, to maintain high productivity and avoid burnout.',
        href: '#',
        icon: BookOpenIcon,
    },
    {
        name: 'Integrated Note-Taking',
        description:
            'Jot down notes during your Pomodoro sessions to capture ideas, key points, or tasks. After the timer ends, review and summarize your notes to reinforce learning and track progress.',
        href: '#',
        icon: DocumentTextIcon,
    },
    {
        name: 'Session Summaries',
        description:
            'At the end of each Pomodoro session, Pomomato AI will summarize your notes and accomplishments. Reflect on what you’ve learned and plan your next steps for maximum efficiency.',
        href: '#',
        icon: LightBulbIcon,
    },
];

export default function AboutPage() {
    return (
        <div className="bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-24 sm:py-32 h-[100vh]">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base/7 font-semibold text-green-600">What is Pomomato?</h2>
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-green-900 dark:text-green-100 sm:text-5xl lg:text-balance">
                        Pomomato aims to help you study better
                    </p>
                    <p className="mt-6 text-lg/8 text-green-700 dark:text-green-300">
                        Pomomato combines the power of timed focus sessions with integrated note-taking and session summaries using AI to help you study effectively, retain information, and achieve your goals.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-green-900 dark:text-green-100">
                                    <feature.icon aria-hidden="true" className="size-5 flex-none text-green-600" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-green-700 dark:text-green-300">
                                    <p className="flex-auto">{feature.description}</p>
                                    <p className="mt-6">
                                        <a href={feature.href} className="text-sm/6 font-semibold text-green-600 dark:text-green-400">
                                            Learn more <span aria-hidden="true">→</span>
                                        </a>
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}