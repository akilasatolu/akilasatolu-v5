"use client";

import { PageTitle } from "@/components/atoms/PageTitle";
import { BlogPostList } from "@/components/organisms/BlogPostList";
import { BlogTagList } from "@/components/organisms/BlogTagList";
import {
    matchesBlogDescription,
    sanitizeBlogSearchQuery,
} from "@/lib/blogSearch";
import type { BlogPost } from "@/types/types";
import { useMemo, useState, type ChangeEvent } from "react";

type BlogPageContentProps = {
    posts: BlogPost[];
};

type BlogSearchPanelProps = {
    className?: string;
    showTitle?: boolean;
    collapsibleTags?: boolean;
    searchQuery: string;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    sortedTags: [string, number][];
    selectedTag: string | null;
    onTagClick: (tag: string) => void;
};

const BlogSearchPanel = ({
    className = "",
    showTitle = true,
    collapsibleTags = false,
    searchQuery,
    onSearchChange,
    sortedTags,
    selectedTag,
    onTagClick,
}: BlogSearchPanelProps) => {
    return (
        <aside className={className}>
            {showTitle ? (
                <p className="text-lg font-semibold tracking-tight text-foreground">
                    Search
                </p>
            ) : null}
            <label className={showTitle ? "mt-4 block" : "block"}>
                <span className="sr-only">Filter posts by description</span>
                <input
                    type="search"
                    value={searchQuery}
                    onChange={onSearchChange}
                    maxLength={100}
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Search by keyword"
                    className="w-full rounded-md border border-[color:var(--border)] bg-[color:var(--card-bg)] px-3 py-2 text-sm text-foreground placeholder:text-[color:var(--muted)]"
                />
            </label>
            <BlogTagList
                key={
                    collapsibleTags
                        ? sortedTags.map(([tag]) => tag).join("\0")
                        : "all"
                }
                tags={sortedTags}
                selectedTag={selectedTag}
                onTagClick={onTagClick}
                collapsible={collapsibleTags}
            />
        </aside>
    );
};

export const BlogPageContent = ({ posts }: BlogPageContentProps) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

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

    const tagFilteredPosts = useMemo(() => {
        if (!selectedTag) {
            return posts;
        }
        return posts.filter((post) => post.tags.includes(selectedTag));
    }, [posts, selectedTag]);

    const filteredPosts = useMemo(() => {
        return tagFilteredPosts.filter((post) =>
            matchesBlogDescription(post.description, searchQuery),
        );
    }, [tagFilteredPosts, searchQuery]);

    const handleTagClick = (tag: string) => {
        setSelectedTag((current) => (current === tag ? null : tag));
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(sanitizeBlogSearchQuery(event.target.value));
    };

    const searchPanelProps = {
        searchQuery,
        onSearchChange: handleSearchChange,
        sortedTags,
        selectedTag,
        onTagClick: handleTagClick,
    };

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-start gap-8 md:flex-row md:items-stretch md:gap-4">
            <div className="w-full min-w-0 md:flex-1">
                <PageTitle title="Blog" />
                <BlogSearchPanel
                    {...searchPanelProps}
                    showTitle={false}
                    collapsibleTags
                    className="mt-8 md:hidden"
                />
                <BlogPostList
                    key={`${selectedTag ?? ""}\0${searchQuery}`}
                    posts={filteredPosts}
                />
            </div>
            <BlogSearchPanel
                {...searchPanelProps}
                className="hidden w-full shrink-0 md:block md:min-h-full md:max-w-[30%] md:min-w-[20%] md:grow md:shrink md:basis-[25%] md:self-stretch md:border-l md:border-[color:var(--border)] md:pl-4"
            />
        </div>
    );
};
