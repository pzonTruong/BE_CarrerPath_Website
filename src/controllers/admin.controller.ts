import { Request, Response } from 'express';
import { CareerModel } from '../models/career.model';
import { SkillModel } from '../models/skill.model';
import { RoadmapModel } from '../models/roadmap.model';

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
