'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Timer, Trees as Tree } from 'lucide-react';

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
          setTreeHeight((25 * 60 - newTime) / (25 * 60) * 100);
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

  // Helper function to get growth stage styles
  const getGrowthStage = () => {
    if (treeHeight < 20) { // Seed stage
      return {
        seed: {
          opacity: 1,
          scale: 1
        },
        sprout: {
          opacity: 0,
          scale: 0
        },
        leaves: {
          opacity: 0,
          scale: 0
        }
      };
    } else if (treeHeight < 50) { // Sprout stage
      return {
        seed: {
          opacity: 0,
          scale: 0
        },
        sprout: {
          opacity: 1,
          scale: (treeHeight - 20) / 30
        },
        leaves: {
          opacity: 0,
          scale: 0
        }
      };
    } else { // Tree stage
      return {
        seed: {
          opacity: 0,
          scale: 0
        },
        sprout: {
          opacity: 1,
          scale: 1
        },
        leaves: {
          opacity: (treeHeight - 50) / 50,
          scale: (treeHeight - 50) / 50
        }
      };
    }
  };

  const stage = getGrowthStage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-100">Pomodoro Tree</h1>
          <p className="text-green-600 dark:text-green-300">Focus and grow your tree</p>
        </div>

        <div className="relative flex justify-center py-8">
          <div className="w-32 h-64 relative">
            {/* Soil */}
            <div 
              className="absolute bottom-0 w-full h-4 rounded-t-lg bg-[#3D2817] dark:bg-[#2A1C10]"
            />
            
            {/* Seed */}
            <div 
              className="absolute bottom-4 left-1/2 w-4 h-4 transform -translate-x-1/2 transition-all duration-300"
              style={{ 
                opacity: stage.seed.opacity,
                transform: `translate(-50%, 0) scale(${stage.seed.scale})`,
                backgroundColor: '#5C3A21',
                borderRadius: '40% 40% 60% 60%'
              }}
            />

            {/* Sprout Stem */}
            <div 
              className="absolute bottom-4 w-2 bg-[#558B2F] dark:bg-[#33691E] left-1/2 transform -translate-x-1/2 transition-all duration-300 rounded-full"
              style={{ 
                height: `${Math.max(5, treeHeight * 0.6)}%`,
                opacity: stage.sprout.opacity,
                transform: `scaleY(${stage.sprout.scale})`
              }}
            />

            {/* Initial Leaves */}
            <div 
              className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 transition-all duration-700"
              style={{ 
                width: '120px',
                height: '120px',
                opacity: stage.leaves.opacity,
                transform: `translate(-50%, 0) scale(${stage.leaves.scale})`,
              }}
            >
              {/* Multiple leaf layers for fuller appearance */}
              <div className="absolute inset-0 bg-[#2E7D32] dark:bg-[#1B5E20] rounded-full blur-sm transform rotate-45" />
              <div className="absolute inset-2 bg-[#388E3C] dark:bg-[#2E7D32] rounded-full blur-sm transform -rotate-12" />
              <div className="absolute inset-4 bg-[#43A047] dark:bg-[#388E3C] rounded-full blur-sm transform rotate-24" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-green-700 dark:text-green-200">
              {formatTime(timeLeft)}
            </div>
            <Progress value={treeHeight} className="mt-4" />
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggleTimer}
              className="w-32"
              variant={isActive ? "destructive" : "default"}
            >
              {isActive ? 'Pause' : 'Start'}
              <Timer className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={resetTimer}
              variant="outline"
              className="w-32"
            >
              Reset
              <Tree className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}