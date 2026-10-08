import type { Project } from "@/types/content";

// Set `liveUrl` once a project has a demo; without it the "Live preview" button is hidden.
export const projects: readonly Project[] = [
  {
    id: "cinemate",
    number: "01",
    title: "CineMate",
    tags: ["React", "OMDb API", "JavaScript"],
    problem: "Finding movies and series quickly, with clear details in one place.",
    built: "React app with search, results and detail pages using the OMDb API.",
    learned: "State management, API calls, error and loading states.",
    codeUrl: "https://github.com/andreeacrauciuc",
  },
  {
    id: "zerowastehome",
    number: "02",
    title: "ZeroWasteHome",
    tags: ["Web app", "Frontend"],
    problem: "Making eco-friendly habits at home easy to start and follow.",
    built: "Web app with practical tips and a clean, simple interface.",
    learned: "Structuring a project, UI details, publishing on GitHub.",
    codeUrl: "https://github.com/andreeacrauciuc/zerowastehome",
  },
  {
    id: "budget-tracker",
    number: "03",
    title: "Budget Tracker",
    tags: ["Java", "JPA/Hibernate", "PostgreSQL", "Vaadin"],
    problem: "Tracking income and expenses in one clear place.",
    built: "Java backend with JPA/Hibernate and PostgreSQL, Vaadin interface.",
    learned: "Database design, layered architecture, full-stack flow.",
    codeUrl: "https://github.com/andreeacrauciuc",
  },
];
