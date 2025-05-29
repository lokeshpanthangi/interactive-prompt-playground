
export const getOpenAIApiKey = (): string => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env.local file');
  }
  
  return apiKey;
};

export const getOpenAIHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getOpenAIApiKey()}`
});

export const openAIConfig = {
  baseURL: 'https://api.openai.com/v1'
};
