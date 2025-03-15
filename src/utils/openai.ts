
export async function generateAIResponse(input: string, previousMessages: Array<{role: 'user' | 'assistant', content: string}> = []) {
  try {
    // This would be better handled through a backend or using environment variables
    // For demonstration purposes, we'll use localStorage to store the API key
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      return {
        success: false,
        message: "OpenAI API key not found. Please add your API key in settings."
      };
    }

    const messages = [
      {
        role: "system",
        content: "You are a supportive AI assistant for MindTrack, an educational app that helps students track their mood and academic performance. Provide empathetic, concise responses that help students understand the connection between their emotional wellbeing and academic success. Offer practical advice for managing stress, improving focus, and developing healthy study habits. Keep responses under 150 words."
      },
      ...previousMessages,
      {
        role: "user",
        content: input
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 150,
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      return {
        success: false,
        message: data.error.message || "Error generating response. Please try again."
      };
    }

    return {
      success: true,
      message: data.choices[0].message.content
    };
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return {
      success: false,
      message: "An error occurred while connecting to the AI service. Please try again."
    };
  }
}
