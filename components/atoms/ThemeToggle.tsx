"use client";

import { useAtom } from "jotai";
import { useMemo, useSyncExternalStore } from "react";
import { themePreferenceAtom } from "@/atoms/themeAtom";
import {
    getThemePreferenceAfterToggle,
    getSystemPrefersDark,
    readResolvedThemeFromDocument,
    subscribeToColorScheme,
    type ResolvedTheme,
    type ThemePreference,
} from "@/lib/theme";

const SunIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-5"
    >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m4.93 19.07 1.41-1.41" />
        <path d="m17.66 6.34 1.41-1.41" />
    </svg>
);

const MoonIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-5"
    >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);

function subscribeMounted(onStoreChange: () => void): () => void {
    onStoreChange();
    return () => undefined;
}

function useResolvedTheme(preference: ThemePreference): ResolvedTheme {
    const systemPrefersDark = useSyncExternalStore(
        subscribeToColorScheme,
        getSystemPrefersDark,
        () => false,
    );

    return useMemo(() => {
        if (preference === "light" || preference === "dark") {
            return preference;
        }

        if (typeof document === "undefined") {
            return systemPrefersDark ? "dark" : "light";
        }

        return readResolvedThemeFromDocument();
    }, [preference, systemPrefersDark]);
}

export const ThemeToggle = () => {
    const [preference, setPreference] = useAtom(themePreferenceAtom);
    const mounted = useSyncExternalStore(
        subscribeMounted,
        () => true,
        () => false,
    );
    const resolvedTheme = useResolvedTheme(preference);

    const isDark = resolvedTheme === "dark";
    const label = isDark ? "Switch to light mode" : "Switch to dark mode";
    const buttonClassName =
        "inline-flex items-center justify-center rounded-md p-2 text-[color:var(--muted)] transition-colors hover:bg-[color:var(--card-bg)] hover:text-[color:var(--color)]";

    if (!mounted) {
        return (
            <button
                type="button"
                className={buttonClassName}
                aria-label="Toggle theme"
                suppressHydrationWarning
            >
                <span className="block size-5" aria-hidden />
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={() =>
                setPreference(getThemePreferenceAfterToggle(resolvedTheme))
            }
            aria-label={label}
            title={label}
            className={buttonClassName}
            suppressHydrationWarning
        >
            {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};
