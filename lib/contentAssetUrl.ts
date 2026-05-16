import "server-only";

import { getContentCdnBase, joinContentCdnBase } from "@/lib/env";
import { isStaticExport } from "@/lib/isStaticExport";

/**
 * ブログ / 写真の画像をブラウザ向け URL にする。
 * - SSG: `/{objectKey}`（本番ドメイン＝CF と同一パス）
 * - それ以外: `CONTENT_CDN_BASE` + objectKey（CloudFront 絶対 URL）
 */
export function contentImagePublicUrl(objectKey: string): string {
    const key = objectKey.replace(/^\/+/, "");
    if (isStaticExport()) {
        return `/${key}`;
    }
    const base = getContentCdnBase();
    if (!base) {
        throw new Error(
            "Missing environment variable: CONTENT_CDN_BASE. Set it in .env (local) or Docker build-args, then restart `npm run dev`.",
        );
    }
    return joinContentCdnBase(base, key);
}
