/**
 * S3 関連の環境変数（サーバー専用。NEXT_PUBLIC_ は付けない）
 * 参照: .env
 *
 * ページごとにバケットが異なる想定（S3_BUCKET_* + S3_PATH_*）。
 * 公開用バケット（SSG 配置先）は AWS_S3_BUCKET（CI deploy のみ。JSON 取得バケットとは別）。
 * dev / standalone: マークダウン・JSON はサーバーから S3 取得。画像は CloudFront（CONTENT_CDN_BASE 必須）。
 * build:static: マークダウン・JSON はビルド時に S3 取得。画像は `/{objectKey}`（CF と配信パス一致が前提）。
 */

function requireEnv(name: string): string {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(
            `Missing environment variable: ${name}. Set it in .env (local) or CI secrets, then restart \`npm run dev\`.`,
        );
    }
    return value;
}

/** AWS リージョン（未設定時は ap-northeast-1） */
export function getAwsRegion(): string {
    return process.env.AWS_REGION?.trim() || "ap-northeast-1";
}

/** Blog（/） */
export function getS3BucketBlog(): string {
    return requireEnv("S3_BUCKET_BLOG");
}

export function getS3PathBlog(): string {
    return requireEnv("S3_PATH_BLOG");
}

/** ブログ・写真の画像が載る CloudFront 等（末尾スラッシュなし）。dev / standalone で `img` の絶対 URL に使う。 */
export function getContentCdnBase(): string | undefined {
    const v = process.env.CONTENT_CDN_BASE?.trim();
    return v || undefined;
}

export function joinContentCdnBase(base: string, objectKey: string): string {
    const b = base.replace(/\/+$/, "");
    const k = objectKey.replace(/^\/+/, "");
    return `${b}/${k}`;
}

/** Photography（/photography） */
export function getS3BucketPhotography(): string {
    return requireEnv("S3_BUCKET_PHOTOGRAPHY");
}

export function getS3PathPhotography(): string {
    return requireEnv("S3_PATH_PHOTOGRAPHY");
}

/** Experience（/experience） */
export function getS3BucketExperience(): string {
    return requireEnv("S3_BUCKET_EXPERIENCE");
}

export function getS3PathExperience(): string {
    return requireEnv("S3_PATH_EXPERIENCE");
}
