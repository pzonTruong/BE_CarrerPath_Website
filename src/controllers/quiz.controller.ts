import { Request, Response } from 'express';
import { TestHistoryModel } from '../models/test-history.model';
import { UserProgressModel } from '../models/user-progress.model';
import { calculatePercentage } from './progress.controller';
import { QuizQuestionModel } from '../models/quiz-question.model';
import { getPersonalizedLearningPath, type QuizAnswerReview } from '../services/gemini.service';

const PASSING_SCORE_PERCENTAGE = 80;

export const getQuizzes = async (req: Request, res: Response): Promise<any> => {
  try {
    const skillId = req.params.skillId as string;
    if (!skillId) {
      return res.status(400).json({ message: 'Skill ID is required' });
    }

    // Fetch 10 random questions for the given stepId (skillId)
    const questions = await QuizQuestionModel.aggregate([
      { $match: { stepId: skillId } },
      { $sample: { size: 10 } }
    ]);

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this node' });
    }
    
    // Remove correct answers and map _id to id before sending to client
    const clientQuestions = questions.map(q => {
      const { correctAnswerIndex, _id, ...rest } = q;
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).json({
      success: true,
      data: clientQuestions
    });
  } catch (error) {
    console.error('Get quizzes error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const submitQuiz = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.sub;
    const { careerId, stepId, skillId, answers } = req.body;

    if (!userId || !careerId || !stepId || !skillId || !answers) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Fetch the specific questions from DB to check correct answers
    const questionIds = Object.keys(answers);
    const dbQuestions = await QuizQuestionModel.find({ _id: { $in: questionIds } });

    if (dbQuestions.length === 0) {
      return res.status(400).json({ message: 'Invalid questions provided' });
    }

    const totalQuestions = dbQuestions.length;
    let score = 0;
    const wrongAnswers: QuizAnswerReview[] = [];

    dbQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswerIndex) {
        score++;
        return;
      }

      const selectedAnswerIndex = answers[q.id];
      wrongAnswers.push({
        question: q.questionText,
        selectedAnswer: typeof selectedAnswerIndex === 'number' ? q.options[selectedAnswerIndex] ?? 'No answer' : 'No answer',
        correctAnswer: q.options[q.correctAnswerIndex] ?? 'Unknown',
        difficulty: q.difficulty
      });
    });

    const percentageScore = (score / totalQuestions) * 100;
    const passed = percentageScore >= PASSING_SCORE_PERCENTAGE;
    const learningPath = await getPersonalizedLearningPath({
      careerId,
      stepId,
      score,
      totalQuestions,
      percentageScore,
      wrongAnswers
    });

    // Save test history
    await TestHistoryModel.create({
      userId,
      careerId,
      stepId,
      score,
      totalQuestions,
      passed,
      answersData: answers
    });

    const quizHistory = await TestHistoryModel.find({ userId, careerId, stepId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    let progressData = null;

    if (passed) {
      let progress = await UserProgressModel.findOne({ userId, careerId });

      if (!progress) {
        progress = new UserProgressModel({
          userId,
          careerId,
          completedSteps: [stepId],
          percentage: 0,
          isEnrolled: true
        });
      } else {
        progress.isEnrolled = true;
        if (!progress.completedSteps.includes(stepId)) {
          progress.completedSteps.push(stepId);
        }
      }

      progress.percentage = calculatePercentage(progress.completedSteps.length, careerId);
      await progress.save();
      progressData = progress;
    }

    return res.status(200).json({
      success: true,
      data: {
        isPassed: passed,
        score,
        totalQuestions,
        percentageScore,
        progressUpdated: passed ? progressData : null,
        learningPath,
        quizHistory: quizHistory.map((item) => ({
          id: item._id.toString(),
          score: item.score,
          totalQuestions: item.totalQuestions,
          percentageScore: (item.score / item.totalQuestions) * 100,
          passed: item.passed,
          createdAt: item.createdAt
        }))
      }
    });

  } catch (error) {
    console.error('Submit quiz error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getQuizHistory = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.sub;
    const { careerId, stepId } = req.query;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const filter: Record<string, unknown> = { userId };
    if (typeof careerId === 'string' && careerId.trim()) {
      filter.careerId = careerId;
    }
    if (typeof stepId === 'string' && stepId.trim()) {
      filter.stepId = stepId;
    }

    const history = await TestHistoryModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return res.status(200).json({
      success: true,
      data: history.map((item) => ({
        id: item._id.toString(),
        careerId: item.careerId,
        stepId: item.stepId,
        score: item.score,
        totalQuestions: item.totalQuestions,
        percentageScore: (item.score / item.totalQuestions) * 100,
        passed: item.passed,
        createdAt: item.createdAt
      }))
    });
  } catch (error) {
    console.error('Get quiz history error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};
