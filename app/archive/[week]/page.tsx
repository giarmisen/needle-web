import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllRadars, getRadarByWeek } from "@/lib/radars";
import type { RadarAlbum as Album } from "@/lib/radar-types";

type RadarWeekPageProps = {
  params: { week: string };
};

function formatSlashDate(value: string) {
  const [day, month, year] = value.split("/");
  const d = new Date(`${year}-${month}-${day}T00:00:00`);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatIsoDate(value: string) {
  const d = new Date(`${value}T00:00:00`);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function spotifySearchUrl(artist: string, title: string) {
  return `https://open.spotify.com/search/${encodeURIComponent(`${artist} ${title}`)}`;
}

export default async function RadarWeekPage({ params }: RadarWeekPageProps) {
  const radar = await getRadarByWeek(params.week);
  const weeks = await getAllRadars();

  if (!radar) {
    notFound();
  }

  const archive = (
    await Promise.all(
      weeks.map(async (week) => {
        const item = await getRadarByWeek(week);
        if (!item) return null;
        return {
          week,
          album_count: item.albums.length,
        };
      })
    )
  ).filter((x): x is { week: string; album_count: number } => Boolean(x));

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px]">
          <main className="px-6 py-8 md:px-6">
            <div className="pb-2">
              <Link
                href="/"
                className="[font-family:Arial,Helvetica,sans-serif] text-[11px] uppercase text-[#888888] no-underline"
              >
                THE NEEDLE WEEKLY
              </Link>
            </div>

            <div className="border-b border-[#e0e0e0] pb-4">
              <h1 className="text-[36px] font-black text-[#1a1a1a] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                {formatSlashDate(radar.week_to)} – {formatSlashDate(radar.week_from)}
              </h1>
            </div>

            <section className="mt-6">
              {radar.albums.map((album: Album) => (
                <article key={`${album.artist}-${album.title}`} className="flex gap-4 border-b-[0.5px] border-[#e0e0e0] py-6">
                  <div className="h-[80px] w-[80px] shrink-0 bg-[#f0f0f0] md:h-[175px] md:w-[175px]">
                    {album.cover_url ? (
                      <img
                        src={album.cover_url}
                        alt={`${album.artist} - ${album.title} cover`}
                        className="h-[80px] w-[80px] object-cover md:h-[175px] md:w-[175px]"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-[22px] font-bold text-[#1a1a1a] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                      {album.artist} — &quot;{album.title}&quot;{" "}
                      <span className="font-normal text-[#888888]">({album.year})</span>
                    </h2>

                    <p className="mb-2 mt-1 text-[11px] font-normal uppercase tracking-[0.08em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                      {album.sources}
                    </p>

                    <p className="mb-2 text-[16px] leading-[1.7] text-[#333333] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                      {album.description}
                    </p>

                    {album.aligned ? (
                      <p className="text-[13px] italic text-[#888888] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                        very aligned with your taste
                      </p>
                    ) : null}

                    <div className="mt-3">
                      <a
                        href={album.spotify_url || spotifySearchUrl(album.artist, album.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13px] text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif] border-b border-[#1a1a1a]"
                      >
                        Listen on Spotify
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <footer className="flex items-center justify-between py-6">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#aaaaaa] [font-family:Arial,Helvetica,sans-serif]">
                The Needle Weekly
              </p>
              <p className="text-[11px] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                Curated by{" "}
                <a
                  href="https://www.linkedin.com/in/giarmisen/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#888888] [font-family:Arial,Helvetica,sans-serif] underline"
                >
                  Georgina Armisen
                </a>
                , product designer.
              </p>
            </footer>
          </main>

          <aside className="bg-[#fafafa]">
            <div className="h-full border-t-[0.5px] border-[#e0e0e0] px-6 py-8 md:border-l-[0.5px] md:border-t-0 md:px-4">
              <div>
                <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                  Archive
                </div>
                <nav>
                  {archive.map((item) => {
                    const isActive = item.week === params.week;
                    return (
                      <div key={item.week} className="block w-full border-b-[0.5px] border-[#e8e8e8] py-2 text-left">
                        {isActive ? (
                          <div className="text-[14px] font-bold text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif]">
                            {formatIsoDate(item.week)}
                          </div>
                        ) : (
                          <Link
                            href={`/archive/${item.week}`}
                            className="text-[14px] font-normal text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif] no-underline"
                          >
                            {formatIsoDate(item.week)}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
