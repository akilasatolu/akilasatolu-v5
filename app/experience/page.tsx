import { PageTitle } from "@/components/atoms/PageTitle";
import { getExperienceData } from "@/lib/experience";
import { computeSkillTimelineStats } from "@/lib/experienceSkillStats";

export const dynamic = "force-static";

export default async function ExperiencePage() {
    const data = await getExperienceData();
    const { Projects } = data;
    const skillStats = computeSkillTimelineStats(Projects);

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-start md:flex-row md:items-stretch gap-8 md:gap-4">
            <div className="w-full min-w-0 md:flex-1">
                <PageTitle title="Experience" />
                <ul className="mt-8 divide-y divide-[color:var(--border)]">
                    {Projects.map((pj) => {
                        const [start, end] = pj.pjPeriod;
                        const periodLabel = `${start} — ${end}`;

                        return (
                            <li key={pj.pjTitle} className="pt-6 pb-6 first:pt-0 last:pb-0">
                                <p className="text-sm text-[color:var(--muted)]">{periodLabel}</p>
                                <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                                    {pj.pjTitle}
                                </p>
                                <p className="mt-3 text-foreground">{pj.pjDescription}</p>
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {pj.pjTechList.map((tech) => (
                                        <li
                                            key={`${pj.pjTitle}-${tech.skill}`}
                                            className="rounded-md border border-[color:var(--border)] bg-[color:var(--card-bg)] px-2 py-0.5 text-xs text-foreground"
                                        >
                                            {tech.skill}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <aside className="w-full shrink-0 border-[color:var(--border)] border-t pt-8 md:min-h-full md:pl-4 md:grow md:shrink md:basis-[25%] md:min-w-[20%] md:max-w-[30%] md:self-stretch md:border-l md:border-t-0 md:pt-0">
                <p className="text-lg font-semibold tracking-tight text-foreground">Skills overview (years)</p>
                <ul className="mt-8 space-y-3">
                    {skillStats.map((row) => (
                        <li
                            key={row.skill}
                            className="flex min-w-0 flex-row border-b border-[color:var(--border)] pb-3 last:border-b-0 last:pb-0"
                        >
                            <p className="min-w-0 max-w-full break-words font-medium text-foreground whitespace-normal">
                                <span className="text-sm font-normal">{row.skill} : </span>{row.years}
                            </p>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
