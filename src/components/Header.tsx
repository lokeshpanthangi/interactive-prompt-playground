
import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const Header = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="text-center relative">
      <button
        onClick={() => setIsDark(!isDark)}
        className="absolute top-0 right-0 p-2 rounded-lg hover:bg-gray-100 transition-all duration-150 hover:scale-105"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      
      <h1 className="text-4xl font-semibold text-gray-900 mb-3">
        Interactive Prompt Playground
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Test and refine AI model parameters in a conversational interface. 
        Experiment with different settings to understand how they affect AI responses.
      </p>
    </div>
  );
};
