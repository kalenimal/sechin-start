'use client';

import type { Project } from '@/entities/project';
import { ExpertiseSummary } from './ExpertiseSummary';
import { AboutSection } from './sections/AboutSection';
import { ContactsSection } from './sections/ContactsSection';
import { DocumentsSection } from './sections/DocumentsSection';
import { HeaderSection } from './sections/HeaderSection';
import { IpSection } from './sections/IpSection';
import { RegulatorySection } from './sections/RegulatorySection';
import styles from './ProjectDetails.module.css';

type ProjectDetailsProps = {
  project: Project;
  /** Investor / corporate view shows the published expert verdict at the bottom. */
  showExpertise?: boolean;
};

/**
 * Full project card shared by the owner, investor/corporate and expert screens.
 * Every block is wrapped in `ReviewBlock`, so the surrounding `ReviewProvider` decides
 * whether it is plain, highlighted with remarks (owner) or commentable (expert).
 */
export function ProjectDetails({ project, showExpertise }: ProjectDetailsProps) {
  return (
    <article className={styles.root}>
      <HeaderSection project={project} />
      <AboutSection project={project} />
      <IpSection ip={project.ip} />
      <RegulatorySection regulatory={project.regulatory} clinical={project.clinical} />
      <DocumentsSection documents={project.documents} />
      <ContactsSection contacts={project.contacts} />
      {showExpertise && project.expertise && <ExpertiseSummary expertise={project.expertise} />}
    </article>
  );
}
