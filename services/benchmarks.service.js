// /**
//  * Role-specific keyword benchmarks
//  * Used to score resumes without a JD
//  * Each role has: mustHave, niceToHave, actionVerbs
//  */

// const ROLE_BENCHMARKS = {
//   // ── BACKEND ──────────────────────────────────────────────
//   'Backend Engineer': {
//     mustHave: ['api', 'database', 'server', 'backend', 'rest', 'sql', 'python', 'java', 'node', 'microservices'],
//     niceToHave: ['docker', 'kubernetes', 'redis', 'kafka', 'aws', 'postgresql', 'mongodb', 'graphql', 'ci/cd'],
//     actionVerbs: ['built', 'developed', 'designed', 'optimized', 'deployed', 'architected', 'scaled', 'implemented'],
//   },
//   'Full Stack Engineer': {
//     mustHave: ['frontend', 'backend', 'api', 'database', 'javascript', 'react', 'node', 'sql', 'html', 'css'],
//     niceToHave: ['typescript', 'docker', 'aws', 'mongodb', 'graphql', 'redux', 'next.js', 'testing'],
//     actionVerbs: ['built', 'developed', 'designed', 'deployed', 'implemented', 'integrated', 'shipped'],
//   },
//   'Python Engineer': {
//     mustHave: ['python', 'django', 'flask', 'fastapi', 'rest', 'api', 'sql', 'database'],
//     niceToHave: ['celery', 'redis', 'docker', 'aws', 'postgresql', 'asyncio', 'sqlalchemy', 'pytest'],
//     actionVerbs: ['built', 'developed', 'optimized', 'automated', 'deployed', 'designed', 'implemented'],
//   },

//   // ── FRONTEND ─────────────────────────────────────────────
//   'Frontend Engineer': {
//     mustHave: ['javascript', 'html', 'css', 'react', 'ui', 'responsive', 'web', 'component'],
//     niceToHave: ['typescript', 'next.js', 'redux', 'testing', 'webpack', 'figma', 'accessibility', 'performance'],
//     actionVerbs: ['built', 'designed', 'developed', 'implemented', 'optimized', 'shipped', 'created'],
//   },
//   'React Developer': {
//     mustHave: ['react', 'javascript', 'html', 'css', 'component', 'hooks', 'state', 'props'],
//     niceToHave: ['typescript', 'redux', 'next.js', 'testing', 'jest', 'webpack', 'api', 'responsive'],
//     actionVerbs: ['built', 'developed', 'implemented', 'designed', 'optimized', 'created', 'shipped'],
//   },

//   // ── DATA ──────────────────────────────────────────────────
//   'Data Analyst': {
//     mustHave: ['data', 'sql', 'excel', 'analysis', 'reporting', 'dashboard', 'visualization', 'python'],
//     niceToHave: ['tableau', 'power bi', 'r', 'statistics', 'a/b testing', 'etl', 'bigquery', 'looker'],
//     actionVerbs: ['analyzed', 'reported', 'visualized', 'identified', 'improved', 'built', 'created', 'presented'],
//   },
//   'Data Scientist': {
//     mustHave: ['python', 'machine learning', 'statistics', 'model', 'data', 'sql', 'analysis'],
//     niceToHave: ['tensorflow', 'pytorch', 'scikit-learn', 'spark', 'deep learning', 'nlp', 'computer vision', 'feature engineering'],
//     actionVerbs: ['analyzed', 'built', 'predicted', 'improved', 'trained', 'developed', 'designed', 'deployed'],
//   },
//   'Data Engineer': {
//     mustHave: ['pipeline', 'etl', 'sql', 'python', 'data warehouse', 'spark', 'airflow', 'database'],
//     niceToHave: ['kafka', 'hadoop', 'bigquery', 'snowflake', 'dbt', 'aws', 'redshift', 'docker'],
//     actionVerbs: ['built', 'designed', 'optimized', 'developed', 'automated', 'migrated', 'implemented'],
//   },

//   // ── ML / AI ───────────────────────────────────────────────
//   'Machine Learning Engineer': {
//     mustHave: ['machine learning', 'python', 'model', 'training', 'tensorflow', 'pytorch', 'data', 'algorithms'],
//     niceToHave: ['mlops', 'kubernetes', 'docker', 'feature engineering', 'deployment', 'monitoring', 'nlp', 'computer vision'],
//     actionVerbs: ['trained', 'built', 'deployed', 'optimized', 'developed', 'improved', 'implemented', 'designed'],
//   },
//   'AI Engineer': {
//     mustHave: ['ai', 'llm', 'python', 'machine learning', 'model', 'prompt', 'api', 'nlp'],
//     niceToHave: ['langchain', 'openai', 'vector database', 'rag', 'fine-tuning', 'embeddings', 'docker', 'deployment'],
//     actionVerbs: ['built', 'developed', 'deployed', 'integrated', 'designed', 'implemented', 'optimized'],
//   },

//   // ── DEVOPS / CLOUD ────────────────────────────────────────
//   'DevOps Engineer': {
//     mustHave: ['ci/cd', 'docker', 'kubernetes', 'linux', 'automation', 'pipeline', 'aws', 'terraform'],
//     niceToHave: ['ansible', 'helm', 'monitoring', 'prometheus', 'grafana', 'jenkins', 'github actions', 'security'],
//     actionVerbs: ['automated', 'deployed', 'built', 'optimized', 'managed', 'designed', 'implemented', 'reduced'],
//   },
//   'Cloud Engineer': {
//     mustHave: ['aws', 'azure', 'gcp', 'cloud', 'infrastructure', 'terraform', 'kubernetes', 'docker'],
//     niceToHave: ['serverless', 'lambda', 'networking', 'security', 'cost optimization', 'iam', 'vpc', 'load balancing'],
//     actionVerbs: ['designed', 'migrated', 'built', 'optimized', 'deployed', 'architected', 'implemented', 'reduced'],
//   },

