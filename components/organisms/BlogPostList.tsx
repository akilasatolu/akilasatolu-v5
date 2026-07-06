import { formatBlogDate } from "@/lib/formatBlogDate";
import type { BlogPost } from "@/types/types";
import Link from "next/link";

type BlogPostListProps = {
    posts: BlogPost[];
};

export const BlogPostList = ({ posts }: BlogPostListProps) => {
    if (posts.length === 0) {
        return <p className="text-[color:var(--muted)]">No posts found.</p>;
    }

    return (
        <ul className="list-disc space-y-2">
            {posts.map((post) => (
                <li key={post.slug}>
                    {formatBlogDate(post.date)} :{" "}
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    );
};
