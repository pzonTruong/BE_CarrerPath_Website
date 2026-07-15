import { env } from '../config/env';
import { roadmapCatalog } from '../data/roadmaps';
import type { CareerRecommendationInput } from '../validators/career-recommendation.validator';

export interface CareerRecommendation {
  careerTitle: string;
  reason: string;
  skillsToLearn: string[];
}

export interface QuizAnswerReview {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface LearningPathResource {
  title: string;
  sourceName: string;
  url: string;
}

export interface LearningPathStep {
  stepId: string;
  title: string;
  reason: string;
  priority: 'review' | 'learn' | 'practice';
  estimatedHours: number;
  checkpoint: string;
  resources: LearningPathResource[];
}

export interface PersonalizedLearningPath {
  summary: string;
  readinessLevel: 'beginner' | 'developing' | 'ready';
  confidenceScore: number;
  estimatedStudyHours: number;
  weakSkills: string[];
  strengths: string[];
  nextActions: string[];
  source: 'ai' | 'fallback';
  recommendedSteps: LearningPathStep[];
}

export interface LearningPathInput {
  careerId: string;
  stepId: string;
  score: number;
  totalQuestions: number;
  percentageScore: number;
  wrongAnswers: QuizAnswerReview[];
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

const toStringList = (value: unknown, maxItems: number) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim())
    .slice(0, maxItems);
};

const findCareerRoadmap = (careerId: string) =>
  roadmapCatalog.find((career) => career.careerId === careerId) ?? roadmapCatalog[0];

