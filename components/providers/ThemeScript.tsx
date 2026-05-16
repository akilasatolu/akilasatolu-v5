import { getThemeInitScript } from "@/lib/theme";

export const ThemeScript = () => {
    return (
        <script
            dangerouslySetInnerHTML={{ __html: getThemeInitScript() }}
            suppressHydrationWarning
        />
    );
};
