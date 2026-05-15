/**
 * SSG ビルド: アセット同期 → 画像 Route 一時退避 → export → Route 復元
 */
import { spawn } from "node:child_process";
import { cp, mkdir, rm } from "node:fs/promises";

const ROUTE_BACKUP = ".cache/image-routes-backup";

function run(command, args, env = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            stdio: "inherit",
            env: { ...process.env, ...env },
        });
        child.on("close", (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
            }
        });
    });
}

async function backupImageRoutes() {
    await rm(ROUTE_BACKUP, { recursive: true, force: true });
    await mkdir(ROUTE_BACKUP, { recursive: true });
    await cp("app/blog/image", `${ROUTE_BACKUP}/blog`, { recursive: true });
    await cp("app/photography/image", `${ROUTE_BACKUP}/photography`, { recursive: true });
    await rm("app/blog/image", { recursive: true, force: true });
    await rm("app/photography/image", { recursive: true, force: true });
}

async function restoreImageRoutes() {
    await rm("app/blog/image", { recursive: true, force: true });
    await rm("app/photography/image", { recursive: true, force: true });
    await cp(`${ROUTE_BACKUP}/blog`, "app/blog/image", { recursive: true });
    await cp(`${ROUTE_BACKUP}/photography`, "app/photography/image", { recursive: true });
    await rm(ROUTE_BACKUP, { recursive: true, force: true });
}

let routesBackedUp = false;

try {
    await run("node", ["scripts/prepare-static-assets.mjs"]);
    await backupImageRoutes();
    routesBackedUp = true;
    await run("npx", ["next", "build"], { STATIC_EXPORT: "1" });
} finally {
    if (routesBackedUp) {
        await restoreImageRoutes();
    }
}
