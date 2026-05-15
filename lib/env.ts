/**
 * S3 関連の環境変数（サーバー専用。NEXT_PUBLIC_ は付けない）
 * 参照: .env
 *
 * ページごとにバケットが異なる想定（S3_BUCKET_* + S3_PATH_*）。
 * AWS 認証は SDK のデフォルトチェーン（ローカル: .env / SSO、CI: OIDC 等）。
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
