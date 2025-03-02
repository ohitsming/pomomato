'use client';

import { useEffect, useRef, useState } from 'react';
import Tree from '../components/tree/tree'
import { formatTime } from '@/lib/utils';
import { POMODORO_TIMER } from '@/lib/constant';


export default function Home() {
    const time: number = POMODORO_TIMER;
    const [timeLeft, setTimeLeft] = useState(time * 60); // 25 minutes in seconds
    const [timeExpired, setTimeExpired] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [treeHeight, setTreeHeight] = useState(0);
    const startTimeRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const updateTimer = () => {
        if (isActive) {
            const now = Date.now();
            const elapsedTime = Math.floor((now - (startTimeRef.current || now)) / 1000);
            const newTimeLeft = time * 60 - elapsedTime;

            if (newTimeLeft <= 0) {
                setTimeLeft(0);
                setIsActive(false);
                setTimeExpired(true);
                setTreeHeight(100);
            } else {
                setTimeLeft(newTimeLeft);
                setTreeHeight((elapsedTime / (time * 60)) * 100);
            }

            // Request the next frame
            animationFrameRef.current = requestAnimationFrame(updateTimer);
            document.title = formatTime(timeLeft).toString() + " - Pomomato";
        }
        document.title = "Pomomato"
    };

    useEffect(() => {
        if (isActive) {
            startTimeRef.current = Date.now() - (time * 60 - timeLeft) * 1000;
            animationFrameRef.current = requestAnimationFrame(updateTimer);
        } else {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isActive]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeExpired(false);
        setTimeLeft(time * 60);
        setTreeHeight(0);
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 flex items-center justify-center p-4">
                <div className="w-full max-w-md p-6 space-y-10">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-green-800 dark:text-green-100">Pomomato Tree</h1>
                        <p className="text-green-600 dark:text-green-300">Focus and grow your tree</p>
                    </div>

                    <div className="relative flex justify-center py-8 h-[40vh]">
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
                                    role="progressbar"
                                    aria-valuenow={treeHeight}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
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
        </>
    );
}