import { BreadcrumbSetter } from "@/components/atoms/BreadcrumbSetter";
import { getPublishedBlogPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

type BlogPostLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
};

export default async function BlogPostLayout({ children, params }: BlogPostLayoutProps) {
    const { slug } = await params;
    const post = await getPublishedBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <BreadcrumbSetter
                items={[
                    { label: "akilasatolu", href: "/" },
                    { label: "Blog", href: "/blog/" },
                    { label: post.title },
                ]}
            />
            {children}
        </>
    );
}
