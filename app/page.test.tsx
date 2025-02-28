import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import Home from './page'; // Adjust the import path as needed
import { POMODORO_TIMER } from '@/lib/constant'; // Adjust the import path as needed
import { formatTime } from '@/lib/utils';

// Mock the Tree component
jest.mock('../components/tree/tree', () => {
    return function MockTree({ currentTreeTime }: { currentTreeTime: number }) {
        return <div data-testid="mock-tree">Tree Component (Time: {currentTreeTime})</div>;
    };
});



describe('Home Component', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.spyOn(global, 'requestAnimationFrame').mockImplementation((cb) => {
            const timeoutId = setTimeout(() => cb(Date.now()), 0);
            return timeoutId as unknown as number; // Cast to number to match the expected type
        });
        jest.spyOn(global, 'cancelAnimationFrame').mockImplementation((id) => {
            clearTimeout(id);
        });
    });
    
    afterAll(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('should render tree height', () => {
        render(<Home></Home>)

        // Check the Tree component is rendered with initial time
        const treeComponent = screen.getByTestId('mock-tree');
        expect(treeComponent).toHaveTextContent(`Tree Component (Time: 0)`);
    })

    it('should render the component with initial timer and progress bar', () => {
        render(<Home />);

        // Check the initial timer display

        const timerDisplay = screen.getByText(formatTime(POMODORO_TIMER * 60));
        expect(timerDisplay).toBeInTheDocument();

        // Check the initial tree height progress bar
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveStyle('width: 0%');
    });

    it('should start the timer when the Start button is clicked', () => {
        render(<Home />);

        // Click the Start button
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        // Check the button text changes to Pause
        expect(screen.getByText('Pause')).toBeInTheDocument();

        // Fast-forward time by 1 second
        act(() => {
            jest.advanceTimersByTime(1000); // Advance time by 1 second
        });

        // Check the timer has decreased by 1 second
        const testTime = POMODORO_TIMER * 60 - 1;
        const timerDisplay = screen.getByText(formatTime(testTime)); // 25:00 - 1 second = 24:59
        expect(timerDisplay).toBeInTheDocument();

        // Check the tree height has updated
        const progressBar = screen.getByRole('progressbar');
        const expectedProgress = ((POMODORO_TIMER * 60 - testTime) / (POMODORO_TIMER * 60)) * 100;

        expect(Number(progressBar.getAttribute('aria-valuenow'))).toBeCloseTo(expectedProgress);
        expect(progressBar).toHaveStyle(`width: ${expectedProgress}%`);
    });

    it('should pause the timer when the Pause button is clicked', () => {
        render(<Home />);

        // Start the timer
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        // Fast-forward time by 1 second
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        // Pause the timer
        const pauseButton = screen.getByText('Pause');
        fireEvent.click(pauseButton);

        // Check the button text changes to Start
        expect(screen.getByText('Start')).toBeInTheDocument();

        // Fast-forward time by another second
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        // Check the timer has not decreased further
        const timerDisplay = screen.getByText(formatTime((POMODORO_TIMER * 60 - 1)));
        expect(timerDisplay).toBeInTheDocument();
    });

    it('should reset the timer when the Reset button is clicked', () => {
        render(<Home />);

        // Start the timer
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        // Fast-forward time by 5 seconds
        act(() => {
            jest.advanceTimersByTime(5000);
        });

        // Reset the timer
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);

        // Check the timer is reset to the initial value
        const timerDisplay = screen.getByText(formatTime(POMODORO_TIMER * 60));
        expect(timerDisplay).toBeInTheDocument();

        // Check the tree height is reset
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveStyle('width: 0%');
    });

    it('should display "00:00" when the timer expires', () => {
        render(<Home />);

        // Start the timer
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        // Fast-forward time to the end of the timer
        act(() => {
            jest.advanceTimersByTime(POMODORO_TIMER * 60 * 1000);
        });

        // Check the timer displays "00:00"
        const timerDisplay = screen.getByText('00:00');
        expect(timerDisplay).toBeInTheDocument();

        // Check the Reset button is full width
        const resetButton = screen.getByText('Reset');
        expect(resetButton).toHaveClass('w-full');
    });

    it('should format time correctly', () => {
        render(<Home />);

        // Test formatTime function directly
        expect(formatTime(125)).toBe('02:05'); // 2 minutes and 5 seconds
        expect(formatTime(0)).toBe('00:00'); // 0 seconds
        expect(formatTime(59)).toBe('00:59'); // 59 seconds
    });
});