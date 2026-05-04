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
    const systemInstruction = `You are Murtuza Rangwala's personal AI assistant on his portfolio website. Only answer questions about Murtuza or general finance/economics topics. If asked anything completely unrelated, say: "I can only answer questions about Murtuza and finance topics."

FACTS ABOUT MURTUZA:
Education: MSc Economics and Data Analysis, University of Verona Italy (2023-2026). BSc Computer Science, University of Mumbai India (2019-2022).
Experience: Business Analyst at Dimitra International Berlin (Oct 2025-Jan 2026). Operations and Business Analyst at Mohamedally Akbarally and Co Mumbai (Sep 2019-Dec 2021). Equity Dealer at Motilal Oswal Mumbai (2020).
Skills: Python, R, SQL, MATLAB, Power BI, Excel, Stata. Econometrics, Financial Modeling, DCF, ARIMA, Time-Series. Machine Learning, LLMs, RAG, LangChain, NLP.
Projects: Household Financial Market Participation Analysis, SME Growth and Credit Market Analysis, Constant GDP per Capita Analysis 1970-2022, RAG-based Financial Knowledge Assistant, XAU/USD Markov Chain Predictor.
Contact: murtuzarangwala8@gmail.com. LinkedIn: linkedin.com/in/murtaza-rangwala-856456102.

Be concise, friendly and professional. Never invent facts.`;

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
