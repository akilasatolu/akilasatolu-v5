import { PageTitle } from "@/components/atoms/PageTitle";
import { getPublishedBlogPosts } from "@/lib/blog";
import Link from "next/link";

export const dynamic = "force-static";

export default async function HomePage() {
    const posts = await getPublishedBlogPosts();
    const tagCounts = new Map<string, number>();
    for (const post of posts) {
        for (const tag of post.tags) {
            tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
        }
    }
    const sortedTags = [...tagCounts.entries()].sort(
        ([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB),
    );

    return (
        <div className="w-full flex min-h-0 flex-1 flex-col justify-start md:flex-row md:items-stretch gap-8 md:gap-4">
            <div className="w-full min-w-0 md:flex-1">
                <PageTitle title="Blog" />
                <ul className="mt-8 flex flex-col gap-4">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}/`}
                                className="blog-post-card block rounded-lg border border-[color:var(--border)] bg-[color:var(--card-bg)] p-5 text-inherit no-underline transition-colors hover:border-[color:var(--accent)] hover:text-inherit"
                            >
                                <article>
                                    <div className="text-xl font-semibold tracking-tight text-foreground">
                                        {post.title}
                                    </div>
                                    <p className="mt-2 text-sm text-[color:var(--muted)]">{post.date}</p>
                                    {post.tags.length > 0 && (
                                        <ul className="mt-3 flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <li
                                                    key={`${post.slug}-${tag}`}
                                                    className="rounded-md border border-[color:var(--border)] bg-[color:var(--tag-bg)] px-2 py-0.5 text-xs text-foreground"
                                                >
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <p className="mt-4 line-clamp-2 text-foreground leading-relaxed">
                                        {post.description}
                                    </p>
                                </article>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <aside className="w-full shrink-0 border-[color:var(--border)] border-t pt-8 md:min-h-full md:pl-4 md:grow md:shrink md:basis-[25%] md:min-w-[20%] md:max-w-[30%] md:self-stretch md:border-l md:border-t-0 md:pt-0">
                <p className="text-lg font-semibold tracking-tight text-foreground">Tags</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                    {sortedTags.map(([tag, count]) => (
                        <li
                            key={tag}
                            className="rounded-md border border-[color:var(--border)] bg-[color:var(--card-bg)] px-2 py-0.5 text-xs text-foreground"
                        >
                            {tag} ({count})
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
