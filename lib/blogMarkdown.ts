import "server-only";

import { marked } from "marked";
import { getBlogImageUrl } from "@/lib/blog";

const FRONT_MATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

/** 先頭の YAML フロントマター（--- ... ---）を除去 */
function stripFrontMatter(markdown: string): string {
    return markdown.replace(FRONT_MATTER_RE, "");
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

marked.use({
    renderer: {
        image({ href, title, text }) {
            if (!href) {
                return "";
            }
            const src = getBlogImageUrl(href);
            const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
            return `<img src="${src}" alt="${escapeHtml(text)}"${titleAttr} loading="lazy" class="blog-content-img" />`;
        },
    },
});

/** S3 の Markdown を HTML に変換（画像は CloudFront / CONTENT_CDN_BASE） */
export function renderBlogMarkdown(markdown: string): string {
    return marked.parse(stripFrontMatter(markdown), { async: false, gfm: true }) as string;
}
