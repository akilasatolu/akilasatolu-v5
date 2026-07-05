export type ExperienceTech = {
    skill: string;
    level: number;
};

export type ExperienceProject = {
    pjTitle: string;
    pjDescription: string;
    pjPeriod: string[];
    pjTechList: ExperienceTech[];
};

export type ExperienceData = {
    Projects: ExperienceProject[];
};

export type BlogPost = {
    slug: string;
    title: string;
    date: string;
    draft: boolean;
    tags: string[];
    description: string;
};
