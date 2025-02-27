'use client';

import { useEffect, useState } from 'react';
import Tree from '../components/ui/tree'
import '../components/css/tree.css';
import { POMODORO_TIMER } from '@/lib/constant';

export default function Home() {
    const time = POMODORO_TIMER;
    const [timeLeft, setTimeLeft] = useState(time * 60); // 25 minutes in seconds
    const [timeExpired, setTimeExpired] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [treeHeight, setTreeHeight] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
    
        const tick = () => {
            if (isActive && timeLeft > 0) {
                setTimeLeft((prevTime) => {
                    const newTime = prevTime - 1;
                    // Calculate tree growth (0 to 100%)
                    setTreeHeight(((time * 60 - newTime) / (time * 60)) * 100);
                    return newTime;
                });
    
                // Schedule the next tick
                timeout = setTimeout(tick, 1000);
            } else if (timeLeft === 0) {
                console.log(timeLeft)
                setIsActive(false);
                setTimeExpired(true);
            }
        };
    
        if (isActive && timeLeft > 0) {
            // Start the first tick
            timeout = setTimeout(tick, 1000);
        }

    
        return () => clearTimeout(timeout);
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeExpired(false);
        setTimeLeft(time * 60);
        setTreeHeight(0);
    };

    const formatTime = (seconds: number) => {
        if(seconds > 0) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60 | 0;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } 
        return '00:00'
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 space-y-10">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-green-800 dark:text-green-100">Pomomato Tree</h1>
                    <p className="text-green-600 dark:text-green-300">Focus and grow your tree</p>
                </div>

                <div className="relative flex justify-center py-8 h-[45vh]">
                    <Tree currentTreeTime={(time * 60) - (timeLeft)}></Tree>
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
                        {!timeExpired && (<>
                            <button
                                onClick={toggleTimer}
                                className="w-32 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                {isActive ? 'Pause' : 'Start'}
                            </button>
                        </>)}
                        <button
                            onClick={resetTimer}
                            className={(timeExpired ? "w-full" : "w-32") +  " px-4 py-2 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}