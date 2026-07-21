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
    skills: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Vite', 'React', 'Zustand'],
    roadmapSteps: [
      {
        stepId: 'fe-internet',
        title: '1. Internet & Web Protocols',
        description: 'Understand the fundamental architecture of the web: DNS servers, domain hosting, client-server models, and secure HTTP request lifecycles.',
        order: 1,
        subtopics: ['DNS & Name Servers', 'HTTP/HTTPS Requests & Response Codes', 'Domain Registration & Hosting Models'],
        externalResources: [
          { title: 'How the Web Works', sourceName: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works' }
        ]
      },
      {
        stepId: 'fe-html-css',
        title: '2. HTML & CSS Layout Architecture',
        description: 'Construct pages using semantic tags and style them using modern layout engines like Grid and Flexbox for responsive designs.',
        order: 2,
        subtopics: ['Semantic markup systems', 'CSS Flexbox alignment model', 'CSS Grid template specifications'],
        externalResources: [
          { title: 'CSS Grid Guide', sourceName: 'CSS-Tricks Documentation', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' }
        ]
      },
      {
        stepId: 'fe-javascript',
        title: '3. Asynchronous JavaScript & DOM',
        description: 'Learn modern ES6+ runtime mechanics, asynchronous flows via Promises and async-await, and DOM event bindings.',
        order: 3,
        subtopics: ['ESNext modules and lexical scoping', 'Event Loop mechanics', 'Promises, microtasks, and async actions'],
        externalResources: [
          { title: 'Modern JS Tutorial', sourceName: 'JavaScript.info Guide', url: 'https://javascript.info/' }
        ]
      },
      {
        stepId: 'fe-css-frameworks',
        title: '4. CSS Frameworks & Tailwind',
        description: 'Master modern responsive layout styles using Tailwind CSS utility classes and design system custom tokens.',
        order: 4,
        subtopics: ['Tailwind CSS core styles', 'Utility-first design concept', 'Responsive grid configurations'],
        externalResources: [
          { title: 'Tailwind CSS Reference Docs', sourceName: 'TailwindCSS Official Guide', url: 'https://tailwindcss.com/docs' }
        ]
      },
      {
        stepId: 'fe-typescript',
        title: '5. TypeScript & Structural Typing',
        description: 'Bring compile-time type safety to your JavaScript projects by declaring type interfaces, unions, and generics.',
        order: 5,
        subtopics: ['Type interfaces vs Types alias', 'Generics and custom types', 'Configuring tsconfig files'],
        externalResources: [
          { title: 'TypeScript Handbook', sourceName: 'TypeScriptLang Reference Docs', url: 'https://www.typescriptlang.org/docs/' }
        ]
      },
      {
        stepId: 'fe-build-tools',
        title: '6. Build Tools & Bundlers',
        description: 'Compile, bundle, and hot-reload front-end applications efficiently using modern build bundlers.',
        order: 6,
        subtopics: ['Vite configuration and plugins', 'npm/pnpm package dependency maps', 'Hot Module Replacement mechanics'],
        externalResources: [
          { title: 'Vite Official Guide', sourceName: 'ViteJS Documentation', url: 'https://vite.dev/guide/' }
        ]
      },
      {
        stepId: 'fe-react',
        title: '7. React Framework & Hook Models',
        description: 'Implement complex modular user interfaces using component-driven declarative design, rendering cycles, and state variables.',
        order: 7,
        subtopics: ['Fiber reconciler cycle', 'Hook flows (useState, useEffect, useMemo)', 'Local and state management contexts'],
        externalResources: [
          { title: 'React Developer Documentation', sourceName: 'React.dev Reference', url: 'https://react.dev/' }
        ]
      },
      {
        stepId: 'fe-state-management',
        title: '8. State Management & Clients',
        description: 'Manage shared application state globally and sync it using lightweight modular stores and custom clients.',
        order: 8,
        subtopics: ['Zustand state store design', 'Axios http interceptors configuration', 'React Context API constraints'],
        externalResources: [
          { title: 'Zustand Documentation', sourceName: 'Zustand GitHub Docs', url: 'https://zustand.docs.pmnd.rs/getting-started/introduction' }
        ]
      }
    ]
  },
  {
    careerId: 'backend',
    careerTitle: 'Backend Developer',
    description: 'Learn to design APIs, structure relational/non-relational databases, write business logic, and handle scaling.',
    category: 'Engineering',
    difficulty: 'Intermediate',
    duration: '12-14 weeks',
    outcome: 'Secure production API',
    portfolioOutcome: 'A documented REST API with authentication, database models, tests, and deployment notes.',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'JWT Security', 'Redis', 'Jest', 'Docker'],
    roadmapSteps: [
      {
        stepId: 'be-runtime',
        title: '1. JavaScript Runtime (Node.js)',
        description: 'Understand writing server-side JavaScript using the Node.js runtime environment, filesystem utilities, and package dependencies.',
        order: 1,
        subtopics: ['Event-driven asynchronous I/O', 'Node Package Manager syntax', 'Environment configurations'],
        externalResources: [
          { title: 'Node.js Developer Guide', sourceName: 'NodeJS.org Reference', url: 'https://nodejs.org/en/docs' }
        ]
      },
      {
        stepId: 'be-apis',
        title: '2. REST API Design & Routing',
        description: 'Build endpoints using correct HTTP methods, payload formats, status codes, query strings, and request parsers.',
        order: 2,
        subtopics: ['REST architectural principles', 'Express routing and middleware configuration', 'JSON serialization'],
        externalResources: [
          { title: 'HTTP Status Response Codes Reference', sourceName: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' }
        ]
      },
      {
        stepId: 'be-databases',
        title: '3. Relational Databases (PostgreSQL)',
        description: 'Design database tables, indexes, constraints, write structured queries, and handle migrations.',
        order: 3,
        subtopics: ['Database normalization rules', 'SQL query join optimization', 'ACID transactions specifications'],
        externalResources: [
          { title: 'PostgreSQL Manuals', sourceName: 'PostgreSQL.org Reference Docs', url: 'https://www.postgresql.org/docs/' }
        ]
      },
      {
        stepId: 'be-nosql',
        title: '4. NoSQL Databases (MongoDB)',
        description: 'Structure unstructured datasets using document-based schemas and index mappings in Mongoose.',
        order: 4,
        subtopics: ['Document vs Relational designs', 'Mongoose schema validations', 'Aggregate query structures'],
        externalResources: [
          { title: 'Mongoose Schema Reference Guide', sourceName: 'Mongoose Documentation', url: 'https://mongoosejs.com/docs/guide.html' }
        ]
      },
      {
        stepId: 'be-security',
        title: '5. API Authentication & Token Security',
        description: 'Secure backend resources using JSON Web Tokens (JWT), session cookies, secure storage, and request rate-limiting.',
        order: 5,
        subtopics: ['JWT signature verification', 'CORS rules and cross-origin controls', 'Hash mechanisms for passwords'],
        externalResources: [
          { title: 'JWT Introduction', sourceName: 'JWT.io Specs', url: 'https://jwt.io/introduction/' }
        ]
      },
      {
        stepId: 'be-caching',
        title: '6. Caching & Performance',
        description: 'Optimize resource intensive databases queries and decrease response latency using Redis key-value cache layer.',
        order: 6,
        subtopics: ['Redis data structures', 'Cache invalidation patterns', 'In-memory caching architectures'],
        externalResources: [
          { title: 'Redis Developers Hub', sourceName: 'Redis Official Tutorials', url: 'https://redis.io/docs/latest/develop/' }
        ]
      },
      {
        stepId: 'be-testing-docs',
        title: '7. Testing & API Documentation',
        description: 'Write automated unit and integration tests and expose interactive API schema definitions using Swagger.',
        order: 7,
        subtopics: ['Jest unit testing syntax', 'Supertest express endpoint mock assertions', 'Swagger Open API templates'],
        externalResources: [
          { title: 'Jest Documentation', sourceName: 'Jest Testing Official Docs', url: 'https://jestjs.io/docs/getting-started' }
        ]
      },
      {
        stepId: 'be-deployment',
        title: '8. Process Management & Deployment',
        description: 'Keep server runtimes running continuously using process supervisors and deploy isolated Docker containers.',
        order: 8,
        subtopics: ['PM2 daemon thread process management', 'Docker backend container configuration', 'Logging rotation patterns'],
        externalResources: [
          { title: 'PM2 Process Manager Quick Start', sourceName: 'PM2 Official Documentation', url: 'https://pm2.keymetrics.io/docs/usage/quick-start/' }
        ]
      }
    ]
  },
  {
    careerId: 'devops',
    careerTitle: 'DevOps Engineer',
    description: 'Automate build pipelines, orchestrate container clusters, and manage cloud infrastructure reliably.',
    category: 'Infrastructure',
    difficulty: 'Advanced',
    duration: '14-16 weeks',
    outcome: 'Cloud deployment pipeline',
    portfolioOutcome: 'A containerized app with CI/CD, infrastructure notes, monitoring, and deployment runbook.',
    skills: ['Linux', 'Nginx', 'Docker', 'GitHub Actions', 'Kubernetes', 'Terraform', 'AWS', 'Prometheus'],
    roadmapSteps: [
      {
        stepId: 'do-linux',
        title: '1. Linux Systems & Shell Scripting',
        description: 'Master Unix directory architectures, process controls, user permissions, network diagnostics, and shell tools.',
        order: 1,
        subtopics: ['POSIX standard commands', 'Bash scripts variables', 'SSH and keys exchange methods'],
        externalResources: [
          { title: 'GNU Bash Manual', sourceName: 'GNU Software Reference', url: 'https://www.gnu.org/software/bash/manual/' }
        ]
      },
      {
        stepId: 'do-web-servers',
        title: '2. Web Servers & Reverse Proxies',
        description: 'Route client requests to internal networks and handle TLS termination setups on web reverse proxy systems.',
        order: 2,
        subtopics: ['Nginx reverse proxy configurations', 'SSL certbot registration setups', 'Rate limit rules definitions'],
        externalResources: [
          { title: 'Nginx Beginner Guide', sourceName: 'Nginx Documentation Engine', url: 'http://nginx.org/en/docs/beginners_guide.html' }
        ]
      },
      {
        stepId: 'do-containers',
        title: '3. Containerization (Docker)',
        description: 'Isolate services into lightweight containers. Write custom configurations to compile performant containers.',
        order: 3,
        subtopics: ['Layered filesystem builds', 'Multi-stage builds optimizations', 'Network bridges specifications'],
        externalResources: [
          { title: 'Docker Guide and Reference Docs', sourceName: 'Docker Docs Manual', url: 'https://docs.docker.com/' }
        ]
      },
      {
        stepId: 'do-pipelines',
        title: '4. Continuous Integration & Pipelines',
        description: 'Build pipelines that test, build, lint, and deploy code changes dynamically to cluster instances.',
        order: 4,
        subtopics: ['Pipeline triggers configuration', 'Cache build dependencies strategies', 'Deploy tokens storage'],
        externalResources: [
          { title: 'GitHub Actions Documentation', sourceName: 'GitHub Documentation Reference', url: 'https://docs.github.com/en/actions' }
        ]
      },
      {
        stepId: 'do-k8s',
        title: '5. Container Orchestration (Kubernetes)',
        description: 'Manage clusters of containers across distributed networks. Automate scalability and fault tolerance.',
        order: 5,
        subtopics: ['Deployments, pods, and services mapping', 'ConfigMaps and Secrets mounting', 'Ingress controller systems'],
        externalResources: [
          { title: 'Kubernetes Overview and API Docs', sourceName: 'Kubernetes.io Specs', url: 'https://kubernetes.io/docs/home/' }
        ]
      },
      {
        stepId: 'do-iac',
        title: '6. Infrastructure as Code (Terraform)',
        description: 'Provision virtual resources in a descriptive syntax format, enabling repeatable server configurations.',
        order: 6,
        subtopics: ['Terraform providers parameters', 'State locking mechanisms', 'Resources modules nesting configurations'],
        externalResources: [
          { title: 'Terraform Introduction Tutorial', sourceName: 'HashiCorp Learn Docs', url: 'https://developer.hashicorp.com/terraform/intro' }
        ]
      },
      {
        stepId: 'do-cloud',
        title: '7. Cloud Architecture (AWS)',
        description: 'Architect networks, compute nodes, firewalls, and cloud storage pools within Amazon Web Services.',
        order: 7,
        subtopics: ['IAM security rules maps', 'VPC routing tables and subnets', 'EC2 and S3 storage instances'],
        externalResources: [
          { title: 'AWS Cloud Practitioner Basics', sourceName: 'AWS Documentation Hub', url: 'https://docs.aws.amazon.com/' }
        ]
      },
      {
        stepId: 'do-monitoring',
        title: '8. Monitoring & Logging Analytics',
        description: 'Track resource utilization rates and check error log indexes using Prometheus metric scraping servers.',
        order: 8,
        subtopics: ['PromQL query syntax patterns', 'Grafana dashboards telemetry integration', 'Alertmanager routes settings'],
        externalResources: [
          { title: 'Prometheus Introduction Guide', sourceName: 'Prometheus.io Official Manual', url: 'https://prometheus.io/docs/introduction/overview/' }
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
