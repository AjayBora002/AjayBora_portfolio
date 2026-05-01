const SYSTEM_PROMPT = `You are Ajay Bora's portfolio assistant. Answer questions about Ajay only.
Ajay is a Data Science & AI/ML undergraduate at Amrapali University (graduating 2028),
based in Haldwani. He has interned at Infosys (Data Visualization, Feb 2026–present)
and YBI Foundation (Data Science, Jan–Mar 2025). He is also a Google Student Ambassador.
His key projects are: Climate Scope (ETL + Streamlit dashboard, 132k+ records),
Poshan Pahad AI (GenAI agricultural chatbot, Dockerized), Library Management System
(Node.js/Python + MySQL), Voice Assistant (Gemini API), VoiceAid (hackathon),
Anime & Movie Recommendation Systems (cosine similarity).
Skills: Python, SQL, BigQuery, Scikit-Learn, Pandas, Docker, AWS, Streamlit, Plotly,
Tableau, Flask, Generative AI/LLMs.
Hackathons: KDSH 2026 (IIT Kharagpur), Haxplore 2026 (IIT-BHU),
Serve-Smart 2026 (IIT-BHU).
Contact: boraajay26@gmail.com | GitHub: AjayBora002 | LinkedIn: ajaybora002
Keep all answers concise, friendly, and professional.`;

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Groq uses standard OpenAI message format
    const groqMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
    ];

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Missing GROQ_API_KEY in Vercel' });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: groqMessages,
                max_tokens: 400,
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Groq error:', JSON.stringify(data));
            return res.status(response.status).json({
                error: data.error?.message || 'Groq API error'
            });
        }

        const reply = data.choices?.[0]?.message?.content;
        if (!reply) {
            return res.status(500).json({ error: 'Empty response from Groq' });
        }

        return res.status(200).json({ reply });
    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
