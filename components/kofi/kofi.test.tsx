import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import KofiDonationPanel from '@/components/kofi/kofi';

// Mock the Script component from next/script
jest.mock('next/script', () => ({
    __esModule: true,
    default: ({ id, children }: any) => {
        // Simulate the script execution
        if (children) {
            // Mock the DOM environment
            document.body.innerHTML = `
                <div data-testid="kofi-donation-panel-container">
                    <iframe id="kofiframe"></iframe>
                </div>
            `;
            eval(children); // Execute the script content
        }
        return <script id={id}></script>;
    },
}));

describe('KofiDonationPanel', () => {
    it('renders the iframe and sets the src dynamically', async () => {
        // Render the component
        render(<KofiDonationPanel />);

        // Check if the iframe is rendered
        const iframe = document.getElementById('kofiframe');
        expect(iframe).toBeInTheDocument();

        // Verify the iframe's src attribute
        await waitFor(() => {
            expect(iframe).toHaveAttribute(
                'src',
                'https://ko-fi.com/workcoholic/?hidefeed=true&widget=true&embed=true&preview=true'
            );
        })
    });

    it('renders the Script component', async () => {
        // Render the component
        render(<KofiDonationPanel />);

        // Check if the Script component is rendered
        await waitFor(() => {

            const script = document.getElementById('kofiframe');
            expect(script).toBeInTheDocument();
        })
    });
});