import {
    matchesBlogDescription,
    sanitizeBlogSearchQuery,
} from "@/lib/blogSearch";

describe("blogSearch", () => {
    it("removes control characters and limits length", () => {
        expect(sanitizeBlogSearchQuery("  hello\x00world  ")).toBe("helloworld");
        expect(sanitizeBlogSearchQuery("a".repeat(150))).toHaveLength(100);
    });

    it("strips characters that could be used for markup injection", () => {
        expect(sanitizeBlogSearchQuery('<script>alert("x")</script>')).toBe(
            "scriptalert(x)/script",
        );
    });

    it("matches description case-insensitively when query is present", () => {
        expect(
            matchesBlogDescription("Hello World description", "world"),
        ).toBe(true);
        expect(matchesBlogDescription("Hello World", "missing")).toBe(false);
        expect(matchesBlogDescription("Hello World", "  ")).toBe(true);
    });
});
