import { Request, Response } from 'express';
import { roadmapCatalog } from '../data/roadmaps';
import { RoadmapModel } from '../models/roadmap.model';

const normalizeRoadmap = (roadmap: (typeof roadmapCatalog)[number]) => ({
  id: roadmap.careerId,
  careerTitle: roadmap.careerTitle,
  description: roadmap.description,
  skills: roadmap.skills,
  roadmapSteps: roadmap.roadmapSteps
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((step) => ({
      id: step.stepId,
      title: step.title,
      description: step.description,
      subtopics: step.subtopics,
      externalResources: step.externalResources
    }))
});

export const getRoadmapByCareerId = async (req: Request, res: Response) => {
  const careerParam = req.params.careerId;
  const careerId = (Array.isArray(careerParam) ? careerParam[0] : careerParam).toLowerCase();
  const roadmap = await RoadmapModel.findOne({ careerId }).lean();

  if (roadmap) {
    return res.json({
      id: roadmap.careerId,
      careerTitle: roadmap.careerTitle,
      description: roadmap.description,
      skills: roadmap.skills,
      roadmapSteps: roadmap.roadmapSteps
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((step) => ({
          id: step.stepId,
          title: step.title,
          description: step.description,
          subtopics: step.subtopics,
          externalResources: step.externalResources
        }))
    });
  }

  const fallback = roadmapCatalog.find((item) => item.careerId === careerId);

  if (!fallback) {
    return res.status(404).json({ message: 'Roadmap not found' });
  }

  return res.json(normalizeRoadmap(fallback));
};
