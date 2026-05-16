export const THEME_STORAGE_KEY = "theme";

export type ThemePreference = "system" | "light" | "dark";

export type ResolvedTheme = "light" | "dark";

export const DEFAULT_THEME_PREFERENCE: ThemePreference = "system";

const THEME_CSS_VARS: Record<
    ResolvedTheme,
    { background: string; color: string; colorScheme: "light" | "dark" }
> = {
    light: {
        background: "#ffffff",
        color: "#2b2b2b",
        colorScheme: "light",
    },
    dark: {
        background: "#2b2b2b",
        color: "#ffffff",
        colorScheme: "dark",
    },
};

export function isThemePreference(value: unknown): value is ThemePreference {
    return value === "system" || value === "light" || value === "dark";
}

export function readThemePreferenceFromStorage(): ThemePreference | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const raw = localStorage.getItem(THEME_STORAGE_KEY);
        if (!raw) {
            return null;
        }

        const parsed: unknown = JSON.parse(raw);
        return isThemePreference(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

export function resolveThemeFromPreference(
    preference: ThemePreference | null,
    prefersDark: boolean,
): ResolvedTheme {
    if (preference === "light") {
        return "light";
    }
    if (preference === "dark") {
        return "dark";
    }
    return prefersDark ? "dark" : "light";
}

export function subscribeToColorScheme(onStoreChange: () => void): () => void {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", onStoreChange);
    return () => mediaQuery.removeEventListener("change", onStoreChange);
}

export function getSystemPrefersDark(): boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function readResolvedThemeFromDocument(): ResolvedTheme {
    const dataTheme = document.documentElement.getAttribute("data-theme");
    if (dataTheme === "dark") {
        return "dark";
    }
    if (dataTheme === "light") {
        return "light";
    }
    return getSystemPrefersDark() ? "dark" : "light";
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
    if (preference === "light" || preference === "dark") {
        return preference;
    }

    if (typeof window === "undefined") {
        return "light";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function applyResolvedThemeToRoot(
    preference: ThemePreference,
    resolved: ResolvedTheme,
    bootstrap: boolean,
): void {
    const root = document.documentElement;
    const colors = THEME_CSS_VARS[resolved];

    if (preference === "system") {
        root.removeAttribute("data-theme");
    } else {
        root.setAttribute("data-theme", preference);
    }

    root.style.colorScheme = colors.colorScheme;

    if (bootstrap) {
        root.style.setProperty("--background", colors.background);
        root.style.setProperty("--color", colors.color);
        root.style.backgroundColor = colors.background;
        root.style.color = colors.color;
        return;
    }

    root.style.removeProperty("--background");
    root.style.removeProperty("--color");
    root.style.backgroundColor = "";
    root.style.color = "";
}

export function applyThemeColorMeta(resolved: ResolvedTheme): void {
    if (typeof document === "undefined") {
        return;
    }

    const content = THEME_CSS_VARS[resolved].background;
    let meta = document.querySelector('meta[name="theme-color"]');

    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "theme-color");
        document.head.appendChild(meta);
    }

    meta.setAttribute("content", content);
}

export function applyThemePreference(
    preference: ThemePreference,
    options?: { bootstrap?: boolean },
): void {
    if (typeof document === "undefined") {
        return;
    }

    const resolved = resolveTheme(preference);

    applyResolvedThemeToRoot(preference, resolved, options?.bootstrap ?? false);
    applyThemeColorMeta(resolved);
}

export function clearThemeBootstrapStyles(): void {
    if (typeof document === "undefined") {
        return;
    }

    const root = document.documentElement;
    root.style.removeProperty("--background");
    root.style.removeProperty("--color");
    root.style.backgroundColor = "";
    root.style.color = "";
}

export function getThemePreferenceAfterToggle(
    resolved: ResolvedTheme,
): ThemePreference {
    return resolved === "dark" ? "light" : "dark";
}

export function getThemeInitScript(): string {
    const storageKey = JSON.stringify(THEME_STORAGE_KEY);
    const lightBackground = JSON.stringify(THEME_CSS_VARS.light.background);
    const lightColor = JSON.stringify(THEME_CSS_VARS.light.color);
    const darkBackground = JSON.stringify(THEME_CSS_VARS.dark.background);
    const darkColor = JSON.stringify(THEME_CSS_VARS.dark.color);

    return `
(function () {
    var root = document.documentElement;
    try {
        var raw = localStorage.getItem(${storageKey});
        var preference = null;
        if (raw) {
            preference = JSON.parse(raw);
            if (preference !== "light" && preference !== "dark" && preference !== "system") {
                preference = null;
            }
        }
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var resolved =
            preference === "light" || preference === "dark"
                ? preference
                : prefersDark
                  ? "dark"
                  : "light";

        if (preference === "light" || preference === "dark") {
            root.setAttribute("data-theme", preference);
        } else {
            root.removeAttribute("data-theme");
        }

        var background = resolved === "dark" ? ${darkBackground} : ${lightBackground};
        var color = resolved === "dark" ? ${darkColor} : ${lightColor};
        root.style.colorScheme = resolved;
        root.style.setProperty("--background", background);
        root.style.setProperty("--color", color);
        root.style.backgroundColor = background;
        root.style.color = color;

        var themeMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeMeta) {
            themeMeta = document.createElement("meta");
            themeMeta.setAttribute("name", "theme-color");
            document.head.appendChild(themeMeta);
        }
        themeMeta.setAttribute("content", background);
    } catch (_) {}
})();
`.trim();
}
