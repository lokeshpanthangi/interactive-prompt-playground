import React, { useState, useEffect } from 'react';
import { ResponseDisplay } from '@/components/ResponseDisplay';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ModelSettings } from '@/components/ModelSettings';
import { openAIConfig } from '@/config/api';

export interface ChatMessage {
  id: string;
  title: string;
  timestamp: Date;
  model: string;
  temperature: number;
  userPrompt: string;
  systemPrompt: string;
  response: string;
  metadata: {
    model: string;
    temperature: number;
    tokens: number;
    responseTime: string;
  };
}

const Index = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful assistant.');
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentMetadata, setCurrentMetadata] = useState<{
    model: string;
    temperature: number;
    tokens: number;
    responseTime: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Changed to false to open by default

  useEffect(() => {
    // Load chat history from local storage on component mount
    const storedChatHistory = localStorage.getItem('chatHistory');
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
    }
  }, []);

  useEffect(() => {
    // Save chat history to local storage whenever it changes
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleUserPromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(event.target.value);
  };

  const handleSystemPromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSystemPrompt(event.target.value);
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  const handleTemperatureChange = (value: number) => {
    setTemperature(value);
  };

  const handleMaxTokensChange = (value: number) => {
    setMaxTokens(value);
  };

  const handleTopPChange = (value: number) => {
    setTopP(value);
  };

  const handleFrequencyPenaltyChange = (value: number) => {
    setFrequencyPenalty(value);
  };

  const handlePresencePenaltyChange = (value: number) => {
    setPresencePenalty(value);
  };

  const handleNewChat = () => {
    setUserPrompt('');
    setSystemPrompt('You are a helpful assistant.');
    setCurrentResponse('');
    setCurrentMetadata(null);
    setCurrentChatId(null);
  };

  const handleLoadChat = (chatId: string) => {
    const chat = chatHistory.find((chat) => chat.id === chatId);
    if (chat) {
      setUserPrompt(chat.userPrompt);
      setSystemPrompt(chat.systemPrompt);
      setCurrentResponse(chat.response);
      setCurrentMetadata(chat.metadata);
      setCurrentChatId(chatId);
    }
  };

  const handleAddToComparison = (chatId: string) => {
    if (comparisonList.includes(chatId)) {
      setComparisonList(comparisonList.filter((id) => id !== chatId));
    } else if (comparisonList.length < 2) {
      setComparisonList([...comparisonList, chatId]);
    }
  };

  const generateResponse = async () => {
    if (!userPrompt.trim()) return;

    setIsLoading(true);
    setCurrentResponse('');
    setCurrentMetadata(null);

    try {
      const startTime = Date.now();
      
      const requestBody = {
        model: selectedModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: temperature,
        max_tokens: maxTokens, // This ensures the response respects token limit
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty
      };

      console.log('Sending request to OpenAI:', requestBody);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: openAIConfig.headers,
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('OpenAI Response:', data);
      
      const endTime = Date.now();
      const responseTime = `${(endTime - startTime) / 1000}s`;
      
      const aiResponse = data.choices[0]?.message?.content || 'No response received';
      const tokensUsed = data.usage?.completion_tokens || 0; // Use completion_tokens for accurate count

      const metadata = {
        model: selectedModel,
        temperature: temperature,
        tokens: tokensUsed,
        responseTime: responseTime
      };

      setCurrentResponse(aiResponse);
      setCurrentMetadata(metadata);

      // Add to chat history
      const newChat: ChatMessage = {
        id: Date.now().toString(),
        title: userPrompt.slice(0, 50) + (userPrompt.length > 50 ? '...' : ''),
        timestamp: new Date(),
        model: selectedModel,
        temperature: temperature,
        userPrompt,
        systemPrompt,
        response: aiResponse,
        metadata
      };

      setChatHistory(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);

    } catch (error) {
      console.error('Error generating response:', error);
      setCurrentResponse(`Error: ${error instanceof Error ? error.message : 'Failed to generate response'}`);
      setCurrentMetadata({
        model: selectedModel,
        temperature: temperature,
        tokens: 0,
        responseTime: '0s'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const canAddToComparison = comparisonList.length < 2;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      <ChatSidebar 
        chatHistory={chatHistory} 
        currentChatId={currentChatId}
        onLoadChat={handleLoadChat}
        onNewChat={handleNewChat}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <ModelSettings
            selectedModel={selectedModel}
            temperature={temperature}
            maxTokens={maxTokens}
            topP={topP}
            frequencyPenalty={frequencyPenalty}
            presencePenalty={presencePenalty}
            onModelSelect={handleModelSelect}
            onTemperatureChange={handleTemperatureChange}
            onMaxTokensChange={handleMaxTokensChange}
            onTopPChange={handleTopPChange}
            onFrequencyPenaltyChange={handleFrequencyPenaltyChange}
            onPresencePenaltyChange={handlePresencePenaltyChange}
          />

          
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">System Prompt</h2>
            <textarea
              value={systemPrompt}
              onChange={handleSystemPromptChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none transition-all duration-200"
              placeholder="Enter system prompt..."
            />
          </div>

          
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">User Prompt</h2>
            <textarea
              value={userPrompt}
              onChange={handleUserPromptChange}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none transition-all duration-200"
              placeholder="Enter your prompt..."
            />
            <button
              onClick={generateResponse}
              disabled={isLoading}
              className="w-full mt-4 py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Response'}
            </button>
          </div>

          
          {currentResponse && currentMetadata && (
            <ResponseDisplay
              response={currentResponse}
              metadata={currentMetadata}
              onToggleComparison={
                currentChatId
                  ? () => handleAddToComparison(currentChatId)
                  : undefined
              }
              canAddToComparison={canAddToComparison}
              isInComparison={comparisonList.includes(currentChatId || '')}
            />
          )}

          {comparisonList.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Comparison</h2>
              {comparisonList.map((chatId) => {
                const chat = chatHistory.find((chat) => chat.id === chatId);
                if (chat) {
                  return (
                    <ResponseDisplay
                      key={chat.id}
                      response={chat.response}
                      metadata={chat.metadata}
                      onToggleComparison={() => handleAddToComparison(chat.id)}
                      isInComparison={true}
                      canAddToComparison={false}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
