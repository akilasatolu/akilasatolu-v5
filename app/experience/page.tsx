import { ExperienceProjectItem } from "@/components/molecules/ExperienceProjectItem";
import { PageTitle } from "@/components/atoms/PageTitle";
import { getExperienceData } from "@/lib/experience";

export const dynamic = "force-static";

export default async function ExperiencePage() {
    const { Projects } = await getExperienceData();

    return (
        <>
            <PageTitle title="Experience" />
            {Projects.map((project) => (
                <ExperienceProjectItem key={project.pjTitle} project={project} />
            ))}
        </>
    );
}
