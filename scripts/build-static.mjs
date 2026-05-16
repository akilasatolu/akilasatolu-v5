/**
 * SSG ビルド: export
 */
import { spawn } from "node:child_process";

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

await run("npx", ["next", "build"], { STATIC_EXPORT: "1" });
