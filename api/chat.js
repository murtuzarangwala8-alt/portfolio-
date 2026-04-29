export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Validate message
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check message length (max 500 characters)
    if (message.length > 500) {
      return res.status(400).json({ error: 'Message too long. Maximum 500 characters.' });
    }

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'Sorry, the AI assistant is temporarily unavailable.' 
      });
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
      return res.status(500).json({ 
        error: 'Sorry, the AI assistant is temporarily unavailable.' 
      });
    }

    const data = await response.json();

    // Extract response text
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                       'Sorry, I could not generate a response.';

    return res.status(200).json({ 
      response: aiResponse 
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    return res.status(500).json({ 
      error: 'Sorry, the AI assistant is temporarily unavailable.' 
    });
  }
}
