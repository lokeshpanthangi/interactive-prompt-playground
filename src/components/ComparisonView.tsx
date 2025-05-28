
import React from 'react';
import { X, Copy, Check } from 'lucide-react';
import { ChatMessage } from '@/pages/Index';

interface ComparisonViewProps {
  messages: ChatMessage[];
  onRemoveFromComparison: (messageId: string) => void;
  onClose: () => void;
}

export const ComparisonView = ({ messages, onRemoveFromComparison, onClose }: ComparisonViewProps) => {
  const [copiedStates, setCopiedStates] = React.useState<{[key: string]: boolean}>({});

  const handleCopy = async (text: string, messageId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [messageId]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [messageId]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Response Comparison</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {messages.map((message, index) => (
          <div key={message.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:bg-gray-50 transition-all duration-150 group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Response {index + 1}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleCopy(message.response, message.id)}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-150 p-2 hover:bg-gray-100 rounded-lg"
                >
                  {copiedStates[message.id] ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={() => onRemoveFromComparison(message.id)}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-150 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="prose prose-gray max-w-none mb-4">
              <p className="text-gray-800 leading-relaxed">{message.response}</p>
            </div>
            
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Model:</span>
                  <span className="font-medium ml-2">{message.metadata.model}</span>
                </div>
                <div>
                  <span className="text-gray-500">Temperature:</span>
                  <span className="font-medium ml-2">{message.metadata.temperature}</span>
                </div>
                <div>
                  <span className="text-gray-500">Tokens:</span>
                  <span className="font-medium ml-2">{message.metadata.tokens}</span>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium ml-2">{message.metadata.responseTime}</span>
                </div>
              </div>
              
              <div className="text-sm">
                <div className="text-gray-500 mb-1">Prompt:</div>
                <div className="bg-gray-50 p-2 rounded text-gray-700 text-xs">
                  {message.userPrompt}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
