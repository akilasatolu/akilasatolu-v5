/** SSG（output: export）ビルドかどうか */
export function isStaticExport(): boolean {
    return process.env.STATIC_EXPORT === "1";
}
