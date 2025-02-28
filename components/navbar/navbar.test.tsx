import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import OverlayNavbar from '@/components/navbar/navbar';

describe('OverlayNavbar', () => {
    const mockLinks = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    // it('renders the navbar with the default logo', () => {
    //     render(<OverlayNavbar links={mockLinks} />);
    //     const logo = screen.getByRole('img', { name: /site logo/i });
    //     expect(logo).toBeInTheDocument();
    //     expect(logo).toHaveAttribute('src', '/logo.svg');
    // });

    // it('renders the navbar with a custom logo', () => {
    //     const customLogo = '/custom-logo.png';
    //     render(<OverlayNavbar links={mockLinks} logo={customLogo} />);
    //     const logo = screen.getByRole('img', { name: /site logo/i });
    //     expect(logo).toBeInTheDocument();
    //     expect(logo).toHaveAttribute('src', customLogo);
    // });

    it('toggles the menu open and closed', () => {
        render(<OverlayNavbar links={mockLinks} />);
        const button = screen.getByLabelText(/open menu/i);
        fireEvent.click(button);
        expect(screen.getByLabelText(/close menu/i)).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
    });

    it('displays the navigation links when the menu is open', () => {
        render(<OverlayNavbar links={mockLinks} />);
        const button = screen.getByLabelText(/open menu/i);
        fireEvent.click(button);
        mockLinks.forEach(link => {
            expect(screen.getByText(link.label)).toBeInTheDocument();
        });
    });

    it('closes the menu when a link is clicked', () => {
        render(<OverlayNavbar links={mockLinks} />);
        const button = screen.getByLabelText(/open menu/i);
        fireEvent.click(button);
        const homeLink = screen.getByText('Home');
        fireEvent.click(homeLink);
        expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
    });

    it('applies scrolled class when the page is scrolled', () => {
        render(<OverlayNavbar links={mockLinks} />);
        const header = screen.getByRole('banner');
        expect(header).not.toHaveClass('bg-white/90 shadow-md backdrop-blur-sm');
        window.scrollY = 100;
        fireEvent.scroll(window);
        expect(header).toHaveClass('bg-white/90 shadow-md backdrop-blur-sm');
    });
});