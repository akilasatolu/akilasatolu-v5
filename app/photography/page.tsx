import { PageTitle } from "@/components/atoms/PageTitle";
import { PhotographyGrid } from "@/components/organisms/PhotographyGrid";
import { getPhotographyData, getPhotographyImageUrl } from "@/lib/photography";

export const dynamic = "force-static";

export default async function PhotographyPage() {
    const { photos } = await getPhotographyData();
    const items = [...photos].reverse().map((item) => ({
        id: item.id,
        photoUrl: getPhotographyImageUrl(item.photo),
        text: item.text,
    }));

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-start">
            <PageTitle title="Photography" />
            <PhotographyGrid items={items} />
        </div>
    );
}
