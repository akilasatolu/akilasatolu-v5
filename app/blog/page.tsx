import { PageTitle } from "@/components/atoms/PageTitle";
import { BlogPostList } from "@/components/organisms/BlogPostList";
import { getPublishedBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default async function BlogPage() {
    const posts = await getPublishedBlogPosts();

    return (
        <>
            <PageTitle title="Blog" />
            <BlogPostList posts={posts} />
        </>
    );
}
