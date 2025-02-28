import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OverlayNavbar from '@/components/navbar/navbar';
import { usePathname } from 'next/navigation';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, priority, style }: any) => {
    return <img src={src} alt={alt} data-testid="next-image" style={style} />;
  },
}));

// Mock the window object for scroll events
Object.defineProperty(window, 'scrollY', {
  configurable: true,
  value: 0,
});

const mockLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

describe('OverlayNavbar Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Reset document body style
    document.body.style.overflow = '';
    
    // Default to home page
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  test('renders hamburger button on all pages', () => {
    render(<OverlayNavbar links={mockLinks} />);
    
    const button = screen.getByRole('button', { name: /open menu/i });
    expect(button).toBeInTheDocument();
  });

  test('does not display logo on home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    
    render(<OverlayNavbar links={mockLinks} logo="/test-logo.svg" logoAlt="Test Logo" />);
    
    const images = screen.queryAllByTestId('next-image');
    // Should only have one image (in the menu, not in the header)
    expect(images.length).toBe(0);
  });

  test('displays logo on non-home pages', () => {
    (usePathname as jest.Mock).mockReturnValue('/about');
    
    render(<OverlayNavbar links={mockLinks} logo="/test-logo.svg" logoAlt="Test Logo" />);
    
    const images = screen.getAllByTestId('next-image');
    expect(images.length).toBe(1);
  });

  test('opens menu when hamburger button is clicked', async () => {
    render(<OverlayNavbar links={mockLinks} />);
    
    // Menu should be closed initially - check that overlay has invisible class
    const initialOverlay = screen.getByRole('navigation').parentElement;
    expect(initialOverlay).toHaveClass('invisible');
    expect(initialOverlay).toHaveClass('opacity-0');
    
    // Click hamburger button
    const button = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(button);
    
    // Menu should now be open
    await waitFor(() => {
      const overlay = screen.getByRole('navigation').parentElement;
      expect(overlay).not.toHaveClass('invisible');
      expect(overlay).toHaveClass('opacity-100');
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
    });
  });

  test('displays logo in menu when opened', async () => {
    render(<OverlayNavbar links={mockLinks} logo="/test-logo.svg" logoAlt="Test Logo" />);
    
    // Click hamburger button
    const button = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(button);
    
    // Logo should be visible in the menu
    await waitFor(() => {
      const images = screen.getAllByTestId('next-image');
      expect(images.length).toBe(1);
    });
  });

  test('prevents body scrolling when menu is open', () => {
    render(<OverlayNavbar links={mockLinks} />);
    
    // Body should scroll normally initially
    expect(document.body.style.overflow).not.toBe('hidden');
    
    // Click hamburger button to open menu
    const button = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(button);
    
    // Body scrolling should be prevented
    expect(document.body.style.overflow).toBe('hidden');
    
    // Click again to close menu
    fireEvent.click(button);
    
    // Body scrolling should be restored
    expect(document.body.style.overflow).toBe('auto');
  });

  test('closes menu when a navigation link is clicked', async () => {
    render(<OverlayNavbar links={mockLinks} />);
    
    // Open the menu
    const button = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(button);
    
    // Verify menu is open
    await waitFor(() => {
      const overlay = screen.getByRole('navigation').parentElement;
      expect(overlay).toHaveClass('opacity-100');
      expect(overlay).not.toHaveClass('invisible');
    });
    
    // Click a navigation link
    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);
    
    // Menu should be closed
    await waitFor(() => {
      const overlay = screen.getByRole('navigation').parentElement;
      expect(overlay).toHaveClass('opacity-0');
      expect(overlay).toHaveClass('invisible');
    });
  });

  test('applies scroll effect styles when scrolled', () => {
    render(<OverlayNavbar links={mockLinks} />);
    
    // Initially header should not have scrolled class
    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('bg-white/90');
    expect(header).not.toHaveClass('shadow-md');
    
    // Simulate scrolling down
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 100,
    });
    
    // Trigger scroll event
    fireEvent.scroll(window);
    
    // Header should now have scrolled classes
    expect(header).toHaveClass('bg-white/90');
    expect(header).toHaveClass('shadow-md');
  });
});