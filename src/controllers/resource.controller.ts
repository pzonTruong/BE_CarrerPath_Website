import { Request, Response } from 'express';
import { ResourceModel } from '../models/resource.model';

export const createResource = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newResource = new ResourceModel(data);
    await newResource.save();
    return res.status(201).json(newResource);
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getResources = async (req: Request, res: Response) => {
  try {
    const { skillId } = req.query;
    const query = skillId ? { skillId: String(skillId) } : {};
    const resources = await ResourceModel.find(query).populate('skillId');
    return res.json(resources);
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await ResourceModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return res.status(404).json({ message: 'Resource not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await ResourceModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Resource not found' });
    return res.json({ message: 'Resource deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
