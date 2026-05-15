import { getBlogImageS3Key } from "@/lib/blog";
import { getS3BucketBlog } from "@/lib/env";
import { fetchS3Bytes } from "@/lib/s3";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const key = new URL(request.url).searchParams.get("key");
    if (!key) {
        return new Response("Missing key", { status: 400 });
    }

    if (key.includes("..") || key.includes("/") || key.includes("\\")) {
        return new Response("Invalid key", { status: 400 });
    }

    const { body, contentType } = await fetchS3Bytes({
        bucket: getS3BucketBlog(),
        key: getBlogImageS3Key(key),
    });

    return new Response(Buffer.from(body), {
        headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=86400",
        },
    });
}
