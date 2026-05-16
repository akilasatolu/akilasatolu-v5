import { atomWithStorage, createJSONStorage } from "jotai/utils";
import {
    DEFAULT_THEME_PREFERENCE,
    THEME_STORAGE_KEY,
    type ThemePreference,
} from "@/lib/theme";

const themeStorage = createJSONStorage<ThemePreference>(() => {
    if (typeof window === "undefined") {
        return {
            getItem: () => null,
            setItem: () => undefined,
            removeItem: () => undefined,
        };
    }

    return localStorage;
});

export const themePreferenceAtom = atomWithStorage<ThemePreference>(
    THEME_STORAGE_KEY,
    DEFAULT_THEME_PREFERENCE,
    themeStorage,
    { getOnInit: true },
);
