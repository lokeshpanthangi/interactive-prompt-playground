
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BatchResult {
  id: number;
  params: { temperature: number; maxTokens: number };
  response: string;
  metadata: { tokens: number; time: string };
}

interface BatchResultsProps {
  results: BatchResult[];
}

export const BatchResults = ({ results }: BatchResultsProps) => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-medium text-gray-900">Batch Test Results</h3>
      
      <div className="grid gap-4">
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-150 hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    Temp: {result.params.temperature}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    Tokens: {result.params.maxTokens}
                  </span>
                </div>
                
                <p className="text-gray-800 leading-relaxed">
                  {expandedCards.has(result.id) 
                    ? result.response 
                    : `${result.response.slice(0, 120)}...`
                  }
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span>Tokens: {result.metadata.tokens}</span>
                    <span>Time: {result.metadata.time}</span>
                  </div>
                  
                  <button
                    onClick={() => toggleCard(result.id)}
                    className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 transition-colors duration-150"
                  >
                    <span className="text-sm font-medium">
                      {expandedCards.has(result.id) ? 'Collapse' : 'Expand'}
                    </span>
                    {expandedCards.has(result.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
