import Link from "next/link";
import { ContentInner } from "@/components/templates/ContentInner";

export const Header = () => {
    return (
        <header className="border-b border-[color:var(--border)]">
            <ContentInner>
                <div>
                    <Link
                        href="/"
                        className="text-3xl font-semibold tracking-tight [--accent-visited:var(--accent)] hover:[--accent-visited:var(--accent-hover)]"
                    >
                        akilasatolu
                    </Link>
                </div>
            </ContentInner>
        </header>
    );
}
