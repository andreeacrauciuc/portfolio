import type { Project } from "@/types/content";

export const projects: readonly Project[] = [
  {
    id: "zerowastehome",
    number: "01",
    title: "ZeroWasteHome",
    tags: ["Web app", "Frontend", "UX"],
    problem:
      "Many sustainability tips are hard to apply in daily life because they are not organized or visually engaging.",
    built:
      "I created a practical web app that presents eco-friendly home habits in a clean, motivating, easy-to-follow structure.",
    learned:
      "I improved my ability to organize information, simplify user flows, and create a product that feels useful and approachable from the first interaction.",
    liveUrl: "https://zerowastehome.vercel.app/home",
    codeUrl: "https://github.com/andreeacrauciuc/zerowastehome",
  },
  {
    id: "cinemate",
    number: "02",
    title: "CineMate",
    tags: ["React", "OMDb API", "UI design"],
    problem:
      "Users needed a simple way to search for movies and series and get quick, readable information without clutter.",
    built:
      "I designed and built a React-based media search interface that fetches data from OMDb and presents it in a clear, focused layout.",
    learned:
      "This project strengthened my understanding of API integration, component structure, loading and error handling, and building intuitive browsing experiences.",
    liveUrl: "https://cinemate-ashy.vercel.app/",
    codeUrl: "https://github.com/andreeacrauciuc/CineMate",
  },
  {
    id: "budget-tracker",
    number: "03",
    title: "Budget Tracker",
    tags: ["Java", "JPA", "PostgreSQL", "Vaadin"],
    problem:
      "Keeping track of income and expenses in a consistent way can become difficult without a structured overview.",
    built:
      "I developed a Java application with a database-backed backend and a Vaadin interface for tracking personal finances.",
    learned:
      "This project helped me understand data modeling, layered architecture, and how business logic and user interaction connect in a full-stack workflow.",
    codeUrl: "https://github.com/andreeacrauciuc/BudgetTracker",
  },
  {
    id: "skilltrade",
    number: "04",
    title: "SkillTrade",
    tags: ["Figma", "Web design", "Team project"],
    problem:
      "Students and other people need a clear way to share skills and discover opportunities to learn from one another.",
    built:
      "As a web designer, I contributed to the design of an app concept for sharing skills in a 15-person project team.",
    learned:
      "This project developed my experience with Figma, collaborative design work, and communicating visual ideas within a larger team.",
    liveUrl:
      "https://www.figma.com/design/AZTSxelU6KhE3cGTndg43Q/SkillTrade-app-prototip?node-id=0-1&p=f&m=dev",
  },
];
