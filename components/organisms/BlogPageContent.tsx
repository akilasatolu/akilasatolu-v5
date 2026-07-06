import { PageTitle } from "@/components/atoms/PageTitle";
import { BlogPostList } from "@/components/organisms/BlogPostList";
import type { BlogPost } from "@/types/types";

type BlogPageContentProps = {
    posts: BlogPost[];
};

export const BlogPageContent = ({ posts }: BlogPageContentProps) => {
    return (
        <div className="flex min-h-0 w-full flex-1 flex-col">
            <PageTitle title="Blog" />
            <BlogPostList posts={posts} />
        </div>
    );
};
