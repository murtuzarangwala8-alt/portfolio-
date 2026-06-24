export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required' }, { status: 400 })
    }

    if (message.length > 500) {
      return Response.json({ error: 'Message too long' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return Response.json({ error: 'AI temporarily unavailable' }, { status: 500 })
    }

    const systemInstruction = `You are Murtuza Rangwala's personal AI assistant on his portfolio website. Only answer questions about Murtuza or general finance/economics topics.

FACTS ABOUT MURTUZA:
Education: MSc Economics and Data Analysis, University of Verona Italy (2023-2026). BSc Computer Science, University of Mumbai India (2019-2022).
Experience: Business Analyst at Dimitra International Berlin (Oct 2025-Jan 2026). Operations and Business Analyst at Mohamedally Akbarally and Co Mumbai (Sep 2019-Dec 2021). Equity Dealer at Motilal Oswal Mumbai (2020).
Skills: Python, R, SQL, MATLAB, Power BI, Excel, Stata. Econometrics, Financial Modeling, DCF, ARIMA, Time-Series. Machine Learning, LLMs, RAG, LangChain, NLP.
Projects: Household Financial Market Participation Analysis, SME Growth and Credit Market Analysis, Constant GDP per Capita Analysis 1970-2022, RAG-based Financial Knowledge Assistant, XAU/USD Markov Chain Predictor.
Contact: murtuzarangwala8@gmail.com. LinkedIn: linkedin.com/in/murtaza-rangwala-856456102.

Be concise, friendly and professional. Never invent facts.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser question: ${message}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.8,
            topK: 40,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Gemini API error:', errorData)
      return Response.json({ error: 'AI temporarily unavailable' }, { status: 500 })
    }

    const data = await response.json()
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, I could not generate a response.'

    return Response.json({ response: aiResponse })
  } catch (error) {
    console.error('Chat error:', error)
    return Response.json({ error: 'AI temporarily unavailable' }, { status: 500 })
  }
}
