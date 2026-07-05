import { PageTitle } from "@/components/atoms/PageTitle";
import { getExperienceData } from "@/lib/experience";

export const dynamic = "force-static";

export default async function ExperiencePage() {
    const data = await getExperienceData();
    const { Projects } = data;

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-start">
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
    );
};
