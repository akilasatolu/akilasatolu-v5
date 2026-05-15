import "server-only";

import { getS3BucketPhotography, getS3PathPhotography } from "@/lib/env";
import { fetchS3Text } from "@/lib/s3";
import type { PhotographyData } from "@/types/types";

const PHOTO_OBJECT_PREFIX = "photos/";

/** S3 オブジェクトキー: photos/{photo} */
export function getPhotographyImageKey(photoFileName: string): string {
    const name = photoFileName.replace(/^\/+/, "");
    if (name.startsWith("photos/")) {
        return name;
    }
    return `${PHOTO_OBJECT_PREFIX}${name}`;
}

/** 画像プロキシ URL（/photography/image?key=...） */
export function getPhotographyImageUrl(photoFileName: string): string {
    const key = getPhotographyImageKey(photoFileName);
    return `/photography/image?key=${encodeURIComponent(key)}`;
}

/** ビルド時（SSG）に S3 から photography 用 JSON を取得してパースする */
export async function getPhotographyData(): Promise<PhotographyData> {
    const raw = await fetchS3Text({
        bucket: getS3BucketPhotography(),
        key: getS3PathPhotography(),
    });
    return JSON.parse(raw) as PhotographyData;
}
