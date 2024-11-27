import { Github, Linkedin, Mail, User, Briefcase, Phone, Globe, Code, Server, Palette, Layout } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon?: any;
  description?: string;
}

export interface NavSection {
  title: string;
  titleStyle?: React.CSSProperties;
  description?: string;
  links: NavLink[];
}

export const navSections: NavSection[] = [
  {
    title: "About Me",
    titleStyle: {
      fontFamily: '"Fira Code", "Courier New", monospace',
    },
    description: "A nihilist at the crossroads of technology and existential thought. Weaving elegant code into meaningful experiences while pondering life's deeper questions. Fueled by curiosity, coffee, and a touch of cosmic void.",
    links: [],
  },
  {
    title: "Hobbies",
    titleStyle: {
      fontFamily: '"Fira Code", "Courier New", monospace',
    },
    links: [
      { href: "/projects/ai", label: "AI Research", icon: Code, description: "Exploring artificial intelligence" },
      { href: "https://uiverse.io/profile/0xnihilism", label: "Web Components", icon: Globe, description: "Building reusable UI components" },
      { href: "/projects/prompt", label: "Prompt Engineering", icon: Palette, description: "Crafting effective AI prompts" },
    ],
  },
];

export const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:0xnihilist@gmail.com", icon: Mail, label: "Email" },
]; 