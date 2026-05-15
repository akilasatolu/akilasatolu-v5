/**
 * SSG 前に S3 から静的アセットを public/ へ同期する（build:static / CI 用）
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

function requireEnv(name) {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}

const region = process.env.AWS_REGION?.trim() || "ap-northeast-1";
const client = new S3Client({ region });

async function downloadPrefix({ bucket, prefix, destRoot }) {
    const normalizedPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
    let continuationToken;

    await rm(destRoot, { recursive: true, force: true });
    await mkdir(destRoot, { recursive: true });

    do {
        const response = await client.send(
            new ListObjectsV2Command({
                Bucket: bucket,
                Prefix: normalizedPrefix,
                ContinuationToken: continuationToken,
            }),
        );

        for (const object of response.Contents ?? []) {
            if (!object.Key || object.Key.endsWith("/")) {
                continue;
            }

            const filename = path.basename(object.Key);
            const destPath = path.join(destRoot, filename);

            const file = await client.send(
                new GetObjectCommand({
                    Bucket: bucket,
                    Key: object.Key,
                }),
            );
            const body = await file.Body.transformToByteArray();
            await writeFile(destPath, body);
        }

        continuationToken = response.NextContinuationToken;
    } while (continuationToken);
}

async function main() {
    const blogBucket = requireEnv("S3_BUCKET_BLOG");
    const photographyBucket = requireEnv("S3_BUCKET_PHOTOGRAPHY");

    console.log("Syncing blog images: posts-img/ -> public/blog/image/");
    await downloadPrefix({
        bucket: blogBucket,
        prefix: "posts-img",
        destRoot: path.join("public", "blog", "image"),
    });

    console.log("Syncing photography images: photos/ -> public/photography/image/");
    await downloadPrefix({
        bucket: photographyBucket,
        prefix: "photos",
        destRoot: path.join("public", "photography", "image"),
    });

    console.log("Static assets ready.");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
