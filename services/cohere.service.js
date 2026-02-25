const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

/**
 * Call Cohere and expect JSON back
 */
async function callCohereJSON(prompt, systemPrompt = '') {
  const response = await cohere.chat({
    model: 'command-a-03-2025',
    message: prompt,
    preamble: systemPrompt || 'You are an expert ATS and resume analysis specialist. Always return valid JSON only. No markdown, no explanation, no backticks.',
    temperature: 0.1,
    maxTokens: 1000,
  });

  let text = response.text.trim();

  // Strip markdown code fences if present
  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  return JSON.parse(text);
}

/**
 * Call Cohere and expect plain text back
 */
async function callCohereText(prompt, systemPrompt = '') {
  const response = await cohere.chat({
    model: 'command-a-03-2025',
    message: prompt,
    preamble: systemPrompt || 'You are an expert ATS and resume analysis specialist.',
    temperature: 0.3,
    maxTokens: 1500,
  });

  return response.text.trim();
}

/**
 * Generate embeddings using Cohere
 */
async function getEmbedding(texts) {
  const response = await cohere.embed({
    texts: Array.isArray(texts) ? texts : [texts],
    model: 'embed-english-v3.0',
    inputType: 'search_document',
  });

  return response.embeddings;
}

module.exports = { callCohereJSON, callCohereText, getEmbedding };
