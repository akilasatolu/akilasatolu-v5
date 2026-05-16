import "server-only";

import { getS3BucketPhotography, getS3PathPhotography } from "@/lib/env";
import { contentImagePublicUrl } from "@/lib/contentAssetUrl";
import { fetchS3Text } from "@/lib/s3";
import type { PhotographyData } from "@/types/types";

const PHOTO_OBJECT_PREFIX = "akilasatolu-photography/";

/** S3 オブジェクトキー: akilasatolu-photography/{photo}（JSON がフルキーならそのまま） */
export function getPhotographyImageKey(photoFileName: string): string {
    const name = photoFileName.replace(/^\/+/, "");
    if (name.startsWith(PHOTO_OBJECT_PREFIX)) {
        return name;
    }
    return `${PHOTO_OBJECT_PREFIX}${name}`;
}

/** 写真 URL（S3 キー `akilasatolu-photography/...` を CloudFront へ） */
export function getPhotographyImageUrl(photoFileName: string): string {
    return contentImagePublicUrl(getPhotographyImageKey(photoFileName));
}

/** ビルド時（SSG）に S3 から photography 用 JSON を取得してパースする */
export async function getPhotographyData(): Promise<PhotographyData> {
    const raw = await fetchS3Text({
        bucket: getS3BucketPhotography(),
        key: getS3PathPhotography(),
    });
    return JSON.parse(raw) as PhotographyData;
}
