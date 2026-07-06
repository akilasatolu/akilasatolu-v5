import "server-only";

import { getS3BucketExperience, getS3PathExperience } from "@/lib/env";
import { fetchS3Text } from "@/lib/s3";
import type { ExperienceData } from "@/types/types";
import { cache } from "react";

/** ビルド時（SSG）に S3 から experience データを取得してパースする */
export const getExperienceData = cache(async (): Promise<ExperienceData> => {
    const raw = await fetchS3Text({
        bucket: getS3BucketExperience(),
        key: getS3PathExperience(),
    });
    return JSON.parse(raw) as ExperienceData;
});
