const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
});

/** ISO 日付文字列（YYYY-MM-DD）を英語表記に変換 */
export function formatBlogDate(date: string): string {
    const [year, month, day] = date.split("-").map(Number);
    if (!year || !month || !day) {
        return date;
    }

    return formatter.format(new Date(Date.UTC(year, month - 1, day)));
}
