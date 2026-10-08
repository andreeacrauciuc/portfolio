// =====================================================
//  EDITEAZĂ AICI TOT CONȚINUTUL SITE-ULUI
//  (texte, linkuri, proiecte, timeline) — fără să umbli prin componente
// =====================================================

export const PROFILE = {
  name: "Andreea",
  role: "Business Informatics graduate, aspiring IT professional",
  tagline:
    "I combine business understanding with hands-on development in React, Java and C#/.NET.",
  about:
    "I graduated in Business Informatics at Alexandru Ioan Cuza University and I am now studying Project Management. I build my own projects in React, Java and C#/.NET, and I like understanding why a piece of software exists, not only how it works. I am looking for my first IT role where I can learn quickly and contribute to a team from the start.",
  email: "andreeacrauciuc09@gmail.com", // TODO: pune emailul tău
  linkedin: "https://www.linkedin.com/in/your-profile", // TODO: linkul tău LinkedIn
  github: "https://github.com/andreeacrauciuc",
  cvUrl: "/cv.pdf", // pune fișierul în /public/cv.pdf
  photoUrl: "/andreea.jpg", // pune poza în /public/andreea.jpg
};

export const NAV = [
  ["home", "Home"],
  ["about", "About"],
  ["journey", "Journey"],
  ["work", "Work"],
  ["skills", "Skills"],
  ["contact", "Contact"],
] as const;

export const FACTS = [
  ["8.80", "Bachelor's average"],
  ["9.75", "Final exam grade"],
  ["3", "Projects on GitHub"],
  ["2026", "Graduated, M.Sc. started"],
] as const;

export const JOURNEY = [
  [
    "2023",
    "Started B.Sc. Business Informatics",
    "Alexandru Ioan Cuza University, Iași",
    "Programming fundamentals, databases, C# and .NET, business analysis.",
  ],
  [
    "2025",
    "Erasmus+ traineeship, Crete",
    "Nana Golden Beach",
    "Worked in an international team and learned to communicate clearly with customers and colleagues.",
  ],
  [
    "Feb – Mar 2026",
    "CyberEDU Cybersecurity training",
    "Web, network, social engineering, code",
    "Completed the modules and solved hands-on security challenges.",
  ],
  [
    "2026",
    "Graduated Business Informatics",
    "UAIC Iași",
    "Bachelor's average 8.80, final exam 9.75.",
  ],
  [
    "Jul – Sep 2026",
    "Erasmus+ Supervisor",
    "Elinotel Apolamare, Halkidiki",
    "Coordinated a team in peak season: responsibility, planning, working under pressure.",
  ],
  [
    "2026 – 2028",
    "M.Sc. Project Management",
    "UAIC Iași",
    "Studying how to plan, deliver and lead projects.",
  ],
  [
    "Now",
    "Open to work",
    "Junior / entry-level IT roles",
    "Looking for my first role where I can learn fast and ship real work.",
  ],
] as const;

// Lasă live: "" dacă proiectul nu are încă demo — butonul "Live preview" dispare automat.
export const WORK = [
  {
    n: "01",
    title: "CineMate",
    tags: ["React", "OMDb API", "JavaScript"],
    problem: "Finding movies and series quickly, with clear details in one place.",
    built: "React app with search, results and detail pages using the OMDb API.",
    learned: "State management, API calls, error and loading states.",
    live: "",
    code: "https://github.com/andreeacrauciuc",
  },
  {
    n: "02",
    title: "ZeroWasteHome",
    tags: ["Web app", "Frontend"],
    problem: "Making eco-friendly habits at home easy to start and follow.",
    built: "Web app with practical tips and a clean, simple interface.",
    learned: "Structuring a project, UI details, publishing on GitHub.",
    live: "",
    code: "https://github.com/andreeacrauciuc/zerowastehome",
  },
  {
    n: "03",
    title: "Budget Tracker",
    tags: ["Java", "JPA/Hibernate", "PostgreSQL", "Vaadin"],
    problem: "Tracking income and expenses in one clear place.",
    built: "Java backend with JPA/Hibernate and PostgreSQL, Vaadin interface.",
    learned: "Database design, layered architecture, full-stack flow.",
    live: "",
    code: "https://github.com/andreeacrauciuc",
  },
];

export const SKILLS = [
  ["Frontend", "HTML · CSS · JavaScript · React"],
  ["Backend & data", "Java · C# · .NET · PostgreSQL"],
  ["Tools", "Git · GitHub · Jira · Figma"],
  ["Business", "Project management · Business analysis · Cybersecurity basics"],
] as const;

export const MARQUEE = [
  "React",
  "Java",
  "C#",
  ".NET",
  "PostgreSQL",
  "JavaScript",
  "Git",
  "Jira",
  "Figma",
  "Cybersecurity",
] as const;
