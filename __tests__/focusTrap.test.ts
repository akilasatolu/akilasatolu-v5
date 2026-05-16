import { getFocusableElements, trapFocus } from "@/lib/focusTrap";

describe("focusTrap", () => {
    it("returns focusable elements inside container", () => {
        const container = document.createElement("div");
        container.innerHTML = `
            <button type="button">First</button>
            <a href="/">Link</a>
            <button type="button" disabled>Disabled</button>
        `;

        const focusable = getFocusableElements(container);

        expect(focusable).toHaveLength(2);
        expect(focusable[0].tagName).toBe("BUTTON");
        expect(focusable[1].tagName).toBe("A");
    });

    it("cycles focus from last to first on Tab", () => {
        const container = document.createElement("div");
        container.innerHTML = `
            <button type="button" id="first">First</button>
            <button type="button" id="last">Last</button>
        `;
        document.body.appendChild(container);

        const first = container.querySelector<HTMLButtonElement>("#first")!;
        const last = container.querySelector<HTMLButtonElement>("#last")!;

        last.focus();

        const event = new KeyboardEvent("keydown", {
            key: "Tab",
            bubbles: true,
            cancelable: true,
        });

        trapFocus(event, container);

        expect(event.defaultPrevented).toBe(true);
        expect(document.activeElement).toBe(first);

        container.remove();
    });

    it("cycles focus from first to last on Shift+Tab", () => {
        const container = document.createElement("div");
        container.innerHTML = `
            <button type="button" id="first">First</button>
            <button type="button" id="last">Last</button>
        `;
        document.body.appendChild(container);

        const first = container.querySelector<HTMLButtonElement>("#first")!;
        const last = container.querySelector<HTMLButtonElement>("#last")!;

        first.focus();

        const event = new KeyboardEvent("keydown", {
            key: "Tab",
            shiftKey: true,
            bubbles: true,
            cancelable: true,
        });

        trapFocus(event, container);

        expect(event.defaultPrevented).toBe(true);
        expect(document.activeElement).toBe(last);

        container.remove();
    });
});
