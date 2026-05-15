import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getAwsRegion } from "@/lib/env";

let client: S3Client | undefined;

function getS3Client(): S3Client {
    if (!client) {
        client = new S3Client({ region: getAwsRegion() });
    }
    return client;
}

export type S3ObjectRef = {
    bucket: string;
    key: string;
};

/** S3 オブジェクト本文を UTF-8 テキストで取得（ビルド時 / サーバー専用） */
export async function fetchS3Text({ bucket, key }: S3ObjectRef): Promise<string> {
    const normalizedKey = key.replace(/^\/+/, "");
    const response = await getS3Client().send(
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
