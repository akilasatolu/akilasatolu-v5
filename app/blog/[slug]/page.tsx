import { PageTitle } from "@/components/atoms/PageTitle";
import {
    getBlogPostMarkdown,
    getPublishedBlogPostBySlug,
    getPublishedBlogPosts,
} from "@/lib/blog";
import { renderBlogMarkdown } from "@/lib/blogMarkdown";
import type { Metadata } from "next";
import Link from "next/link";
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

    const markdown = await getBlogPostMarkdown(slug);
    const html = renderBlogMarkdown(markdown);

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-start">
            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
