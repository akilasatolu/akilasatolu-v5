import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { ContentInner } from "@/components/templates/ContentInner";

export const Header = () => {
    return (
        <header className="flex w-full justify-center border-b border-[color:var(--border)]">
            <ContentInner className="flex justify-start">
                <Breadcrumbs />
            </ContentInner>
        </header>
    );
};
