import { Request, Response } from 'express';
import { TestHistoryModel } from '../models/test-history.model';
import { UserProgressModel } from '../models/user-progress.model';
import { calculatePercentage } from './progress.controller';

const PASSING_SCORE_PERCENTAGE = 80;

export const submitTestResult = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.sub;
    const { careerId, stepId, score, totalQuestions, answers } = req.body;

    if (!userId || !careerId || !stepId || score === undefined || !totalQuestions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const percentageScore = (score / totalQuestions) * 100;
    const passed = percentageScore >= PASSING_SCORE_PERCENTAGE;

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
        percentageScore,
        progressUpdated: passed ? progressData : null
      }
    });

  } catch (error) {
    console.error('Submit test error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};
