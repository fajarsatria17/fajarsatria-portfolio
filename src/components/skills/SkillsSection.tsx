import React from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { SectionHeader, Card, Badge } from '@components/ui';
import { skills } from '@data/skills';
import type { SkillCategory } from '@type/content';
import { sortByOrder } from '@utils/content';
import {
  Code,
  Globe,
  Brain,
  Database,
  TerminalWindow,
  UsersThree,
} from '@phosphor-icons/react';

interface CategoryConfig {
  id: SkillCategory;
  num: string;
  icon: React.ElementType;
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'languages', num: '01', icon: Code },
  { id: 'webDev', num: '02', icon: Globe },
  { id: 'aiMl', num: '03', icon: Brain },
  { id: 'databaseEngineering', num: '04', icon: Database },
  { id: 'devTools', num: '05', icon: TerminalWindow },
  { id: 'softSkills', num: '06', icon: UsersThree },
];

export const SkillsSection: React.FC = () => {
  const { t } = useLanguage();

  const getCategoryTitle = (cat: SkillCategory): string => {
    switch (cat) {
      case 'languages':
        return t.skills.languages;
      case 'webDev':
        return t.skills.webDev;
      case 'aiMl':
        return t.skills.aiMl;
      case 'databaseEngineering':
        return t.skills.databaseEngineering;
      case 'devTools':
        return t.skills.devTools;
      case 'softSkills':
        return t.skills.softSkills;
    }
  };

  return (
    <section
      id="skills"
      aria-label={t.sections.skillsTitle}
      data-testid="skills-section"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20"
    >
      <SectionHeader
        eyebrow="02 / CAPABILITIES"
        title={t.sections.skillsTitle}
        subtitle={t.sections.skillsSubtitle}
      />

      <div
        data-testid="skills-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {CATEGORIES.map(category => {
          const categorySkills = sortByOrder(
            skills.filter(s => s.category === category.id)
          );
          const Icon = category.icon;
          const title = getCategoryTitle(category.id);

          return (
            <Card
              key={category.id}
              glow
              className="flex flex-col justify-between p-6 border-border/80 hover:border-accent/50 group transition-all duration-300"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent/60 transition-all duration-300">
                    <Icon size={18} weight="duotone" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs text-text-tertiary">
                    {category.num} //
                  </span>
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-text-primary group-hover:text-accent transition-colors mb-4">
                  {title}
                </h3>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map(skill => (
                    <Badge
                      key={skill.id}
                      variant="default"
                      className="px-2.5 py-1 text-xs font-mono transition-all duration-200 hover:border-accent/60 hover:text-accent hover:bg-accent/5"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bottom Cyber Accent Line */}
              <div
                className="w-full h-0.5 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 mt-6 group-hover:via-accent/70 transition-all duration-300"
                aria-hidden="true"
              />
            </Card>
          );
        })}
      </div>
    </section>
  );
};
