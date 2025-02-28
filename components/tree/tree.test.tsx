import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Tree from './tree'; // Adjust the import path as needed
import { POMODORO_TIMER } from '@/lib/constant'; // Adjust the import path as needed

// Mock the SceneJS library
jest.mock('scenejs', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({
            newItem: jest.fn(() => ({
                setElement: jest.fn(),
                set: jest.fn(),
            })),
            setTime: jest.fn(),
            clear: jest.fn(),
        })),
    };
});

describe('Tree Component', () => {
    it('should render the component without flowers when currentTreeTime is less than POMODORO_TIMER', () => {
        render(<Tree currentTreeTime={0} />);

        // Check that the flowers are not rendered
        const flowers = screen.queryAllByTestId('flower');
        expect(flowers.length).toBe(0);

        // Check that the tree is not rendered
        const tree = screen.queryByTestId('tree');
        expect(tree).not.toBeInTheDocument();
    });

    it('should render the flowers when currentTreeTime is greater than or equal to POMODORO_TIMER', () => {
        render(<Tree currentTreeTime={POMODORO_TIMER * 60} />);

        // Check that the flowers are rendered
        const flowers = screen.getAllByTestId('flower');
        expect(flowers.length).toBeGreaterThan(0);

        // Check that the tree is rendered
        const tree = screen.getByTestId('tree');
        expect(tree).toBeInTheDocument();
    });

    it('should render the tree branches when currentTreeTime is greater than 3', () => {
        render(<Tree currentTreeTime={4} />);

        // Check that the tree branches are rendered
        const branches = screen.getAllByTestId('branch');
        expect(branches.length).toBeGreaterThan(0);
    });

    it('should initialize SceneJS with the correct configuration', () => {
        render(<Tree currentTreeTime={0} />);

        // Verify that SceneJS was initialized
        const Scene = require('scenejs').default;
        expect(Scene).toHaveBeenCalled();

        // Verify that setTime was called with the correct value
        const sceneInstance = Scene.mock.results[0].value;
        expect(sceneInstance.setTime).toHaveBeenCalledWith(0);
    });

    it('should clean up SceneJS when the component unmounts', () => {
        const { unmount } = render(<Tree currentTreeTime={0} />);

        // Unmount the component
        unmount();

        // Verify that clear was called
        const Scene = require('scenejs').default;
        const sceneInstance = Scene.mock.results[0].value;
        expect(sceneInstance.clear).toHaveBeenCalled();
    });
});