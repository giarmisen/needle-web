"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Radar } from "@/lib/radar-types";
import HeaderWithSubscribe from "@/components/HeaderWithSubscribe";

export type ArchiveItem = {
  week: string;
  week_from: string;
  week_to: string;
  album_count: number;
};

type Props = {
  initialWeek: string;
  initialRadar: Radar;
  archive: ArchiveItem[];
};

function spotifySearchUrl(artist: string, title: string) {
  const q = encodeURIComponent(`${artist} ${title}`);
  return `https://open.spotify.com/search/${q}`;
}

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

export default function RadarHomeClient({ initialWeek, initialRadar, archive }: Props) {
  const [activeWeek, setActiveWeek] = useState(initialWeek);
  const [radar, setRadar] = useState<Radar>(initialRadar);
  const [isLoading, setIsLoading] = useState(false);

  const activeMeta = useMemo(
    () => archive.find((x) => x.week === activeWeek) ?? archive[0],
    [activeWeek, archive]
  );

  async function onSelectWeek(week: string) {
    if (week === activeWeek) return;
    setActiveWeek(week);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/radars/${week}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load week ${week}`);
      const next = (await res.json()) as Radar;
      setRadar(next);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px]">
          <main className="px-6 py-8 md:px-6">
            <HeaderWithSubscribe
              title="The Needle Weekly"
              description="A personal music radar built around shoegaze, dream pop, avant-garde R&B, art pop, and whatever else crosses the threshold. Every Sunday, the albums that made it — filtered by critical consensus across 30+ sources."
            />

            <div className="mt-8">
              <p className="mb-6 text-[13px] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                {activeMeta
                  ? `${formatSlashDate(activeMeta.week_to)} – ${formatSlashDate(activeMeta.week_from)}`
                  : `${formatSlashDate(radar.week_to)} – ${formatSlashDate(radar.week_from)}`}
              </p>
            </div>

            <section aria-busy={isLoading} aria-live="polite">
              {radar.albums.map((album) => (
                <article
                  key={`${album.artist}-${album.title}`}
                  className="flex gap-4 border-b-[0.5px] border-[#e0e0e0] py-6"
                >
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
                        href={spotifySearchUrl(album.artist, album.title)}
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
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                  {radar.albums.length} albums recommended this week
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#aaaaaa] [font-family:Arial,Helvetica,sans-serif]">
                  The Needle Weekly
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/giarmisen/"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#888888] [font-family:Arial,Helvetica,sans-serif] border-b border-[#888888]"
              >
                Georgina Armisen
              </a>
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
                    const isActive = item.week === activeWeek;
                    return (
                      <button
                        key={item.week}
                        type="button"
                        onClick={() => onSelectWeek(item.week)}
                        className="w-full border-b-[0.5px] border-[#e8e8e8] py-2 text-left"
                      >
                        <div
                          className={[
                            "text-[14px] text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif]",
                            isActive ? "font-bold" : "font-normal",
                          ].join(" ")}
                        >
                          {formatIsoDate(item.week)}
                        </div>
                        <div className="mt-1 text-[12px] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                          {item.album_count} albums
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="mt-6 border-t-[0.5px] border-[#e0e0e0] pt-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                  My Needle
                </div>
                <p className="mt-3 text-[13px] leading-[1.6] text-[#333333] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                  A small kit for shaping your own weekly radar from the music you already trust.
                </p>
                <div className="mt-4">
                  <Link
                    href="/my-needle"
                    className="text-[11px] text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif] border-b border-[#1a1a1a]"
                  >
                    Set up yours →
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

