'use client';

import { useEffect, useState } from 'react';

interface AnimatedTreeProps {
  treeHeight: number;
}

const AnimatedTree: React.FC<AnimatedTreeProps> = ({ treeHeight }) => {
  const [stage, setStage] = useState<'seed' | 'sprout' | 'tree'>('seed');

  useEffect(() => {
    if (treeHeight < 20) {
      setStage('seed');
    } else if (treeHeight < 50) {
      setStage('sprout');
    } else {
      setStage('tree');
    }
  }, [treeHeight]);

  return (
    <div className="relative flex justify-center items-center h-64 w-32">
      {/* Soil */}
      <div className="absolute bottom-0 w-full h-4 rounded-t-lg bg-[#3D2817] dark:bg-[#2A1C10]" />

      {/* Seed */}
      {stage === 'seed' && (
        <div
          className="absolute bottom-4 left-1/2 w-4 h-4 transform -translate-x-1/2 bg-[#5C3A21] rounded-full animate-pulse"
          style={{ borderRadius: '40% 40% 60% 60%' }}
        />
      )}

      {/* Sprout */}
      {stage === 'sprout' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div
            className="w-2 h-16 bg-[#558B2F] dark:bg-[#33691E] rounded-full animate-grow"
            style={{ animationDuration: '2s' }}
          />
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#2E7D32] dark:bg-[#1B5E20] rounded-full animate-pulse"
          />
        </div>
      )}

      {/* Tree */}
      {stage === 'tree' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div
            className="w-2 h-32 bg-[#558B2F] dark:bg-[#33691E] rounded-full animate-grow"
            style={{ animationDuration: '2s' }}
          />
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#2E7D32] dark:bg-[#1B5E20] rounded-full animate-pulse"
          />
          <div
            className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#388E3C] dark:bg-[#2E7D32] rounded-full animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
          <div
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#43A047] dark:bg-[#388E3C] rounded-full animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>
      )}
    </div>
  );
};

export default AnimatedTree;