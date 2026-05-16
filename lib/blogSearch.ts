const MAX_SEARCH_QUERY_LENGTH = 100;

/** 検索入力を無害化（制御文字・HTML 断片の除去、長さ制限） */
export function sanitizeBlogSearchQuery(raw: string): string {
    return raw
        .slice(0, MAX_SEARCH_QUERY_LENGTH)
        .replace(/[\u0000-\u001F\u007F]/g, "")
        .replace(/[<>'"`]/g, "")
        .trim();
}

export function matchesBlogDescription(
    description: string,
    query: string,
): boolean {
    const sanitized = sanitizeBlogSearchQuery(query);
    if (!sanitized) {
        return true;
    }

    return description.toLowerCase().includes(sanitized.toLowerCase());
}
