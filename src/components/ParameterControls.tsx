
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
  const SliderControl = ({ 
    label, 
    value, 
    onChange, 
    min, 
    max, 
    step, 
    tooltip,
    leftLabel,
    rightLabel 
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    tooltip: string;
    leftLabel?: string;
    rightLabel?: string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10 max-w-xs">
              {tooltip}
            </div>
          </div>
        </div>
        <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-lg transition-all duration-150">
          {value}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer smooth-slider"
          style={{
            background: `linear-gradient(to right, #f97316 0%, #f97316 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
          }}
        />
        {leftLabel && rightLabel && (
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{leftLabel}</span>
            <span>{rightLabel}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="text-xl font-medium text-gray-900 mb-6">Fine-tune your AI's behavior:</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SliderControl
          label="Temperature"
          value={temperature}
          onChange={onTemperatureChange}
          min={0}
          max={2}
          step={0.01}
          tooltip="Controls creativity vs consistency. Lower values are more focused and deterministic."
          leftLabel="Conservative"
          rightLabel="Creative"
        />
        
        <SliderControl
          label="Max Tokens"
          value={maxTokens}
          onChange={onMaxTokensChange}
          min={50}
          max={500}
          step={1}
          tooltip="Maximum number of tokens in the response. ~4 characters per token."
        />
        
        <SliderControl
          label="Presence Penalty"
          value={presencePenalty}
          onChange={onPresencePenaltyChange}
          min={-2}
          max={2}
          step={0.01}
          tooltip="Reduces likelihood of repeating topics. Positive values encourage new topics."
        />
        
        <SliderControl
          label="Frequency Penalty"
          value={frequencyPenalty}
          onChange={onFrequencyPenaltyChange}
          min={-2}
          max={2}
          step={0.01}
          tooltip="Reduces likelihood of repeating words. Positive values encourage varied vocabulary."
        />
      </div>
    </div>
  );
};
