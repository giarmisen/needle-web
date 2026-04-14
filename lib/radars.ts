import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type { Radar, RadarAlbum } from "@/lib/radar-types";

const ARCHIVE_DIR = path.join(process.cwd(), "content", "archive");

export async function getAllRadars(): Promise<string[]> {
  const entries = await readdir(ARCHIVE_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name.replace(/\.json$/i, ""))
    .sort((a, b) => b.localeCompare(a));
}

export async function getRadarByWeek(week: string): Promise<Radar | null> {
  try {
    const filePath = path.join(ARCHIVE_DIR, `${week}.json`);
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as Radar;
  } catch {
    return null;
  }
}

export async function getLatestRadar(): Promise<{ week: string; radar: Radar } | null> {
  const weeks = await getAllRadars();
  const latestWeek = weeks[0];

  if (!latestWeek) {
    return null;
  }

  const radar = await getRadarByWeek(latestWeek);
  if (!radar) {
    return null;
  }

  return {
    week: latestWeek,
    radar,
  };
}
