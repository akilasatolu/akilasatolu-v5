import { PageTitle } from "@/components/atoms/PageTitle";

export const dynamic = "force-static";

export default function HomePage() {
    return (
        <div className="flex min-h-0 w-full flex-1 flex-col">
            <PageTitle title="Home" />
        </div>
    );
}
