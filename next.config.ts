import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    devIndicators: false,
    // AWS SDK は Node 側で解決（Turbopack の bundle エラー回避）
    serverExternalPackages: ["@aws-sdk/client-s3"],
};

export default nextConfig;
