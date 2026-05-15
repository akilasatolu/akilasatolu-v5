import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
    ...(isStaticExport ? { output: "export" as const } : { output: "standalone" as const }),
    trailingSlash: true,
    devIndicators: false,
    images: { unoptimized: true },
    // AWS SDK は Node 側で解決（Turbopack の bundle エラー回避）
    serverExternalPackages: ["@aws-sdk/client-s3"],
};

export default nextConfig;
