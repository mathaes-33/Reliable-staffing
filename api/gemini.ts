

import { GoogleGenAI, Type } from "@google/genai";

// This file would be deployed as a serverless function (e.g., on Vercel or Netlify).
// It acts as a secure proxy to the Google Gemini API.

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
    console.error("API_KEY environment variable not set on the server.");
}

/**
 * Handles incoming requests to the /api/gemini endpoint.
 * @param req The incoming Request object.
 * @returns A Response object.
 */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
    });
  }

  if (!ai) {
     return new Response(JSON.stringify({ error: 'Server configuration error: API key not available.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { type, payload } = await req.json();

    if (type === 'resume') {
      const { resume, jobDescription } = payload;
      const model = "gemini-2.5-flash";
      const prompt = `You are an expert career coach. Analyze the following resume and job description. Provide specific, actionable feedback on how to improve the resume to better match the job description. Structure your feedback into clear sections: "Overall Impression", "Strengths", "Areas for Improvement", and "Suggested Changes". Format your entire response using Markdown. Use headings, bold text, and bullet points.

**Job Description:**\n---\n${jobDescription}\n---\n\n**Resume:**\n---\n${resume}\n---`;

      const response = await ai.models.generateContent({ model, contents: prompt });
      return new Response(JSON.stringify({ feedback: response.text }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } else if (type === 'search') {
      const { query } = payload;
      const model = "gemini-2.5-flash";
      const prompt = `Parse the following job search query to extract the job title/keywords and the location. Query: "${query}"`;
      
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              keywords: { type: Type.STRING, description: "Job title or keywords." },
              location: { type: Type.STRING, description: "City, state, or 'Remote'." }
            },
            required: ["keywords", "location"]
          }
        }
      });
      
      const parsedQuery = JSON.parse(response.text.trim());
      return new Response(JSON.stringify({ parsedQuery }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    
    } else if (type === 'application') {
      // In a real application, you would save this to a database.
      // For now, we just log it to the server console to confirm receipt.
      console.log("Received new application:", payload);
      
      // Simulate a small delay to feel more realistic
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } else if (type === 'job-submission') {
        // In a real app, save this to a 'pending_jobs' table in a database.
        console.log("Received new job submission for admin approval:", payload);

        await new Promise(resolve => setTimeout(resolve, 500));

        return new Response(JSON.stringify({ success: true, message: "Job submission received and is pending approval." }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } else {
      return new Response(JSON.stringify({ error: 'Invalid request type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error("Error in API proxy:", error);
    return new Response(JSON.stringify({ error: 'An internal server error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
