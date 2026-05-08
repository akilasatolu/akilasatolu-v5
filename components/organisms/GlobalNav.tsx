import { ContentInner } from "@/components/templates/ContentInner";
import Link from "next/link";

export const GlobalNav = () => {
    return (
        <nav className="border-b border-[color:var(--border)]">
            <ContentInner styles="flex justify-end">
                <ul className="flex flex-row flex-wrap justify-start gap-x-4 gap-y-2">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/experience">Experience</Link>
                    </li>
                    <li>
                        <Link href="/photography">Photography</Link>
                    </li>
                </ul>
            </ContentInner>
        </nav>
    );
}