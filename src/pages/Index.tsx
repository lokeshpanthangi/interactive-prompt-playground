
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ModelSelection } from '@/components/ModelSelection';
import { PromptConfiguration } from '@/components/PromptConfiguration';
import { ParameterControls } from '@/components/ParameterControls';
import { ActionButtons } from '@/components/ActionButtons';
import { ResponseDisplay } from '@/components/ResponseDisplay';
import { BatchResults } from '@/components/BatchResults';

const Index = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(150);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [batchResults, setBatchResults] = useState([]);

  const handleGenerate = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse("This is a simulated AI response based on your configured parameters. In a real implementation, this would call the selected AI model with your specified settings.");
      setIsLoading(false);
    }, 2000);
  };

  const handleBatchTest = async () => {
    setIsLoading(true);
    // Simulate batch processing
    setTimeout(() => {
      setBatchResults([
        {
          id: 1,
          params: { temperature: 0.3, maxTokens: 100 },
          response: "Conservative response with lower temperature...",
          metadata: { tokens: 95, time: "1.2s" }
        },
        {
          id: 2,
          params: { temperature: 0.9, maxTokens: 200 },
          response: "Creative response with higher temperature...",
          metadata: { tokens: 185, time: "1.8s" }
        }
      ]);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />
        
        <div className="space-y-8 mt-8">
          <ModelSelection 
            selectedModel={selectedModel}
            onModelSelect={setSelectedModel}
          />
          
          <PromptConfiguration
            systemPrompt={systemPrompt}
            userPrompt={userPrompt}
            onSystemPromptChange={setSystemPrompt}
            onUserPromptChange={setUserPrompt}
          />
          
          <ParameterControls
            temperature={temperature}
            maxTokens={maxTokens}
            presencePenalty={presencePenalty}
            frequencyPenalty={frequencyPenalty}
            onTemperatureChange={setTemperature}
            onMaxTokensChange={setMaxTokens}
            onPresencePenaltyChange={setPresencePenalty}
            onFrequencyPenaltyChange={setFrequencyPenalty}
          />
          
          <ActionButtons
            onGenerate={handleGenerate}
            onBatchTest={handleBatchTest}
            isLoading={isLoading}
          />
          
          {response && (
            <ResponseDisplay 
              response={response}
              metadata={{
                model: selectedModel,
                temperature,
                tokens: 124,
                responseTime: "1.5s"
              }}
            />
          )}
          
          {batchResults.length > 0 && (
            <BatchResults results={batchResults} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
