
const getOpenAIApiKey = (): string => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
  }
  return apiKey;
};

export interface OpenAIRequestParams {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature: number;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
  top_p?: number;
  stream?: boolean;
}

export const makeOpenAIRequest = async (requestBody: OpenAIRequestParams) => {
  const apiKey = getOpenAIApiKey();
  
  // Ensure all parameters are properly formatted and within valid ranges
  // For max_tokens, we're strictly enforcing the user-specified value without clamping to a higher value
  const formattedRequestBody = {
    model: requestBody.model,
    messages: requestBody.messages,
    temperature: Math.max(0, Math.min(2, requestBody.temperature)), // Clamp between 0-2
    max_tokens: requestBody.max_tokens, // Use exactly what the user specified
    presence_penalty: Math.max(-2, Math.min(2, requestBody.presence_penalty)), // Clamp between -2 to 2
    frequency_penalty: Math.max(-2, Math.min(2, requestBody.frequency_penalty)), // Clamp between -2 to 2
    top_p: requestBody.top_p !== undefined ? Math.max(0, Math.min(1, requestBody.top_p)) : 1, // Default to 1 if not provided
    stream: false // Ensure streaming is disabled for consistent responses
  };

  console.log('Sending OpenAI request with parameters:', {
    model: formattedRequestBody.model,
    temperature: formattedRequestBody.temperature,
    max_tokens: formattedRequestBody.max_tokens,
    presence_penalty: formattedRequestBody.presence_penalty,
    frequency_penalty: formattedRequestBody.frequency_penalty,
    top_p: formattedRequestBody.top_p
  });
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formattedRequestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  
  console.log('OpenAI response received:', {
    model: data.model,
    usage: data.usage,
    finish_reason: data.choices?.[0]?.finish_reason,
    requested_max_tokens: formattedRequestBody.max_tokens,
    actual_tokens: data.usage?.completion_tokens || 0
  });

  // Verify if the token count matches the requested max_tokens
  if (data.usage?.completion_tokens > formattedRequestBody.max_tokens) {
    console.warn(`Token count mismatch: Requested ${formattedRequestBody.max_tokens} but got ${data.usage.completion_tokens}`);
  }

  return data;
};
