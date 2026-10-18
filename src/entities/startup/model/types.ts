export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export type Review = {
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  author: string;
  position: string;
};

export type StartupDocument = {
  name: string;
  size: string;
  url: string;
};

export type Startup = {
  slug: string;
  name: string;
  shortDescription: string;
  /** Platform stage the startup is on (1 этап, 2 этап…). */
  stage: number;
  tags: string[];
  cover: string;
  founderPhoto: string;
  heroImage: string;
  wordmark?: string;
  raised: number;
  goal: number;
  investorsCount: number;
  publishedAt: string;
  about: {
    title: string;
    lead: string;
    paragraphs: string[];
    stepsIntro?: string;
    steps?: string[];
    closing: string[];
    image?: string;
    imageAlt?: string;
  };
  team: TeamMember[];
  reviews: Review[];
  documents: StartupDocument[];
};

export type StartupTab = 'about' | 'team' | 'reviews' | 'documents';
