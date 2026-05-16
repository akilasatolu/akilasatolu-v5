import {
    BLOG_POSTS_PER_PAGE,
    getPageSlice,
    getTotalPages,
} from "@/lib/blogPagination";

describe("blogPagination", () => {
    it("calculates total pages from BLOG_POSTS_PER_PAGE", () => {
        expect(getTotalPages(0)).toBe(1);
        expect(getTotalPages(1)).toBe(1);
        expect(getTotalPages(BLOG_POSTS_PER_PAGE)).toBe(1);
        expect(getTotalPages(BLOG_POSTS_PER_PAGE + 1)).toBe(2);
        expect(getTotalPages(BLOG_POSTS_PER_PAGE * 2 + 1)).toBe(3);
    });

    it("returns a page slice using BLOG_POSTS_PER_PAGE", () => {
        const items = Array.from({ length: 7 }, (_, index) => `item-${index + 1}`);

        expect(getPageSlice(items, 1)).toEqual(["item-1", "item-2", "item-3"]);
        expect(getPageSlice(items, 2)).toEqual(["item-4", "item-5", "item-6"]);
        expect(getPageSlice(items, 3)).toEqual(["item-7"]);
    });
});
