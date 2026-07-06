"use client";

import { breadcrumbItemsAtom, type BreadcrumbItem } from "@/atoms/breadcrumbAtom";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

type BreadcrumbSetterProps = {
    items: BreadcrumbItem[];
};

export const BreadcrumbSetter = ({ items }: BreadcrumbSetterProps) => {
    const setItems = useSetAtom(breadcrumbItemsAtom);

    useEffect(() => {
        setItems(items);
        return () => setItems(null);
    }, [items, setItems]);

    return null;
};
