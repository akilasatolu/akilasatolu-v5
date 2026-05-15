import { getS3BucketPhotography } from "@/lib/env";
import { getPhotographyImageKey } from "@/lib/photography";
import { fetchS3Bytes } from "@/lib/s3";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const key = new URL(request.url).searchParams.get("key");
    if (!key) {
        return new Response("Missing key", { status: 400 });
    }

    if (key.includes("..")) {
        return new Response("Invalid key", { status: 400 });
    }

    const { body, contentType } = await fetchS3Bytes({
        bucket: getS3BucketPhotography(),
        key: getPhotographyImageKey(key),
    });

    return new Response(Buffer.from(body), {
        headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=86400",
        },
    });
}
