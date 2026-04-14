"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import type { Radar, RadarAlbum as Album } from "@/lib/radar-types";

const FRIENDLY_DELAY_MESSAGE =
  "The radar is taking longer than usual — Gemini is under high demand right now. Wait a minute and try again.";

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

export default function MyNeedlePage() {
  const [genres, setGenres] = useState("");
  const [artists, setArtists] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [radar, setRadar] = useState<Radar | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/my-needle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genres, artists }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(FRIENDLY_DELAY_MESSAGE);
        setRadar(null);
        return;
      }

      setRadar(data as Radar);
    } catch (err) {
      const message = err instanceof Error ? err.message : FRIENDLY_DELAY_MESSAGE;
      setError(message || FRIENDLY_DELAY_MESSAGE);
      setRadar(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px]">
          <main className="px-6 py-8 md:px-6">
            <header className="border-b-2 border-[#1a1a1a] pb-5">
              <h1 className="text-[32px] font-black tracking-[-2px] text-[#1a1a1a] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-[48px]">
                My Needle
              </h1>
              <p className="mt-3 text-[16px] leading-[1.6] text-[#444444] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                Tell us what you listen to and we&apos;ll generate a weekly radar just for you — same sources, different
                taste.
              </p>
            </header>

            <form onSubmit={onSubmit} className="mt-8 border-b-[0.5px] border-[#e0e0e0] pb-8">
              <div className="space-y-5">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.08em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                    Genres
                  </span>
                  <input
                    type="text"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                    placeholder="shoegaze, dream pop, ambient, post-punk..."
                    className="mt-2 w-full border border-[#e0e0e0] px-3 py-2 text-[14px] text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.08em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                    Reference artists
                  </span>
                  <input
                    type="text"
                    value={artists}
                    onChange={(e) => setArtists(e.target.value)}
                    placeholder="Grouper, Perfume Genius, Blood Orange..."
                    className="mt-2 w-full border border-[#e0e0e0] px-3 py-2 text-[14px] text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif] focus:outline-none focus:border-[#1a1a1a]"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 border-b border-[#1a1a1a] text-[13px] text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif] disabled:opacity-50"
              >
                Generate my radar →
              </button>
            </form>

            {loading ? (
              <p className="mt-8 text-[14px] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                Searching this week&apos;s releases...
              </p>
            ) : null}

            {error ? (
              <p className="mt-8 text-[13px] text-[#888888] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                {error}
              </p>
            ) : null}

            {radar && !loading ? (
              <>
                <div className="mt-8">
                  <p className="mb-6 text-[13px] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                    {formatSlashDate(radar.week_to)} – {formatSlashDate(radar.week_from)}
                  </p>
                </div>

                {radar.albums.length === 0 ? (
                  <p className="mt-2 text-[13px] text-[#888888] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                    Nothing matched your taste this week. Try broader genres.
                  </p>
                ) : (
                  <section>
                    {radar.albums.map((album: Album) => (
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
                )}

                <footer className="flex items-center justify-between py-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                      {radar.footer}
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
              </>
            ) : null}
          </main>

          <aside className="bg-[#fafafa]">
            <div className="h-full border-t-[0.5px] border-[#e0e0e0] px-6 py-8 md:border-l-[0.5px] md:border-t-0 md:px-4">
              <div>
                <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                  Archive
                </div>
                <Link
                  href="/archive"
                  className="block border-b-[0.5px] border-[#e8e8e8] py-2 text-[14px] font-bold text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif]"
                >
                  Browse all issues
                </Link>
              </div>

              <div className="mt-6 border-t-[0.5px] border-[#e0e0e0] pt-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                  My Needle
                </div>
                <p className="mt-3 text-[13px] leading-[1.6] text-[#333333] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                  Start from your favorite genres and artists, and get a radar tuned to your listening profile.
                </p>
                <div className="mt-4">
                  <Link
                    href="/"
                    className="text-[11px] text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif] border-b border-[#1a1a1a]"
                  >
                    Back to weekly radar →
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
