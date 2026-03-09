import Anthropic from '@anthropic-ai/sdk';
import { EulogyFormData } from '@/types/eulogy';

function getClient() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

const LENGTH_WORDS: Record<string, string> = {
  short: '200 to 300 words (about 2 minutes spoken)',
  medium: '400 to 550 words (about 4 to 5 minutes spoken)',
  long: '650 to 800 words (about 7 to 8 minutes spoken)',
};

const TONE_GUIDE: Record<string, string> = {
  warm: 'warm, personal and conversational, filled with love and specific memories',
  formal: 'respectful and dignified, suitable for a formal funeral or memorial service',
  religious: 'faith-centred with references to spiritual comfort, scripture or eternal life where fitting',
  secular: 'non-religious and humanistic, focusing on the life lived and the legacy left behind',
};

const SYSTEM_PROMPT = `You are a compassionate speech writer helping someone honour a loved one at a funeral service. Your role is to take the personal details provided and craft a eulogy that feels genuine, warm and human.

Writing rules you must follow every single time:
- Never use em dashes (the long dash character). Use commas, full stops, or rewrite the sentence instead.
- Write in natural spoken language. The text must not sound like it was written by an AI.
- Vary your sentence length to create a natural rhythm when read aloud.
- Use the specific details provided. Avoid generic filler phrases like "they will be deeply missed" or "words cannot describe".
- Do not fabricate details that were not provided. Work only with what you have been given.
- Write in the first or third person as appropriate for a eulogy speech.
- Avoid purple prose or overly poetic language. Keep it grounded and real.
- No em dashes. None. Not a single one.`;

export function buildEulogyPrompt(data: EulogyFormData): string {
  const parts: string[] = [];

  parts.push(`Please write a ${TONE_GUIDE[data.tone]} eulogy for ${data.deceasedName}.`);
  parts.push(`Target length: ${LENGTH_WORDS[data.length]}.`);
  parts.push('');

  parts.push('Details about the person:');
  if (data.age) parts.push(`- Age: ${data.age}`);
  if (data.occupation) parts.push(`- Occupation: ${data.occupation}`);
  if (data.hometown) parts.push(`- From: ${data.hometown}`);
  parts.push('');

  parts.push(`The person speaking at the funeral is the ${data.relationship} of ${data.deceasedName}.`);
  parts.push('');

  if (data.memories) {
    parts.push('Key memories and stories to include:');
    parts.push(data.memories);
    parts.push('');
  }

  if (data.personalityTraits) {
    parts.push('Personality and character:');
    parts.push(data.personalityTraits);
    parts.push('');
  }

  if (data.achievements) {
    parts.push('Achievements and highlights:');
    parts.push(data.achievements);
    parts.push('');
  }

  if (data.familyInfo) {
    parts.push('Family information:');
    parts.push(data.familyInfo);
    parts.push('');
  }

  parts.push('Please write the full eulogy now. Return only the eulogy text itself, no titles, no preamble, no instructions.');

  return parts.join('\n');
}

const REFUSAL_PHRASES = [
  'i need more',
  'i need additional',
  'could you provide',
  'please provide',
  'please share',
  'to write a meaningful',
  'to create a proper',
  'to write a heartfelt',
  'more information',
  'more details about',
  'would you be able to share',
  'i don\'t have enough',
  'i don\'t have sufficient',
  'without more',
];

export function isEulogyRefusal(text: string): boolean {
  const lower = text.toLowerCase();
  return REFUSAL_PHRASES.some((p) => lower.includes(p));
}

export async function generateEulogy(data: EulogyFormData): Promise<string> {
  const message = await getClient().messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: buildEulogyPrompt(data),
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  return content.text;
}

export async function generateAlternatives(
  data: EulogyFormData,
  originalEulogy: string
): Promise<{ tone: string; eulogy: string }[]> {
  const alternativeTones = Object.keys(TONE_GUIDE).filter(
    (t) => t !== data.tone
  ).slice(0, 2);

  const results = await Promise.all(
    alternativeTones.map(async (tone) => {
      const modifiedData = { ...data, tone: tone as EulogyFormData['tone'] };
      const message = await getClient().messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Here is an existing eulogy:\n\n${originalEulogy}\n\nNow rewrite it in a ${TONE_GUIDE[tone]} style. Keep all the same personal details and memories. Return only the rewritten eulogy text.`,
          },
        ],
      });

      const content = message.content[0];
      if (content.type !== 'text') throw new Error('Unexpected response type');

      return {
        tone: tone.charAt(0).toUpperCase() + tone.slice(1),
        eulogy: content.text,
      };
    })
  );

  return results;
}
