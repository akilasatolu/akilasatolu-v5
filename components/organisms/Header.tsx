import Link from "next/link";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { ContentInner } from "@/components/templates/ContentInner";

export const Header = () => {
    return (
        <header className="border-b border-[color:var(--border)]">
            <ContentInner>
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/"
                            className="text-3xl font-semibold tracking-tight [--accent-visited:var(--accent)] hover:[--accent-visited:var(--accent-hover)]"
                        >
                            akilasatolu
                        </Link>
                    </div>
                    <div className="flex shrink-0 items-center">
                        <ThemeToggle />
                    </div>
                </div>
            </ContentInner>
        </header>
    );
};
