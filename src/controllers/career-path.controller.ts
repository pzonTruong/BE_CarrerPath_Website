import { Request, Response } from 'express';
import { CareerPathModel } from '../models/career-path.model';
import { seedAllAdminData } from '../services/seed.service';

export const seedCareerPaths = async (req: Request, res: Response) => {
  try {
    const result = await seedAllAdminData();
    return res.json({ message: 'Career paths seeded successfully', ...result });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const createCareerPath = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newCareerPath = new CareerPathModel(data);
    await newCareerPath.save();
    return res.status(201).json(newCareerPath);
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const updateCareerPath = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const updatedCareerPath = await CareerPathModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    
    if (!updatedCareerPath) {
      return res.status(404).json({ message: 'Career Path not found' });
    }
    
    return res.json(updatedCareerPath);
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getCareerPaths = async (req: Request, res: Response) => {
  try {
    const paths = await CareerPathModel.find().populate('levels.requiredSkills');
    return res.json(paths);
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getCareerPathById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const path = await CareerPathModel.findById(id).populate('levels.requiredSkills');
    if (!path) {
      return res.status(404).json({ message: 'Career Path not found' });
    }
    return res.json(path);
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteCareerPath = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCareerPath = await CareerPathModel.findByIdAndDelete(id);
    
    if (!deletedCareerPath) {
      return res.status(404).json({ message: 'Career Path not found' });
    }
    
    return res.json({ message: 'Career Path deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
