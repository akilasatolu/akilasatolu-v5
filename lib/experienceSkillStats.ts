import type { ExperienceProject, SkillTimelineStat } from "@/types/types";

/**
 * 各スキルについて、全案件の pjTechList.level を足す。
 * 表示側では合計を「years」として扱う（例: 1+2+3 → 6 years）。
 */
export function computeSkillTimelineStats(projects: ExperienceProject[]): SkillTimelineStat[] {
    const sumBySkill = new Map<string, number>();

    for (const pj of projects) {
        for (const { skill, level } of pj.pjTechList) {
            sumBySkill.set(skill, (sumBySkill.get(skill) ?? 0) + level);
        }
    }

    const stats: SkillTimelineStat[] = [...sumBySkill.entries()].map(([skill, years]) => ({
        skill,
        years,
    }));

    stats.sort((a, b) => {
        if (b.years !== a.years) {
            return b.years - a.years;
        }
        return a.skill.localeCompare(b.skill);
    });

    return stats;
}
