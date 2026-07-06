import { BlogPostList } from "@/components/organisms/BlogPostList";
import { render, screen } from "@testing-library/react";

describe("BlogPostList", () => {
    it("shows empty message when there are no posts", () => {
        render(<BlogPostList posts={[]} />);

        expect(screen.getByText("No posts found.")).toBeInTheDocument();
    });

    it("renders posts with links", () => {
        render(
            <BlogPostList
                posts={[
                    {
                        slug: "hello",
                        title: "Hello World",
                        date: "2024-03-15",
                        draft: false,
                        tags: [],
                        description: "desc",
                    },
                ]}
            />,
        );

        expect(screen.getByRole("link", { name: "Hello World" })).toHaveAttribute(
            "href",
            "/blog/hello",
        );
        expect(screen.getByText(/March 15, 2024/)).toBeInTheDocument();
    });
});
