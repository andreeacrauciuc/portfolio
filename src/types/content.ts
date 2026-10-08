export type SectionId = "home" | "about" | "journey" | "work" | "skills" | "contact";

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  about: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  cvUrl: string;
  photoUrl: string;
}

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface Fact {
  value: string;
  label: string;
}

export interface JourneyEntry {
  id: string;
  period: string;
  title: string;
  place: string;
  description: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tags: readonly string[];
  problem: string;
  built: string;
  learned: string;
  /** Leave undefined while there is no demo: the "Live preview" button is hidden. */
  liveUrl?: string;
  codeUrl: string;
}

export interface SkillGroup {
  category: string;
  items: string;
}
