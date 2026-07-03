import { env } from '../config/env';
import { roadmapCatalog } from '../data/roadmaps';
import type { CareerRecommendationInput } from '../validators/career-recommendation.validator';

export interface CareerRecommendation {
  careerTitle: string;
  reason: string;
  skillsToLearn: string[];
}

interface GeminiPart {
  text?: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
  error?: {
    message?: string;
  };
}

const extractJson = (text: string) => {
  const trimmed = text.trim();
  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  return fencedMatch?.[1] ?? trimmed;
};

const normalizeRecommendations = (value: unknown): CareerRecommendation[] => {
  const list = Array.isArray(value)
    ? value
    : typeof value === 'object' && value !== null && Array.isArray((value as { recommendations?: unknown }).recommendations)
      ? (value as { recommendations: unknown[] }).recommendations
      : [];

  return list
    .map((item) => {
      if (typeof item !== 'object' || item === null) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const skillsToLearn = Array.isArray(record.skillsToLearn)
        ? record.skillsToLearn.filter((skill): skill is string => typeof skill === 'string' && skill.trim().length > 0)
        : [];

      if (typeof record.careerTitle !== 'string' || typeof record.reason !== 'string') {
        return null;
      }

      return {
        careerTitle: record.careerTitle.trim(),
        reason: record.reason.trim(),
        skillsToLearn: skillsToLearn.slice(0, 6)
      };
    })
    .filter((item): item is CareerRecommendation => Boolean(item))
    .slice(0, 5);
};

export const getCareerRecommendations = async (
  input: CareerRecommendationInput
): Promise<CareerRecommendation[]> => {
  if (!env.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const availableCareers = roadmapCatalog
    .map((career) => `- ${career.careerTitle}: ${career.description}. Skills: ${career.skills.join(', ')}`)
    .join('\n');

  const prompt = `
You are a career advisor for software learners. Recommend career paths that fit the learner profile.

Available existing roadmap paths:
${availableCareers}

Learner profile:
- Current skills: ${input.skills}
- Interests: ${input.interests}
- Career goals: ${input.goals}

Return JSON only with this exact shape:
{
  "recommendations": [
    {
      "careerTitle": "Career name",
      "reason": "A concise reason this path fits the learner",
      "skillsToLearn": ["Skill 1", "Skill 2", "Skill 3"]
    }
  ]
}

Rules:
- Return 3 to 5 recommendations.
- Prefer the available roadmap paths when they fit.
- Keep reasons practical and learner-focused.
- skillsToLearn must contain concrete next skills.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${env.geminiModel}:generateContent?key=${env.geminiApiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: 'application/json'
        }
      })
    }
  );

  const payload = (await response.json()) as GeminiResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message ?? 'Gemini API request failed');
  }

  const text = payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? '')
    .join('')
    .trim();

  if (!text) {
    throw new Error('Gemini returned an empty response');
  }

  const parsed = JSON.parse(extractJson(text)) as unknown;
  const recommendations = normalizeRecommendations(parsed);

  if (recommendations.length === 0) {
    throw new Error('Gemini returned no usable career recommendations');
  }

  return recommendations;
};
