import mongoose from 'mongoose';
import { CareerModel } from '../models/career.model';
import { SkillModel } from '../models/skill.model';
import { RoadmapModel } from '../models/roadmap.model';
import { roadmapCatalog } from '../data/roadmaps';

export const seedAllAdminData = async () => {
  // 1. Clear existing data
  await CareerModel.deleteMany({});
  await SkillModel.deleteMany({});
  await RoadmapModel.deleteMany({});

  // 2. Extract unique skills
  const skillSet = new Set<string>();
  roadmapCatalog.forEach(roadmap => {
    roadmap.skills.forEach(skill => skillSet.add(skill));
  });

  // 3. Create Skills
  const skillDocs: Record<string, mongoose.Types.ObjectId> = {};
  for (const skillName of skillSet) {
    const slug = skillName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let skill = await SkillModel.findOne({ name: skillName });
    if (!skill) {
      skill = new SkillModel({ name: skillName, slug, description: `Learning resources for ${skillName}` });
      await skill.save();
    }
    skillDocs[skillName] = skill._id as mongoose.Types.ObjectId;
  }

  // 4. Create Careers (with CareerPath schema compatibility) and Roadmaps
  for (const data of roadmapCatalog) {
    const skillIds = data.skills.map(s => skillDocs[s]).filter(Boolean);

    // Map roadmapSteps into levels
    const levels = data.roadmapSteps.map((step) => {
      // Find matching skill ObjectIds for this step if any skill name appears in step title/description
      const stepSkillIds = data.skills
        .filter(s => 
          step.title.toLowerCase().includes(s.toLowerCase()) || 
          step.description.toLowerCase().includes(s.toLowerCase()) ||
          (step.subtopics && step.subtopics.some(sub => sub.toLowerCase().includes(s.toLowerCase())))
        )
        .map(s => skillDocs[s])
        .filter(Boolean);

      // If no specific match, assign all career skills distributed or default to skillIds
      const assignedSkills = stepSkillIds.length > 0 ? stepSkillIds : skillIds.slice(0, 3);

      return {
        name: step.title,
        requiredSkills: assignedSkills,
        competencies: step.subtopics && step.subtopics.length > 0 
          ? step.subtopics 
          : [step.description],
        learningResources: (step.externalResources || []).map(res => ({
          title: res.title,
          type: res.sourceName || 'EXTERNAL DOC',
          url: res.url
        }))
      };
    });

    // Create Career with full CareerPath properties
    const career = new CareerModel({
      careerId: data.careerId,
      title: data.careerTitle,
      pathName: data.careerTitle,
      department: data.category || 'Engineering',
      description: data.description,
      skillIds,
      levels
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

  return {
    skillsCount: skillSet.size,
    careersCount: roadmapCatalog.length
  };
};
