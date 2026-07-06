import { formatBlogDate } from "@/lib/formatBlogDate";
import type { BlogPost } from "@/types/types";
import Link from "next/link";

type BlogPostListProps = {
    posts: BlogPost[];
};

export const BlogPostList = ({ posts }: BlogPostListProps) => {
    if (posts.length === 0) {
        return (
            <p className="mt-8 text-sm text-[color:var(--muted)]">No posts found.</p>
        );
    }

    return (
        <ul className="mt-8 list-disc space-y-2 pl-6">
            {posts.map((post) => (
                <li key={post.slug} className="text-foreground">
                    {formatBlogDate(post.date)} :{" "}
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    );
};
