
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ResponseDisplayProps {
  response: string;
  metadata: {
    model: string;
    temperature: number;
    tokens: number;
    responseTime: string;
  };
}

export const ResponseDisplay = ({ response, metadata }: ResponseDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:bg-gray-50 transition-all duration-150 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">AI Response</h3>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-all duration-150 p-2 hover:bg-gray-100 rounded-lg"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>
      
      <div className="prose prose-gray max-w-none mb-4">
        <p className="text-gray-800 leading-relaxed">{response}</p>
      </div>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
        <span>Model: <span className="font-medium">{metadata.model}</span></span>
        <span>Temperature: <span className="font-medium">{metadata.temperature}</span></span>
        <span>Tokens: <span className="font-medium">{metadata.tokens}</span></span>
        <span>Time: <span className="font-medium">{metadata.responseTime}</span></span>
      </div>
    </div>
  );
};
