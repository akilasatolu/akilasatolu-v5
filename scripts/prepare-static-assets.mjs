/**
 * SSG ではブログ・写真の画像を CF と同一パス（/akilasatolu-*-…）で参照するため、public/ への画像同期は行わない。
 */
async function main() {
    console.log("prepare-static-assets: skip image sync (images use CloudFront paths).");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
