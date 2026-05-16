"use client";

import { useAtom } from "jotai";
import { useLayoutEffect } from "react";
import { themePreferenceAtom } from "@/atoms/themeAtom";
import { applyThemePreference, clearThemeBootstrapStyles } from "@/lib/theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [preference] = useAtom(themePreferenceAtom);

    useLayoutEffect(() => {
        applyThemePreference(preference);
        clearThemeBootstrapStyles();

        if (preference !== "system") {
            return;
        }

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            applyThemePreference("system");
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [preference]);

    return children;
};
