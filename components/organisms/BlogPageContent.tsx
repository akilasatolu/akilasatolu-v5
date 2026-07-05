"use client";

import { PageTitle } from "@/components/atoms/PageTitle";
import { BlogPostList } from "@/components/organisms/BlogPostList";
import { BlogTagList } from "@/components/organisms/BlogTagList";
import type { BlogPost } from "@/types/types";
import { useMemo, useState } from "react";

type BlogPageContentProps = {
    posts: BlogPost[];
};

type BlogTagSidebarProps = {
    className?: string;
    collapsibleTags?: boolean;
    sortedTags: [string, number][];
    selectedTag: string | null;
    onTagClick: (tag: string) => void;
};

const BlogTagSidebar = ({
    className = "",
    collapsibleTags = false,
    sortedTags,
    selectedTag,
    onTagClick,
}: BlogTagSidebarProps) => {
    return (
        <aside className={className}>
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

    const tagSidebarProps = {
        sortedTags,
        selectedTag,
        onTagClick: handleTagClick,
    };

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col gap-8 md:flex-row md:items-stretch md:gap-4">
            <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col md:flex-1">
                <PageTitle title="Blog" />
                <BlogTagSidebar
                    {...tagSidebarProps}
                    collapsibleTags
                    className="mt-8 md:hidden"
                />
                <BlogPostList
                    key={selectedTag ?? ""}
                    posts={filteredPosts}
                />
            </div>
            <BlogTagSidebar
                {...tagSidebarProps}
                className="hidden w-full shrink-0 md:block md:min-h-full md:max-w-[30%] md:min-w-[20%] md:grow md:shrink md:basis-[25%] md:self-stretch md:border-l md:border-[color:var(--border)] md:pl-4"
            />
        </div>
    );
};