//   // ── PRODUCT ───────────────────────────────────────────────
//   'Product Manager': {
//     mustHave: ['product', 'roadmap', 'stakeholder', 'user', 'requirements', 'agile', 'sprint', 'strategy'],
//     niceToHave: ['jira', 'analytics', 'a/b testing', 'metrics', 'okr', 'gtm', 'wireframe', 'sql'],
//     actionVerbs: ['launched', 'led', 'defined', 'prioritized', 'collaborated', 'drove', 'shipped', 'improved'],
//   },
//   'UX Designer': {
//     mustHave: ['ux', 'ui', 'figma', 'user research', 'wireframe', 'prototype', 'design', 'usability'],
//     niceToHave: ['sketch', 'invision', 'user testing', 'accessibility', 'design system', 'interaction design', 'a/b testing'],
//     actionVerbs: ['designed', 'researched', 'prototyped', 'tested', 'improved', 'created', 'collaborated', 'delivered'],
//   },

//   // ── MARKETING ─────────────────────────────────────────────
//   'Digital Marketing Manager': {
//     mustHave: ['digital marketing', 'seo', 'sem', 'google ads', 'analytics', 'campaign', 'content', 'social media'],
//     niceToHave: ['email marketing', 'crm', 'hubspot', 'a/b testing', 'conversion', 'roi', 'budget', 'automation'],
//     actionVerbs: ['drove', 'grew', 'managed', 'increased', 'launched', 'optimized', 'executed', 'generated'],
//   },

//   // ── FINANCE ───────────────────────────────────────────────
//   'Financial Analyst': {
//     mustHave: ['financial analysis', 'excel', 'financial modeling', 'forecasting', 'budget', 'reporting', 'variance', 'sql'],
//     niceToHave: ['power bi', 'tableau', 'python', 'erp', 'sap', 'accounting', 'dcf', 'valuation'],
//     actionVerbs: ['analyzed', 'forecasted', 'reported', 'built', 'identified', 'improved', 'presented', 'managed'],
//   },

//   // ── HR ────────────────────────────────────────────────────
//   'HR Manager': {
//     mustHave: ['recruitment', 'onboarding', 'employee relations', 'hr', 'talent', 'performance', 'compliance', 'policy'],
//     niceToHave: ['hris', 'workday', 'adp', 'compensation', 'training', 'diversity', 'analytics', 'labor law'],
//     actionVerbs: ['managed', 'recruited', 'developed', 'implemented', 'led', 'reduced', 'improved', 'designed'],
//   },

//   // ── SALES ─────────────────────────────────────────────────
//   'Account Executive': {
//     mustHave: ['sales', 'revenue', 'quota', 'pipeline', 'crm', 'closing', 'prospecting', 'b2b'],
//     niceToHave: ['salesforce', 'hubspot', 'enterprise', 'negotiation', 'demo', 'outreach', 'forecasting'],
//     actionVerbs: ['closed', 'grew', 'exceeded', 'generated', 'prospected', 'managed', 'drove', 'increased'],
//   },

//   // ── QA ────────────────────────────────────────────────────
//   'QA Engineer': {
//     mustHave: ['testing', 'quality assurance', 'test cases', 'bug', 'automation', 'selenium', 'regression', 'qa'],
//     niceToHave: ['cypress', 'jest', 'postman', 'api testing', 'performance testing', 'ci/cd', 'jira', 'agile'],
//     actionVerbs: ['tested', 'automated', 'identified', 'reported', 'improved', 'designed', 'executed', 'reduced'],
//   },

//   // ── DEFAULT (fallback) ────────────────────────────────────
//   'default': {
//     mustHave: ['experience', 'skills', 'project', 'team', 'results', 'communication'],
//     niceToHave: ['leadership', 'analytical', 'problem solving', 'stakeholder', 'management'],
//     actionVerbs: ['led', 'managed', 'developed', 'implemented', 'improved', 'delivered', 'achieved'],
//   },
// };

// /**
//  * Calculate keyword match score against role benchmark
//  */
// function calculateBenchmarkKeywordMatch(resumeText, jobFunction) {
//   const benchmark = ROLE_BENCHMARKS[jobFunction] || ROLE_BENCHMARKS['default'];
//   const text = resumeText.toLowerCase();

//   let matchedMust = 0;
//   let matchedNice = 0;
//   let matchedVerbs = 0;

//   const matchedKeywords = [];
//   const missingKeywords = [];

//   // Must-have keywords (weighted 60%)
//   for (const kw of benchmark.mustHave) {
//     if (text.includes(kw.toLowerCase())) {
//       matchedMust++;
//       matchedKeywords.push(kw);
//     } else {
//       missingKeywords.push(kw);
//     }
//   }

//   // Nice-to-have keywords (weighted 30%)
//   for (const kw of benchmark.niceToHave) {
//     if (text.includes(kw.toLowerCase())) {
//       matchedNice++;
//       matchedKeywords.push(kw);
//     }
//   }

//   // Action verbs (weighted 10%)
//   for (const verb of benchmark.actionVerbs) {
//     if (text.includes(verb.toLowerCase())) {
//       matchedVerbs++;
//     }
//   }

//   const mustScore = benchmark.mustHave.length > 0
//     ? (matchedMust / benchmark.mustHave.length) * 100 : 50;
//   const niceScore = benchmark.niceToHave.length > 0
//     ? (matchedNice / benchmark.niceToHave.length) * 100 : 50;
//   const verbScore = benchmark.actionVerbs.length > 0
//     ? (matchedVerbs / benchmark.actionVerbs.length) * 100 : 50;

//   const finalScore = Math.round((mustScore * 0.6) + (niceScore * 0.3) + (verbScore * 0.1));

//   return {
//     keywordScore: Math.min(finalScore, 100),
//     matchedKeywords,
//     missingKeywords: missingKeywords.slice(0, 8), // Top 8 missing
//     matchedCount: matchedMust + matchedNice,
//     totalKeywords: benchmark.mustHave.length + benchmark.niceToHave.length,
//   };
// }

// module.exports = { ROLE_BENCHMARKS, calculateBenchmarkKeywordMatch };
/**
 * Role-specific keyword benchmarks — v2
 *
 * KEY FIXES vs v1:
 * 1. Synonym groups: matching ANY synonym in the group counts as 1 match
 *    e.g. ['machine learning', 'ml'] — resume only needs one of these
 * 2. 40+ roles instead of 20 — fewer resumes fall to the weak 'default' benchmark
 * 3. Looser must-have lists: only truly universal terms per role (5 max)
 * 4. Role aliases map: catches Cohere returning "Software Engineer" → maps to best benchmark
 * 5. Scoring: floors prevent anyone getting crushed by an imperfect role match
 */

