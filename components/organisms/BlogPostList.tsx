"use client";

import { getPageSlice, getTotalPages } from "@/lib/blogPagination";
import type { BlogPost } from "@/types/types";
import Link from "next/link";
import { useState } from "react";

type BlogPostListProps = {
    posts: BlogPost[];
};

const paginationButtonClassName =
    "inline-flex items-center justify-center rounded-md border border-[color:var(--border)] bg-[color:var(--card-bg)] px-3 py-1.5 text-sm text-foreground transition-colors hover:border-[color:var(--accent)]";

type PaginationControlProps = {
    visible: boolean;
    onClick: () => void;
    ariaLabel: string;
    label: string;
};

const PaginationControl = ({ visible, onClick, ariaLabel, label }: PaginationControlProps) => {
    if (visible) {
        return (
            <button
                type="button"
                onClick={onClick}
                aria-label={ariaLabel}
                className={paginationButtonClassName}
            >
                {label}
            </button>
        );
    }

    return (
        <span
            aria-hidden="true"
            className={`${paginationButtonClassName} invisible pointer-events-none`}
        >
            {label}
        </span>
    );
};

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
        <div className="flex min-h-0 flex-1 flex-col">
            <ul className="mt-8 flex min-h-0 flex-1 flex-col gap-4">
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
                className="mt-auto flex shrink-0 items-center justify-center gap-2 pt-8 sm:gap-3"
            >
                <PaginationControl
                    visible={safePage > 1}
                    onClick={goToFirst}
                    ariaLabel="First page"
                    label="<<"
                />
                <PaginationControl
                    visible={safePage > 1}
                    onClick={goToPrev}
                    ariaLabel="Previous page"
                    label="<"
                />
                <span className="min-w-[3ch] px-1 text-center text-sm text-[color:var(--muted)] tabular-nums">
                    {safePage}/{totalPages}
                </span>
                <PaginationControl
                    visible={safePage < totalPages}
                    onClick={goToNext}
                    ariaLabel="Next page"
                    label=">"
                />
                <PaginationControl
                    visible={safePage < totalPages}
                    onClick={goToLast}
                    ariaLabel="Last page"
                    label=">>"
                />
            </nav>
        </div>
    );
};
