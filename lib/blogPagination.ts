/** Blog 一覧の 1 ページあたりの最大表示件数 */
export const BLOG_POSTS_PER_PAGE = 10;

export function getTotalPages(itemCount: number): number {
    if (itemCount === 0) {
        return 1;
    }
    return Math.ceil(itemCount / BLOG_POSTS_PER_PAGE);
}

export function getPageSlice<T>(items: T[], page: number): T[] {
    const start = (page - 1) * BLOG_POSTS_PER_PAGE;
    return items.slice(start, start + BLOG_POSTS_PER_PAGE);
}
