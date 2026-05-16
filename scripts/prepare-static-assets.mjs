/**
 * SSG 前に S3 から静的アセットを public/ へ同期する（GetObject のみ。ListBucket 不要）
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const IMAGE_IN_MD_RE = /!\[[^\]]*]\(([^)]+)\)/g;

function requireEnv(name) {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}

const region = process.env.AWS_REGION?.trim() || "ap-northeast-1";
const client = new S3Client({ region });

async function fetchText(bucket, key) {
    const normalizedKey = key.replace(/^\/+/, "");
    const response = await client.send(
        new GetObjectCommand({
            Bucket: bucket,
            Key: normalizedKey,
        }),
    );

    if (!response.Body) {
        throw new Error(`S3 object is empty: s3://${bucket}/${normalizedKey}`);
    }

    return response.Body.transformToString("utf-8");
}

async function downloadFile(bucket, key, destPath) {
    const normalizedKey = key.replace(/^\/+/, "");
    const response = await client.send(
        new GetObjectCommand({
            Bucket: bucket,
            Key: normalizedKey,
        }),
    );

    if (!response.Body) {
        throw new Error(`S3 object is empty: s3://${bucket}/${normalizedKey}`);
    }

    const body = await response.Body.transformToByteArray();
    await mkdir(path.dirname(destPath), { recursive: true });
    await writeFile(destPath, body);
}

function imageFilenameFromHref(href) {
    const filename = href.split(/[/\\]/).pop()?.split("?")[0]?.split("#")[0] ?? href;
    if (!filename || filename.includes("..") || filename.includes("/")) {
        return null;
    }
    return filename;
}

async function syncBlogImages(blogBucket, blogIndexKey) {
    const destRoot = path.join("public", "blog", "image");
    await rm(destRoot, { recursive: true, force: true });
    await mkdir(destRoot, { recursive: true });

    const posts = JSON.parse(await fetchText(blogBucket, blogIndexKey));
    const published = posts.filter((post) => !post.draft);
    const filenames = new Set();

    for (const post of published) {
        const mdKey = `akilasatolu-blog/${post.slug}.md`;
        let md;
        try {
            md = await fetchText(blogBucket, mdKey);
        } catch (error) {
            throw new Error(`Failed to fetch ${mdKey}: ${error.message}`);
        }
        for (const match of md.matchAll(IMAGE_IN_MD_RE)) {
            const filename = imageFilenameFromHref(match[1]);
            if (filename) {
                filenames.add(filename);
            }
        }
    }

    for (const filename of filenames) {
        const key = `akilasatolu-blog-image/${filename}`;
        try {
            await downloadFile(blogBucket, key, path.join(destRoot, filename));
            console.log(`  ${key}`);
        } catch (error) {
            throw new Error(`Failed to download ${key}: ${error.message}`);
        }
    }
}

function photographyImageObjectKey(photoField) {
    const name = photoField.replace(/^\/+/, "");
    const prefix = "akilasatolu-photography/";
    if (name.startsWith(prefix)) {
        return name;
    }
    return prefix + name;
}

async function syncPhotographyImages(photographyBucket, photographyIndexKey) {
    const destRoot = path.join("public", "photography", "image");
    await rm(destRoot, { recursive: true, force: true });
    await mkdir(destRoot, { recursive: true });

    const { photos } = JSON.parse(await fetchText(photographyBucket, photographyIndexKey));

    for (const item of photos) {
        const key = photographyImageObjectKey(item.photo);
        const filename = path.basename(key);
        try {
            await downloadFile(photographyBucket, key, path.join(destRoot, filename));
            console.log(`  ${key}`);
        } catch (error) {
            throw new Error(`Failed to download ${key}: ${error.message}`);
        }
    }
}

async function main() {
    const blogBucket = requireEnv("S3_BUCKET_BLOG");
    const blogIndexKey = requireEnv("S3_PATH_BLOG");
    const photographyBucket = requireEnv("S3_BUCKET_PHOTOGRAPHY");
    const photographyIndexKey = requireEnv("S3_PATH_PHOTOGRAPHY");

    console.log("Syncing blog images (from markdown references)...");
    await syncBlogImages(blogBucket, blogIndexKey);

    console.log("Syncing photography images (from JSON)...");
    await syncPhotographyImages(photographyBucket, photographyIndexKey);

    console.log("Static assets ready.");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
