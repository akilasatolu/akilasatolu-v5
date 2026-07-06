import type { BreadcrumbItem } from "@/atoms/breadcrumbAtom";

const SEGMENT_LABELS: Record<string, string> = {
    blog: "Blog",
    experience: "Experience",
};

/** pathname からパンくずを生成（trailingSlash: true 想定） */
export function getBreadcrumbsFromPathname(pathname: string): BreadcrumbItem[] {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
        return [{ label: "akilasatolu" }];
    }

    const items: BreadcrumbItem[] = [{ label: "akilasatolu", href: "/" }];

    let path = "";
    for (let i = 0; i < segments.length; i++) {
        path += `/${segments[i]}`;
        const isLast = i === segments.length - 1;
        const segment = segments[i];
        const label = SEGMENT_LABELS[segment] ?? segment;

        items.push({
            label,
            href: isLast ? undefined : `${path}/`,
        });
    }

    return items;
}