// Each keyword entry is EITHER:
//   - a string: exact substring match
//   - an array: match if ANY element found (synonym group)
const ROLE_BENCHMARKS = {

  // ── BACKEND ────────────────────────────────────────────────────
  'Backend Engineer': {
    mustHave: [
      ['api', 'rest api', 'restful', 'rest'],
      ['database', 'db', 'sql', 'mysql', 'postgresql', 'postgres', 'sqlite'],
      ['backend', 'server-side', 'server side', 'server'],
      ['python', 'java', 'go', 'golang', 'node', 'nodejs', 'node.js', 'ruby', 'php', 'c#', '.net', 'kotlin', 'scala'],
      ['developed', 'built', 'engineered', 'implemented', 'designed'],
    ],
    niceToHave: [
      ['docker', 'containerization', 'containers'],
      ['kubernetes', 'k8s'],
      ['redis', 'memcached', 'cache', 'caching'],
      ['kafka', 'rabbitmq', 'message queue', 'pubsub'],
      ['aws', 'azure', 'gcp', 'cloud'],
      ['microservices', 'distributed systems', 'distributed'],
      ['graphql'],
      ['ci/cd', 'github actions', 'jenkins', 'gitlab ci', 'pipeline'],
      ['mongodb', 'nosql', 'dynamodb', 'cassandra'],
    ],
    actionVerbs: ['built', 'developed', 'designed', 'optimized', 'deployed', 'architected', 'scaled', 'implemented', 'engineered', 'created'],
  },

  'Full Stack Engineer': {
    mustHave: [
      ['javascript', 'typescript', 'js', 'ts'],
      ['react', 'vue', 'angular', 'svelte', 'next.js', 'nextjs', 'nuxt'],
      ['node', 'nodejs', 'node.js', 'express', 'fastify', 'backend'],
      ['database', 'sql', 'mongodb', 'postgresql', 'mysql', 'sqlite'],
      ['api', 'rest', 'http'],
    ],
    niceToHave: [
      ['html', 'css', 'html5'],
      ['docker', 'kubernetes'],
      ['aws', 'gcp', 'azure', 'cloud'],
      ['graphql', 'trpc'],
      ['redux', 'zustand', 'recoil', 'state management'],
      ['testing', 'jest', 'cypress', 'vitest', 'playwright'],
      ['ci/cd', 'github actions'],
      ['typescript'],
    ],
    actionVerbs: ['built', 'developed', 'shipped', 'deployed', 'integrated', 'designed', 'implemented', 'launched', 'created'],
  },

  'Python Engineer': {
    mustHave: [
      ['python'],
      ['django', 'flask', 'fastapi', 'aiohttp', 'starlette'],
      ['api', 'rest', 'backend', 'server'],
      ['sql', 'postgresql', 'mysql', 'sqlite', 'database'],
    ],
    niceToHave: [
      ['celery', 'rq', 'task queue'],
      ['redis'],
      ['docker'],
      ['aws', 'gcp', 'azure'],
      ['sqlalchemy', 'alembic', 'orm'],
      ['pytest', 'unittest', 'testing'],
      ['asyncio', 'async', 'asynchronous'],
      ['pydantic', 'marshmallow'],
    ],
    actionVerbs: ['built', 'developed', 'optimized', 'automated', 'deployed', 'designed', 'implemented', 'wrote'],
  },

  'Node.js Developer': {
    mustHave: [
      ['node', 'nodejs', 'node.js'],
      ['javascript', 'typescript'],
      ['express', 'fastify', 'koa', 'hapi', 'nestjs', 'nest'],
      ['api', 'rest', 'backend'],
    ],
    niceToHave: [
      ['mongodb', 'mongoose'],
      ['postgresql', 'mysql', 'sql'],
      ['redis'],
      ['docker'],
      ['aws', 'gcp', 'azure'],
      ['graphql'],
      ['testing', 'jest', 'mocha', 'chai'],
      ['microservices'],
    ],
    actionVerbs: ['built', 'developed', 'designed', 'deployed', 'implemented', 'optimized', 'created', 'shipped'],
  },

  // ── FRONTEND ───────────────────────────────────────────────────
  'Frontend Engineer': {
    mustHave: [
      ['javascript', 'typescript', 'js'],
      ['html', 'html5'],
      ['css', 'scss', 'sass', 'tailwind', 'styled components', 'styles'],
      ['react', 'vue', 'angular', 'svelte', 'web'],
      ['component', 'components', 'ui'],
    ],
    niceToHave: [
      ['next.js', 'nuxt', 'ssr', 'ssg', 'nextjs'],
      ['redux', 'zustand', 'recoil', 'state management'],
      ['testing', 'jest', 'cypress', 'playwright', 'vitest'],
      ['webpack', 'vite', 'parcel', 'bundler'],
      ['figma', 'sketch', 'design'],
      ['accessibility', 'wcag', 'a11y'],
      ['performance', 'core web vitals', 'lighthouse', 'optimization'],
      ['typescript'],
    ],
    actionVerbs: ['built', 'designed', 'developed', 'implemented', 'optimized', 'shipped', 'created', 'crafted'],
  },

  'React Developer': {
    mustHave: [
      ['react', 'react.js', 'reactjs'],
      ['javascript', 'typescript', 'js'],
      ['component', 'components'],
      ['hooks', 'usestate', 'useeffect', 'usememo', 'hook'],
      ['html', 'css'],
    ],
    niceToHave: [
      ['typescript', 'ts'],
      ['redux', 'zustand', 'context api', 'state management'],
      ['next.js', 'gatsby', 'nextjs'],
      ['testing', 'jest', 'react testing library', 'rtl'],
      ['webpack', 'vite'],
      ['api', 'rest', 'graphql', 'axios', 'fetch'],
      ['tailwind', 'material ui', 'chakra', 'ant design', 'shadcn'],
    ],
    actionVerbs: ['built', 'developed', 'implemented', 'designed', 'optimized', 'created', 'shipped', 'refactored'],
  },

  'Angular Developer': {
    mustHave: [
      ['angular'],
      ['typescript'],
      ['rxjs', 'observables', 'observable'],
      ['component', 'module', 'service', 'directive'],
    ],
    niceToHave: [
      ['ngrx', 'state management', 'akita'],
      ['jasmine', 'karma', 'cypress', 'testing'],
      ['html', 'css', 'scss'],
      ['rest api', 'http client', 'httpclient'],
      ['angular material', 'ng bootstrap', 'primeng'],
      ['lazy loading', 'routing', 'guards'],
    ],
    actionVerbs: ['built', 'developed', 'implemented', 'designed', 'migrated', 'optimized', 'created'],
  },

  // ── DATA ───────────────────────────────────────────────────────
  'Data Analyst': {
    mustHave: [
      ['sql', 'mysql', 'postgresql', 'bigquery', 'snowflake', 'redshift'],
      ['data analysis', 'analysis', 'analytics', 'analyze'],
      ['reporting', 'report', 'dashboard', 'insights'],
      ['excel', 'spreadsheet', 'google sheets', 'sheets'],
      ['python', 'r', 'pandas'],
    ],
    niceToHave: [
      ['tableau', 'power bi', 'looker', 'metabase', 'data studio', 'superset'],
      ['statistics', 'statistical', 'statistical analysis'],
      ['a/b testing', 'hypothesis testing', 'experimentation'],
      ['etl', 'data pipeline', 'data processing'],
      ['visualization', 'charts', 'graphs', 'plots'],
      ['kpi', 'metrics', 'okr', 'business metrics'],
    ],
    actionVerbs: ['analyzed', 'reported', 'visualized', 'identified', 'improved', 'built', 'created', 'presented', 'tracked', 'measured'],
  },

  'Data Scientist': {
    mustHave: [
      ['python', 'r'],
      ['machine learning', 'ml', 'statistical modeling', 'predictive modeling'],
      ['statistics', 'statistical', 'probability', 'data science'],
      ['model', 'modeling', 'predictive', 'algorithm'],
      ['data', 'dataset', 'analysis'],
    ],
    niceToHave: [
      ['tensorflow', 'pytorch', 'keras'],
      ['scikit-learn', 'sklearn', 'xgboost', 'lightgbm'],
      ['sql', 'bigquery', 'spark'],
      ['deep learning', 'neural network', 'neural networks'],
      ['nlp', 'natural language processing', 'text mining'],
      ['computer vision', 'cv', 'image recognition'],
      ['pandas', 'numpy', 'matplotlib', 'seaborn'],
    ],
    actionVerbs: ['analyzed', 'built', 'predicted', 'improved', 'trained', 'developed', 'designed', 'deployed', 'researched', 'modeled'],
  },

  'Data Engineer': {
    mustHave: [
      ['pipeline', 'data pipeline', 'etl', 'elt', 'data engineering'],
      ['sql', 'bigquery', 'redshift', 'snowflake', 'databricks', 'hive'],
      ['python', 'scala', 'java'],
      ['spark', 'pyspark', 'hadoop', 'distributed computing'],
      ['data warehouse', 'data lake', 'data platform', 'dwh'],
    ],
    niceToHave: [
      ['airflow', 'prefect', 'dagster', 'luigi', 'orchestration'],
      ['kafka', 'kinesis', 'pubsub', 'streaming', 'real-time'],
      ['dbt', 'data modeling'],
      ['aws', 'gcp', 'azure'],
      ['docker', 'kubernetes'],
      ['mongodb', 'cassandra', 'nosql'],
    ],
    actionVerbs: ['built', 'designed', 'optimized', 'developed', 'automated', 'migrated', 'implemented', 'architected', 'engineered'],
  },

  'Business Analyst': {
    mustHave: [
      ['requirements', 'business requirements', 'brd', 'user stories', 'functional requirements'],
      ['stakeholder', 'stakeholders', 'stakeholder management'],
      ['process', 'business process', 'workflow', 'process improvement'],
      ['analysis', 'analytics', 'data analysis', 'analyze'],
      ['documentation', 'document', 'specifications'],
    ],
    niceToHave: [
      ['jira', 'confluence', 'notion', 'azure devops'],
      ['agile', 'scrum', 'sprint', 'kanban'],
      ['sql', 'excel', 'power bi', 'tableau'],
      ['uml', 'use case', 'flowchart', 'bpmn'],
      ['gap analysis', 'as-is', 'to-be'],
      ['testing', 'uat', 'qa', 'user acceptance'],
    ],
    actionVerbs: ['analyzed', 'defined', 'documented', 'facilitated', 'identified', 'mapped', 'gathered', 'presented', 'managed'],
  },

  // ── ML / AI ─────────────────────────────────────────────────────
  'Machine Learning Engineer': {
    mustHave: [
      ['machine learning', 'ml', 'deep learning'],
      ['python'],
      ['model', 'model training', 'model deployment', 'model development'],
      ['tensorflow', 'pytorch', 'keras', 'scikit-learn', 'sklearn'],
      ['data', 'dataset', 'training data', 'features'],
    ],
    niceToHave: [
      ['mlops', 'ml pipeline', 'kubeflow', 'mlflow', 'ml infrastructure'],
      ['kubernetes', 'docker'],
      ['feature engineering', 'feature store'],
      ['nlp', 'computer vision', 'neural network'],
      ['aws sagemaker', 'vertex ai', 'azure ml'],
      ['monitoring', 'model monitoring', 'drift detection'],
      ['spark', 'distributed training', 'gpu'],
    ],
    actionVerbs: ['trained', 'built', 'deployed', 'optimized', 'developed', 'improved', 'implemented', 'designed', 'fine-tuned'],
  },

  'AI Engineer': {
    mustHave: [
      ['ai', 'artificial intelligence', 'llm', 'large language model', 'generative ai'],
      ['python'],
      ['model', 'model deployment', 'inference', 'ai model'],
      ['api', 'integration', 'backend'],
    ],
    niceToHave: [
      ['langchain', 'llamaindex', 'langgraph', 'langraph'],
      ['openai', 'anthropic', 'gemini', 'cohere', 'gpt', 'claude'],
      ['vector database', 'pinecone', 'weaviate', 'chroma', 'faiss', 'qdrant'],
      ['rag', 'retrieval augmented generation', 'embeddings'],
      ['fine-tuning', 'lora', 'rlhf', 'instruction tuning'],
      ['prompt engineering', 'prompting', 'prompt'],
      ['fastapi', 'flask'],
      ['docker', 'kubernetes'],
    ],
    actionVerbs: ['built', 'developed', 'deployed', 'integrated', 'designed', 'implemented', 'optimized', 'fine-tuned', 'engineered'],
  },

  // ── DEVOPS / CLOUD ─────────────────────────────────────────────
  'DevOps Engineer': {
    mustHave: [
      ['ci/cd', 'continuous integration', 'continuous deployment', 'continuous delivery', 'pipeline'],
      ['docker', 'container', 'containerization', 'containers'],
      ['kubernetes', 'k8s', 'helm', 'orchestration'],
      ['linux', 'unix', 'bash', 'shell scripting'],
      ['aws', 'azure', 'gcp', 'cloud'],
    ],
    niceToHave: [
      ['terraform', 'pulumi', 'cloudformation', 'infrastructure as code', 'iac'],
      ['ansible', 'chef', 'puppet', 'configuration management'],
      ['prometheus', 'grafana', 'datadog', 'monitoring', 'observability'],
      ['jenkins', 'github actions', 'gitlab ci', 'circleci', 'argocd'],
      ['networking', 'vpc', 'load balancer', 'dns', 'ssl'],
      ['security', 'devsecops', 'iam', 'compliance'],
    ],
    actionVerbs: ['automated', 'deployed', 'built', 'optimized', 'managed', 'designed', 'implemented', 'reduced', 'migrated', 'provisioned'],
  },

  'Cloud Engineer': {
    mustHave: [
      ['aws', 'azure', 'gcp', 'cloud', 'amazon web services', 'google cloud', 'microsoft azure'],
      ['infrastructure', 'cloud infrastructure'],
      ['terraform', 'cloudformation', 'pulumi', 'iac', 'infrastructure as code'],
      ['docker', 'kubernetes', 'containerization'],
    ],
    niceToHave: [
      ['serverless', 'lambda', 'cloud functions', 'azure functions', 'fargate'],
      ['networking', 'vpc', 'subnets', 'load balancer', 'cdn', 'dns'],
      ['iam', 'security', 'compliance', 'rbac'],
      ['cost optimization', 'cost management', 'finops'],
      ['monitoring', 'cloudwatch', 'stackdriver', 'azure monitor'],
      ['multi-cloud', 'hybrid cloud'],
    ],
    actionVerbs: ['designed', 'migrated', 'built', 'optimized', 'deployed', 'architected', 'implemented', 'reduced', 'automated'],
  },

  'Site Reliability Engineer': {
    mustHave: [
      ['sre', 'site reliability', 'reliability', 'platform engineering'],
      ['linux', 'unix', 'bash'],
      ['python', 'go', 'golang'],
      ['kubernetes', 'docker', 'infrastructure'],
      ['monitoring', 'observability', 'alerting', 'logging'],
    ],
    niceToHave: [
      ['prometheus', 'grafana', 'datadog', 'pagerduty', 'newrelic'],
      ['slo', 'sla', 'sli', 'error budget'],
      ['incident response', 'on-call', 'runbook', 'postmortem'],
      ['terraform', 'ansible', 'iac'],
      ['distributed systems', 'microservices', 'service mesh'],
    ],
    actionVerbs: ['improved', 'reduced', 'automated', 'designed', 'built', 'managed', 'implemented', 'optimized', 'monitored'],
  },

  // ── PRODUCT & DESIGN ───────────────────────────────────────────
  'Product Manager': {
    mustHave: [
      ['product', 'product management', 'product manager'],
      ['roadmap', 'product roadmap'],
      ['stakeholder', 'stakeholders', 'cross-functional'],
      ['user', 'user research', 'user needs', 'customer'],
      ['agile', 'scrum', 'sprint', 'kanban'],
    ],
    niceToHave: [
      ['jira', 'productboard', 'notion', 'confluence', 'asana'],
      ['analytics', 'data', 'metrics', 'kpi', 'data-driven'],
      ['a/b testing', 'experimentation', 'hypothesis'],
      ['okr', 'goal setting', 'objective'],
      ['go-to-market', 'gtm', 'launch', 'release'],
      ['wireframe', 'prototype', 'figma', 'mockup'],
      ['sql', 'data analysis', 'python'],
    ],
    actionVerbs: ['launched', 'led', 'defined', 'prioritized', 'collaborated', 'drove', 'shipped', 'improved', 'grew', 'managed'],
  },

  'UX Designer': {
    mustHave: [
      ['ux', 'user experience', 'experience design'],
      ['ui', 'user interface', 'interface'],
      ['figma', 'sketch', 'adobe xd', 'invision'],
      ['user research', 'research', 'usability testing', 'user testing'],
      ['wireframe', 'wireframes', 'prototype', 'mockup', 'prototyping'],
    ],
    niceToHave: [
      ['design system', 'component library', 'design tokens'],
      ['interaction design', 'motion design', 'micro-interaction'],
      ['accessibility', 'wcag', 'a11y'],
      ['information architecture', 'ia', 'card sorting'],
      ['a/b testing', 'experimentation'],
      ['html', 'css'],
      ['persona', 'user journey', 'empathy map', 'journey map'],
    ],
    actionVerbs: ['designed', 'researched', 'prototyped', 'tested', 'improved', 'created', 'collaborated', 'delivered', 'iterated'],
  },

  'UI Designer': {
    mustHave: [
      ['ui', 'user interface', 'interface design', 'visual design'],
      ['figma', 'sketch', 'adobe xd', 'illustrator', 'photoshop'],
      ['design', 'visual'],
      ['component', 'design system'],
      ['typography', 'color', 'layout', 'spacing', 'grid'],
    ],
    niceToHave: [
      ['ux', 'user experience'],
      ['prototype', 'interaction', 'animation'],
      ['html', 'css'],
      ['brand', 'branding', 'brand identity'],
      ['accessibility', 'wcag'],
      ['responsive', 'mobile', 'adaptive'],
      ['motion', 'after effects'],
    ],
    actionVerbs: ['designed', 'created', 'crafted', 'built', 'prototyped', 'delivered', 'collaborated', 'refined'],
  },

  // ── MARKETING ─────────────────────────────────────────────────
  'Digital Marketing Manager': {
    mustHave: [
      ['digital marketing', 'marketing'],
      ['seo', 'search engine optimization', 'organic'],
      ['sem', 'ppc', 'paid search', 'google ads', 'paid media'],
      ['analytics', 'google analytics', 'data', 'metrics'],
      ['campaign', 'campaigns', 'marketing campaign'],
    ],
    niceToHave: [
      ['social media', 'facebook ads', 'instagram', 'linkedin ads', 'tiktok'],
      ['email marketing', 'hubspot', 'mailchimp', 'klaviyo', 'email automation'],
      ['content marketing', 'content strategy', 'content'],
      ['crm', 'salesforce', 'hubspot', 'marketing automation'],
      ['a/b testing', 'conversion optimization', 'cro'],
      ['roi', 'roas', 'budget', 'cac', 'ltv'],
    ],
    actionVerbs: ['drove', 'grew', 'managed', 'increased', 'launched', 'optimized', 'executed', 'generated', 'scaled', 'improved'],
  },

  'Content Writer': {
    mustHave: [
      ['content', 'content writing', 'writing', 'written content'],
      ['seo', 'keywords', 'search engine', 'organic'],
      ['blog', 'article', 'copy', 'editorial'],
      ['research', 'fact-check', 'writing'],
    ],
    niceToHave: [
      ['cms', 'wordpress', 'webflow', 'contentful'],
      ['social media', 'social content', 'social copy'],
      ['email', 'newsletter', 'email copy'],
      ['analytics', 'google analytics', 'performance'],
      ['brand voice', 'tone of voice', 'style guide'],
      ['grammarly', 'hemingway', 'editing', 'proofreading'],
    ],
    actionVerbs: ['wrote', 'created', 'published', 'edited', 'developed', 'produced', 'crafted', 'managed'],
  },

  // ── FINANCE ───────────────────────────────────────────────────
  'Financial Analyst': {
    mustHave: [
      ['financial analysis', 'financial modeling', 'financial model', 'finance'],
      ['excel', 'spreadsheet', 'google sheets'],
      ['forecasting', 'forecast', 'budgeting', 'budget', 'planning'],
      ['reporting', 'report', 'variance analysis', 'financial reporting'],
      ['accounting', 'finance', 'fp&a', 'financial planning'],
    ],
    niceToHave: [
      ['power bi', 'tableau', 'looker', 'visualization'],
      ['sql', 'python'],
      ['erp', 'sap', 'oracle', 'netsuite', 'anaplan'],
      ['dcf', 'valuation', 'npv', 'irr', 'financial modeling'],
      ['p&l', 'income statement', 'balance sheet', 'cash flow'],
    ],
    actionVerbs: ['analyzed', 'forecasted', 'reported', 'built', 'identified', 'improved', 'presented', 'managed', 'modeled', 'tracked'],
  },

  'Accountant': {
    mustHave: [
      ['accounting', 'accountant', 'bookkeeping'],
      ['gaap', 'ifrs', 'accounting standards', 'accrual'],
      ['reconciliation', 'reconcile', 'bank reconciliation'],
      ['general ledger', 'gl', 'chart of accounts', 'journal entries'],
      ['financial statements', 'balance sheet', 'income statement', 'p&l'],
    ],
    niceToHave: [
      ['quickbooks', 'xero', 'sage', 'netsuite', 'sap', 'tally'],
      ['tax', 'taxation', 'tax filing', 'gst', 'vat'],
      ['audit', 'auditing', 'internal audit', 'external audit'],
      ['accounts payable', 'accounts receivable', 'ap', 'ar'],
      ['cpa', 'ca', 'acca', 'cma', 'cfa'],
    ],
    actionVerbs: ['managed', 'reconciled', 'prepared', 'reviewed', 'filed', 'analyzed', 'maintained', 'reported'],
  },

  // ── HR ────────────────────────────────────────────────────────
  'HR Manager': {
    mustHave: [
      ['hr', 'human resources', 'people operations', 'human capital'],
      ['recruitment', 'hiring', 'talent acquisition', 'staffing'],
      ['onboarding', 'employee onboarding', 'induction'],
      ['employee relations', 'er', 'performance management', 'performance review'],
      ['compliance', 'labor law', 'employment law', 'hr compliance'],
    ],
    niceToHave: [
      ['hris', 'workday', 'bamboohr', 'adp', 'greythr', 'successfactors'],
      ['compensation', 'benefits', 'payroll', 'total rewards'],
      ['training', 'l&d', 'learning and development', 'upskilling'],
      ['diversity', 'dei', 'inclusion', 'equity'],
      ['analytics', 'hr analytics', 'people analytics', 'data'],
    ],
    actionVerbs: ['managed', 'recruited', 'developed', 'implemented', 'led', 'reduced', 'improved', 'designed', 'built', 'streamlined'],
  },

  'Recruiter': {
    mustHave: [
      ['recruitment', 'recruiting', 'talent acquisition', 'hiring'],
      ['sourcing', 'candidate sourcing', 'talent sourcing'],
      ['interview', 'interviewing', 'screening'],
      ['ats', 'applicant tracking', 'greenhouse', 'lever', 'workday', 'taleo'],
      ['pipeline', 'talent pipeline', 'candidate pipeline'],
    ],
    niceToHave: [
      ['linkedin', 'linkedin recruiter', 'boolean search'],
      ['technical recruiting', 'non-technical', 'volume hiring'],
      ['offer', 'offer management', 'negotiation', 'compensation'],
      ['employer branding', 'candidate experience', 'evp'],
      ['diversity recruiting', 'dei'],
    ],
    actionVerbs: ['recruited', 'sourced', 'screened', 'managed', 'hired', 'built', 'partnered', 'reduced', 'improved'],
  },

  // ── SALES ─────────────────────────────────────────────────────
  'Account Executive': {
    mustHave: [
      ['sales', 'b2b sales', 'enterprise sales', 'saas sales'],
      ['revenue', 'arr', 'mrr', 'revenue growth'],
      ['quota', 'target', 'sales target'],
      ['pipeline', 'sales pipeline', 'opportunity'],
      ['crm', 'salesforce', 'hubspot'],
    ],
    niceToHave: [
      ['closing', 'close', 'deal', 'deal closure'],
      ['prospecting', 'outreach', 'cold calling', 'cold email', 'sdr'],
      ['demo', 'product demo', 'presentation'],
      ['negotiation', 'contract', 'proposal'],
      ['forecasting', 'sales forecast'],
      ['saas', 'software sales', 'enterprise'],
    ],
    actionVerbs: ['closed', 'grew', 'exceeded', 'generated', 'prospected', 'managed', 'drove', 'increased', 'sold', 'built'],
  },

  'Business Development Manager': {
    mustHave: [
      ['business development', 'bd', 'biz dev'],
      ['partnerships', 'partner', 'alliance', 'strategic partnerships'],
      ['revenue', 'growth', 'business growth'],
      ['pipeline', 'deals', 'opportunities'],
      ['b2b', 'enterprise', 'clients'],
    ],
    niceToHave: [
      ['crm', 'salesforce', 'hubspot'],
      ['negotiation', 'contract', 'proposal'],
      ['market research', 'market analysis', 'competitive analysis'],
      ['strategy', 'strategic', 'go-to-market'],
      ['linkedin', 'outreach', 'prospecting'],
    ],
    actionVerbs: ['drove', 'built', 'grew', 'negotiated', 'managed', 'closed', 'identified', 'developed', 'launched'],
  },

  // ── QA ────────────────────────────────────────────────────────
  'QA Engineer': {
    mustHave: [
      ['testing', 'quality assurance', 'qa', 'quality engineering'],
      ['test cases', 'test plan', 'test scenarios', 'test strategy'],
      ['bug', 'defect', 'issue tracking', 'bug report'],
      ['automation', 'automated testing', 'test automation'],
      ['regression', 'regression testing', 'smoke testing'],
    ],
    niceToHave: [
      ['selenium', 'playwright', 'cypress', 'puppeteer', 'webdriver'],
      ['jest', 'pytest', 'junit', 'testng', 'mocha'],
      ['api testing', 'postman', 'rest assured', 'soapui'],
      ['performance testing', 'jmeter', 'k6', 'locust', 'gatling'],
      ['ci/cd', 'github actions', 'jenkins'],
      ['jira', 'bugzilla', 'testrail', 'qase'],
    ],
    actionVerbs: ['tested', 'automated', 'identified', 'reported', 'improved', 'designed', 'executed', 'reduced', 'built', 'created'],
  },

  'Manual Tester': {
    mustHave: [
      ['testing', 'manual testing', 'qa', 'quality assurance'],
      ['test cases', 'test scenarios', 'test plan'],
      ['bug', 'defect', 'issue', 'defect reporting'],
      ['regression', 'smoke', 'sanity', 'functional testing'],
    ],
    niceToHave: [
      ['jira', 'trello', 'bugzilla', 'mantis'],
      ['agile', 'scrum', 'sprint'],
      ['api testing', 'postman'],
      ['mobile testing', 'ios', 'android'],
      ['sql', 'database testing'],
      ['testrail', 'qtest', 'xray'],
    ],
    actionVerbs: ['tested', 'reported', 'identified', 'executed', 'validated', 'verified', 'documented'],
  },

  // ── SECURITY ──────────────────────────────────────────────────
  'Security Engineer': {
    mustHave: [
      ['security', 'cybersecurity', 'information security', 'infosec'],
      ['vulnerability', 'cve', 'threat', 'risk'],
      ['penetration testing', 'pentest', 'ethical hacking', 'vapt'],
      ['firewall', 'ids', 'ips', 'siem', 'endpoint security'],
    ],
    niceToHave: [
      ['aws security', 'cloud security', 'zero trust'],
      ['owasp', 'security standards', 'nist'],
      ['python', 'bash', 'scripting'],
      ['incident response', 'forensics', 'threat hunting'],
      ['compliance', 'soc2', 'iso 27001', 'gdpr', 'pci dss'],
      ['devsecops', 'shift left security'],
    ],
    actionVerbs: ['secured', 'identified', 'mitigated', 'implemented', 'designed', 'assessed', 'built', 'investigated'],
  },

  // ── CUSTOMER SUCCESS ─────────────────────────────────────────
  'Customer Success Manager': {
    mustHave: [
      ['customer success', 'csm', 'account management', 'client success'],
      ['retention', 'churn', 'renewal', 'churn reduction'],
      ['onboarding', 'customer onboarding', 'implementation'],
      ['crm', 'salesforce', 'gainsight', 'hubspot', 'totango'],
      ['saas', 'software', 'product', 'b2b'],
    ],
    niceToHave: [
      ['nps', 'csat', 'health score', 'customer health'],
      ['upsell', 'cross-sell', 'expansion revenue', 'net revenue retention'],
      ['qbr', 'business review', 'executive business review'],
      ['data', 'analytics', 'metrics', 'reporting'],
      ['stakeholder', 'executive', 'champion'],
    ],
    actionVerbs: ['managed', 'drove', 'reduced', 'increased', 'grew', 'built', 'partnered', 'retained', 'improved'],
  },

  // ── DEFAULT fallback ─────────────────────────────────────────
  'default': {
    mustHave: [
      ['experience', 'work experience', 'professional experience'],
      ['project', 'projects', 'work'],
      ['team', 'collaboration', 'cross-functional'],
      ['results', 'impact', 'outcome', 'achievement'],
    ],
    niceToHave: [
      ['leadership', 'led', 'managed'],
      ['communication', 'stakeholder'],
      ['problem solving', 'analytical', 'critical thinking'],
      ['tools', 'software', 'technology'],
      ['strategy', 'strategic'],
    ],
    actionVerbs: ['led', 'managed', 'developed', 'implemented', 'improved', 'delivered', 'achieved', 'built', 'created', 'designed'],
  },
};

