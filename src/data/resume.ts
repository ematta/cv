export interface Contact {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  github: string;
}

export interface Job {
  role: string;
  company: string;
  start: string;
  end: string;
  location: string | null;
  remote: boolean;
  bullets: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Education {
  degree: string;
  school: string;
  years: string;
  status?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Resume {
  contact: Contact;
  summary: string;
  experience: Job[];
  skills: SkillGroup[];
  education: Education[];
  certifications: Certification[];
}

export const resume: Resume = {
  contact: {
    name: "Enrique Matta-Rodriguez",
    title: "Software Engineering Manager",
    location: "San Antonio, TX",
    phone: "210-570-6667",
    email: "enrique.j.matta@gmail.com",
    github: "github.com/ematta",
  },
  summary:
    "Software Engineering Manager and working manager spending approximately 50% of time in direct technical contribution \u2014 including production feature development, API architecture, MCP server development, CI/CD pipeline ownership, and code reviews. Proven track record of building high-performing teams, navigating organizational change, and delivering quality-driven engineering programs at scale. Led teams of up to 10 engineers spanning full-time staff and contractors across onshore and offshore models. Brings 14+ years of progressive engineering experience spanning production software development, QA automation, and platform infrastructure. Currently pursuing a Master of Science in Organizational Leadership.",
  experience: [
    {
      role: "Manager, Software Development",
      company: "Shutterstock",
      start: "Apr 2024",
      end: "Present",
      location: null,
      remote: true,
      bullets: [
        "Serve as a working manager, spending approximately 50% of time in direct technical contribution \u2014 including production feature development, API architecture, code reviews, and CI/CD pipeline ownership \u2014 alongside full people management responsibilities for a team of up to 10 engineers (4 FTE, 6 contractors).",
        "Led production engineering work on Shutterstock\u2019s Contributor platform \u2014 responsible for all contributor content ingestion and submission workflows \u2014 including a hands-on migration of core APIs from REST to GraphQL, improving query efficiency, reducing over-fetching, and modernizing the integration layer for downstream consumers.",
        "Architected and delivered an MCP (Model Context Protocol) server as a shim in front of the contributor API layer, enabling AI tooling to interact with backend upload workflows and integrating AI capabilities directly into engineering processes.",
        "Led client-side facial detection model work and managed delivery of Release Form Similarity, both shipped to production; improvements scaled ingestion quality, reduced reviewer kickbacks, and shortened asset approval time.",
        "Owned and maintained all CI pipeline infrastructure for the team, ensuring reliability, performance, and developer productivity across continuous integration workflows.",
        "Led people management including regular one-on-ones, performance reviews, and career development conversations to support individual growth and team retention.",
        "Merged two distinct engineering teams (Contributor Apps and Review Apps) into a single cohesive cross-functional unit, driving knowledge cross-pollination, eliminating delivery silos, and maintaining team stability through the transition.",
        "Guided the organization through two company-wide restructuring events while preserving team continuity and morale.",
        "Drove methodology change from Agile Sprint to Shape Up, improving project scoping discipline and delivery predictability.",
        "Partnered with cross-functional stakeholders to implement company-wide QA policies and enablement programs, improving test efficiency by 15% across teams.",
      ],
    },
    {
      role: "Software Engineer in Test III",
      company: "Shutterstock",
      start: "Jul 2022",
      end: "May 2024",
      location: null,
      remote: true,
      bullets: [
        "Provided technical leadership and people management to a 4-person QA team, setting shared objectives across sprint testing, automation, and continuous improvement.",
        "Led migration of 120 Puppeteer tests to Playwright, reducing pipeline failures by over 50% and establishing a modern, maintainable test foundation for the team.",
        "Transitioned team workflow from Kanban to Agile Sprint, resulting in a 75% improvement in time to completion and greater alignment with cross-functional delivery expectations.",
        "Spearheaded refactoring of a flaky Jenkins pipeline, improving CI reliability and removing a recurring source of developer friction.",
        "Developed comprehensive load testing strategy utilizing Artillery, Playwright, and Fargate/EC2 Container technologies.",
      ],
    },
    {
      role: "Senior Software Engineer in Test",
      company: "Grid.ai",
      start: "Nov 2021",
      end: "Jun 2022",
      location: null,
      remote: true,
      bullets: [
        "Established a quality-focused engineering culture by introducing QAOps/DevTestOps principles, training materials, and 1:1 coaching programs for developers and technical leads.",
        "Managed two contractors in executing quality-related tasks within an agile environment, overseeing daily CI/CD deployment workflows.",
        "Implemented daily releases via GitHub Actions with post-release acceptance test validations, achieving a 20% improvement in Mean Time to Recovery.",
        "Collaborated with the People Team on SOC2 compliance, covering vulnerability scanning, change management, and file integrity workflows.",
        "Developed an end-to-end test framework utilizing Cypress Test Framework, enabling increased confidence in daily releases.",
      ],
    },
    {
      role: "Senior Software Engineer in Test",
      company: "Knock",
      start: "Sep 2020",
      end: "Nov 2021",
      location: null,
      remote: true,
      bullets: [
        "Fostered a quality-centric engineering culture through coaching, cross-team education on modern testing principles, and introduction of a bug bash process for two major platform releases.",
        "Developed an end-to-end test framework in Node.js and Playwright, integrated into the CI pipeline via docker-compose, reducing failure rates by 15%.",
        "Established a mobile E2E framework using Node.js and Detox for React Native, covering both Android and iOS build targets.",
        "Implemented On-Call rotation using Datadog and PagerDuty integration and standardized the Root Cause Analysis process for engineering postmortems.",
      ],
    },
    {
      role: "Cloud QA Engineer",
      company: "Elastic",
      start: "Dec 2017",
      end: "May 2020",
      location: null,
      remote: true,
      bullets: [
        "Drove adoption of quality best practices across cross-functional teams by contributing to integration and functional test frameworks and encouraging QA engagement in GitHub pull request workflows.",
        "Delivered test frameworks in Node.js/Webdriver.io, Python, and Scala targeting billing infrastructure and microservices, integrated with Jenkins CI and reporting to Elasticsearch/Kibana.",
      ],
    },
    {
      role: "Software Development Engineer in Test",
      company: "Carbon Black, Inc.",
      start: "Jan 2017",
      end: "Dec 2017",
      location: null,
      remote: true,
      bullets: [
        "Delivered API and UI test frameworks in Python (pytest, Selenium, SwaggerApi) for Next-Generation Antivirus cloud endpoints; mentored QA team members in adopting testing tools within their respective scrum teams.",
      ],
    },
    {
      role: "Software Developer II / SDET II",
      company: "Rackspace",
      start: "Nov 2014",
      end: "Dec 2017",
      location: "San Antonio, TX",
      remote: false,
      bullets: [
        "Led and mentored QA engineers in automation best practices, contributed to cross-team frameworks, and architected RESTful applications in Python and Flask alongside QA load testing initiatives using Gatling.",
      ],
    },
    {
      role: "Quality Assurance Engineer",
      company: "Westpoint Underwriters",
      start: "Oct 2010",
      end: "Nov 2014",
      location: "Pinellas Park, FL",
      remote: false,
      bullets: [
        "Orchestrated the creation of the QA Automation department from the ground up, introduced Agile Kanban methodology, and supervised two Software Development Engineers in Test.",
        "Developed a UI test framework in Ruby, WATIR, and Cucumber for Insurance and Underwriting portals, and engineered QA tooling including SQL/HTML/Excel/PDF comparison utilities and JMeter load tests with d3 visualization reports.",
      ],
    },
  ],
  skills: [
    {
      category: "People Management",
      skills: [
        { name: "Performance Management", level: 5 },
        { name: "Career Development", level: 5 },
        { name: "Hiring", level: 4 },
        { name: "Coaching & Mentoring", level: 5 },
        { name: "Workforce Planning", level: 4 },
        { name: "Organizational Change Management", level: 4 },
        { name: "Onshore/Offshore Team Leadership", level: 5 },
      ],
    },
    {
      category: "Engineering Leadership",
      skills: [
        { name: "Agile", level: 5 },
        { name: "Shape Up", level: 4 },
        { name: "Kanban", level: 5 },
        { name: "Cross-functional Stakeholder Alignment", level: 4 },
        { name: "Org Design", level: 4 },
        { name: "CI/CD Strategy", level: 5 },
        { name: "QA Policy Development", level: 5 },
      ],
    },
    {
      category: "Production Engineering",
      skills: [
        { name: "GraphQL", level: 4 },
        { name: "REST API Design", level: 5 },
        { name: "Node.js", level: 5 },
        { name: "TypeScript", level: 5 },
        { name: "Python", level: 4 },
        { name: "MCP Server Development", level: 4 },
        { name: "API Architecture", level: 5 },
        { name: "Microservices", level: 4 },
      ],
    },
    {
      category: "Test Automation",
      skills: [
        { name: "Playwright", level: 5 },
        { name: "Cypress", level: 4 },
        { name: "Selenium", level: 4 },
        { name: "WebdriverIO", level: 4 },
        { name: "Detox", level: 3 },
        { name: "Puppeteer", level: 4 },
        { name: "Jest", level: 4 },
        { name: "pytest", level: 5 },
        { name: "Gatling", level: 3 },
      ],
    },
    {
      category: "CI/CD & DevOps",
      skills: [
        { name: "GitHub Actions", level: 5 },
        { name: "Jenkins", level: 4 },
        { name: "CircleCI", level: 4 },
        { name: "Docker", level: 4 },
        { name: "Terraform", level: 3 },
        { name: "Ansible", level: 3 },
        { name: "SOC2 Compliance", level: 3 },
      ],
    },
    {
      category: "Platforms & Tools",
      skills: [
        { name: "Jira", level: 5 },
        { name: "Datadog", level: 4 },
        { name: "PagerDuty", level: 4 },
        { name: "SonarCloud", level: 3 },
        { name: "Elasticsearch/Kibana", level: 4 },
        { name: "Ruby", level: 3 },
        { name: "Scala", level: 2 },
      ],
    },
  ],
  education: [
    {
      degree: "Master of Science, Organizational Leadership",
      school: "Amberton University",
      years: "",
      status: "In Progress",
    },
    {
      degree: "Master of Business Administration",
      school: "Webster University",
      years: "2016 \u2013 2019",
    },
    {
      degree: "Bachelor of Science, Computer Information Systems",
      school: "DeVry University",
      years: "2002 \u2013 2006",
    },
  ],
  certifications: [
    {
      name: "Google People Management Essentials",
      issuer: "Google / Coursera",
      date: "Dec 2025",
    },
    {
      name: "Google Advanced Data Analytics",
      issuer: "Google / Coursera",
      date: "Nov 2024",
    },
    {
      name: "Google Data Analytics",
      issuer: "Google / Coursera",
      date: "Jul 2024",
    },
  ],
};
