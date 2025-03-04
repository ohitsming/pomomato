import OverlayNavbar from '@/components/navbar/navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URI || 'https://pomomato.com'),
    title: 'Pomomato AI - Pomodoro Technique With Focus Sessions And AI To Boost Productivity.',
    icons: {
        icon: "/metadata/icon.ico"
    },
    description: `Pomomato AI combines the Pomodoro Technique with smart focus 
        sessions and AI powered study tools to boost productivity. Stay focused, beat procrastination, and achieve more 
        with personalized insights and task prioritization.`,
    keywords: ['Pomomato AI', 'Pomodoro Technique', 'productivity', 'focus sessions', 'AI-powered'],
    openGraph: {
        title: 'Pomomato AI - Pomodoro Technique With Focus Session And AI to Boost Productivity',
        description:
            `Pomomato AI combines the Pomodoro Technique with smart focus 
            sessions and AI powered study tools to boost productivity. Stay focused, beat procrastination, and achieve more 
            with personalized insights and task prioritization.`,
        images: '/metadata/logo.png',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pomomato AI - Pomodoro Technique With Focus Session And AI to Boost Productivity',
        description:
            `Pomomato AI combines the Pomodoro Technique with smart focus 
            sessions and AI powered study tools to boost productivity. Stay focused, beat procrastination, and achieve more 
            with personalized insights and task prioritization.`,
        images:  '/metadata/logo.png',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    }
};

// Define your navigation links
const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' }
];

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Providers>
                <body className={inter.className}>
                    <OverlayNavbar
                        links={navLinks}
                    ></OverlayNavbar>

                    <main>
                        <div className="sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 ">
                            {children}
                        </div>
                    </main>
                </body>
            </Providers>

            <GoogleAnalytics gaId="G-W26QHF4ZHG"></GoogleAnalytics>
        </html>

    );
}
