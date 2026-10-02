import projectsRaw from '../../content/data/projects.json';
import experienceRaw from '../../content/data/experience.json';
import servicesRaw from '../../content/data/services.json';
import aboutRaw from '../../content/data/about.json';

export interface Project {
  id: string;
  title: string;
  status: string;
  statusClass: string;
  category: string;
  context: string;
  imageUrl: string;
  summary: string;
  problem: string;
  approach: string;
  implementation: string[];
  results: { metric: string; description: string }[];
  stack: string[];
  githubUrl?: string;
}

export interface ExperienceItem {
  current: boolean;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: { metric: string; text: string }[];
  tags: string[];
}

export interface ServiceItem {
  id?: string;
  iconName: string;
  title: string;
  desc: string;
}

export interface AboutData {
  heading: string;
  paragraphs: string[];
  highlights: Array<{
    title: string;
    lines?: string[];
    items?: string[];
  }>;
  tenets: Array<{
    iconName: string;
    title: string;
    tagline: string;
    body: string;
    metricCallout: string;
  }>;
  exploring: Array<{
    iconName: string;
    title: string;
    desc: string;
  }>;
}

export function getProjectsData(): Project[] {
  return projectsRaw as Project[];
}

export function getExperienceData(): ExperienceItem[] {
  return experienceRaw as ExperienceItem[];
}

export function getServicesData(): ServiceItem[] {
  return servicesRaw as ServiceItem[];
}

export function getAboutData(): AboutData {
  return aboutRaw as AboutData;
}
