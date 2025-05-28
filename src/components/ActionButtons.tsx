
import React from 'react';
import { Play, Grid3X3 } from 'lucide-react';

interface ActionButtonsProps {
  onGenerate: () => void;
  onBatchTest: () => void;
  isLoading: boolean;
}

export const ActionButtons = ({ onGenerate, onBatchTest, isLoading }: ActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-150 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating...</span>
          </div>
        ) : (
          <>
            <Play className="w-4 h-4" />
            <span>Generate Response</span>
          </>
        )}
      </button>
      
      <button
        onClick={onBatchTest}
        disabled={isLoading}
        className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-150 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
      >
        <Grid3X3 className="w-4 h-4" />
        <span>Run Batch Test</span>
      </button>
    </div>
  );
};
