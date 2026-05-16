/** flex-wrap タグ一覧で、指定行数に収まるタグ数を返す */
export function countTagsFittingInRows(
    items: HTMLElement[],
    maxRows: number,
): number {
    if (items.length === 0) {
        return 0;
    }

    const rowTops = [...new Set(items.map((item) => item.offsetTop))].sort(
        (a, b) => a - b,
    );

    if (rowTops.length <= maxRows) {
        return items.length;
    }

    const cutoffTop = rowTops[maxRows];
    return items.filter((item) => item.offsetTop < cutoffTop).length;
}