// ── Role Aliases ─────────────────────────────────────────────────
// Maps Cohere's detected role → closest ROLE_BENCHMARKS key
const ROLE_ALIASES = {
  'Software Engineer': 'Backend Engineer',
  'Software Developer': 'Backend Engineer',
  'Backend Developer': 'Backend Engineer',
  'Server Side Engineer': 'Backend Engineer',
  'Java Developer': 'Backend Engineer',
  'Java Engineer': 'Backend Engineer',
  'Go Engineer': 'Backend Engineer',
  'Golang Engineer': 'Backend Engineer',
  'Ruby Engineer': 'Backend Engineer',
  'PHP Developer': 'Backend Engineer',
  'Kotlin Developer': 'Backend Engineer',
  'Web Developer': 'Frontend Engineer',
  'UI Engineer': 'Frontend Engineer',
  'Vue.js Developer': 'Frontend Engineer',
  'Vue Developer': 'Frontend Engineer',
  'Full Stack Developer': 'Full Stack Engineer',
  'Full-Stack Engineer': 'Full Stack Engineer',
  'Full-Stack Developer': 'Full Stack Engineer',
  'Data Analytics': 'Data Analyst',
  'Analytics Engineer': 'Data Engineer',
  'BI Analyst': 'Data Analyst',
  'Business Intelligence Analyst': 'Data Analyst',
  'SQL Developer': 'Data Analyst',
  'ML Engineer': 'Machine Learning Engineer',
  'Deep Learning Engineer': 'Machine Learning Engineer',
  'Research Scientist': 'Machine Learning Engineer',
  'NLP Engineer': 'AI Engineer',
  'Computer Vision Engineer': 'Machine Learning Engineer',
  'MLOps Engineer': 'Machine Learning Engineer',
  'Platform Engineer': 'DevOps Engineer',
  'Infrastructure Engineer': 'DevOps Engineer',
  'AWS Engineer': 'Cloud Engineer',
  'Azure Engineer': 'Cloud Engineer',
  'GCP Engineer': 'Cloud Engineer',
  'SRE': 'Site Reliability Engineer',
  'Product Owner': 'Product Manager',
  'Senior Product Manager': 'Product Manager',
  'Technical Product Manager': 'Product Manager',
  'UX/UI Designer': 'UX Designer',
  'Product Designer': 'UX Designer',
  'Interaction Designer': 'UX Designer',
  'Marketing Manager': 'Digital Marketing Manager',
  'SEO Specialist': 'Digital Marketing Manager',
  'Growth Marketing Manager': 'Digital Marketing Manager',
  'FP&A Analyst': 'Financial Analyst',
  'Senior Financial Analyst': 'Financial Analyst',
  'Finance Analyst': 'Financial Analyst',
  'Investment Analyst': 'Financial Analyst',
  'Sales Manager': 'Account Executive',
  'Enterprise Account Executive': 'Account Executive',
  'Sales Development Representative': 'Account Executive',
  'SDR': 'Account Executive',
  'BDR': 'Business Development Manager',
  'BD Manager': 'Business Development Manager',
  'HR Generalist': 'HR Manager',
  'HR Business Partner': 'HR Manager',
  'HRBP': 'HR Manager',
  'Talent Acquisition Manager': 'Recruiter',
  'Talent Acquisition Specialist': 'Recruiter',
  'Test Engineer': 'QA Engineer',
  'SDET': 'QA Engineer',
  'Automation Engineer': 'QA Engineer',
  'Quality Engineer': 'QA Engineer',
  'Account Manager': 'Customer Success Manager',
  'Client Success Manager': 'Customer Success Manager',
};

