"use client";

import { useSetBreadcrumbItems } from "@/components/providers/BreadcrumbProvider";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { useEffect } from "react";

type BreadcrumbSetterProps = {
    items: BreadcrumbItem[];
};

export const BreadcrumbSetter = ({ items }: BreadcrumbSetterProps) => {
    const setItems = useSetBreadcrumbItems();

    useEffect(() => {
        setItems(items);
        return () => setItems(null);
    }, [items, setItems]);

    return null;
};
