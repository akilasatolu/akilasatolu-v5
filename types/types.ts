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

/** aside 用: スキルごとに全案件の level を足した値（表示は years として扱う） */
export type SkillTimelineStat = {
    skill: string;
    /** Σ level（例: 1+2+3 → 6 years） */
    years: number;
};

export type PhotographyPhoto = {
    id: string;
    photo: string;
    text: string;
};

export type PhotographyData = {
    photos: PhotographyPhoto[];
};
