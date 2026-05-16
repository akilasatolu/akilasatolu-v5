import { getAdjacentPublishedBlogPosts } from "@/lib/blogNeighbors";
import type { BlogPost } from "@/types/types";

const posts: BlogPost[] = [
    {
        slug: "newest",
        title: "Newest Post",
        date: "2026-03-01",
        draft: false,
        tags: [],
        description: "",
    },
    {
        slug: "middle",
        title: "Middle Post",
        date: "2026-02-01",
        draft: false,
        tags: [],
        description: "",
    },
    {
        slug: "oldest",
        title: "Oldest Post",
        date: "2026-01-01",
        draft: false,
        tags: [],
        description: "",
    },
];

describe("getAdjacentPublishedBlogPosts", () => {
    it("returns newer and older neighbors for a middle post", () => {
        expect(getAdjacentPublishedBlogPosts("middle", posts)).toEqual({
            older: { slug: "oldest", title: "Oldest Post", date: "2026-01-01" },
            newer: { slug: "newest", title: "Newest Post", date: "2026-03-01" },
        });
    });

    it("returns only older for the newest post", () => {
        expect(getAdjacentPublishedBlogPosts("newest", posts)).toEqual({
            older: { slug: "middle", title: "Middle Post", date: "2026-02-01" },
            newer: null,
        });
    });

    it("returns only newer for the oldest post", () => {
        expect(getAdjacentPublishedBlogPosts("oldest", posts)).toEqual({
            older: null,
            newer: { slug: "middle", title: "Middle Post", date: "2026-02-01" },
        });
    });
});
