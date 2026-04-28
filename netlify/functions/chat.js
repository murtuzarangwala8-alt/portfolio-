const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse request body
    const { message } = JSON.parse(event.body);

    // Validate message
    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Check message length (max 500 characters)
    if (message.length > 500) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message too long. Maximum 500 characters.' })
      };
    }

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Sorry, the AI assistant is temporarily unavailable.' 
        })
      };
    }

    // System instruction for the AI
    const systemInstruction = "You are the AI assistant for Murtuza Rangwala's portfolio website. Answer professionally and briefly. Help recruiters understand his skills in finance, data analytics, investment banking, Python, SQL, financial modeling, machine learning, consulting, resume, projects, and contact details.";

    // Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemInstruction}\n\nUser question: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Sorry, the AI assistant is temporarily unavailable.' 
        })
      };
    }

    const data = await response.json();

    // Extract response text
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                       'Sorry, I could not generate a response.';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        response: aiResponse 
      })
    };

  } catch (error) {
    console.error('Error in chat function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Sorry, the AI assistant is temporarily unavailable.' 
      })
    };
  }
};
