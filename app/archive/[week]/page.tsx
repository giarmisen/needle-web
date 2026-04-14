import Link from "next/link";
import { notFound } from "next/navigation";
import { getRadarByWeek } from "@/lib/radars";
import type { RadarAlbum as Album } from "@/lib/radar-types";

type RadarWeekPageProps = {
  params: { week: string };
};

export default async function RadarWeekPage({ params }: RadarWeekPageProps) {
  const radar = await getRadarByWeek(params.week);

  if (!radar) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-[#333333] md:px-12">
      <header className="border-b border-[#e0e0e0] pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
          The Needle Radar
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[#1a1a1a]">Issue {params.week}</h1>
        <p className="mt-4 text-lg [font-family:Georgia,Times,'Times_New_Roman',serif]">
          Week {radar.week_from} to {radar.week_to}
        </p>
      </header>

      <section className="mt-10 space-y-10">
        {radar.albums.map((album: Album) => (
          <article key={`${album.artist}-${album.title}`} className="border-b border-[#e0e0e0] pb-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] [font-family:Georgia,Times,'Times_New_Roman',serif]">
              {album.artist} - {album.title} ({album.year})
            </h2>
            <p className="mt-3 text-[11px] uppercase tracking-[0.15em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
              {album.sources}
            </p>
            <p className="mt-5 text-lg leading-8 [font-family:Georgia,Times,'Times_New_Roman',serif]">
              {album.description}
            </p>
            {album.aligned ? (
              <p className="mt-4 text-base italic text-[#888888] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                very aligned with your taste
              </p>
            ) : null}
            <p className="mt-4 text-sm uppercase tracking-[0.08em] [font-family:Arial,Helvetica,sans-serif]">
              <a className="text-[#1a1a1a] underline underline-offset-4" href={album.review_url} target="_blank" rel="noreferrer">
                Spotify link
              </a>
            </p>
          </article>
        ))}
      </section>

      <footer className="mt-10 border-t border-[#e0e0e0] pt-6">
        <p className="text-base [font-family:Georgia,Times,'Times_New_Roman',serif]">{radar.footer}</p>
        <div className="mt-5 flex gap-6 text-xs uppercase tracking-[0.12em] [font-family:Arial,Helvetica,sans-serif]">
          <Link className="text-[#888888] hover:text-[#1a1a1a]" href="/archive">
            Back to archive
          </Link>
          <Link className="text-[#888888] hover:text-[#1a1a1a]" href="/">
            Latest radar
          </Link>
        </div>
      </footer>
    </main>
  );
}
