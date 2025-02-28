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
    { label: 'Home', href: '' },
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
                    {children}
                </main>
            </body>
        </html>

    );
}
