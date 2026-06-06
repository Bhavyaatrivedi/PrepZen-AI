import AIAnalysis from '../models/AIAnalysis';
import OpenAI from 'openai';

const key = process.env.OPENAI_API_KEY || '';
const client = new OpenAI({ apiKey: key });

async function parseResponseText(resp: any) {
  const output = resp?.output?.[0]?.content?.[0]?.text;
  if (typeof output === 'string') return output;
  return JSON.stringify(resp, null, 2);
}

export async function runJournalAnalysis(userId: any, journalId: any, text: string) {
  const prompt = `Analyze the journal entry and return JSON with keys: emotion, sentiment, confidence_level (0-10), stress_triggers (array), burnout_risk (LOW|MEDIUM|HIGH), recommendations (array). Entry: ${text}`;
  if (!key) {
    return {
      emotion: 'neutral',
      sentiment: 'mixed',
      confidence_level: 5,
      stress_triggers: [],
      burnout_risk: 'LOW',
      recommendations: ['Keep consistent sleep schedule']
    };
  }

  const resp = await client.responses.create({
    model: 'gpt-3.5-turbo',
    input: prompt,
    max_output_tokens: 400
  });

  try {
    const textResp = await parseResponseText(resp);
    const jsonStart = textResp.indexOf('{');
    const json = JSON.parse(textResp.slice(jsonStart));
    return json;
  } catch (err) {
    return {
      emotion: 'neutral',
      sentiment: 'mixed',
      confidence_level: 5,
      stress_triggers: [],
      burnout_risk: 'LOW',
      recommendations: ['Maintain study breaks']
    };
  }
}

export async function runChat(userId: any, message: string) {
  if (!key) return 'AI key not configured. Install OPENAI_API_KEY in env.';
  const prompt = `You are a supportive wellness coach for students. Provide supportive, non-medical responses. User message: ${message}`;
  const resp = await client.responses.create({
    model: 'gpt-3.5-turbo',
    input: prompt,
    max_output_tokens: 200
  });
  return (await parseResponseText(resp)) || 'Sorry, I could not generate a response right now.';
}
