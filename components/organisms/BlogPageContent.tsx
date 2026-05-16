"use client";

import { PageTitle } from "@/components/atoms/PageTitle";
import type { BlogPost } from "@/types/types";
import Link from "next/link";
import { useMemo, useState } from "react";

type BlogPageContentProps = {
    posts: BlogPost[];
};

export const BlogPageContent = ({ posts }: BlogPageContentProps) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const sortedTags = useMemo(() => {
        const tagCounts = new Map<string, number>();
        for (const post of posts) {
            for (const tag of post.tags) {
                tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
            }
        }
        return [...tagCounts.entries()].sort(
            ([tagA, countA], [tagB, countB]) =>
                countB - countA || tagA.localeCompare(tagB),
        );
    }, [posts]);

    const filteredPosts = useMemo(() => {
        if (!selectedTag) {
            return posts;
        }
        return posts.filter((post) => post.tags.includes(selectedTag));
    }, [posts, selectedTag]);

    const handleTagClick = (tag: string) => {
        setSelectedTag((current) => (current === tag ? null : tag));
    };

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-start gap-8 md:flex-row md:items-stretch md:gap-4">
            <div className="w-full min-w-0 md:flex-1">
                <PageTitle title="Blog" />
                <ul className="mt-8 flex flex-col gap-4">
                    {filteredPosts.length === 0 ? (
                        <li className="text-sm text-[color:var(--muted)]">
                            No posts found for this tag.
                        </li>
                    ) : (
                        filteredPosts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}/`}
                                    className="blog-post-card block rounded-lg border border-[color:var(--border)] bg-[color:var(--card-bg)] p-5 text-inherit no-underline transition-colors hover:border-[color:var(--accent)] hover:text-inherit"
                                >
                                    <article>
                                        <div className="text-xl font-semibold tracking-tight text-foreground">
                                            {post.title}
                                        </div>
                                        <p className="mt-2 text-sm text-[color:var(--muted)]">
                                            {post.date}
                                        </p>
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
                                        <p className="mt-4 line-clamp-2 leading-relaxed text-foreground">
                                            {post.description}
                                        </p>
                                    </article>
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <aside className="w-full shrink-0 border-t border-[color:var(--border)] pt-8 md:min-h-full md:max-w-[30%] md:min-w-[20%] md:grow md:shrink md:basis-[25%] md:self-stretch md:border-l md:border-t-0 md:pt-0 md:pl-4">
                <p className="text-lg font-semibold tracking-tight text-foreground">
                    Search
                </p>
                <ul className="mt-8 flex flex-wrap gap-2">
                    {sortedTags.map(([tag, count]) => {
                        const isSelected = selectedTag === tag;
                        return (
                            <li key={tag}>
                                <button
                                    type="button"
                                    onClick={() => handleTagClick(tag)}
                                    aria-pressed={isSelected}
                                    className={`rounded-md border bg-[color:var(--card-bg)] px-2 py-0.5 text-xs text-foreground transition-colors ${
                                        isSelected
                                            ? "border-[color:var(--accent)]"
                                            : "border-[color:var(--border)] hover:border-[color:var(--accent)]"
                                    }`}
                                >
                                    {tag} ({count})
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </div>
    );
};
