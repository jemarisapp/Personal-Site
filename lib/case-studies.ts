export type CaseStudySection = {
  title: string
  body?: string[]
  bullets?: string[]
}

export type CaseStudyImage = {
  src: string
  alt: string
  caption?: string
}

export type CaseStudyMedia = CaseStudyImage & {
  type: 'image' | 'video'
}

export type CaseStudy = {
  slug: string
  title: string
  eyebrow?: string
  summary: string
  problem: string
  solution: string
  role: string
  outcome: string
  technologies: string[]
  projectType?: string
  users?: string
  status?: string
  confidentiality?: string
  heroImage?: CaseStudyImage
  media?: CaseStudyMedia[]
  workflow?: string[]
  metadata: {
    label: string
    value: string
  }[]
  sections: CaseStudySection[]
  outcomes?: string[]
  confidentialityNotice?: string
  legacyHref?: string
  featured?: boolean
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'contract-generation',
    title: 'AI-Assisted Contract Generation',
    eyebrow: 'Case Study',
    featured: true,
    summary:
      'An AI-assisted legal workflow that transforms structured client intake information into jurisdiction-appropriate draft contracts for attorney review.',
    problem:
      'Attorneys often start drafting contracts from client intake data, then spend significant time re-entering facts, organizing clauses, and producing a consistent first draft.',
    solution:
      'A structured AI workflow normalizes intake data, assembles controlled prompts and templates, generates a first draft, and routes it to an attorney for review and approval.',
    role:
      'AI workflow design, prompt engineering, system integration, testing, and product thinking',
    outcome:
      'Created a repeatable drafting process that reduces repetitive first-draft work while preserving attorney control over legal judgment and final content.',
    projectType: 'Legal AI and workflow automation',
    users: 'Attorneys and legal staff',
    status: 'Active development / internal implementation',
    confidentiality: 'Some details have been generalized',
    technologies: [
      'Generative AI',
      'Large language models',
      'Prompt engineering',
      'Structured outputs',
      'Workflow automation',
      'API integration',
      'Human-in-the-loop review',
      'Legal document generation',
      'Data validation',
    ],
    metadata: [
      { label: 'Project Type', value: 'Legal AI and workflow automation' },
      {
        label: 'My Role',
        value:
          'AI workflow design, prompt engineering, system integration, testing, and product thinking',
      },
      { label: 'Users', value: 'Attorneys and legal staff' },
      { label: 'Status', value: 'Active development / internal implementation' },
      { label: 'Confidentiality', value: 'Some details have been generalized' },
    ],
    workflow: [
      'Client Intake',
      'Structured Data',
      'Validation and Normalization',
      'Prompt and Template Assembly',
      'LLM Draft Generation',
      'Attorney Review',
      'Revision and Approval',
      'Final Contract',
    ],
    sections: [
      {
        title: 'Overview',
        body: [
          'AI-Assisted Contract Generation is a legal AI workflow for converting structured client intake information into jurisdiction-appropriate draft contracts for attorney review.',
          'The system is designed as a drafting assistant, not a replacement for legal professionals. Attorneys remain responsible for review, validation, legal judgment, approval, and final edits.',
        ],
      },
      {
        title: 'Business Problem',
        body: [
          'Attorneys often begin contract drafting using information collected during client intake. Re-entering information, organizing clauses, and producing a consistent first draft can require significant manual effort.',
          'The opportunity was to create a structured AI-assisted workflow that could generate a reliable starting draft while preserving attorney oversight.',
        ],
      },
      {
        title: 'Goals',
        bullets: [
          'Reduce repetitive manual drafting',
          'Improve consistency across contract drafts',
          'Convert intake data into structured legal documents',
          'Keep attorneys involved at critical decision points',
          'Create a workflow that is reviewable, traceable, and appropriate for legal work',
        ],
      },
      {
        title: 'Solution',
        body: [
          'Structured intake information is processed, normalized, and passed into a controlled AI generation workflow.',
          'The system creates a first draft based on client information, matter type, jurisdiction, required clauses, approved language or templates, and a defined output structure.',
          'The generated document is then sent to an attorney for review, revision, and approval.',
        ],
      },
      {
        title: 'Human-in-the-Loop Design',
        body: [
          'The workflow intentionally keeps legal professionals involved. AI generates a draft, not a final legal document.',
        ],
        bullets: [
          'Attorneys validate legal accuracy and jurisdictional fit',
          'High-impact decisions remain human-controlled',
          'Outputs can be revised before approval',
          'The workflow prioritizes speed without sacrificing oversight',
        ],
      },
      {
        title: 'My Contributions',
        bullets: [
          'Translated the legal drafting process into a structured AI workflow',
          'Designed prompts and output structures',
          'Connected intake data to document generation',
          'Developed validation and review steps',
          'Considered incomplete inputs, failure cases, and inconsistent outputs',
          'Helped make the system understandable and usable for non-technical stakeholders',
        ],
      },
      {
        title: 'Challenges and Design Decisions',
        bullets: [
          'Balanced speed with accuracy',
          'Prevented incomplete intake data from producing unreliable drafts',
          'Maintained output consistency',
          'Kept the system flexible across contract types',
          'Designed appropriate attorney review checkpoints',
          'Avoided over-automation in a high-responsibility environment',
        ],
      },
    ],
    outcomes: [
      'Reduced the work required to create an initial draft',
      'Created a repeatable and structured drafting process',
      'Improved consistency in how intake information is incorporated',
      'Preserved attorney control over final legal content',
      'Demonstrated how generative AI can support practical legal operations',
    ],
    confidentialityNotice:
      'Portions of this case study have been generalized to protect client and firm confidentiality. Proprietary legal content, client information, prompts, and internal implementation details have been omitted.',
  },
  {
    slug: 'group-sales-automation',
    title: 'Multi-Agent Group Sales Automation',
    eyebrow: 'Case Study',
    summary:
      'A multi-agent AI pipeline that automated lead discovery, qualification, availability checks, scoring, outreach preparation, and human review.',
    problem:
      'Group sales lead handling required manual discovery, routing, availability checks, scoring, and draft outreach before a sales manager could act.',
    solution:
      'A multi-agent workflow writes structured outputs into a shared data layer and presents them in a dashboard designed for sales review and action.',
    role:
      'Product design, dashboard implementation, workflow integration, Airia trigger design, Supabase integration, and stakeholder walkthrough design',
    outcome:
      'Reduced a manual workflow from hours to under 10 minutes while keeping final review in human hands.',
    projectType: 'Multi-agent AI and sales operations automation',
    users: 'Group sales managers and operations staff',
    status: 'Internal product / stakeholder demo',
    technologies: [
      'Multi-agent systems',
      'Airia',
      'Supabase',
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'Server-side API routes',
      'Human review dashboard',
    ],
    heroImage: {
      src: '/case-studies/group-sales-automation/agent-5.png',
      alt: 'Group sales automation dashboard view showing the outreach preparation agent and generated email draft workflow',
      caption: 'Outreach preparation view from the group sales automation walkthrough.',
    },
    metadata: [
      { label: 'Project Type', value: 'Multi-agent AI and sales operations automation' },
      { label: 'My Role', value: 'Product design, frontend implementation, workflow integration, and demo storytelling' },
      { label: 'Users', value: 'Group sales managers and operations staff' },
      { label: 'Key Result', value: 'Reduced a manual workflow from hours to under 10 minutes' },
    ],
    workflow: [
      'Lead Discovery',
      'Qualification',
      'Availability',
      'Scoring',
      'Outreach',
      'Human Review',
    ],
    sections: [
      {
        title: 'Overview',
        body: [
          'This project turned a manual group sales process into an AI-assisted operating workflow. The system discovers event-based lead opportunities, qualifies them, checks site availability, scores priority, prepares outreach, and presents the results in a dashboard for human review.',
        ],
      },
      {
        title: 'Business Problem',
        body: [
          'The original workflow required repeated manual effort across lead discovery, routing, qualification, availability review, and outbound email preparation.',
          'That made the process difficult to scale and made it harder for a sales manager to see the status of each opportunity from discovery through outreach.',
        ],
      },
      {
        title: 'Original Manual Process',
        bullets: [
          'Search for relevant outdoor events and group opportunities',
          'Decide whether an opportunity looked like a true group lead',
          'Match the lead to the correct property',
          'Check whether the property had enough site availability',
          'Prioritize stronger opportunities',
          'Draft different outbound email responses',
        ],
      },
      {
        title: 'AI Workflow',
        body: [
          'The workflow uses multiple agents to break the business process into discrete stages. Each stage produces structured data that can be reviewed, stored, and surfaced in the dashboard.',
        ],
      },
      {
        title: 'Multi-Agent Architecture',
        bullets: [
          'Lead discovery extracts event opportunities and matches them to properties',
          'Qualification reviews the most relevant pilot leads',
          'Availability checks whether the matched property can support the requested stay',
          'Scoring labels qualified and available leads by priority',
          'Outreach drafting creates reviewable email drafts based on lead path and outcome',
        ],
      },
      {
        title: 'Dashboard and Human Review',
        body: [
          'The dashboard acts as the review and control surface for the AI workflow. It presents lead records, scoring, availability, and draft outreach so the sales manager can make the final decision.',
        ],
      },
      {
        title: 'My Contributions',
        bullets: [
          'Built the dashboard UI and pipeline monitoring experience',
          'Structured how agent outputs appear in the interface',
          'Connected dashboard views to Supabase data',
          'Moved Airia execution behind server-side routes to protect API keys',
          'Created a presentation walkthrough mode to explain the agent flow',
          'Improved pipeline trigger handling and post-run refresh behavior',
        ],
      },
      {
        title: 'Technical Challenges',
        bullets: [
          'Securing pipeline execution so credentials were not exposed in the browser',
          'Passing runtime input into the pipeline instead of relying on hardcoded values',
          'Supporting both local Express routes and hosted serverless routes',
          'Handling cases where the pipeline continued after a timeout or non-JSON response',
          'Making a complex agent process understandable to non-technical stakeholders',
        ],
      },
      {
        title: 'Business Impact',
        body: [
          'The system gave the group sales workflow a central place to review discovered leads, understand routing and qualification, access draft outreach faster, and preserve human approval before action.',
        ],
      },
      {
        title: 'Lessons Learned',
        body: [
          'The strongest AI workflow was not the most autonomous one. The useful pattern was automation plus a clear review surface: discover and structure the work with agents, then give humans a reliable place to inspect and decide.',
        ],
      },
    ],
    outcomes: [
      'Reduced a manual process from hours to under 10 minutes',
      'Created a central dashboard for lead review and pipeline visibility',
      'Supported human review of outbound drafts',
      'Made a multi-agent workflow explainable for stakeholder presentations',
    ],
    confidentialityNotice:
      'Some operational details and internal implementation specifics have been generalized.',
  },
  {
    slug: 'soundintel',
    title: 'SoundIntel BI',
    eyebrow: 'Case Study',
    summary:
      'An interactive music analytics platform combining business intelligence dashboards with AI-assisted data exploration.',
    problem:
      'Music chart data is dense, fragmented, and difficult to interpret quickly when users have to cross-reference static reports or BI dashboards.',
    solution:
      'A custom web analytics experience separates chart position, performance drivers, comparative rankings, and conversational data exploration.',
    role:
      'Product engineer responsible for dashboard design, full-stack implementation, data modeling, and AI-assisted exploration patterns',
    outcome:
      'Reduced chart interpretation from minutes of reading to seconds of scanning and enabled ad-hoc questions that previously required custom views.',
    projectType: 'Business intelligence and AI-assisted analytics',
    users: 'Music analysts, operators, and decision-makers',
    status: 'Live product / portfolio build',
    legacyHref: '/project/soundintel-bi',
    technologies: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Power BI prototype',
      'AI-assisted exploration',
    ],
    heroImage: {
      src: '/soundintel-bi/dash-2.png',
      alt: 'SoundIntel BI dashboard showing chart rankings and performance metrics',
      caption: 'Dashboard view for chart position, performance drivers, and comparative rankings.',
    },
    metadata: [
      { label: 'Project Type', value: 'Business intelligence and AI-assisted analytics' },
      { label: 'My Role', value: 'Product engineer' },
      { label: 'Users', value: 'Music analysts, operators, and decision-makers' },
      { label: 'Origin', value: 'Power BI prototype evolved into a custom web platform' },
    ],
    sections: [
      {
        title: 'The Analytics Problem',
        body: [
          'Music chart data is shaped by multiple performance drivers, including streams, airplay, and sales. Static tables and traditional BI layouts can make it hard to understand what changed and why.',
          'The product opportunity was to make dense chart data faster to scan, easier to compare, and more explainable for ad-hoc analysis.',
        ],
      },
      {
        title: 'Intended Users',
        body: [
          'The experience is designed for users who need to understand chart movement quickly: analysts, operators, and decision-makers who need both high-level scanning and deeper exploration.',
        ],
      },
      {
        title: 'Data Model',
        body: [
          'The platform organizes chart position, metric categories, and performance drivers into a dashboard structure that supports comparison and filtering.',
          'The original Power BI prototype helped validate the analytical model before the experience moved into a custom web interface.',
        ],
      },
      {
        title: 'Dashboard Design',
        body: [
          'The dashboard prioritizes clarity over density. It separates ranking, performance drivers, and comparative views so users can move from scan to explanation without leaving the page.',
        ],
      },
      {
        title: 'AI-Assisted Exploration',
        body: [
          'The Ask the Data experience supports conversational analysis. The AI layer is framed as an explainer that helps users understand what is happening and how metrics compare, rather than as an automated decision-maker.',
        ],
      },
      {
        title: 'Product and Design Decisions',
        bullets: [
          'Moved beyond Power BI constraints to gain control over layout and interaction',
          'Separated metric categories so users could scan performance drivers quickly',
          'Positioned AI as an analyst/explainer rather than a strategist',
          'Balanced information density with readability',
        ],
      },
      {
        title: 'Key Technical Decisions',
        bullets: [
          'Used a custom web interface for more flexible dashboard composition',
          'Structured data around chart rankings and performance drivers',
          'Connected backend APIs to dashboard and AI exploration flows',
          'Kept AI responses contextual to the chart data being explored',
        ],
      },
      {
        title: 'Outcome and Lessons Learned',
        body: [
          'The project demonstrated how AI can enhance business intelligence through explainability rather than full automation. It also showed the tradeoff between fast BI prototyping and the flexibility of a custom product interface.',
        ],
      },
    ],
    outcomes: [
      'Reduced chart interpretation from minutes to seconds of scanning',
      'Enabled ad-hoc analysis that previously required custom views or manual calculations',
      'Showed how AI can support BI by explaining data patterns',
      'Combined data engineering, UI design, and applied AI in one product',
    ],
  },
  {
    slug: 'trilo',
    title: 'Trilo',
    eyebrow: 'Case Study',
    summary:
      'A multi-tenant sports league management platform with AI-assisted schedule extraction and Discord-native league operations.',
    problem:
      'Online sports leagues require repeated manual work for scheduling, matchup setup, rosters, records, and community administration.',
    solution:
      'A Discord-native SaaS platform automates league operations, connects subscriptions and license delivery, and uses AI-assisted image extraction to reduce manual schedule entry.',
    role:
      'Founder, product lead, and product engineer responsible for product strategy, full-stack implementation, AI workflow design, and go-to-market flow',
    outcome:
      'Reduced commissioner workload through automated league workflows, AI-assisted data ingestion, and a subscription-backed product experience.',
    projectType: 'AI-assisted SaaS and sports operations automation',
    users: 'League commissioners and online sports communities',
    status: 'Live product / active development',
    legacyHref: '/project/trilo',
    technologies: [
      'Python',
      'React',
      'TypeScript',
      'PostgreSQL',
      'OpenAI Vision API',
      'Stripe',
      'Discord OAuth',
      'Discord bot workflows',
      'Supabase',
    ],
    heroImage: {
      src: '/trilo.avif',
      alt: 'Trilo product preview showing sports league management automation',
      caption: 'Trilo combines Discord-native league operations with AI-assisted schedule extraction.',
    },
    metadata: [
      { label: 'Project Type', value: 'AI-assisted SaaS and sports operations automation' },
      { label: 'My Role', value: 'Founder, product lead, and product engineer' },
      { label: 'Users', value: 'League commissioners and online sports communities' },
      { label: 'Status', value: 'Live product / active development' },
    ],
    workflow: [
      'Discord Community',
      'League Setup',
      'Schedule Screenshot Upload',
      'AI Matchup Extraction',
      'Structured League Data',
      'Matchup Channels',
      'Record and Roster Updates',
      'Commissioner Review',
    ],
    sections: [
      {
        title: 'Overview',
        body: [
          'Trilo is a full-stack SaaS platform for sports leagues that operate inside Discord. It combines a Discord bot for league operations with a web experience for acquisition, OAuth, subscriptions, and license delivery.',
          'The product focuses on reducing the repetitive work commissioners face each week while keeping league management inside the community channel where users already operate.',
        ],
      },
      {
        title: 'Business Problem',
        body: [
          'Running online sports leagues can require hours of manual administration: creating matchup channels, tracking records, managing team rosters, and entering schedules from screenshots or external sources.',
          'That manual overhead creates friction for commissioners and can make multi-league management difficult to sustain.',
        ],
      },
      {
        title: 'Product Solution',
        body: [
          'Trilo automates league operations through Discord slash commands and structured backend workflows. Commissioners can manage teams, matchups, attributes, settings, and game status without moving their community into a separate tool.',
          'The AI-assisted matchup creation flow lets users upload a schedule screenshot and convert it into structured matchup data, reducing the need for manual entry.',
        ],
      },
      {
        title: 'System Architecture',
        body: [
          'The product connects a Discord bot, a React website, Stripe subscription events, Discord OAuth, license delivery, and a shared PostgreSQL data layer.',
          'A key architecture decision was supporting production-grade PostgreSQL while preserving a lower-friction local development setup.',
        ],
      },
      {
        title: 'Human and Product Controls',
        body: [
          'Even where AI assists with schedule extraction, the product is designed around commissioner control. Structured outputs feed league workflows, but commissioners still operate and validate the league experience.',
        ],
      },
      {
        title: 'My Contributions',
        bullets: [
          'Defined the product direction and SaaS positioning',
          'Built Discord bot workflows for league operations',
          'Designed the website conversion and activation flow',
          'Integrated Discord OAuth, Stripe checkout, and license delivery',
          'Designed AI-assisted schedule extraction from screenshots',
          'Built backend data models for leagues, teams, matchups, subscriptions, and command usage',
        ],
      },
      {
        title: 'Technical Challenges',
        bullets: [
          'Handling Discord interaction timeouts for longer AI operations',
          'Designing reliable data models for multi-server league operations',
          'Connecting subscription status to Discord-side activation',
          'Reducing onboarding friction by delivering license keys through Discord',
          'Balancing automation with commissioner control',
        ],
      },
      {
        title: 'Business Impact and Lessons Learned',
        body: [
          'Trilo demonstrates how product design, AI-assisted data extraction, and community-native workflows can reduce operational friction in a niche but repetitive business process.',
          'The strongest product decisions came from understanding where users already work and delivering value in that environment instead of forcing a separate workflow.',
        ],
      },
    ],
    outcomes: [
      'Reduced manual schedule and matchup setup through AI-assisted extraction',
      'Created a subscription-backed activation flow for Discord communities',
      'Supported scalable league operations across multiple communities',
      'Demonstrated a business model for workflow automation in online league management',
    ],
  },
  {
    slug: 'navigate-idd',
    title: 'Navigate IDD',
    eyebrow: 'Case Study',
    summary:
      'A governed RAG-based education system that transforms complex Medicaid waiver regulations into verified multilingual video content.',
    problem:
      'Families seeking disability services often face dense policy language, limited accessibility, and slow content updates when regulations change.',
    solution:
      'A RAG-based pipeline grounds scripts in verified policy documents, routes content through human review, translates approved scripts, and prepares multilingual video explainers.',
    role:
      'AI systems product designer responsible for workflow architecture, RAG pipeline design, governance flow, and human review checkpoints',
    outcome:
      'Demonstrated how AI can responsibly scale public-sector education while keeping policy accuracy and human approval central to the workflow.',
    projectType: 'RAG system and public-sector education workflow',
    users: 'Families, policy teams, subject matter experts, and content reviewers',
    status: 'Prototype / system design project',
    legacyHref: '/project/navigate-idd',
    technologies: [
      'n8n',
      'OpenAI GPT-4',
      'Claude Sonnet 4.5',
      'Pinecone',
      'Synthesia',
      'RAG',
      'Human review',
      'Workflow automation',
      'Multilingual content generation',
    ],
    heroImage: {
      src: '/navigate-idd.jpg',
      alt: 'Navigate IDD preview for a Medicaid policy education video workflow',
      caption: 'Navigate IDD converts policy-grounded content into reviewed multilingual education materials.',
    },
    media: [
      {
        type: 'video',
        src: '/navigate-idd/idd-video.mp4',
        alt: 'Navigate IDD product walkthrough showing the AI-assisted policy education workflow',
        caption: 'Product walkthrough showing how Navigate IDD moves from policy-grounded content generation into review, video production, and distribution.',
      },
      {
        type: 'image',
        src: '/navigate-idd/knowledge-layer.avif',
        alt: 'Navigate IDD knowledge layer architecture for indexing Medicaid waiver policy documents',
        caption: 'Policy knowledge layer used to ground script generation in source material.',
      },
      {
        type: 'image',
        src: '/navigate-idd/retrieval-augmented-script-generation.avif',
        alt: 'Navigate IDD retrieval augmented script generation workflow',
        caption: 'RAG script generation flow for producing policy-grounded drafts.',
      },
      {
        type: 'image',
        src: '/navigate-idd/human-review-and-approval.avif',
        alt: 'Navigate IDD human review and approval interface for policy scripts',
        caption: 'Human review checkpoint before content moves into production.',
      },
      {
        type: 'image',
        src: '/navigate-idd/video-generation.avif',
        alt: 'Navigate IDD video generation step for approved multilingual education scripts',
        caption: 'Approved scripts move into multilingual video generation.',
      },
      {
        type: 'image',
        src: '/navigate-idd/social-media-upload.avif',
        alt: 'Navigate IDD social media distribution workflow for approved education videos',
        caption: 'Distribution step for publishing approved educational content.',
      },
    ],
    metadata: [
      { label: 'Project Type', value: 'RAG system and public-sector education workflow' },
      { label: 'My Role', value: 'AI systems product designer' },
      { label: 'Users', value: 'Families, policy teams, subject matter experts, and content reviewers' },
      { label: 'Status', value: 'Prototype / system design project' },
    ],
    workflow: [
      'Policy Documents',
      'Knowledge Layer',
      'RAG Script Generation',
      'Human Review',
      'Translation',
      'Video Generation',
      'Metadata and Distribution',
      'Published Education Content',
    ],
    sections: [
      {
        title: 'Overview',
        body: [
          'Navigate IDD is a governed AI system designed to transform complex Medicaid waiver regulations into verified multilingual educational videos.',
          'The project focuses on making dense policy information more accessible while preserving review, traceability, and compliance-oriented controls.',
        ],
      },
      {
        title: 'Business Problem',
        body: [
          'Families seeking disability services often encounter confusing waiver language and long policy documents. Critical guidance may also be unavailable in accessible formats or languages.',
          'Traditional video production is slow to update, while unconstrained generative AI is risky in regulated or policy-sensitive contexts.',
        ],
      },
      {
        title: 'Solution',
        body: [
          'The system uses retrieval-augmented generation to ground AI outputs in verified policy documents. AI drafts structured scripts from retrieved policy context, then subject matter experts review and approve the content before production.',
          'Approved scripts can be translated and converted into multilingual educational videos, with distribution metadata prepared downstream.',
        ],
      },
      {
        title: 'Governance and Human Review',
        body: [
          'The workflow is designed around human approval. Subject matter experts review scripts before video production so the system supports policy education without removing human responsibility for accuracy.',
        ],
      },
      {
        title: 'My Contributions',
        bullets: [
          'Architected the RAG-based workflow from policy source material to reviewed script output',
          'Designed the human-in-the-loop review model',
          'Mapped the pipeline across script generation, translation, video production, and distribution',
          'Helped frame the system around accuracy, accessibility, and traceability',
          'Translated a complex policy education problem into a structured AI workflow',
        ],
      },
      {
        title: 'Technical and Product Decisions',
        bullets: [
          'Used a policy knowledge layer to reduce hallucination risk',
          'Separated generation from approval so reviewers control final content',
          'Designed the workflow to support multilingual output after review',
          'Kept the system focused on education and accessibility rather than autonomous policy interpretation',
          'Prioritized traceability from generated scripts back to source policy context',
        ],
      },
      {
        title: 'Outcome and Lessons Learned',
        body: [
          'Navigate IDD validated a repeatable pattern for responsible AI in policy education: ground outputs in source documents, make review explicit, and use automation to scale production after content has been approved.',
        ],
      },
    ],
    outcomes: [
      'Reduced content production time by moving from manual production steps to an automated reviewed workflow',
      'Expanded accessibility through multilingual content generation',
      'Kept policy accuracy central through RAG and human review',
      'Created a traceable workflow from source documents to educational video content',
    ],
  },
  {
    slug: 'trisp-session-portal',
    title: 'TRISP Session Portal',
    eyebrow: 'Case Study',
    summary:
      'A custom client portal and internal operations system that turns a manual photography session workflow into a structured post-booking and post-shoot pipeline.',
    problem:
      'Photography session operations required repeated manual follow-up across session status, location details, gallery delivery, favorites selection, editing timelines, and final delivery communication.',
    solution:
      'A Supabase-backed admin dashboard and client portal organize sessions into a status-based workflow with smart delivery estimates, client actions, and automated email triggers.',
    role:
      'Product designer, full-stack builder, workflow architect, and AI-assisted development lead',
    outcome:
      'Improved operational clarity, client communication, delivery timeline tracking, and studio professionalism while preserving personal client touchpoints.',
    projectType: 'Creative operations workflow automation and client portal',
    users: 'Studio admin and photography clients',
    status: 'Internal product / business operations system',
    technologies: [
      'React',
      'Vite',
      'TypeScript',
      'Supabase',
      'Serverless API routes',
      'Resend email automation',
      'Google Calendar integration',
      'Workflow automation',
      'AI-assisted development',
      'Vercel',
    ],
    media: [
      {
        type: 'video',
        src: '/case-studies/trisp-session-portal/product-walkthrough.mp4',
        alt: 'TRISP Session Portal product walkthrough showing the admin dashboard and client session workflow',
        caption:
          'Product walkthrough showing the session management workflow, client portal, and delivery timeline experience.',
      },
    ],
    metadata: [
      { label: 'Project Type', value: 'Creative operations workflow automation and client portal' },
      { label: 'My Role', value: 'Product designer, full-stack builder, workflow architect, and AI-assisted development lead' },
      { label: 'Users', value: 'Studio admin and photography clients' },
      { label: 'Status', value: 'Internal product / business operations system' },
    ],
    workflow: [
      'Deposit Confirmation',
      'Session Creation',
      'Client Portal Link',
      'Session Complete',
      'Gallery Delivered',
      'Favorites Selected',
      'Editing Timeline',
      'Final Delivery',
    ],
    sections: [
      {
        title: 'Overview',
        body: [
          'TRISP Session Portal is a custom internal operations tool and client-facing portal built for TRISP Studio, a photography and creative studio.',
          'The system turns the post-booking and post-shoot client experience into a structured workflow for managing confirmed sessions, location details, gallery delivery, favorites selection, editing timelines, and final delivery communication.',
        ],
      },
      {
        title: 'Business Problem',
        body: [
          'The original photography workflow involved many small handoffs: confirming session details, sharing gallery links, waiting for client favorites, calculating editing timelines, and sending the right updates at the right time.',
          'None of those tasks were individually difficult, but together they created operational friction, uncertainty for clients, and extra mental load for the studio.',
        ],
      },
      {
        title: 'Solution',
        body: [
          'I built a session management system directly into the existing TRISP Studio website. The system has a private admin dashboard for studio operations and a public client portal for each confirmed session.',
          'Each client receives a unique portal link where they can see session status, location details, gallery access, favorites confirmation, and delivery timeline information.',
        ],
      },
      {
        title: 'Admin Dashboard',
        bullets: [
          'Created session records for confirmed paid clients',
          'Managed client name, email, session type, date, time, package, locations, and internal notes',
          'Supported multiple shoot locations with optional time ranges',
          'Provided explicit Save and Discard Changes behavior to avoid accidental email triggers',
          'Added status controls for session complete, gallery delivered, editing in progress, and final delivered',
          'Generated copyable client portal URLs for personal handoff after deposit confirmation',
        ],
      },
      {
        title: 'Client Portal',
        bullets: [
          'Displayed client name, session type, date, time, and current status',
          'Showed a status timeline and smart estimated delivery card',
          'Provided shoot location information with map links',
          'Gave clients gallery access when the unedited gallery was delivered',
          'Allowed clients to confirm when favorites were selected',
          'Updated the editing timeline after favorites were received',
        ],
      },
      {
        title: 'Workflow Automation',
        body: [
          'The system is built around a status-based pipeline. Booking confirmation and location setup are treated as prerequisites, while post-shoot stages are managed through explicit status changes and client actions.',
          'The favorites confirmation is a key automation moment: once a client confirms their selections, the system records the date, calculates the edited gallery estimate, advances the session to editing in progress, and sends notifications.',
        ],
      },
      {
        title: 'Email and Delivery Logic',
        body: [
          'Resend handles automated email notifications at meaningful workflow moments, including session complete, gallery delivered, favorites received, and final delivered.',
          'The delivery card changes meaning depending on where the client is in the pipeline, showing the unedited gallery estimate, favorites-needed state, edited gallery estimate, or delivered status.',
        ],
      },
      {
        title: 'Design Decisions',
        bullets: [
          'Kept the first client touchpoint personal by letting the studio manually send the portal link after deposit confirmation',
          'Started automation after the relationship was already established',
          'Used explicit saves to prevent accidental workflow or email changes',
          'Designed the portal to feel premium and reassuring rather than purely transactional',
          'Kept the admin workflow focused on statuses that require action',
        ],
      },
      {
        title: 'Technical Architecture',
        body: [
          'The system is built into the existing TRISP Studio website using React, Vite, TypeScript, Supabase, serverless API routes, Resend, and Vercel deployment.',
          'A separate session locations table supports multi-location shoots, while serverless API routes handle admin CRUD, public portal access, client actions, shared session logic, and automated email delivery.',
        ],
      },
      {
        title: 'Production Challenge',
        body: [
          'One production issue involved Vercel route handling. A dynamic API route was being intercepted by the single-page app catch-all rewrite, causing public session lookups to fail.',
          'The fix was to replace the dynamic API route with a flat route using a query token. That made the route an exact serverless function match and restored reliable portal access in production.',
        ],
      },
      {
        title: 'AI-Assisted Development Workflow',
        body: [
          'This project also became a practical example of AI-assisted product development. I used Codex inside the existing codebase, Claude with Supabase MCP for database work, Claude Design for the product showcase foundation, and After Effects for motion polish.',
          'The value was not adding AI into the product for its own sake. The value was using AI tools to move from operational ambiguity to a working business system faster and with more design iteration.',
        ],
      },
      {
        title: 'Outcome and Lessons Learned',
        body: [
          'TRISP Session Portal gives the studio a more organized way to manage photography sessions from deposit confirmation through final delivery.',
          'The biggest lesson was deciding what not to automate. The system preserves personal client relationship moments while automating the repetitive follow-up and tracking work that happens after the session is underway.',
        ],
      },
    ],
    outcomes: [
      'Improved internal workflow consistency for confirmed photography sessions',
      'Reduced client uncertainty by giving each client a dedicated portal',
      'Automated key communication moments without replacing personal relationship touchpoints',
      'Created a scalable foundation for managing more sessions with less manual tracking',
      'Demonstrated how AI-assisted development can support real business operations',
    ],
  },
]

const CASE_STUDY_ORDER = [
  'group-sales-automation',
  'navigate-idd',
  'contract-generation',
  'trisp-session-portal',
  'soundintel',
  'trilo',
]

export const ORDERED_CASE_STUDIES = [...CASE_STUDIES].sort(
  (a, b) => CASE_STUDY_ORDER.indexOf(a.slug) - CASE_STUDY_ORDER.indexOf(b.slug),
)

export const ARCHIVE_PROJECTS = [...ORDERED_CASE_STUDIES]

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug)
}

export function getCaseStudyNavigation(slug: string) {
  const index = ORDERED_CASE_STUDIES.findIndex((study) => study.slug === slug)

  return {
    previous: index > 0 ? ORDERED_CASE_STUDIES[index - 1] : undefined,
    next:
      index >= 0 && index < ORDERED_CASE_STUDIES.length - 1
        ? ORDERED_CASE_STUDIES[index + 1]
        : undefined,
  }
}
