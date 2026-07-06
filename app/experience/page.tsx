import { PageTitle } from "@/components/atoms/PageTitle";
import { getExperienceData } from "@/lib/experience";

export const dynamic = "force-static";

export default async function ExperiencePage() {
    const data = await getExperienceData();
    const { Projects } = data;

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col">
            <PageTitle title="Experience" />
            {Projects.map((pj) => {
                const [start, end] = pj.pjPeriod;
                const periodLabel = `${start} — ${end}`;

                return (
                    <article key={pj.pjTitle}>
                        <h2>{pj.pjTitle}</h2>
                        <p className="text-[color:var(--muted)]">{periodLabel}</p>
                        {pj.pjTechList.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {pj.pjTechList.map((tech) => (
                                    <code key={`${pj.pjTitle}-${tech.skill}`}>
                                        {tech.skill}
                                    </code>
                                ))}
                            </div>
                        )}
                        <p>{pj.pjDescription}</p>
                    </article>
                );
            })}
        </div>
    );
}
