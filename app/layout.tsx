import OverlayNavbar from '@/components/navbar/navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Pomomato',
    description: 'Pomodoro AI Studying Tool',
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

            <body className={inter.className}>
                <OverlayNavbar
                    links={navLinks}
                    logo="/metadata/logo.png"
                    logoAlt="Pomomato Logo"
                ></OverlayNavbar>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 ">
                        {children}
                    </div>
                </main>
            </body>
        </html>

    );
}
