'use client';

import { useEffect, useState } from 'react';
import Tree from '../components/ui/tree'
import '../components/css/tree.css';

export default function Home() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const [treeHeight, setTreeHeight] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    const newTime = prevTime - 1;
                    // Calculate tree growth (0 to 100%)
                    setTreeHeight(((25 * 60 - newTime) / (25 * 60)) * 100);
                    return newTime;
                });
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(25 * 60);
        setTreeHeight(0);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 space-y-10">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-green-800 dark:text-green-100">Flowmato Tree</h1>
                    <p className="text-green-600 dark:text-green-300">Focus and grow your tree</p>
                </div>

                <div className="relative flex justify-center py-8 h-[45vh]">
                    <Tree></Tree>
                </div>

                <div className="space-y-6">
                    <div className="text-center">
                        <div className="text-4xl font-mono font-bold text-green-700 dark:text-green-200">
                            {formatTime(timeLeft)}
                        </div>
                        <div className="mt-4 bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-green-600 h-2.5 rounded-full"
                                style={{ width: `${treeHeight}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={toggleTimer}
                            className="w-32 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            {isActive ? 'Pause' : 'Start'}
                        </button>
                        <button
                            onClick={resetTimer}
                            className="w-32 px-4 py-2 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}