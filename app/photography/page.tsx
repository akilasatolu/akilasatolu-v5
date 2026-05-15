import { PageTitle } from "@/components/atoms/PageTitle";
import { getPhotographyData, getPhotographyImageUrl } from "@/lib/photography";

export const dynamic = "force-static";

export default async function PhotographyPage() {
    const { photos } = await getPhotographyData();
    const photosReversed = [...photos].reverse();

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-start">
            <PageTitle title="Photography" />
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {photosReversed.map((item) => (
                    <li key={item.id} className="overflow-hidden border border-[color:var(--border)]">
                        <div className="relative aspect-square w-full overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={getPhotographyImageUrl(item.photo)}
                                alt={item.text}
                                className="absolute inset-0 h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
