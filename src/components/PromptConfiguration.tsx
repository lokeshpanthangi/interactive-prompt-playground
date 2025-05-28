
import React from 'react';
import { HelpCircle } from 'lucide-react';

interface PromptConfigurationProps {
  systemPrompt: string;
  userPrompt: string;
  onSystemPromptChange: (value: string) => void;
  onUserPromptChange: (value: string) => void;
}

export const PromptConfiguration = ({
  systemPrompt,
  userPrompt,
  onSystemPromptChange,
  onUserPromptChange
}: PromptConfigurationProps) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="text-xl font-medium text-gray-900 mb-6">Configure your prompts:</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <label className="text-sm font-medium text-gray-700">System Prompt</label>
            <div className="group relative">
              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                Instructions that define the AI's role and behavior
              </div>
            </div>
          </div>
          <textarea
            value={systemPrompt}
            onChange={(e) => onSystemPromptChange(e.target.value)}
            placeholder="You are a helpful assistant that creates engaging product descriptions..."
            className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-150 focus:shadow-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">User Prompt</label>
          <textarea
            value={userPrompt}
            onChange={(e) => onUserPromptChange(e.target.value)}
            placeholder="Create a product description for: iPhone"
            className="w-full h-16 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-150 focus:shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
