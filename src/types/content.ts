import type { IconType } from "react-icons";

export type SectionId = "home" | "about" | "journey" | "work" | "skills" | "contact";

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  about: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  cvUrl?: string;
  photoUrl: string;
}

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  completedAt: string;
  description: string;
  verificationUrl?: string;
  imageUrl?: string;
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
  liveUrl?: string;
  codeUrl?: string;
}

export interface SkillGroup {
  category: string;
  items: string;
}

export interface Technology {
  name: string;
  icon: IconType;
  color?: string;
}