/**
 * Resolve role string to best matching benchmark key
 */
function resolveBenchmarkKey(jobFunction) {
  if (!jobFunction) return 'default';

  // 1. Direct match
  if (ROLE_BENCHMARKS[jobFunction]) return jobFunction;

  // 2. Alias match (exact)
  if (ROLE_ALIASES[jobFunction]) {
    const alias = ROLE_ALIASES[jobFunction];
    if (ROLE_BENCHMARKS[alias]) return alias;
  }

  // 3. Partial match — jobFunction contains a known benchmark key
  const knownKeys = Object.keys(ROLE_BENCHMARKS).filter(k => k !== 'default');
  for (const key of knownKeys) {
    if (jobFunction.toLowerCase().includes(key.toLowerCase())) return key;
  }

  // 4. Reverse partial — a known key contains the first word of jobFunction
  const firstWord = jobFunction.toLowerCase().split(' ')[0];
  for (const key of knownKeys) {
    if (key.toLowerCase().includes(firstWord)) return key;
  }

  return 'default';
}

/**
 * Check if text matches a keyword entry (string or synonym array)
 */
function matchesKeyword(text, kwEntry) {
  if (typeof kwEntry === 'string') return text.includes(kwEntry.toLowerCase());
  return kwEntry.some(syn => text.includes(syn.toLowerCase()));
}

