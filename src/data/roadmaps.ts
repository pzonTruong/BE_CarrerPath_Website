export const roadmapCatalog = [
  {
    careerId: 'frontend',
    careerTitle: 'Frontend Developer',
    description: 'Learn to structure, style, and build highly interactive, modern client-side web interfaces.',
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
  }
];
