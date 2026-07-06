import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { ContentInner } from "@/components/templates/ContentInner";

export const Header = () => {
    return (
        <header className="border-b border-[color:var(--border)]">
            <ContentInner>
                <Breadcrumbs />
            </ContentInner>
        </header>
    );
};
