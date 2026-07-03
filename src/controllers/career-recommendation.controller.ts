import { Request, Response } from 'express';
import { RecommendationHistoryModel } from '../models/recommendation-history.model';
import { getCareerRecommendations } from '../services/gemini.service';

export const recommendCareerPaths = async (req: Request, res: Response) => {
  const recommendations = await getCareerRecommendations(req.body);

  if (req.user?.sub) {
    await RecommendationHistoryModel.create({
      userId: req.user.sub,
      skills: req.body.skills,
      interests: req.body.interests,
      goals: req.body.goals,
      recommendations
    });
  }

  return res.json({ recommendations });
};

export const getRecommendationHistory = async (req: Request, res: Response) => {
  const userId = req.user?.sub;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const history = await RecommendationHistoryModel.find({ userId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return res.json({
    history: history.map((item) => ({
      id: item._id.toString(),
      skills: item.skills,
      interests: item.interests,
      goals: item.goals,
      recommendations: item.recommendations,
      createdAt: item.createdAt
    }))
  });
};
