"use client";

import { getPageSlice, getTotalPages } from "@/lib/blogPagination";
import type { BlogPost } from "@/types/types";
import Link from "next/link";
import { useState } from "react";

type BlogPostListProps = {
    posts: BlogPost[];
};

const paginationButtonClassName =
    "rounded-md border border-[color:var(--border)] bg-[color:var(--card-bg)] px-3 py-1.5 text-sm text-foreground transition-colors enabled:hover:border-[color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-40";

export const BlogPostList = ({ posts }: BlogPostListProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = getTotalPages(posts.length);
    const safePage = Math.min(currentPage, totalPages);
    const paginatedPosts = getPageSlice(posts, safePage);

    const goToFirst = () => {
        setCurrentPage(1);
    };

    const goToPrev = () => {
        setCurrentPage((page) => Math.max(1, page - 1));
    };

    const goToNext = () => {
        setCurrentPage((page) => Math.min(totalPages, page + 1));
    };

    const goToLast = () => {
        setCurrentPage(totalPages);
    };

    if (posts.length === 0) {
        return (
            <p className="mt-8 text-sm text-[color:var(--muted)]">No posts found.</p>
        );
    }

    return (
        <>
            <ul className="mt-8 flex flex-col gap-4">
                {paginatedPosts.map((post) => (
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
                ))}
            </ul>
            <nav
                aria-label="Blog pagination"
                className="mt-8 flex items-center justify-center gap-2 sm:gap-3"
            >
                <button
                    type="button"
                    onClick={goToFirst}
                    disabled={safePage <= 1}
                    aria-label="First page"
                    className={paginationButtonClassName}
                >
                    &lt;&lt;
                </button>
                <button
                    type="button"
                    onClick={goToPrev}
                    disabled={safePage <= 1}
                    aria-label="Previous page"
                    className={paginationButtonClassName}
                >
                    &lt;
                </button>
                <span className="min-w-[3ch] px-1 text-center text-sm text-[color:var(--muted)] tabular-nums">
                    {safePage}/{totalPages}
                </span>
                <button
                    type="button"
                    onClick={goToNext}
                    disabled={safePage >= totalPages}
                    aria-label="Next page"
                    className={paginationButtonClassName}
                >
                    &gt;
                </button>
                <button
                    type="button"
                    onClick={goToLast}
                    disabled={safePage >= totalPages}
                    aria-label="Last page"
                    className={paginationButtonClassName}
                >
                    &gt;&gt;
                </button>
            </nav>
        </>
    );
};
