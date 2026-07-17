import { Request, Response } from 'express';
import { CareerModel } from '../models/career.model';
import { SkillModel } from '../models/skill.model';
import { RoadmapModel } from '../models/roadmap.model';
import { UserModel } from '../models/user.model';
import { UserProgressModel } from '../models/user-progress.model';
import { ResourceModel } from '../models/resource.model';

// --- USER CRUD ---
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select('-password -otpCode -resetToken');
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // Only allow updating specific fields like role for security
    const { role } = req.body;
    const user = await UserModel.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password -otpCode -resetToken');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// --- CAREER CRUD ---
export const getCareers = async (req: Request, res: Response) => {
  try {
    const careers = await CareerModel.find().populate('skillIds');
    res.json(careers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCareer = async (req: Request, res: Response) => {
  try {
    const career = new CareerModel(req.body);
    await career.save();
    res.status(201).json(career);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCareer = async (req: Request, res: Response) => {
  try {
    const career = await CareerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json(career);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCareer = async (req: Request, res: Response) => {
  try {
    const career = await CareerModel.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json({ message: 'Career deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// --- SKILL CRUD ---
export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await SkillModel.find();
    res.json(skills);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = new SkillModel(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const skill = await SkillModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await SkillModel.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// --- ROADMAP CRUD ---
export const getRoadmaps = async (req: Request, res: Response) => {
  try {
    const roadmaps = await RoadmapModel.find();
    res.json(roadmaps);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoadmap = async (req: Request, res: Response) => {
  try {
    const roadmap = new RoadmapModel(req.body);
    await roadmap.save();
    res.status(201).json(roadmap);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRoadmap = async (req: Request, res: Response) => {
  try {
    const roadmap = await RoadmapModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    res.json(roadmap);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoadmap = async (req: Request, res: Response) => {
  try {
    const roadmap = await RoadmapModel.findByIdAndDelete(req.params.id);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    res.json({ message: 'Roadmap deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const [totalUsers, totalCareers, totalSkills, totalResources] = await Promise.all([
      UserModel.countDocuments(),
      CareerModel.countDocuments(),
      SkillModel.countDocuments(),
      ResourceModel.countDocuments()
    ]);

    const careerDistribution = await UserProgressModel.aggregate([
      {
        $group: {
          _id: '$careerId',
          value: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'careers',
          localField: '_id',
          foreignField: 'careerId',
          as: 'careerInfo'
        }
      },
      {
        $unwind: {
          path: '$careerInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          name: { $ifNull: ['$careerInfo.title', 'Unknown'] },
          value: 1
        }
      }
    ]);

    res.json({
      totalUsers,
      totalCareers,
      totalSkills,
      totalResources,
      careerDistribution
    });
  } catch (error: any) {
    console.error('Failed to fetch admin stats:', error);
    res.status(500).json({ message: error.message });
  }
};
