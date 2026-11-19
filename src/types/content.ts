export type Language = 'en' | 'id';

export interface LocalizedString {
  en: string;
  id: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  email?: string;
}

export interface Profile {
  name: string;
  eyebrow: LocalizedString;
  headline: LocalizedString;
  summary: LocalizedString;
  bio: LocalizedString;
  location?: LocalizedString;
  avatarUrl?: string;
  socialLinks: SocialLinks;
}

export type SkillCategory =
  | 'languages'
  | 'webDev'
  | 'aiMl'
  | 'databaseEngineering'
  | 'devTools'
  | 'softSkills';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  sortOrder: number;
  icon?: string;
}

export interface Experience {
  id: string;
  organization: string;
  department?: string;
  division?: string;
  team?: string;
  role: LocalizedString;
  startDate: string; // YYYY-MM
  endDate?: string | null; // YYYY-MM or null for Present
  isCurrent: boolean;
  description: LocalizedString;
  highlights?: LocalizedString[];
  technologies?: string[];
  sortOrder: number;
  published: boolean;
}

export interface EducationPublication {
  title: string;
  journal: string;
  issue: string;
  doi: string;
}

export interface Education {
  id: string;
  institution: string;
  program: LocalizedString;
  startDate: string;
  endDate?: string | null;
  gpa?: string;
  thesis?: LocalizedString;
  publication?: EducationPublication;
  coursework?: LocalizedString[];
  description?: LocalizedString;
  sortOrder: number;
  published: boolean;
}

export type ProjectCategory = 'all' | 'web' | 'mobile' | 'system' | 'ai';

export interface ProjectScreenshotItem {
  id: string;
  url: string;
  fallbackUrl?: string;
  title: LocalizedString;
  caption: LocalizedString;
  isAuthentic?: boolean;
}

export interface ProjectDetailKeyModule {
  title: LocalizedString;
  description: LocalizedString;
}

export interface ProjectDetailChallenge {
  challenge: LocalizedString;
  solution: LocalizedString;
}

export interface ProjectDetailContent {
  overview?: LocalizedString;
  problemStatement: LocalizedString;
  objectives: LocalizedString[];
  roleAndContributions: LocalizedString[];
  keyModules: ProjectDetailKeyModule[];
  technicalHighlights: LocalizedString[];
  challengesAndSolutions: ProjectDetailChallenge[];
  outcomes: LocalizedString[];
  privacyDisclaimer?: LocalizedString;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: LocalizedString;
  description: LocalizedString;
  role: LocalizedString;
  technologies: string[];
  thumbnailUrl: string;
  authenticScreenshotUrl?: string;
  fallbackIllustrationUrl: string;
  isAuthenticScreenshot?: boolean;
  expectedScreenshots?: string[];
  galleryScreenshots?: ProjectScreenshotItem[];
  details?: ProjectDetailContent;
  gallery?: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  published: boolean;
  sortOrder: number;
  highlights?: LocalizedString[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string; // YYYY-MM
  credentialUrl?: string;
  imageUrl?: string;
  published: boolean;
  sortOrder: number;
}

export interface SiteSettings {
  siteTitle: LocalizedString;
  metaDescription: LocalizedString;
  cvUrl?: string;
  cvAvailable?: boolean;
  defaultLanguage: Language;
}
