"use client";

import { countTagsFittingInRows } from "@/lib/blogTags";
import { useLayoutEffect, useRef, useState } from "react";

type BlogTagListProps = {
    tags: [string, number][];
    selectedTag: string | null;
    onTagClick: (tag: string) => void;
    /** md 未満向け: 2 行まで表示し more tags で展開 */
    collapsible?: boolean;
};

const tagButtonClassName = (isSelected: boolean) =>
    `rounded-md border bg-[color:var(--card-bg)] px-2 py-0.5 text-xs text-foreground transition-colors ${
        isSelected
            ? "border-[color:var(--accent)]"
            : "border-[color:var(--border)] hover:border-[color:var(--accent)]"
    }`;

export const BlogTagList = ({
    tags,
    selectedTag,
    onTagClick,
    collapsible = false,
}: BlogTagListProps) => {
    const [expanded, setExpanded] = useState(false);
    const [collapsedCount, setCollapsedCount] = useState<number | null>(null);
    const measureRef = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        if (!collapsible || expanded) {
            return;
        }

        const measure = () => {
            const list = measureRef.current;
            if (!list) {
                return;
            }

            const items = [
                ...list.querySelectorAll<HTMLElement>("[data-tag-item]"),
            ];
            setCollapsedCount(countTagsFittingInRows(items, 2));
        };

        measure();
        window.addEventListener("resize", measure);

        return () => {
            window.removeEventListener("resize", measure);
        };
    }, [collapsible, expanded, tags]);

    const renderTagButton = ([tag, count]: [string, number]) => {
        const isSelected = selectedTag === tag;
        return (
            <li key={tag} data-tag-item>
                <button
                    type="button"
                    onClick={() => onTagClick(tag)}
                    aria-pressed={isSelected}
                    className={tagButtonClassName(isSelected)}
                >
                    {tag} ({count})
                </button>
            </li>
        );
    };

    if (!collapsible) {
        return (
            <ul className="mt-4 flex flex-wrap gap-2">
                {tags.map(renderTagButton)}
            </ul>
        );
    }

    const showAll = expanded || collapsedCount === null;
    const visibleTags = showAll ? tags : tags.slice(0, collapsedCount);
    const hasHiddenTags =
        collapsedCount !== null && tags.length > collapsedCount;

    return (
        <div className="relative mt-4">
            <ul
                ref={measureRef}
                className="pointer-events-none invisible absolute top-0 left-0 flex w-full flex-wrap gap-2"
                aria-hidden
            >
                {tags.map(renderTagButton)}
            </ul>
            <ul className="flex flex-wrap gap-2">
                {visibleTags.map(renderTagButton)}
                {hasHiddenTags && !expanded ? (
                    <li>
                        <button
                            type="button"
                            onClick={() => setExpanded(true)}
                            aria-expanded={false}
                            className="rounded-md border border-[color:var(--border)] bg-[color:var(--card-bg)] px-2 py-0.5 text-xs text-[color:var(--muted)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--color)]"
                        >
                            more tags
                        </button>
                    </li>
                ) : null}
                {expanded && hasHiddenTags ? (
                    <li>
                        <button
                            type="button"
                            onClick={() => setExpanded(false)}
                            aria-expanded
                            className="rounded-md border border-[color:var(--border)] bg-[color:var(--card-bg)] px-2 py-0.5 text-xs text-[color:var(--muted)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--color)]"
                        >
                            less tags
                        </button>
                    </li>
                ) : null}
            </ul>
        </div>
    );
};
