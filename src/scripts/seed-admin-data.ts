import mongoose from 'mongoose';
import { connectDb } from '../config/db';
import { CareerModel } from '../models/career.model';
import { SkillModel } from '../models/skill.model';
import { RoadmapModel } from '../models/roadmap.model';
import { roadmapCatalog } from '../data/roadmaps';

const run = async () => {
  try {
    await connectDb();
    console.log('Connected to DB');

    // 1. Clear existing data
    await CareerModel.deleteMany({});
    await SkillModel.deleteMany({});
    await RoadmapModel.deleteMany({});
    console.log('Cleared existing Careers, Skills, and Roadmaps');

    // 2. Extract unique skills
    const skillSet = new Set<string>();
    roadmapCatalog.forEach(roadmap => {
      roadmap.skills.forEach(skill => skillSet.add(skill));
    });

    // 3. Create Skills
    const skillDocs: Record<string, mongoose.Types.ObjectId> = {};
    for (const skillName of skillSet) {
      const slug = skillName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const skill = new SkillModel({ name: skillName, slug, description: `Learning resources for ${skillName}` });
      await skill.save();
      skillDocs[skillName] = skill._id as mongoose.Types.ObjectId;
    }
    console.log(`Seeded ${skillSet.size} skills`);

    // 4. Create Careers and Roadmaps
    for (const data of roadmapCatalog) {
      const skillIds = data.skills.map(s => skillDocs[s]);

      // Create Career
      const career = new CareerModel({
        careerId: data.careerId,
        title: data.careerTitle,
        description: data.description,
        skillIds
      });
      await career.save();

      // Create Roadmap
      const roadmap = new RoadmapModel({
        careerId: data.careerId,
        careerTitle: data.careerTitle,
        description: data.description,
        skills: data.skills,
        roadmapSteps: data.roadmapSteps
      });
      await roadmap.save();
    }
    console.log(`Seeded ${roadmapCatalog.length} careers and roadmaps`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

run();
