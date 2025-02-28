'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavLink {
    label: string;
    href: string;
}

interface OverlayNavbarProps {
    links: NavLink[];
    logo?: string;
    logoAlt?: string;
}

const OverlayNavbar = ({
    links,
    logo = '/logo.svg',
    logoAlt = 'Site Logo'
}: OverlayNavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isHomePage, setIsHomePage] = useState(true);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Toggle menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);

        // Prevent scrolling when menu is open
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">

                {/* Empty div to maintain flex layout on home page */}
                <div className="w-32"></div>

                {/* Hamburger Button */}
                <button
                    onClick={toggleMenu}
                    className="z-10 focus:outline-none"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <div className="relative w-6 h-5">
                        <span className={`absolute h-0.5 w-6 bg-black transform transition-all duration-300 ${isOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
                        <span className={`absolute h-0.5 w-6 bg-black top-2 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`absolute h-0.5 w-6 bg-black transform transition-all duration-300 ${isOpen ? '-rotate-45 top-2' : 'top-4'}`}></span>
                    </div>
                </button>

                {/* Overlay Menu */}
                {isOpen && (<>
                    <div className={`fixed inset-0 bg-white transition-all duration-500 flex flex-col justify-center items-center ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>

                        <nav className="text-center">
                            <ul className="space-y-8">
                                {links.map((link, index) => (
                                    <li key={index} className="text-2xl font-medium">
                                        <Link
                                            href={link.href}
                                            onClick={toggleMenu}
                                            className="relative hover:text-blue-600 transition-colors duration-300 py-2 px-4"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </>)}
            </div>
        </header>
    );
};

export default OverlayNavbar;