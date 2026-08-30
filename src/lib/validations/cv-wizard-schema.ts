import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(5, 'Phone number is required'),
  location: z.string().min(2, 'City, State/Country is required'),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
});

export const experienceItemSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(2, 'Job Title is required'),
  company: z.string().min(2, 'Company Name is required'),
  location: z.string().min(2, 'Location is required'),
  startDate: z.string().min(2, 'Start Date (e.g. Jan 2023) is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
  bullets: z.array(z.string()).min(1, 'At least one bullet point is required'),
});

export const educationItemSchema = z.object({
  id: z.string(),
  degree: z.string().min(2, 'Degree/Field of Study is required'),
  institution: z.string().min(2, 'University/Institution is required'),
  location: z.string().min(2, 'Location is required'),
  graduationDate: z.string().min(2, 'Graduation Date is required'),
  gpaOrHonors: z.string().optional(),
});

export const skillCategorySchema = z.object({
  id: z.string(),
  categoryName: z.string().min(2, 'Category Name (e.g. Languages) is required'),
  skillsList: z.string().min(2, 'Skills list (comma separated) is required'),
});

export const projectItemSchema = z.object({
  id: z.string(),
  projectName: z.string().min(2, 'Project Name is required'),
  description: z.string().min(5, 'Short description is required'),
  technologies: z.string().min(2, 'Technologies used (comma separated) is required'),
  projectLink: z.string().optional(),
  bullets: z.array(z.string()).min(1, 'At least one bullet point is required'),
});

export const cvWizardSchema = z.object({
  templateId: z.string().min(1, 'Template selection is required'),
  personalInfo: personalInfoSchema,
  experiences: z.array(experienceItemSchema).min(1, 'Add at least one work experience'),
  educations: z.array(educationItemSchema).min(1, 'Add at least one education entry'),
  skillCategories: z.array(skillCategorySchema).min(1, 'Add at least one skill category'),
  projects: z.array(projectItemSchema).default([]),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type ExperienceItemData = z.infer<typeof experienceItemSchema>;
export type EducationItemData = z.infer<typeof educationItemSchema>;
export type SkillCategoryData = z.infer<typeof skillCategorySchema>;
export type ProjectItemData = z.infer<typeof projectItemSchema>;
export type CvWizardData = z.infer<typeof cvWizardSchema>;

