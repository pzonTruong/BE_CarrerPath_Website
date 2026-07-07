import { Router } from 'express';
import { adminGuard } from '../middlewares/auth.middleware';
import * as adminController from '../controllers/admin.controller';
import * as careerPathController from '../controllers/career-path.controller';
import * as resourceController from '../controllers/resource.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { createCareerPathSchema, updateCareerPathSchema } from '../validators/career-path.validator';
import { createResourceSchema, updateResourceSchema } from '../validators/resource.validator';

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

// Career Paths (New Hierarchical Design)
adminRouter.get('/career-paths', careerPathController.getCareerPaths);
adminRouter.get('/career-paths/:id', careerPathController.getCareerPathById);
adminRouter.post('/career-paths', validateBody(createCareerPathSchema), careerPathController.createCareerPath);
adminRouter.put('/career-paths/:id', validateBody(updateCareerPathSchema), careerPathController.updateCareerPath);
adminRouter.delete('/career-paths/:id', careerPathController.deleteCareerPath);

// Resources Management
adminRouter.get('/resources', resourceController.getResources);
adminRouter.post('/resources', validateBody(createResourceSchema), resourceController.createResource);
adminRouter.put('/resources/:id', validateBody(updateResourceSchema), resourceController.updateResource);
adminRouter.delete('/resources/:id', resourceController.deleteResource);