/**
 * Get display label for a keyword entry (first synonym = primary label)
 */
function getKeywordLabel(kwEntry) {
  if (typeof kwEntry === 'string') return kwEntry;
  return kwEntry[0];
}

/**
 * Calculate keyword match score against role benchmark
 */
function calculateBenchmarkKeywordMatch(resumeText, jobFunction) {
  const benchmarkKey = resolveBenchmarkKey(jobFunction);
  const benchmark = ROLE_BENCHMARKS[benchmarkKey];
  const text = resumeText.toLowerCase();

  let matchedMust = 0;
  let matchedNice = 0;
  let matchedVerbs = 0;

  const matchedKeywords = [];
  const missingKeywords = [];

  // Must-have: weighted 55%
  for (const kw of benchmark.mustHave) {
    if (matchesKeyword(text, kw)) {
      matchedMust++;
      matchedKeywords.push(getKeywordLabel(kw));
    } else {
      missingKeywords.push(getKeywordLabel(kw));
    }
  }

  // Nice-to-have: weighted 30%
  for (const kw of benchmark.niceToHave) {
    if (matchesKeyword(text, kw)) {
      matchedNice++;
      matchedKeywords.push(getKeywordLabel(kw));
    }
  }

  // Action verbs: weighted 15%
  for (const verb of benchmark.actionVerbs) {
    if (text.includes(verb.toLowerCase())) matchedVerbs++;
  }

  const mustScore  = benchmark.mustHave.length  > 0 ? (matchedMust  / benchmark.mustHave.length)  * 100 : 70;
  const niceScore  = benchmark.niceToHave.length > 0 ? (matchedNice  / benchmark.niceToHave.length) * 100 : 50;
  const verbScore  = benchmark.actionVerbs.length > 0 ? (matchedVerbs / benchmark.actionVerbs.length) * 100 : 60;

  let finalScore = Math.round(
    (mustScore * 0.55) +
    (niceScore * 0.30) +
    (verbScore * 0.15)
  );

  // Floor: prevent crushing scores on edge cases
  const floor = benchmarkKey === 'default' ? 42 : 28;
  finalScore = Math.max(finalScore, floor);

  return {
    keywordScore:    Math.min(finalScore, 100),
    matchedKeywords,
    missingKeywords: missingKeywords.slice(0, 6),
    matchedCount:    matchedMust + matchedNice,
    totalKeywords:   benchmark.mustHave.length + benchmark.niceToHave.length,
    benchmarkUsed:   benchmarkKey,
  };
}

module.exports = { ROLE_BENCHMARKS, ROLE_ALIASES, calculateBenchmarkKeywordMatch, resolveBenchmarkKey };