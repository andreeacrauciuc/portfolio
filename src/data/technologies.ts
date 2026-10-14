import { FaJava } from "react-icons/fa";
import { LuShieldCheck } from "react-icons/lu";
import {
  SiDotnet,
  SiFigma,
  SiGit,
  SiJavascript,
  SiJira,
  SiPostgresql,
  SiReact,
  SiSharp,
} from "react-icons/si";
import type { Technology } from "@/types/content";

export const technologies: readonly Technology[] = [
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Java", icon: FaJava, color: "#ed8b00" },
  { name: "C#", icon: SiSharp, color: "#512bd4" },
  { name: ".NET", icon: SiDotnet, color: "#512bd4" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "Jira", icon: SiJira, color: "#0052cc" },
  { name: "Figma", icon: SiFigma, color: "#f24e1e" },
  { name: "Cybersecurity", icon: LuShieldCheck },
];
