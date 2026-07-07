import mongoose from 'mongoose';
import { connectDb } from '../config/db';
import { SkillModel } from '../models/skill.model';
import { ResourceModel } from '../models/resource.model';

const getResourcesForSkill = (skillName: string, skillId: mongoose.Types.ObjectId) => {
  const name = skillName.toLowerCase();
  
  if (name.includes('html')) {
    return [
      { title: 'MDN Web Docs HTML Guide', type: 'EXTERNAL DOC', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', skillId },
      { title: 'HTML Full Course for Beginners', type: 'VIDEO TUTORIAL', url: 'https://www.youtube.com/watch?v=kUMe1FH4CHE', skillId },
      { title: 'HTML Semantics Best Practices', type: 'INTERNAL COURSE', url: 'https://web.dev/learn/html/semantic-html', skillId }
    ];
  }
  if (name.includes('css')) {
    return [
      { title: 'MDN CSS Basics', type: 'EXTERNAL DOC', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS', skillId },
      { title: 'CSS Grid & Flexbox Mastery', type: 'VIDEO TUTORIAL', url: 'https://www.youtube.com/watch?v=jV8BXP4nGym', skillId }
    ];
  }
  if (name.includes('javascript') || name === 'js') {
    return [
      { title: 'MDN JavaScript Guide', type: 'EXTERNAL DOC', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', skillId },
      { title: 'Modern JS From The Beginning', type: 'INTERNAL COURSE', url: 'https://javascript.info', skillId }
    ];
  }
  if (name.includes('typescript') || name === 'ts') {
    return [
      { title: 'TypeScript HandBook Documentation', type: 'EXTERNAL DOC', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', skillId },
      { title: 'TypeScript Design Patterns', type: 'INTERNAL COURSE', url: 'https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html', skillId }
    ];
  }
  if (name.includes('react')) {
    return [
      { title: 'React Official Documentation & Learn', type: 'EXTERNAL DOC', url: 'https://react.dev/learn', skillId },
      { title: 'React Advanced Hooks & State Management', type: 'INTERNAL COURSE', url: 'https://react.dev/reference/react/hooks', skillId }
    ];
  }
  if (name.includes('node') || name.includes('express')) {
    return [
      { title: 'Node.js Official Documentation', type: 'EXTERNAL DOC', url: 'https://nodejs.org/en/docs/', skillId },
      { title: 'Express.js Getting Started Guide', type: 'EXTERNAL DOC', url: 'https://expressjs.com/en/starter/installing.html', skillId }
    ];
  }
  if (name.includes('docker') || name.includes('kubernetes') || name.includes('container')) {
    return [
      { title: 'Docker Official Get Started', type: 'EXTERNAL DOC', url: 'https://docs.docker.com/get-started/', skillId },
      { title: 'Kubernetes Crash Course', type: 'VIDEO TUTORIAL', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', skillId }
    ];
  }
  if (name.includes('git') || name.includes('version control')) {
    return [
      { title: 'Git Pro Book', type: 'EXTERNAL DOC', url: 'https://git-scm.com/book/en/v2', skillId },
      { title: 'GitHub Flow Tutorial', type: 'VIDEO TUTORIAL', url: 'https://www.youtube.com/watch?v=apGV9Ad7XYY', skillId }
    ];
  }
  
  const slug = skillName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Custom official mapping helper
  const getOfficialUrl = (s: string) => {
    const mappings: Record<string, string> = {
      'vue-js': 'https://vuejs.org',
      'next-js': 'https://nextjs.org',
      'vite': 'https://vite.dev',
      'tailwind-css': 'https://tailwindcss.com',
      'redux': 'https://redux.js.org',
      'sql': 'https://postgresql.org',
      'mongodb': 'https://mongodb.com',
      'rest-apis': 'https://restfulapi.net',
      'system-design': 'https://systemdesign.one',
      'ci-cd': 'https://github.com/features/actions',
      'mentorship': 'https://mindtools.com',
    };
    return mappings[s] || `https://devdocs.io/${s}`;
  };

  return [
    { title: `Official ${skillName} Documentation`, type: 'EXTERNAL DOC', url: getOfficialUrl(slug), skillId },
    { title: `${skillName} Complete Guide`, type: 'INTERNAL COURSE', url: `https://devpath.internal/courses/${slug}`, skillId }
  ];
};

const run = async () => {
  try {
    await connectDb();
    console.log('Connected to DB');

    // 1. Clear existing resources
    await ResourceModel.deleteMany({});
    console.log('Cleared existing resources');

    // 2. Fetch all skills
    const skills = await SkillModel.find();
    console.log(`Fetched ${skills.length} skills`);

    // 3. Generate resources for each skill
    let totalSeeded = 0;
    for (const skill of skills) {
      const resourcesData = getResourcesForSkill(skill.name, skill._id as mongoose.Types.ObjectId);
      for (const data of resourcesData) {
        const resource = new ResourceModel(data);
        await resource.save();
        totalSeeded++;
      }
    }
    console.log(`Successfully seeded ${totalSeeded} resources mapped to skills`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding resources error:', error);
    process.exit(1);
  }
};

run();
