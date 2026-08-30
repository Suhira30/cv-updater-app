'use client';

import React from 'react';
import { useWizardStore } from '@/store/useWizardStore';
import { TemplateGallery } from './TemplateGallery';
import { Plus, Trash2, ArrowRight, ArrowLeft, Sparkles, FileCode2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const QuestionnaireForm: React.FC = () => {
  const {
    currentStep,
    nextStep,
    prevStep,
    wizardData,
    updateWizardData,
    generateLatex,
  } = useWizardStore();

  const router = useRouter();

  // Helper for personal info changes
  const handlePersonalInfoChange = (field: string, value: string) => {
    updateWizardData({
      personalInfo: {
        ...wizardData.personalInfo,
        [field]: value,
      },
    });
  };

  // Helper for experience changes
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: [''],
    };
    updateWizardData({
      experiences: [...wizardData.experiences, newExp],
    });
  };

  const removeExperience = (index: number) => {
    const updated = wizardData.experiences.filter((_, i) => i !== index);
    updateWizardData({ experiences: updated });
  };

  // Helper for education changes
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpaOrHonors: '',
    };
    updateWizardData({
      educations: [...wizardData.educations, newEdu],
    });
  };

  const removeEducation = (index: number) => {
    const updated = wizardData.educations.filter((_, i) => i !== index);
    updateWizardData({ educations: updated });
  };

  // Helper for skill categories
  const addSkillCategory = () => {
    const newCat = {
      id: `skill-${Date.now()}`,
      categoryName: '',
      skillsList: '',
    };
    updateWizardData({
      skillCategories: [...wizardData.skillCategories, newCat],
    });
  };

  const removeSkillCategory = (index: number) => {
    const updated = wizardData.skillCategories.filter((_, i) => i !== index);
    updateWizardData({ skillCategories: updated });
  };

  // Helper for project changes
  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      projectName: '',
      description: '',
      technologies: '',
      projectLink: '',
      bullets: [''],
    };
    updateWizardData({
      projects: [...wizardData.projects, newProj],
    });
  };

  const removeProject = (index: number) => {
    const updated = wizardData.projects.filter((_, i) => i !== index);
    updateWizardData({ projects: updated });
  };

  const handleFinish = () => {
    generateLatex();
    // Proceed to workspace page
    router.push('/workspace');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto bg-bg-surface p-8 rounded-lg border border-border-default shadow-card">
      {/* STEP 1: TEMPLATE SELECTION */}
      {currentStep === 1 && <TemplateGallery />}

      {/* STEP 2: PERSONAL INFO */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="border-b border-border-default pb-4">
            <h2 className="text-h1 font-bold text-text-primary">Personal Information</h2>
            <p className="text-small text-text-secondary">Enter your primary contact and header details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-small font-medium text-text-primary">Full Name *</label>
              <input
                type="text"
                value={wizardData.personalInfo.fullName}
                onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                placeholder="e.g. Jane Doe"
                className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small focus:border-border-focus focus:outline-none"
              />
            </div>

            <div>
              <label className="text-small font-medium text-text-primary">Email Address *</label>
              <input
                type="email"
                value={wizardData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                placeholder="e.g. jane.doe@example.com"
                className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small focus:border-border-focus focus:outline-none"
              />
            </div>

            <div>
              <label className="text-small font-medium text-text-primary">Phone Number *</label>
              <input
                type="text"
                value={wizardData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                placeholder="e.g. +1 (555) 019-2834"
                className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small focus:border-border-focus focus:outline-none"
              />
            </div>

            <div>
              <label className="text-small font-medium text-text-primary">Location *</label>
              <input
                type="text"
                value={wizardData.personalInfo.location}
                onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small focus:border-border-focus focus:outline-none"
              />
            </div>

            <div>
              <label className="text-small font-medium text-text-primary">LinkedIn Username / URL</label>
              <input
                type="text"
                value={wizardData.personalInfo.linkedin || ''}
                onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                placeholder="linkedin.com/in/janedoe"
                className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small focus:border-border-focus focus:outline-none"
              />
            </div>

            <div>
              <label className="text-small font-medium text-text-primary">GitHub Profile / URL</label>
              <input
                type="text"
                value={wizardData.personalInfo.github || ''}
                onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                placeholder="github.com/janedoe"
                className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small focus:border-border-focus focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: WORK EXPERIENCE */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border-default pb-4">
            <div>
              <h2 className="text-h1 font-bold text-text-primary">Work Experience</h2>
              <p className="text-small text-text-secondary">Add your relevant work history and accomplishment bullets.</p>
            </div>
            <button
              onClick={addExperience}
              className="flex items-center space-x-1.5 rounded-sm bg-accent-subtle px-3 py-1.5 text-small font-semibold text-accent-primary hover:bg-accent-primary/20 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Position</span>
            </button>
          </div>

          <div className="space-y-6">
            {wizardData.experiences.map((exp, idx) => (
              <div key={exp.id || idx} className="p-5 rounded-md border border-border-default bg-bg-base space-y-4 relative">
                <div className="flex justify-between items-center">
                  <span className="text-small font-bold text-accent-primary">Position #{idx + 1}</span>
                  {wizardData.experiences.length > 1 && (
                    <button
                      onClick={() => removeExperience(idx)}
                      className="text-status-error hover:bg-status-error-bg p-1 rounded-sm"
                      title="Remove Position"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-tiny font-medium text-text-primary">Job Title *</label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => {
                        const updated = [...wizardData.experiences];
                        updated[idx].jobTitle = e.target.value;
                        updateWizardData({ experiences: updated });
                      }}
                      placeholder="e.g. Senior Software Engineer"
                      className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-tiny font-medium text-text-primary">Company *</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...wizardData.experiences];
                        updated[idx].company = e.target.value;
                        updateWizardData({ experiences: updated });
                      }}
                      placeholder="e.g. Acme Corp"
                      className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-tiny font-medium text-text-primary">Start Date *</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => {
                        const updated = [...wizardData.experiences];
                        updated[idx].startDate = e.target.value;
                        updateWizardData({ experiences: updated });
                      }}
                      placeholder="e.g. Jan 2023"
                      className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-tiny font-medium text-text-primary">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate || ''}
                      onChange={(e) => {
                        const updated = [...wizardData.experiences];
                        updated[idx].endDate = e.target.value;
                        updateWizardData({ experiences: updated });
                      }}
                      placeholder="e.g. Present"
                      className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-small focus:outline-none"
                    />
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-2">
                  <label className="text-tiny font-medium text-text-primary">Accomplishment Bullets</label>
                  {exp.bullets.map((b, bIdx) => (
                    <input
                      key={bIdx}
                      type="text"
                      value={b}
                      onChange={(e) => {
                        const updated = [...wizardData.experiences];
                        updated[idx].bullets[bIdx] = e.target.value;
                        updateWizardData({ experiences: updated });
                      }}
                      placeholder="e.g. Architected microservices handling 10M+ daily requests..."
                      className="w-full rounded-sm border border-border-default bg-bg-surface px-3 py-1.5 text-small focus:outline-none"
                    />
                  ))}
                  <button
                    onClick={() => {
                      const updated = [...wizardData.experiences];
                      updated[idx].bullets.push('');
                      updateWizardData({ experiences: updated });
                    }}
                    className="text-tiny text-accent-primary hover:underline font-medium"
                  >
                    + Add Bullet Point
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: EDUCATION & SKILLS */}
      {currentStep === 4 && (
        <div className="space-y-8">
          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-default pb-2">
              <h2 className="text-h2 font-bold text-text-primary">Education</h2>
              <button
                onClick={addEducation}
                className="flex items-center space-x-1 text-tiny font-semibold text-accent-primary"
              >
                <Plus className="h-4 w-4" /> <span>Add Education</span>
              </button>
            </div>

            {wizardData.educations.map((edu, idx) => (
              <div key={edu.id || idx} className="p-4 rounded-md border border-border-default bg-bg-base space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-tiny font-medium">Degree / Major *</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...wizardData.educations];
                        updated[idx].degree = e.target.value;
                        updateWizardData({ educations: updated });
                      }}
                      placeholder="e.g. B.S. in Computer Science"
                      className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-1.5 text-small"
                    />
                  </div>
                  <div>
                    <label className="text-tiny font-medium">Institution / University *</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...wizardData.educations];
                        updated[idx].institution = e.target.value;
                        updateWizardData({ educations: updated });
                      }}
                      placeholder="e.g. UC Berkeley"
                      className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-1.5 text-small"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-default pb-2">
              <h2 className="text-h2 font-bold text-text-primary">Skill Categories</h2>
              <button
                onClick={addSkillCategory}
                className="flex items-center space-x-1 text-tiny font-semibold text-accent-primary"
              >
                <Plus className="h-4 w-4" /> <span>Add Skill Category</span>
              </button>
            </div>

            {wizardData.skillCategories.map((cat, idx) => (
              <div key={cat.id || idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-md border border-border-default bg-bg-base">
                <div>
                  <label className="text-tiny font-medium">Category Name *</label>
                  <input
                    type="text"
                    value={cat.categoryName}
                    onChange={(e) => {
                      const updated = [...wizardData.skillCategories];
                      updated[idx].categoryName = e.target.value;
                      updateWizardData({ skillCategories: updated });
                    }}
                    placeholder="e.g. Languages"
                    className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-1.5 text-small"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-tiny font-medium">Skills List (comma-separated) *</label>
                  <input
                    type="text"
                    value={cat.skillsList}
                    onChange={(e) => {
                      const updated = [...wizardData.skillCategories];
                      updated[idx].skillsList = e.target.value;
                      updateWizardData({ skillCategories: updated });
                    }}
                    placeholder="e.g. TypeScript, Go, Python, SQL"
                    className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-1.5 text-small"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: PROJECTS & FINISH */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border-default pb-4">
            <div>
              <h2 className="text-h1 font-bold text-text-primary">Projects &amp; Final Review</h2>
              <p className="text-small text-text-secondary">Add key projects and generate your compilable LaTeX code.</p>
            </div>
            <button
              onClick={addProject}
              className="flex items-center space-x-1 text-tiny font-semibold text-accent-primary"
            >
              <Plus className="h-4 w-4" /> <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-4">
            {wizardData.projects.map((proj, idx) => (
              <div key={proj.id || idx} className="p-4 rounded-md border border-border-default bg-bg-base space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-tiny font-medium">Project Name *</label>
                    <input
                      type="text"
                      value={proj.projectName}
                      onChange={(e) => {
                        const updated = [...wizardData.projects];
                        updated[idx].projectName = e.target.value;
                        updateWizardData({ projects: updated });
                      }}
                      placeholder="e.g. TeXForge CV"
                      className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-1.5 text-small"
                    />
                  </div>
                  <div>
                    <label className="text-tiny font-medium">Technologies Used *</label>
                    <input
                      type="text"
                      value={proj.technologies}
                      onChange={(e) => {
                        const updated = [...wizardData.projects];
                        updated[idx].technologies = e.target.value;
                        updateWizardData({ projects: updated });
                      }}
                      placeholder="e.g. Next.js, TypeScript, Tectonic"
                      className="mt-1 w-full rounded-sm border border-border-default bg-bg-surface px-3 py-1.5 text-small"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md bg-accent-subtle p-4 border border-accent-primary/30 flex items-center space-x-3 text-accent-primary">
            <Sparkles className="h-5 w-5 shrink-0" />
            <p className="text-small font-medium">
              Ready! Clicking &quot;Generate LaTeX CV &amp; Preview&quot; will construct your clean LaTeX source code and open the live PDF compile workspace.
            </p>
          </div>
        </div>
      )}

      {/* STEP NAVIGATION BUTTONS */}
      <div className="flex items-center justify-between pt-6 border-t border-border-default">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center space-x-2 rounded-sm border border-border-default px-4 py-2 text-small font-semibold text-text-secondary hover:bg-bg-surface-hover"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < 5 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center space-x-2 rounded-sm bg-accent-primary px-6 py-2.5 text-small font-semibold text-text-on-primary hover:bg-accent-primary-hover shadow-sm"
          >
            <span>Next Step</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            className="flex items-center space-x-2 rounded-sm bg-status-success px-6 py-2.5 text-small font-bold text-white hover:bg-status-success/90 shadow-sm"
          >
            <FileCode2 className="h-5 w-5" />
            <span>Generate LaTeX CV &amp; Preview</span>
          </button>
        )}
      </div>
    </div>
  );
};

