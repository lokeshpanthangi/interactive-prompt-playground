
import React from 'react';
import { HelpCircle } from 'lucide-react';

interface ParameterControlsProps {
  temperature: number;
  maxTokens: number;
  presencePenalty: number;
  frequencyPenalty: number;
  onTemperatureChange: (value: number) => void;
  onMaxTokensChange: (value: number) => void;
  onPresencePenaltyChange: (value: number) => void;
  onFrequencyPenaltyChange: (value: number) => void;
}

export const ParameterControls = ({
  temperature,
  maxTokens,
  presencePenalty,
  frequencyPenalty,
  onTemperatureChange,
  onMaxTokensChange,
  onPresencePenaltyChange,
  onFrequencyPenaltyChange
}: ParameterControlsProps) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="text-xl font-medium text-gray-900 mb-6">Fine-tune your AI's behavior:</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Temperature</label>
            <div className="group relative">
              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                Controls randomness: 0 is focused, 2 is creative
              </div>
            </div>
            <span className="text-sm font-medium text-orange-600">{temperature}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
            className="w-full smooth-slider bg-gradient-to-r from-blue-200 to-orange-200"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Conservative</span>
            <span>Creative</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Max Tokens</label>
            <div className="group relative">
              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                Maximum length of the response
              </div>
            </div>
            <span className="text-sm font-medium text-orange-600">{maxTokens}</span>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={maxTokens}
            onChange={(e) => onMaxTokensChange(parseInt(e.target.value))}
            className="w-full smooth-slider bg-gradient-to-r from-green-200 to-purple-200"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Presence Penalty</label>
            <div className="group relative">
              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                Reduces repetition of topics
              </div>
            </div>
            <span className="text-sm font-medium text-orange-600">{presencePenalty}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={presencePenalty}
            onChange={(e) => onPresencePenaltyChange(parseFloat(e.target.value))}
            className="w-full smooth-slider bg-gradient-to-r from-red-200 to-blue-200"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Repetitive</span>
            <span>Diverse</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Frequency Penalty</label>
            <div className="group relative">
              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                Reduces repetition of specific words
              </div>
            </div>
            <span className="text-sm font-medium text-orange-600">{frequencyPenalty}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={frequencyPenalty}
            onChange={(e) => onFrequencyPenaltyChange(parseFloat(e.target.value))}
            className="w-full smooth-slider bg-gradient-to-r from-yellow-200 to-indigo-200"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Repetitive</span>
            <span>Varied</span>
          </div>
        </div>
      </div>
    </div>
  );
};
