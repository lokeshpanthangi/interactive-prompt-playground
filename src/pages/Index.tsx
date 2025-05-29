import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ModelSelection } from '@/components/ModelSelection';
import { PromptConfiguration } from '@/components/PromptConfiguration';
import { ParameterControls } from '@/components/ParameterControls';
import { ActionButtons } from '@/components/ActionButtons';
import { ResponseDisplay } from '@/components/ResponseDisplay';
import { BatchResults } from '@/components/BatchResults';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ComparisonView } from '@/components/ComparisonView';
import { makeOpenAIRequest } from '@/config/openai';

export interface ChatMessage {
  id: string;
  title: string;
  timestamp: Date;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  temperature: number;
  maxTokens: number;
  presencePenalty: number;
  frequencyPenalty: number;
  response: string;
  metadata: {
    model: string;
    temperature: number;
    tokens: number;
    responseTime: string;
  };
}

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
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [comparisonMessages, setComparisonMessages] = useState<ChatMessage[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const generateChatTitle = (userPrompt: string) => {
    return userPrompt.slice(0, 30) + (userPrompt.length > 30 ? '...' : '') || 'New Chat';
  };

  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;
    
    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      const requestBody = {
        model: selectedModel,
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: userPrompt }
        ],
        temperature: temperature,
        max_tokens: maxTokens,
        presence_penalty: presencePenalty,
        frequency_penalty: frequencyPenalty,
        top_p: 1 // Set default top_p value
      };

      console.log('Generating with parameters:', {
        model: selectedModel,
        temperature,
        max_tokens: maxTokens,
        presence_penalty: presencePenalty,
        frequency_penalty: frequencyPenalty
      });

      const data = await makeOpenAIRequest(requestBody);
      const responseTime = ((Date.now() - startTime) / 1000).toFixed(1) + 's';
      const generatedResponse = data.choices[0].message.content;
      const tokensUsed = data.usage?.total_tokens || 0;
      const promptTokens = data.usage?.prompt_tokens || 0;
      const completionTokens = data.usage?.completion_tokens || 0;

      console.log('Token usage:', {
        total: tokensUsed,
        prompt: promptTokens,
        completion: completionTokens,
        requested_max: maxTokens
      });

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        title: generateChatTitle(userPrompt),
        timestamp: new Date(),
        model: selectedModel,
        systemPrompt,
        userPrompt,
        temperature,
        maxTokens,
        presencePenalty,
        frequencyPenalty,
        response: generatedResponse,
        metadata: {
          model: selectedModel,
          temperature,
          tokens: tokensUsed,
          responseTime,
        },
      };

      setResponse(generatedResponse);
      setChatHistory(prev => [newMessage, ...prev]);
      setCurrentChatId(newMessage.id);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setResponse('Error: Failed to generate response. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchTest = async () => {
    if (!userPrompt.trim()) return;
    
    setIsLoading(true);
    const temperatures = [0.3, 0.7, 1.0];
    const results = [];

    for (const temp of temperatures) {
      try {
        const startTime = Date.now();
        const requestBody = {
          model: selectedModel,
          messages: [
            ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
            { role: 'user', content: userPrompt }
          ],
          temperature: temp,
          max_tokens: maxTokens,
          presence_penalty: presencePenalty,
          frequency_penalty: frequencyPenalty,
          top_p: 1
        };

        console.log(`Batch test ${temp} with parameters:`, {
          model: selectedModel,
          temperature: temp,
          max_tokens: maxTokens,
          presence_penalty: presencePenalty,
          frequency_penalty: frequencyPenalty
        });

        const data = await makeOpenAIRequest(requestBody);
        const responseTime = ((Date.now() - startTime) / 1000).toFixed(1) + 's';
        
        results.push({
          id: results.length + 1,
          params: { temperature: temp, maxTokens },
          response: data.choices[0].message.content,
          metadata: { tokens: data.usage?.total_tokens || 0, time: responseTime }
        });
      } catch (error) {
        console.error(`Error in batch test for temperature ${temp}:`, error);
      }
    }

    setBatchResults(results);
    setIsLoading(false);
  };

  const loadChat = (chatId: string) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setSelectedModel(chat.model);
      setSystemPrompt(chat.systemPrompt);
      setUserPrompt(chat.userPrompt);
      setTemperature(chat.temperature);
      setMaxTokens(chat.maxTokens);
      setPresencePenalty(chat.presencePenalty);
      setFrequencyPenalty(chat.frequencyPenalty);
      setResponse(chat.response);
      setCurrentChatId(chatId);
    }
  };

  const startNewChat = () => {
    setSelectedModel('gpt-3.5-turbo');
    setSystemPrompt('');
    setUserPrompt('');
    setTemperature(0.7);
    setMaxTokens(150);
    setPresencePenalty(0);
    setFrequencyPenalty(0);
    setResponse('');
    setCurrentChatId(null);
    setBatchResults([]);
    setShowComparison(false);
    setComparisonMessages([]);
  };

  const addToComparison = (message: ChatMessage) => {
    if (comparisonMessages.length < 2 && !comparisonMessages.find(m => m.id === message.id)) {
      setComparisonMessages(prev => [...prev, message]);
    }
  };

  const removeFromComparison = (messageId: string) => {
    setComparisonMessages(prev => prev.filter(m => m.id !== messageId));
  };

  const toggleComparison = (message: ChatMessage) => {
    const isInComparison = comparisonMessages.some(m => m.id === message.id);
    if (isInComparison) {
      removeFromComparison(message.id);
    } else if (comparisonMessages.length < 2) {
      addToComparison(message);
    }
  };

  const currentMessage = currentChatId ? chatHistory.find(c => c.id === currentChatId) : null;

  return (
    <div className="min-h-screen bg-white flex w-full">
      <ChatSidebar 
        chatHistory={chatHistory}
        currentChatId={currentChatId}
        onLoadChat={loadChat}
        onNewChat={startNewChat}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'ml-12' : 'ml-80'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Header />
          
          {showComparison && comparisonMessages.length > 0 ? (
            <ComparisonView 
              messages={comparisonMessages}
              onRemoveFromComparison={removeFromComparison}
              onClose={() => setShowComparison(false)}
            />
          ) : (
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
              
              {response && currentMessage && (
                <ResponseDisplay 
                  response={response}
                  metadata={currentMessage.metadata}
                  onToggleComparison={() => toggleComparison(currentMessage)}
                  canAddToComparison={comparisonMessages.length < 2}
                  isInComparison={comparisonMessages.some(m => m.id === currentMessage.id)}
                />
              )}

              {comparisonMessages.length > 0 && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowComparison(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-150 hover:scale-105"
                  >
                    Compare {comparisonMessages.length} Response{comparisonMessages.length > 1 ? 's' : ''}
                  </button>
                </div>
              )}
              
              {batchResults.length > 0 && (
                <BatchResults results={batchResults} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
