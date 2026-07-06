import { atom } from "jotai";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

/** 動的ページ（ブログ記事など）からパンくずを上書きする */
export const breadcrumbItemsAtom = atom<BreadcrumbItem[] | null>(null);
