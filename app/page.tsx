import { BlogPageContent } from "@/components/organisms/BlogPageContent";
import { getPublishedBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default async function HomePage() {
    const posts = await getPublishedBlogPosts();

    return <BlogPageContent posts={posts} />;
}
