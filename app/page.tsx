import RadarHomeClient, { type ArchiveItem } from "@/components/RadarHomeClient";
import { getAllRadars, getLatestRadar, getRadarByWeek } from "@/lib/radars";

export default async function Home() {
  const latest = await getLatestRadar();
  if (!latest) {
    return (
      <main className="min-h-screen bg-white px-6 py-10 text-[#333333]">
        <h1 className="text-[36px] font-black tracking-[-1.5px] text-[#1a1a1a] [font-family:Georgia,Times,'Times_New_Roman',serif]">
          The Needle Weekly
        </h1>
        <p className="mt-4 text-[13px] leading-[1.6] text-[#555555] [font-family:Georgia,Times,'Times_New_Roman',serif]">
          No radar issues found yet in <code>content/archive</code>.
        </p>
      </main>
    );
  }

  const weeks = await getAllRadars();
  const archive: ArchiveItem[] = (
    await Promise.all(
      weeks.map(async (week) => {
        const radar = await getRadarByWeek(week);
        if (!radar) return null;
        return {
          week,
          week_from: radar.week_from,
          week_to: radar.week_to,
          album_count: radar.albums.length,
        } satisfies ArchiveItem;
      })
    )
  ).filter((x): x is ArchiveItem => Boolean(x));

  return (
    <RadarHomeClient initialWeek={latest.week} initialRadar={latest.radar} archive={archive} />
  );
}
