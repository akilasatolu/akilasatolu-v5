const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) =>
            !element.hasAttribute("disabled") &&
            element.getAttribute("aria-hidden") !== "true" &&
            element.tabIndex !== -1,
    );
}

export function trapFocus(event: KeyboardEvent, container: HTMLElement): void {
    if (event.key !== "Tab") {
        return;
    }

    const focusable = getFocusableElements(container);

    if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
    }

    if (focusable.length === 1) {
        event.preventDefault();
        focusable[0].focus();
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
        if (active === first || !container.contains(active)) {
            event.preventDefault();
            last.focus();
        }
        return;
    }

    if (active === last || !container.contains(active)) {
        event.preventDefault();
        first.focus();
    }
}
