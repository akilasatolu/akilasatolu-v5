"use client";

import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type BreadcrumbContextValue = {
    items: BreadcrumbItem[] | null;
    setItems: (items: BreadcrumbItem[] | null) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

type BreadcrumbProviderProps = {
    children: ReactNode;
};

export const BreadcrumbProvider = ({ children }: BreadcrumbProviderProps) => {
    const [items, setItems] = useState<BreadcrumbItem[] | null>(null);
    const value = useMemo(() => ({ items, setItems }), [items]);

    return <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>;
};

export const useBreadcrumbItems = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error("useBreadcrumbItems must be used within BreadcrumbProvider");
    }
    return context.items;
};

export const useSetBreadcrumbItems = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error("useSetBreadcrumbItems must be used within BreadcrumbProvider");
    }
    return context.setItems;
};
