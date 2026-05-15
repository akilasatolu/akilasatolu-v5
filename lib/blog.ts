import "server-only";

import { getS3BucketBlog, getS3PathBlog } from "@/lib/env";
import { fetchS3Text } from "@/lib/s3";
import type { BlogPost } from "@/types/types";

const BLOG_POSTS_PREFIX = "posts/";
const BLOG_POSTS_IMG_PREFIX = "posts-img/";

/** ビルド時（SSG）に S3 から blog JSON を取得し、公開記事（draft: false）のみ返す */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
    const raw = await fetchS3Text({
        bucket: getS3BucketBlog(),
        key: getS3PathBlog(),
    });
    const posts = JSON.parse(raw) as BlogPost[];

    return posts
        .filter((post) => !post.draft)
        .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = await getPublishedBlogPosts();
    return posts.find((post) => post.slug === slug);
}

/** S3: posts/{slug}.md */
export async function getBlogPostMarkdown(slug: string): Promise<string> {
    return fetchS3Text({
        bucket: getS3BucketBlog(),
        key: `${BLOG_POSTS_PREFIX}${slug}.md`,
    });
}

/** S3: posts-img/{imageKey}（imageKey は {slug}-n.拡張子） */
export function getBlogImageS3Key(imageKey: string): string {
    const normalized = imageKey.replace(/^\/+/, "");
    if (normalized.includes("..") || normalized.includes("/")) {
        throw new Error(`Invalid blog image key: ${imageKey}`);
    }
    return `${BLOG_POSTS_IMG_PREFIX}${normalized}`;
}

/** マークダウン内の画像ファイル名 → /blog/image?key=... */
export function getBlogImageProxyUrl(imageHref: string): string {
    const filename = imageHref.split(/[/\\]/).pop()?.split("?")[0]?.split("#")[0] ?? imageHref;
    return `/blog/image?key=${encodeURIComponent(filename)}`;
}
