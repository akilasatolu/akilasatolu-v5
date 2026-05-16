import Link from "next/link";
import type { BlogPostNeighbors } from "@/lib/blogNeighbors";

type BlogPostNavigationProps = BlogPostNeighbors;

const linkClassName =
    "blog-post-card flex w-fit max-w-[48%] min-w-0 items-center gap-4 rounded-lg border border-[color:var(--border)] bg-[color:var(--card-bg)] px-3 py-2.5 text-inherit no-underline transition-colors hover:border-[color:var(--accent)] hover:text-inherit";

const arrowClassName = "shrink-0 text-base leading-none text-[color:var(--muted)]";

export const BlogPostNavigation = ({ older, newer }: BlogPostNavigationProps) => {
    if (!older && !newer) {
        return null;
    }

    return (
        <nav
            aria-label="Adjacent posts"
            className="flex w-full shrink-0 justify-between border-t border-[color:var(--border)] mt-4 pt-4"
        >
            {older ? (
                <Link href={`/blog/${older.slug}/`} className={linkClassName}>
                    <span className={arrowClassName} aria-hidden="true">
                        &lt;
                    </span>
                    <div className="min-w-0">
                        <p className="text-xs text-[color:var(--muted)]">{older.date}</p>
                        <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-foreground">
                            {older.title}
                        </p>
                    </div>
                </Link>
            ) : null}
            {newer ? (
                <Link
                    href={`/blog/${newer.slug}/`}
                    className={`${linkClassName} ${!older ? "ml-auto" : ""}`}
                >
                    <div className="min-w-0 text-right">
                        <p className="text-xs text-[color:var(--muted)]">{newer.date}</p>
                        <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-foreground">
                            {newer.title}
                        </p>
                    </div>
                    <span className={arrowClassName} aria-hidden="true">
                        &gt;
                    </span>
                </Link>
            ) : null}
        </nav>
    );
};
