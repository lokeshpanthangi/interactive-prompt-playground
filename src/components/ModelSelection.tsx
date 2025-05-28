
import React from 'react';
import { Zap, Brain } from 'lucide-react';

interface ModelSelectionProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

export const ModelSelection = ({ selectedModel, onModelSelect }: ModelSelectionProps) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="text-xl font-medium text-gray-900 mb-4">Choose your AI model:</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 hover:scale-[1.02] hover:shadow-lg ${
            selectedModel === 'gpt-3.5-turbo'
              ? 'border-orange-500 bg-orange-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-orange-200'
          }`}
          onClick={() => onModelSelect('gpt-3.5-turbo')}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">GPT-3.5 Turbo</h4>
              <p className="text-sm text-gray-600">Fast & efficient</p>
            </div>
          </div>
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
              Cost-effective
            </span>
          </div>
        </div>

        <div
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 hover:scale-[1.02] hover:shadow-lg ${
            selectedModel === 'gpt-4'
              ? 'border-orange-500 bg-orange-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-orange-200'
          }`}
          onClick={() => onModelSelect('gpt-4')}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">GPT-4</h4>
              <p className="text-sm text-gray-600">Advanced reasoning</p>
            </div>
          </div>
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              Most capable
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
