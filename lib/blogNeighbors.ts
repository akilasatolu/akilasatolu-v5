import type { BlogPost } from "@/types/types";

export type BlogPostNavLink = {
    slug: string;
    title: string;
    date: string;
};

export type BlogPostNeighbors = {
    older: BlogPostNavLink | null;
    newer: BlogPostNavLink | null;
};

export function getAdjacentPublishedBlogPosts(
    slug: string,
    posts: BlogPost[],
): BlogPostNeighbors {
    const index = posts.findIndex((post) => post.slug === slug);

    if (index === -1) {
        return { older: null, newer: null };
    }

    const olderPost = posts[index + 1];
    const newerPost = posts[index - 1];

    return {
        older: olderPost
            ? { slug: olderPost.slug, title: olderPost.title, date: olderPost.date }
            : null,
        newer: newerPost
            ? { slug: newerPost.slug, title: newerPost.title, date: newerPost.date }
            : null,
    };
}
