import { Request, Response } from 'express';
import { UserProgressModel } from '../models/user-progress.model';
import { CAREER_TOTAL_STEPS, CAREER_TITLES } from '../config/careers.config';

export const calculatePercentage = (completedCount: number, careerId: string): number => {
  const total = CAREER_TOTAL_STEPS[careerId];
  if (!total || total === 0) {
    return 0;
  }
  return Math.round((completedCount / total) * 100);
};

export const toggleStepCompletion = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.sub;
  const { careerId, stepId } = req.body;

  if (!userId || !careerId || !stepId) {
    return res.status(400).json({ message: 'Missing required fields: careerId, stepId' });
  }

  try {
    let progress = await UserProgressModel.findOne({ userId, careerId });

    if (!progress) {
      progress = new UserProgressModel({
        userId,
        careerId,
        completedSteps: [],
        percentage: 0,
        isEnrolled: true
      });
    } else {
      // Auto enroll if completing a step
      progress.isEnrolled = true;
    }

    const stepIndex = progress.completedSteps.indexOf(stepId);
    if (stepIndex > -1) {
      progress.completedSteps.splice(stepIndex, 1);
    } else {
      progress.completedSteps.push(stepId);
    }

    progress.percentage = calculatePercentage(progress.completedSteps.length, careerId);
    await progress.save();

    return res.status(200).json({
      success: true,
      data: {
        careerId: progress.careerId,
        completedSteps: progress.completedSteps,
        percentage: progress.percentage,
        isEnrolled: progress.isEnrolled
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const enrollInCareerPath = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.sub;
  const { careerId, isEnrolled } = req.body;

  if (!userId || !careerId || isEnrolled === undefined) {
    return res.status(400).json({ message: 'Missing required fields: careerId, isEnrolled' });
  }

  try {
    let progress = await UserProgressModel.findOne({ userId, careerId });

    if (!progress) {
      progress = new UserProgressModel({
        userId,
        careerId,
        completedSteps: [],
        percentage: 0,
        isEnrolled: isEnrolled
      });
    } else {
      progress.isEnrolled = isEnrolled;
    }

    await progress.save();

    return res.status(200).json({
      success: true,
      data: {
        careerId: progress.careerId,
        isEnrolled: progress.isEnrolled,
        percentage: progress.percentage,
        completedSteps: progress.completedSteps
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getUserDashboardData = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.sub;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const progressList = await UserProgressModel.find({ userId });

    const careerPaths = Object.keys(CAREER_TOTAL_STEPS).map((cId) => {
      const dbProgress = progressList.find((p) => p.careerId === cId);
      const completedSteps = dbProgress ? dbProgress.completedSteps : [];
      const percentage = dbProgress ? dbProgress.percentage : 0;
      const isEnrolled = dbProgress ? dbProgress.isEnrolled : false;

      return {
        careerId: cId,
        careerTitle: CAREER_TITLES[cId] || cId,
        percentage: percentage,
        completedCount: completedSteps.length,
        totalCount: CAREER_TOTAL_STEPS[cId],
        completedSteps: completedSteps,
        isEnrolled: isEnrolled
      };
    });

    const enrolledCareers = careerPaths.filter(p => p.isEnrolled);
    const overallCompletion = enrolledCareers.length > 0 
      ? Math.round(enrolledCareers.reduce((acc, curr) => acc + curr.percentage, 0) / enrolledCareers.length)
      : 0;

    const history = [
      { date: 'Mon', completedCount: Math.min(1, careerPaths.reduce((acc, curr) => acc + curr.completedCount, 0)) },
      { date: 'Tue', completedCount: Math.min(1, careerPaths.reduce((acc, curr) => acc + curr.completedCount, 0)) },
      { date: 'Wed', completedCount: Math.min(2, careerPaths.reduce((acc, curr) => acc + curr.completedCount, 0)) },
      { date: 'Thu', completedCount: Math.min(2, careerPaths.reduce((acc, curr) => acc + curr.completedCount, 0)) },
      { date: 'Fri', completedCount: Math.min(3, careerPaths.reduce((acc, curr) => acc + curr.completedCount, 0)) },
      { date: 'Sat', completedCount: Math.max(0, careerPaths.reduce((acc, curr) => acc + curr.completedCount, 0) - 1) },
      { date: 'Sun', completedCount: careerPaths.reduce((acc, curr) => acc + curr.completedCount, 0) }
    ];

    return res.status(200).json({
      success: true,
      data: {
        overallCompletion,
        careerPaths,
        history
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};
