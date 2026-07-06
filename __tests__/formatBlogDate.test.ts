import { formatBlogDate } from "@/lib/formatBlogDate";

describe("formatBlogDate", () => {
    it("formats ISO date strings in English", () => {
        expect(formatBlogDate("2024-03-15")).toBe("March 15, 2024");
    });

    it("returns the original value when parsing fails", () => {
        expect(formatBlogDate("invalid")).toBe("invalid");
    });
});