const fallbackLearningPath = (input: LearningPathInput): PersonalizedLearningPath => {
  const career = findCareerRoadmap(input.careerId);
  const currentStep = career.roadmapSteps.find((step) => step.stepId === input.stepId);
  const steps = [currentStep, ...career.roadmapSteps.filter((step) => step.stepId !== input.stepId)]
    .filter((step): step is NonNullable<typeof currentStep> => Boolean(step))
    .slice(0, 3);

  const weakSkills = Array.from(
    new Set(
      input.wrongAnswers
        .flatMap((answer) => [answer.question, answer.correctAnswer])
        .join(' ')
        .split(/[^a-zA-Z0-9+#.]+/)
        .filter((word) => word.length >= 3)
    )
  ).slice(0, 5);

  return {
    summary:
      input.wrongAnswers.length > 0
        ? `Bạn đạt ${Math.round(input.percentageScore)}%. Hãy ưu tiên ôn lại các phần trả lời sai trước khi học tiếp.`
        : `Bạn đạt ${Math.round(input.percentageScore)}%. Nền tảng hiện tại khá tốt, có thể chuyển sang bước tiếp theo trong lộ trình.`,
    readinessLevel: input.percentageScore >= 80 ? 'ready' : input.percentageScore >= 50 ? 'developing' : 'beginner',
    confidenceScore: Math.round(Math.max(35, Math.min(95, input.percentageScore))),
    estimatedStudyHours: input.percentageScore >= 80 ? 4 : input.percentageScore >= 50 ? 8 : 14,
    weakSkills: weakSkills.length > 0 ? weakSkills : currentStep?.subtopics.slice(0, 3) ?? career.skills.slice(0, 3),
    strengths: input.percentageScore >= 80 ? ['Quiz accuracy', 'Current roadmap foundation'] : ['Completed the entry quiz'],
    nextActions: [
      'Review the weak skills before retaking the quiz.',
      'Open the recommended resources and finish one focused study block.',
      'Retake the quiz after completing the checkpoints.'
    ],
    source: 'fallback',
    recommendedSteps: steps.map((step) => ({
      stepId: step.stepId,
      title: step.title,
      reason: step.stepId === input.stepId ? 'Ôn lại bước vừa kiểm tra để vá lỗ hổng kiến thức.' : 'Học tiếp sau khi đã củng cố phần nền tảng.',
      priority: step.stepId === input.stepId && input.percentageScore < 80 ? 'review' : 'learn',
      estimatedHours: step.stepId === input.stepId ? Math.max(2, Math.ceil((100 - input.percentageScore) / 10)) : 3,
      checkpoint: `Hoàn thành phần ${step.title} và trả lời đúng ít nhất 80% câu hỏi liên quan.`,
      resources: step.externalResources.slice(0, 3)
    }))
  };
};

const normalizeLearningPath = (value: unknown, input: LearningPathInput): PersonalizedLearningPath => {
  if (typeof value !== 'object' || value === null) {
    return fallbackLearningPath(input);
  }

  const record = value as Record<string, unknown>;
  const fallback = fallbackLearningPath(input);
  const career = findCareerRoadmap(input.careerId);
  const roadmapStepById = new Map(career.roadmapSteps.map((step) => [step.stepId, step]));
  const rawSteps = Array.isArray(record.recommendedSteps) ? record.recommendedSteps : [];

  const recommendedSteps = rawSteps
    .map((item): LearningPathStep | null => {
      if (typeof item !== 'object' || item === null) {
        return null;
      }

      const stepRecord = item as Record<string, unknown>;
      const stepId = typeof stepRecord.stepId === 'string' ? stepRecord.stepId.trim() : '';
      const roadmapStep = roadmapStepById.get(stepId);

      if (!stepId || !roadmapStep) {
        return null;
      }

      return {
        stepId,
        title: roadmapStep.title,
        reason: typeof stepRecord.reason === 'string' && stepRecord.reason.trim().length > 0
          ? stepRecord.reason.trim()
          : fallback.recommendedSteps.find((step) => step.stepId === stepId)?.reason ?? roadmapStep.description,
        priority: stepRecord.priority === 'review' || stepRecord.priority === 'learn' || stepRecord.priority === 'practice'
          ? stepRecord.priority
          : fallback.recommendedSteps.find((step) => step.stepId === stepId)?.priority ?? 'learn',
        estimatedHours: typeof stepRecord.estimatedHours === 'number' && stepRecord.estimatedHours > 0
          ? Math.min(20, Math.ceil(stepRecord.estimatedHours))
          : fallback.recommendedSteps.find((step) => step.stepId === stepId)?.estimatedHours ?? 3,
        checkpoint: typeof stepRecord.checkpoint === 'string' && stepRecord.checkpoint.trim().length > 0
          ? stepRecord.checkpoint.trim()
          : fallback.recommendedSteps.find((step) => step.stepId === stepId)?.checkpoint ?? `Complete ${roadmapStep.title}.`,
        resources: roadmapStep.externalResources.slice(0, 3)
      };
    })
    .filter((step): step is LearningPathStep => Boolean(step))
    .slice(0, 3);

  return {
    summary: typeof record.summary === 'string' && record.summary.trim().length > 0
      ? record.summary.trim()
      : fallback.summary,
    readinessLevel: record.readinessLevel === 'beginner' || record.readinessLevel === 'developing' || record.readinessLevel === 'ready'
      ? record.readinessLevel
      : fallback.readinessLevel,
    confidenceScore: typeof record.confidenceScore === 'number'
      ? Math.max(0, Math.min(100, Math.round(record.confidenceScore)))
      : fallback.confidenceScore,
    estimatedStudyHours: typeof record.estimatedStudyHours === 'number' && record.estimatedStudyHours > 0
      ? Math.min(40, Math.ceil(record.estimatedStudyHours))
      : fallback.estimatedStudyHours,
    weakSkills: toStringList(record.weakSkills, 6).length > 0 ? toStringList(record.weakSkills, 6) : fallback.weakSkills,
    strengths: toStringList(record.strengths, 4).length > 0 ? toStringList(record.strengths, 4) : fallback.strengths,
    nextActions: toStringList(record.nextActions, 5).length > 0 ? toStringList(record.nextActions, 5) : fallback.nextActions,
    source: 'ai',
    recommendedSteps: recommendedSteps.length > 0 ? recommendedSteps : fallback.recommendedSteps
  };
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

export const getPersonalizedLearningPath = async (
  input: LearningPathInput
): Promise<PersonalizedLearningPath> => {
  if (!env.geminiApiKey) {
    return fallbackLearningPath(input);
  }

  const career = findCareerRoadmap(input.careerId);
  const roadmapSteps = career.roadmapSteps
    .map((step) => `- ${step.stepId}: ${step.title}. ${step.description}. Subtopics: ${step.subtopics.join(', ')}`)
    .join('\n');
  const wrongAnswers = input.wrongAnswers.length > 0
    ? input.wrongAnswers
        .map((answer, index) => `${index + 1}. ${answer.question}\nSelected: ${answer.selectedAnswer}\nCorrect: ${answer.correctAnswer}\nDifficulty: ${answer.difficulty}`)
        .join('\n')
    : 'No wrong answers.';

  const prompt = `
You are a learning path advisor. Analyze the learner's entry quiz result and recommend a personalized study path.

Career: ${career.careerTitle}
Quiz step: ${input.stepId}
Score: ${input.score}/${input.totalQuestions} (${Math.round(input.percentageScore)}%)

Available roadmap steps:
${roadmapSteps}

Wrong answers:
${wrongAnswers}

Return JSON only with this exact shape:
{
  "summary": "Short Vietnamese summary of the learner's result",
  "readinessLevel": "beginner | developing | ready",
  "confidenceScore": 0,
  "estimatedStudyHours": 8,
  "weakSkills": ["Skill gap 1", "Skill gap 2"],
  "strengths": ["Strength 1", "Strength 2"],
  "nextActions": ["Action 1", "Action 2", "Action 3"],
  "recommendedSteps": [
    {
      "stepId": "one of the available step ids",
      "reason": "Short Vietnamese reason this step should be studied",
      "priority": "review | learn | practice",
      "estimatedHours": 4,
      "checkpoint": "A concrete Vietnamese checkpoint to prove this step is done"
    }
  ]
}

Rules:
- Write summary and reasons in Vietnamese.
- weakSkills must be concrete skills or concepts inferred from wrong answers.
- strengths must be honest and based on quiz score, never generic praise.
- nextActions must be specific actions the learner can do this week.
- Recommend 2 to 3 roadmap steps.
- Prefer the current quiz step first if the learner scored below 80%.
- confidenceScore is your confidence in this diagnosis, not the quiz score.
`;

  try {
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
            temperature: 0.3,
            responseMimeType: 'application/json'
          }
        })
      }
    );

    const payload = (await response.json()) as GeminiResponse;

    if (!response.ok) {
      console.warn('Gemini learning path request failed:', payload.error?.message ?? response.statusText);
      return fallbackLearningPath(input);
    }

    const text = payload.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? '')
      .join('')
      .trim();

    if (!text) {
      return fallbackLearningPath(input);
    }

    return normalizeLearningPath(JSON.parse(extractJson(text)) as unknown, input);
  } catch (error) {
    console.warn('Failed to generate personalized learning path:', error);
    return fallbackLearningPath(input);
  }
};
