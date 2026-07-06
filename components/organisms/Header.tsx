import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { ContentInner } from "@/components/templates/ContentInner";

export const Header = () => {
    return (
        <header className="border-b border-[color:var(--border)]">
            <ContentInner>
                <div className="flex items-center justify-between gap-4">
                    <Breadcrumbs />
                    <div className="flex shrink-0 items-center">
                        <ThemeToggle />
                    </div>
                </div>
            </ContentInner>
        </header>
    );
};
