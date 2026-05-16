import {
    getThemePreferenceAfterToggle,
    isThemePreference,
    resolveTheme,
    resolveThemeFromPreference,
} from "@/lib/theme";

describe("theme", () => {
    it("validates theme preference values", () => {
        expect(isThemePreference("system")).toBe(true);
        expect(isThemePreference("light")).toBe(true);
        expect(isThemePreference("dark")).toBe(true);
        expect(isThemePreference("invalid")).toBe(false);
    });

    it("resolves explicit preferences", () => {
        expect(resolveTheme("light")).toBe("light");
        expect(resolveTheme("dark")).toBe("dark");
    });

    it("resolves system preference from OS setting", () => {
        expect(resolveThemeFromPreference("system", true)).toBe("dark");
        expect(resolveThemeFromPreference("system", false)).toBe("light");
        expect(resolveThemeFromPreference(null, true)).toBe("dark");
    });

    it("toggles between light and dark based on resolved theme", () => {
        expect(getThemePreferenceAfterToggle("dark")).toBe("light");
        expect(getThemePreferenceAfterToggle("light")).toBe("dark");
    });
});
