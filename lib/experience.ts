import { getS3BucketExperience, getS3PathExperience } from "@/lib/env";
import { fetchS3Text } from "@/lib/s3";
import type { ExperienceData } from "@/types/types";

/** ビルド時（SSG）に S3 から experience データを取得してパースする */
export async function getExperienceData(): Promise<ExperienceData> {
    const raw = await fetchS3Text({
        bucket: getS3BucketExperience(),
        key: getS3PathExperience(),
    });
    return JSON.parse(raw) as ExperienceData;
}
