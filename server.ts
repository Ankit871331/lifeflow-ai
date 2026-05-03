import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  

  // API Routes
  app.post('/api/analyze', async (req, res) => {
    try {
      const { problem } = req.body;

      if (!problem) {
        return res.status(400).json({ error: 'Problem description is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is required');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this messy real-life problem and provide a structured decision intelligence report: "${problem}"`,
        config: {
          systemInstruction: `You are the LifeFlow AI Decision Engine. Your purpose is to convert chaotic human problems into structured, actionable intelligence.
          
          Follow these strict principles:
          1. Be objective and expert-level.
          2. Classify into specific categories.
          3. Evaluate risk accurately based on urgency and impact.
          4. Provide concrete, step-by-step actions.
          5. Include safety warnings and suggest professional help if the risk is High or Critical.
          
          You must return ONLY a JSON object with the following structure:
          {
            "category": "One of: Health / Emergency, Career / Job, Education, Emotional / Personal, Financial, Productivity / Life decision",
            "risk_level": "One of: Low, Medium, High, Critical",
            "summary": "Concise overview of the core challenge",
            "immediate_actions": ["List of actions for NOW"],
            "short_term_actions": ["List of actions for 24-72 hours"],
            "long_term_actions": ["Strategic actions"],
            "reasoning": "Brief explanation of your logic",
            "warnings": ["Crucial safety or professional advice"]
          }`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              risk_level: { type: Type.STRING },
              summary: { type: Type.STRING },
              immediate_actions: { type: Type.ARRAY, items: { type: Type.STRING } },
              short_term_actions: { type: Type.ARRAY, items: { type: Type.STRING } },
              long_term_actions: { type: Type.ARRAY, items: { type: Type.STRING } },
              reasoning: { type: Type.STRING },
              warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            }
          }
        },
      });

const result = response.candidates?.[0]?.content?.parts?.[0]?.text
  ? JSON.parse(response.candidates[0].content.parts[0].text)
  : response;
res.json(result);
    } catch (error: any) {
      console.error('Analysis error:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production setup
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
