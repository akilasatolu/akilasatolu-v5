import { BlogPostNavigation } from "@/components/organisms/BlogPostNavigation";
import {
    getBlogPostMarkdown,
    getPublishedBlogPostBySlug,
    getPublishedBlogPosts,
} from "@/lib/blog";
import { getAdjacentPublishedBlogPosts } from "@/lib/blogNeighbors";
import { renderBlogMarkdown } from "@/lib/blogMarkdown";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

type BlogPostPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const posts = await getPublishedBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPublishedBlogPostBySlug(slug);

    if (!post) {
        return { title: "Not found" };
    }

    return {
        title: post.title,
        description: post.description,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPublishedBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const posts = await getPublishedBlogPosts();
    const neighbors = getAdjacentPublishedBlogPosts(slug, posts);
    const markdown = await getBlogPostMarkdown(slug);
    const html = renderBlogMarkdown(markdown);

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col">
            <div
                className="blog-content min-h-0 flex-1"
                dangerouslySetInnerHTML={{ __html: html }}
            />
            <BlogPostNavigation {...neighbors} />
        </div>
    );
}
