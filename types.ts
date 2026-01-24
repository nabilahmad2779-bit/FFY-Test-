
export interface Demographics {
  ageRange: string;
  geoDhaka: number;
  geoChattogram: number;
  geoSylhet: number;
  geoRajshahi: number;
  geoKhulna: number;
  geoBarishal: number;
  geoRangpur: number;
  geoMymensingh: number;
  eduSchool: number;
  eduCollege: number;
  eduUndergrad: number;
  eduPostgrad: number;
}

export interface EventData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  metrics: {
    reach: number;
    reachLabel: string;
    ambassadors: number;
    participants: number;
  };
  demographics: Demographics;
  image: string;
  year: string;
  segments?: string[];
}

// Added Project interface to resolve error in ProjectCard.tsx
export interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  impact: string;
}

export interface SkillRoadmap {
  skill: string;
  vision: string;
  milestones: {
    phase: string;
    action: string;
  }[];
}

export interface Collaboration {
  name: string;
  event: string;
  date: string;
}

export interface Member {
  name: string;
  role: string;
  impact: string;
  image: string;
}

export interface Alumni {
  name: string;
  image: string;
  designation: string;
  university: string;
}

export interface Department {
  id: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  icon: string;
  accent: string;
  colorClass: string;
  goals: string[];
}

export interface ImpactStory {
  topic: string;
  vision: string;
  keyGoals: string[];
}

export enum NavSection {
  Home = 'home',
  OurHistory = 'our-history',
  StructuralPillars = 'structural-pillars',
  DepartmentDetail = 'department-detail',
  HallOfFame = 'hall-of-fame',
  OurAlumni = 'our-alumni',
  // Archive/Other sections kept for secondary nav
  History = 'history',
  Initiatives = 'initiatives',
  Laurels = 'laurels',
  Contact = 'contact',
  // Added Impact to resolve error in Header.tsx
  Impact = 'impact'
}
