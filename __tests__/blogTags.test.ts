import { countTagsFittingInRows } from "@/lib/blogTags";

function mockOffsetTop(element: HTMLElement, top: number) {
    Object.defineProperty(element, "offsetTop", {
        configurable: true,
        value: top,
    });
}

describe("countTagsFittingInRows", () => {
    it("returns all items when within max rows", () => {
        const a = document.createElement("li");
        const b = document.createElement("li");
        mockOffsetTop(a, 0);
        mockOffsetTop(b, 0);

        expect(countTagsFittingInRows([a, b], 2)).toBe(2);
    });

    it("returns count for first max rows only", () => {
        const items = [0, 0, 24, 24, 48].map((top) => {
            const el = document.createElement("li");
            mockOffsetTop(el, top);
            return el;
        });

        expect(countTagsFittingInRows(items, 2)).toBe(4);
    });
});
