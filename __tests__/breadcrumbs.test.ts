import { getBreadcrumbsFromPathname } from "@/lib/breadcrumbs";

describe("getBreadcrumbsFromPathname", () => {
    it("returns home only for root path", () => {
        expect(getBreadcrumbsFromPathname("/")).toEqual([{ label: "akilasatolu" }]);
    });

    it("returns blog trail", () => {
        expect(getBreadcrumbsFromPathname("/blog")).toEqual([
            { label: "akilasatolu", href: "/" },
            { label: "Blog" },
        ]);
    });

    it("returns experience trail", () => {
        expect(getBreadcrumbsFromPathname("/experience/")).toEqual([
            { label: "akilasatolu", href: "/" },
            { label: "Experience" },
        ]);
    });

    it("returns blog post trail with slug as label", () => {
        expect(getBreadcrumbsFromPathname("/blog/my-post")).toEqual([
            { label: "akilasatolu", href: "/" },
            { label: "Blog", href: "/blog/" },
            { label: "my-post" },
        ]);
    });
});
