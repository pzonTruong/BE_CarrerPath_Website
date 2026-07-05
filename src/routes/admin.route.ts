import { Router } from 'express';
import { adminGuard } from '../middlewares/auth.middleware';
import * as adminController from '../controllers/admin.controller';

export const adminRouter = Router();

// Protect all admin routes
adminRouter.use(adminGuard);

// Careers
adminRouter.get('/careers', adminController.getCareers);
adminRouter.post('/careers', adminController.createCareer);
adminRouter.put('/careers/:id', adminController.updateCareer);
adminRouter.delete('/careers/:id', adminController.deleteCareer);

// Skills
adminRouter.get('/skills', adminController.getSkills);
adminRouter.post('/skills', adminController.createSkill);
adminRouter.put('/skills/:id', adminController.updateSkill);
adminRouter.delete('/skills/:id', adminController.deleteSkill);

// Roadmaps
adminRouter.get('/roadmaps', adminController.getRoadmaps);
adminRouter.post('/roadmaps', adminController.createRoadmap);
adminRouter.put('/roadmaps/:id', adminController.updateRoadmap);
adminRouter.delete('/roadmaps/:id', adminController.deleteRoadmap);

// Users
adminRouter.get('/users', adminController.getUsers);
adminRouter.put('/users/:id', adminController.updateUser);
adminRouter.delete('/users/:id', adminController.deleteUser);
