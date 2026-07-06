"use client";

import { breadcrumbItemsAtom } from "@/atoms/breadcrumbAtom";
import { getBreadcrumbsFromPathname } from "@/lib/breadcrumbs";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Breadcrumbs = () => {
    const pathname = usePathname();
    const overrideItems = useAtomValue(breadcrumbItemsAtom);
    const items = overrideItems ?? getBreadcrumbsFromPathname(pathname);

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[color:var(--muted)]">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
                            {index > 0 ? (
                                <span aria-hidden="true" className="text-[color:var(--border)]">
                                    /
                                </span>
                            ) : null}
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="truncate [--accent-visited:var(--accent)] hover:[--accent-visited:var(--accent-hover)]"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    aria-current={isLast ? "page" : undefined}
                                    className="truncate text-foreground"
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
