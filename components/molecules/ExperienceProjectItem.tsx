import type { ExperienceProject } from "@/types/types";

type ExperienceProjectProps = {
    project: ExperienceProject;
};

export const ExperienceProjectItem = ({ project }: ExperienceProjectProps) => {
    const [start, end] = project.pjPeriod;
    const periodLabel = `${start} — ${end}`;

    return (
        <article>
            <h2>{project.pjTitle}</h2>
            <p className="text-[color:var(--muted)]">{periodLabel}</p>
            {project.pjTechList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {project.pjTechList.map((tech) => (
                        <code key={`${project.pjTitle}-${tech.skill}`}>{tech.skill}</code>
                    ))}
                </div>
            )}
            <p>{project.pjDescription}</p>
        </article>
    );
};
