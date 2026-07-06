"use client";

import { useBreadcrumbItems } from "@/components/providers/BreadcrumbProvider";
import { getBreadcrumbsFromPathname } from "@/lib/breadcrumbs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Breadcrumbs = () => {
    const pathname = usePathname();
    const overrideItems = useBreadcrumbItems();
    const items = overrideItems ?? getBreadcrumbsFromPathname(pathname);

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[color:var(--muted)] m-0 p-0">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
                            {index > 0 ? (
                                <span aria-hidden="true" className="text-[color:var(--muted)]">
                                    /
                                </span>
                            ) : null}
                            {item.href && !isLast ? (
                                <Link href={item.href} className="truncate no-visited">
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
