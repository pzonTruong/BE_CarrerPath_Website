export const roadmapCatalog = [
  {
    careerId: 'frontend',
    careerTitle: 'Frontend Developer',
    description: 'Learn to structure, style, and build highly interactive, modern client-side web interfaces.',
    category: 'Engineering',
    difficulty: 'Beginner',
    duration: '10-12 weeks',
    outcome: 'Responsive React portfolio',
    portfolioOutcome: 'A responsive React app with routing, API integration, and polished UI states.',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Tailwind CSS'],
    roadmapSteps: [
      {
        stepId: 'fe-internet',
        title: 'Internet & Web Protocols',
        description: 'Understand DNS, hosting, client-server models, and secure HTTP request lifecycles.',
        order: 1,
        subtopics: ['DNS & Name Servers', 'HTTP Requests & Response Codes', 'Domain Registration & Hosting Models'],
        externalResources: [
          { title: 'Frontend Developer Roadmap', sourceName: 'roadmap.sh', url: 'https://roadmap.sh/frontend' },
          { title: 'How the Web Works', sourceName: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works' },
          { title: 'HTTP Overview and Specifications', sourceName: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' }
        ]
      },
      {
        stepId: 'fe-html-css',
        title: 'HTML & CSS Layout Architecture',
        description: 'Construct semantic pages and responsive layouts using Grid and Flexbox.',
        order: 2,
        subtopics: ['Semantic markup systems', 'CSS Flexbox alignment model', 'CSS Grid template specifications'],
        externalResources: [
          { title: 'CSS Grid Guide', sourceName: 'CSS-Tricks Documentation', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' },
          { title: 'HTML Living Standard Spec', sourceName: 'WHATWG HTML Reference', url: 'https://html.spec.whatwg.org/' }
        ]
      },
      {
        stepId: 'fe-javascript',
        title: 'Asynchronous JavaScript & DOM',
        description: 'Learn ES6+ runtime mechanics, async flows, and DOM event bindings.',
        order: 3,
        subtopics: ['ESNext modules and lexical scoping', 'Event Loop mechanics', 'Promises, microtasks, and async actions'],
        externalResources: [
          { title: 'Modern JS Tutorial', sourceName: 'JavaScript.info Guide', url: 'https://javascript.info/' },
          { title: 'Fetch API and Request Specifications', sourceName: 'WHATWG Fetch Standard', url: 'https://fetch.spec.whatwg.org/' }
        ]
      },
      {
        stepId: 'fe-react',
        title: 'React Framework & Hook Models',
        description: 'Implement modular user interfaces using component-driven declarative design.',
        order: 4,
        subtopics: ['Fiber reconciler cycle', 'Hook flows', 'Local and global state management'],
        externalResources: [
          { title: 'React Developer Documentation', sourceName: 'React.dev Reference', url: 'https://react.dev/' }
        ]
      }
    ]
  },
  {
    careerId: 'backend',
    careerTitle: 'Backend Developer',
    description: 'Learn to design APIs, structure databases, write business logic, and handle scaling.',
    category: 'Engineering',
    difficulty: 'Intermediate',
    duration: '12-14 weeks',
    outcome: 'Secure production API',
    portfolioOutcome: 'A documented REST API with authentication, database models, tests, and deployment notes.',
    skills: ['Node.js', 'Express', 'SQL', 'MongoDB', 'REST APIs', 'JWT Security', 'Docker'],
    roadmapSteps: [
      {
        stepId: 'be-runtime',
        title: 'JavaScript Runtime (Node.js)',
        description: 'Write server-side JavaScript using Node.js runtime, filesystem utilities, and packages.',
        order: 1,
        subtopics: ['Event-driven asynchronous I/O', 'Node Package Manager syntax', 'Environment configurations'],
        externalResources: [
          { title: 'Backend Developer Roadmap', sourceName: 'roadmap.sh', url: 'https://roadmap.sh/backend' },
          { title: 'Node.js Developer Guide', sourceName: 'NodeJS.org Reference', url: 'https://nodejs.org/en/docs' }
        ]
      },
      {
        stepId: 'be-apis',
        title: 'REST API Design & Routing',
        description: 'Build endpoints using correct methods, payloads, status codes, and request parsers.',
        order: 2,
        subtopics: ['REST architectural principles', 'Express routing and middleware configuration', 'JSON serialization'],
        externalResources: [
          { title: 'HTTP Status Response Codes Reference', sourceName: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' }
        ]
      },
      {
        stepId: 'be-databases',
        title: 'Relational Databases (PostgreSQL)',
        description: 'Design tables, indexes, constraints, structured queries, and migrations.',
        order: 3,
        subtopics: ['Database normalization rules', 'SQL query join optimization', 'ACID transaction specifications'],
        externalResources: [
          { title: 'PostgreSQL Manuals', sourceName: 'PostgreSQL.org Reference Docs', url: 'https://www.postgresql.org/docs/' }
        ]
      },
      {
        stepId: 'be-security',
        title: 'API Authentication & Token Security',
        description: 'Secure backend resources using JWT, secure storage, and request rate-limiting.',
        order: 4,
        subtopics: ['JWT signature verification', 'CORS rules and cross-origin controls', 'Hash mechanisms for passwords'],
        externalResources: [
          { title: 'JWT Introduction', sourceName: 'JWT.io Specs', url: 'https://jwt.io/introduction/' },
          { title: 'OWASP Security Threat Checklist', sourceName: 'OWASP Security Foundation Docs', url: 'https://owasp.org/www-project-top-ten/' }
        ]
      }
    ]
  },
  {
    careerId: 'devops',
    careerTitle: 'DevOps Engineer',
    description: 'Automate build pipelines, orchestrate containers, and manage cloud infrastructure reliably.',
    category: 'Infrastructure',
    difficulty: 'Advanced',
    duration: '14-16 weeks',
    outcome: 'Cloud deployment pipeline',
    portfolioOutcome: 'A containerized app with CI/CD, infrastructure notes, monitoring, and deployment runbook.',
    skills: ['Linux Shell', 'Docker', 'CI/CD Pipelines', 'Kubernetes', 'AWS Services', 'Nginx Configuration'],
    roadmapSteps: [
      {
        stepId: 'do-linux',
        title: 'Linux Systems & Shell Scripting',
        description: 'Master Unix directories, process controls, permissions, diagnostics, and shell tools.',
        order: 1,
        subtopics: ['POSIX standard commands', 'Bash script variables', 'SSH and key exchange methods'],
        externalResources: [
          { title: 'DevOps Roadmap', sourceName: 'roadmap.sh', url: 'https://roadmap.sh/devops' },
          { title: 'GNU Bash Manual', sourceName: 'GNU Software Reference', url: 'https://www.gnu.org/software/bash/manual/' }
        ]
      },
      {
        stepId: 'do-containers',
        title: 'Containerization (Docker)',
        description: 'Isolate services into lightweight containers with performant build configurations.',
        order: 2,
        subtopics: ['Layered filesystem builds', 'Multi-stage build optimizations', 'Network bridge specifications'],
        externalResources: [
          { title: 'Docker Guide and Reference Docs', sourceName: 'Docker Docs Manual', url: 'https://docs.docker.com/' }
        ]
      },
      {
        stepId: 'do-pipelines',
        title: 'Continuous Integration & Pipelines',
        description: 'Build pipelines that test, build, lint, and deploy code changes dynamically.',
        order: 3,
        subtopics: ['Pipeline trigger configuration', 'Cache dependency strategies', 'Deploy token storage'],
        externalResources: [
          { title: 'GitHub Actions Documentation', sourceName: 'GitHub Documentation Reference', url: 'https://docs.github.com/en/actions' }
        ]
      },
      {
        stepId: 'do-k8s',
        title: 'Container Orchestration (Kubernetes)',
        description: 'Manage container clusters across networks with scalability and fault tolerance.',
        order: 4,
        subtopics: ['Deployments, pods, and services mapping', 'ConfigMaps and Secrets mounting', 'Ingress controller systems'],
        externalResources: [
          { title: 'Kubernetes Overview and API Docs', sourceName: 'Kubernetes.io Specs', url: 'https://kubernetes.io/docs/home/' }
        ]
      }
    ]
  },
  {
    careerId: 'fullstack',
    careerTitle: 'Fullstack Developer',
    description: 'Build complete web products by connecting polished frontend experiences with reliable backend services.',
    category: 'Engineering',
    difficulty: 'Intermediate',
    duration: '14-16 weeks',
    outcome: 'End-to-end SaaS project',
    portfolioOutcome: 'A deployed fullstack CRUD product with auth, dashboard, API, database, and responsive UI.',
    skills: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Authentication', 'REST APIs', 'Deployment'],
    roadmapSteps: [
      {
        stepId: 'fs-product-foundation',
        title: 'Product Scope & User Flows',
        description: 'Define product requirements, user roles, data entities, and the main workflows before coding.',
        order: 1,
        subtopics: ['User stories', 'Entity relationship mapping', 'MVP feature scoping'],
        externalResources: [
          { title: 'Writing Good User Stories', sourceName: 'Atlassian Agile Coach', url: 'https://www.atlassian.com/agile/project-management/user-stories' }
        ]
      },
      {
        stepId: 'fs-frontend-app',
        title: 'React Application Architecture',
        description: 'Create reusable pages, layouts, state containers, and form flows for a production-like frontend.',
        order: 2,
        subtopics: ['Route structure', 'Reusable components', 'Form validation'],
        externalResources: [
          { title: 'React Learn', sourceName: 'React.dev', url: 'https://react.dev/learn' }
        ]
      },
      {
        stepId: 'fs-backend-api',
        title: 'API & Database Layer',
        description: 'Design API endpoints, validation rules, database schemas, and error responses.',
        order: 3,
        subtopics: ['REST endpoints', 'Schema modeling', 'Request validation'],
        externalResources: [
          { title: 'Express Routing', sourceName: 'Express Docs', url: 'https://expressjs.com/en/guide/routing.html' }
        ]
      },
      {
        stepId: 'fs-auth-security',
        title: 'Authentication & Protected Features',
        description: 'Implement login, register, protected routes, token handling, and role-based permissions.',
        order: 4,
        subtopics: ['JWT auth', 'Protected routes', 'Role checks'],
        externalResources: [
          { title: 'JWT Introduction', sourceName: 'JWT.io', url: 'https://jwt.io/introduction' }
        ]
      },
      {
        stepId: 'fs-deploy-demo',
        title: 'Deployment & Demo Readiness',
        description: 'Deploy the app, prepare demo accounts, seed data, and document the end-to-end flow.',
        order: 5,
        subtopics: ['Environment variables', 'Seed data', 'Demo script'],
        externalResources: [
          { title: 'Vercel Deployment Documentation', sourceName: 'Vercel Docs', url: 'https://vercel.com/docs' }
        ]
      }
    ]
  },
  {
    careerId: 'data-analyst',
    careerTitle: 'Data Analyst',
    description: 'Turn raw data into business insight using spreadsheets, SQL, dashboards, and storytelling.',
    category: 'Data',
    difficulty: 'Beginner',
    duration: '8-10 weeks',
    outcome: 'Business insight dashboard',
    portfolioOutcome: 'A dashboard case study with cleaned data, SQL queries, charts, and recommendations.',
    skills: ['Excel', 'SQL', 'Data Cleaning', 'Statistics', 'Power BI', 'Tableau', 'Data Storytelling'],
    roadmapSteps: [
      {
        stepId: 'da-spreadsheets',
        title: 'Spreadsheet Analysis Foundations',
        description: 'Clean, transform, summarize, and validate tabular data using spreadsheet workflows.',
        order: 1,
        subtopics: ['Pivot tables', 'Lookup formulas', 'Data validation'],
        externalResources: [
          { title: 'Google Sheets Training', sourceName: 'Google Workspace Learning Center', url: 'https://support.google.com/a/users/answer/9282959' }
        ]
      },
      {
        stepId: 'da-sql',
        title: 'SQL for Analytics',
        description: 'Query relational data using filters, joins, aggregations, and window functions.',
        order: 2,
        subtopics: ['SELECT queries', 'Joins and grouping', 'Window functions'],
        externalResources: [
          { title: 'SQL Tutorial', sourceName: 'Mode Analytics', url: 'https://mode.com/sql-tutorial/' }
        ]
      },
      {
        stepId: 'da-visualization',
        title: 'Data Visualization Principles',
        description: 'Choose clear chart types, design dashboards, and avoid misleading visual patterns.',
        order: 3,
        subtopics: ['Chart selection', 'Dashboard layout', 'Data ink and clarity'],
        externalResources: [
          { title: 'Data Visualization Catalogue', sourceName: 'Dataviz Catalogue', url: 'https://datavizcatalogue.com/' }
        ]
      },
      {
        stepId: 'da-business-insight',
        title: 'Business Insight & Storytelling',
        description: 'Convert analysis into recommendations with context, tradeoffs, and measurable impact.',
        order: 4,
        subtopics: ['Insight framing', 'Executive summary', 'Recommendation writing'],
        externalResources: [
          { title: 'Storytelling with Data Blog', sourceName: 'Storytelling with Data', url: 'https://www.storytellingwithdata.com/blog' }
        ]
      },
      {
        stepId: 'da-portfolio-case',
        title: 'Portfolio Analytics Case Study',
        description: 'Create a complete analytics case study with dataset, queries, dashboard, and final recommendations.',
        order: 5,
        subtopics: ['Case study structure', 'Dashboard publishing', 'Insight presentation'],
        externalResources: [
          { title: 'Kaggle Datasets', sourceName: 'Kaggle', url: 'https://www.kaggle.com/datasets' }
        ]
      }
    ]
  },
  {
    careerId: 'ui-ux',
    careerTitle: 'UI/UX Designer',
    description: 'Research user needs, design usable interfaces, prototype flows, and build consistent design systems.',
    category: 'Design',
    difficulty: 'Beginner',
    duration: '10-12 weeks',
    outcome: 'Clickable product prototype',
    portfolioOutcome: 'A UX case study with research notes, wireframes, high-fidelity screens, and prototype link.',
    skills: ['User Research', 'Wireframing', 'Figma', 'Prototyping', 'Design Systems', 'Usability Testing'],
    roadmapSteps: [
      {
        stepId: 'ux-research',
        title: 'User Research & Problem Discovery',
        description: 'Understand user goals, pain points, contexts, and constraints before designing screens.',
        order: 1,
        subtopics: ['Interview scripts', 'Personas', 'Problem statements'],
        externalResources: [
          { title: 'UX Research Cheat Sheet', sourceName: 'Nielsen Norman Group', url: 'https://www.nngroup.com/articles/ux-research-cheat-sheet/' }
        ]
      },
      {
        stepId: 'ux-information-architecture',
        title: 'Information Architecture & User Flows',
        description: 'Map content, navigation, and task flows so users can complete goals efficiently.',
        order: 2,
        subtopics: ['User journeys', 'Navigation models', 'Task flows'],
        externalResources: [
          { title: 'Information Architecture Basics', sourceName: 'Usability.gov', url: 'https://www.usability.gov/what-and-why/information-architecture.html' }
        ]
      },
      {
        stepId: 'ux-wireframes',
        title: 'Wireframing & Interaction Design',
        description: 'Design low-fidelity screens that communicate layout, hierarchy, and interaction behavior.',
        order: 3,
        subtopics: ['Layout hierarchy', 'Interaction states', 'Form flows'],
        externalResources: [
          { title: 'Wireframing Guide', sourceName: 'Figma Resource Library', url: 'https://www.figma.com/resource-library/what-is-wireframing/' }
        ]
      },
      {
        stepId: 'ux-design-system',
        title: 'Visual UI & Design Systems',
        description: 'Create reusable components, tokens, color systems, and accessible UI patterns.',
        order: 4,
        subtopics: ['Component libraries', 'Color and typography', 'Accessibility basics'],
        externalResources: [
          { title: 'Material Design Foundations', sourceName: 'Material Design', url: 'https://m3.material.io/foundations' }
        ]
      },
      {
        stepId: 'ux-case-study',
        title: 'Prototype & UX Case Study',
        description: 'Build a clickable prototype and document the design process as a portfolio-ready case study.',
        order: 5,
        subtopics: ['Clickable prototypes', 'Usability test plan', 'Case study writing'],
        externalResources: [
          { title: 'UX Case Study Guide', sourceName: 'CareerFoundry', url: 'https://careerfoundry.com/en/blog/ux-design/ux-case-study/' }
        ]
      }
    ]
  },
  {
    careerId: 'qa-engineer',
    careerTitle: 'QA Engineer',
    description: 'Plan test strategies, write test cases, automate regression checks, and protect product quality.',
    category: 'Quality',
    difficulty: 'Beginner',
    duration: '8-10 weeks',
    outcome: 'Automated QA test suite',
    portfolioOutcome: 'A QA portfolio with test plan, bug reports, automated tests, and quality summary.',
    skills: ['Test Cases', 'Bug Reports', 'Postman', 'Playwright', 'Jest', 'Regression Testing', 'QA Strategy'],
    roadmapSteps: [
      {
        stepId: 'qa-testing-mindset',
        title: 'Testing Mindset & QA Process',
        description: 'Learn how QA protects user outcomes through risk analysis, clear acceptance criteria, and test planning.',
        order: 1,
        subtopics: ['Test planning', 'Acceptance criteria', 'Risk-based testing'],
        externalResources: [
          { title: 'Software Testing Basics', sourceName: 'Guru99', url: 'https://www.guru99.com/software-testing-introduction-importance.html' }
        ]
      },
      {
        stepId: 'qa-test-cases',
        title: 'Test Case Design',
        description: 'Write clear manual test cases for happy paths, edge cases, validation rules, and negative flows.',
        order: 2,
        subtopics: ['Boundary values', 'Equivalence classes', 'Negative testing'],
        externalResources: [
          { title: 'Test Case Design Techniques', sourceName: 'BrowserStack Guide', url: 'https://www.browserstack.com/guide/test-case-design-techniques' }
        ]
      },
      {
        stepId: 'qa-api-testing',
        title: 'API Testing with Postman',
        description: 'Validate backend endpoints, request payloads, auth flows, and response contracts.',
        order: 3,
        subtopics: ['Collections', 'Environment variables', 'API assertions'],
        externalResources: [
          { title: 'Postman Learning Center', sourceName: 'Postman Docs', url: 'https://learning.postman.com/' }
        ]
      },
      {
        stepId: 'qa-automation',
        title: 'UI Automation with Playwright',
        description: 'Automate browser checks for critical user flows and run regression tests reliably.',
        order: 4,
        subtopics: ['Selectors', 'Assertions', 'CI test runs'],
        externalResources: [
          { title: 'Playwright Documentation', sourceName: 'Playwright', url: 'https://playwright.dev/docs/intro' }
        ]
      },
      {
        stepId: 'qa-reporting',
        title: 'Bug Reporting & Quality Metrics',
        description: 'Write actionable bug reports and summarize quality risks for developers and stakeholders.',
        order: 5,
        subtopics: ['Bug reproduction', 'Severity and priority', 'QA summary reports'],
        externalResources: [
          { title: 'How to Write a Bug Report', sourceName: 'Atlassian', url: 'https://www.atlassian.com/agile/software-development/bug-report' }
        ]
      }
    ]
  },
  {
    careerId: 'product-manager',
    careerTitle: 'Product Manager',
    description: 'Discover user problems, prioritize roadmap decisions, align stakeholders, and measure product outcomes.',
    category: 'Product',
    difficulty: 'Intermediate',
    duration: '10-12 weeks',
    outcome: 'Product strategy case study',
    portfolioOutcome: 'A product case study with discovery notes, roadmap, metrics, and launch plan.',
    skills: ['User Discovery', 'Prioritization', 'Roadmapping', 'Metrics', 'Stakeholder Communication', 'Product Strategy'],
    roadmapSteps: [
      {
        stepId: 'pm-discovery',
        title: 'Product Discovery',
        description: 'Identify valuable problems through user interviews, market signals, and product analytics.',
        order: 1,
        subtopics: ['Problem framing', 'User interviews', 'Opportunity sizing'],
        externalResources: [
          { title: 'Continuous Discovery Habits', sourceName: 'Product Talk', url: 'https://www.producttalk.org/' }
        ]
      },
      {
        stepId: 'pm-prioritization',
        title: 'Prioritization Frameworks',
        description: 'Choose what to build by balancing impact, confidence, effort, risk, and strategy.',
        order: 2,
        subtopics: ['RICE scoring', 'MoSCoW', 'Tradeoff decisions'],
        externalResources: [
          { title: 'RICE Prioritization', sourceName: 'Intercom', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/' }
        ]
      },
      {
        stepId: 'pm-roadmap',
        title: 'Roadmap Planning',
        description: 'Translate product strategy into roadmap themes, releases, and measurable milestones.',
        order: 3,
        subtopics: ['Outcome roadmaps', 'Release planning', 'Dependencies'],
        externalResources: [
          { title: 'Product Roadmap Guide', sourceName: 'ProductPlan', url: 'https://www.productplan.com/learn/product-roadmap/' }
        ]
      },
      {
        stepId: 'pm-metrics',
        title: 'Product Metrics & Experiments',
        description: 'Define success metrics, read product funnels, and validate decisions with experiments.',
        order: 4,
        subtopics: ['North star metric', 'Funnels', 'Experiment design'],
        externalResources: [
          { title: 'AARRR Metrics Framework', sourceName: 'ProductPlan', url: 'https://www.productplan.com/glossary/aarrr-framework/' }
        ]
      },
      {
        stepId: 'pm-stakeholders',
        title: 'Stakeholder Communication',
        description: 'Write product briefs, align teams, handle tradeoffs, and communicate launch readiness.',
        order: 5,
        subtopics: ['PRDs', 'Launch notes', 'Stakeholder updates'],
        externalResources: [
          { title: 'Product Requirements Document Guide', sourceName: 'Atlassian', url: 'https://www.atlassian.com/agile/product-management/requirements' }
        ]
      }
    ]
  },
  {
    careerId: 'mobile-developer',
    careerTitle: 'Mobile Developer',
    description: 'Build mobile applications with polished navigation, API integration, local storage, and release workflows.',
    category: 'Engineering',
    difficulty: 'Intermediate',
    duration: '12-14 weeks',
    outcome: 'Published mobile app prototype',
    portfolioOutcome: 'A mobile app prototype with authentication, API data, local persistence, and release notes.',
    skills: ['React Native', 'Mobile UI', 'Navigation', 'API Integration', 'Async Storage', 'App Release'],
    roadmapSteps: [
      {
        stepId: 'mb-mobile-foundations',
        title: 'Mobile App Foundations',
        description: 'Understand mobile constraints, platform patterns, navigation, and touch-first interface expectations.',
        order: 1,
        subtopics: ['Mobile UX patterns', 'Platform differences', 'Responsive app layouts'],
        externalResources: [
          { title: 'React Native Introduction', sourceName: 'React Native Docs', url: 'https://reactnative.dev/docs/getting-started' }
        ]
      },
      {
        stepId: 'mb-navigation',
        title: 'Navigation & Screen Architecture',
        description: 'Structure app screens, tabs, stacks, route params, and protected navigation flows.',
        order: 2,
        subtopics: ['Stack navigation', 'Tabs', 'Route params'],
        externalResources: [
          { title: 'React Navigation Docs', sourceName: 'React Navigation', url: 'https://reactnavigation.org/docs/getting-started' }
        ]
      },
      {
        stepId: 'mb-api-state',
        title: 'API Integration & App State',
        description: 'Connect mobile screens to backend APIs, handle loading states, errors, and cached data.',
        order: 3,
        subtopics: ['Fetch clients', 'Loading states', 'Offline-friendly state'],
        externalResources: [
          { title: 'Networking in React Native', sourceName: 'React Native Docs', url: 'https://reactnative.dev/docs/network' }
        ]
      },
      {
        stepId: 'mb-device-features',
        title: 'Device Features & Local Storage',
        description: 'Use local storage, media picking, permissions, and device APIs safely.',
        order: 4,
        subtopics: ['Async storage', 'Permissions', 'Media picker'],
        externalResources: [
          { title: 'Expo SDK Documentation', sourceName: 'Expo Docs', url: 'https://docs.expo.dev/versions/latest/' }
        ]
      },
      {
        stepId: 'mb-release',
        title: 'Testing & Release Preparation',
        description: 'Prepare builds, test core flows, write release notes, and package the app for reviewers.',
        order: 5,
        subtopics: ['Build profiles', 'App testing', 'Release checklist'],
        externalResources: [
          { title: 'Expo Build and Submit', sourceName: 'Expo Docs', url: 'https://docs.expo.dev/build/introduction/' }
        ]
      }
    ]
  },
  {
    careerId: 'ai-ml',
    careerTitle: 'AI/ML Engineer',
    description: 'Learn Python, data preparation, model training, evaluation, and practical AI integration for products.',
    category: 'AI',
    difficulty: 'Advanced',
    duration: '14-18 weeks',
    outcome: 'Applied AI demo project',
    portfolioOutcome: 'An applied AI project with dataset notes, evaluation metrics, and product integration demo.',
    skills: ['Python', 'Pandas', 'Machine Learning', 'Model Evaluation', 'Prompt Engineering', 'AI APIs', 'MLOps Basics'],
    roadmapSteps: [
      {
        stepId: 'ai-python-data',
        title: 'Python for Data Work',
        description: 'Use Python notebooks, data structures, and libraries to inspect and transform datasets.',
        order: 1,
        subtopics: ['Python basics', 'Jupyter notebooks', 'Pandas dataframes'],
        externalResources: [
          { title: 'Python for Everybody', sourceName: 'PY4E', url: 'https://www.py4e.com/' }
        ]
      },
      {
        stepId: 'ai-data-prep',
        title: 'Data Preparation & Feature Thinking',
        description: 'Clean datasets, handle missing values, engineer features, and avoid leakage.',
        order: 2,
        subtopics: ['Missing values', 'Feature engineering', 'Train-test split'],
        externalResources: [
          { title: 'Pandas User Guide', sourceName: 'Pandas Docs', url: 'https://pandas.pydata.org/docs/user_guide/' }
        ]
      },
      {
        stepId: 'ai-model-basics',
        title: 'Machine Learning Model Basics',
        description: 'Train baseline models and understand classification, regression, and evaluation metrics.',
        order: 3,
        subtopics: ['Classification', 'Regression', 'Model metrics'],
        externalResources: [
          { title: 'Scikit-learn User Guide', sourceName: 'scikit-learn', url: 'https://scikit-learn.org/stable/user_guide.html' }
        ]
      },
      {
        stepId: 'ai-product-integration',
        title: 'AI Product Integration',
        description: 'Integrate model or AI API outputs into a product workflow with guardrails and clear UX.',
        order: 4,
        subtopics: ['AI API calls', 'Prompt design', 'Fallback states'],
        externalResources: [
          { title: 'OpenAI API Documentation', sourceName: 'OpenAI Docs', url: 'https://platform.openai.com/docs' }
        ]
      },
      {
        stepId: 'ai-evaluation-demo',
        title: 'Evaluation & Demo Packaging',
        description: 'Evaluate model behavior, document limitations, and package the project for stakeholder review.',
        order: 5,
        subtopics: ['Evaluation metrics', 'Error analysis', 'Demo writeup'],
        externalResources: [
          { title: 'Machine Learning Crash Course', sourceName: 'Google Developers', url: 'https://developers.google.com/machine-learning/crash-course' }
        ]
      }
    ]
  }
];
