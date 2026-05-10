import { readFile } from "fs/promises";
import path from "path";
import type { ExperienceData } from "@/types/types";

/** ビルド時（SSG）に `content/experience.json` を読み込む */
export async function getExperienceData(): Promise<ExperienceData> {
    const filePath = path.join(process.cwd(), "content", "experience.json");
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as ExperienceData;
}
