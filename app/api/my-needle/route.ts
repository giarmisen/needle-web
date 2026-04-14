import { NextResponse } from "next/server";

type MyNeedleRequest = {
  genres?: string;
  artists?: string;
};

function buildPrompt(genres: string, artists: string) {
  return [
    "You are an expert music radar curator.",
    "Generate a weekly radar JSON tailored to this listener profile.",
    `Genres: ${genres}`,
    `Reference artists: ${artists}`,
    "",
    "Requirements:",
    "- Focus on albums released this week or very recently.",
    "- Base recommendations on critical consensus using reputable sources.",
    "- Prioritize publications such as: Pitchfork, The Line of Best Fit, Resident Advisor, PopMatters, NME, Stereogum, The Quietus, Clash, Consequence, Exclaim!, BrooklynVegan, The Guardian, etc.",
    "- Keep recommendations aligned with the provided taste profile.",
    "- Return strict JSON only (no markdown, no commentary).",
    "",
    "Output schema:",
    "{",
    '  "week_from": "DD/MM/YYYY",',
    '  "week_to": "DD/MM/YYYY",',
    '  "albums": [',
    "    {",
    '      "artist": "string",',
    '      "title": "string",',
    '      "year": 2026,',
    '      "sources": "Source A · Source B",',
    '      "description": "2-3 sentence concise summary grounded in critic coverage",',
    '      "aligned": true,',
    '      "spotify_url": "https://open.spotify.com/search/ARTIST+TITLE",',
    '      "cover_url": "https://...jpg or png"',
    "    }",
    "  ],",
    '  "footer": "N albums recommended this week."',
    "}",
    "",
    "Constraints:",
    "- Return 6-10 albums.",
    "- Ensure spotify_url and cover_url exist for every album.",
    "- aligned should be true only when strongly matching the user taste profile.",
  ].join("\n");
}

function parseJsonText(raw: string) {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  return JSON.parse(cleaned);
}

async function getSpotifyToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();
  return data.access_token;
}

async function getSpotifyData(artist: string, title: string, token: string) {
  const query = encodeURIComponent(`album:${title} artist:${artist}`);
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=album&limit=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await res.json();
  const items = data?.albums?.items;
  if (!items || items.length === 0) return null;

  const album = items[0];
  const foundArtist = album.artists[0].name.toLowerCase();
  const foundTitle = album.name.toLowerCase();

  if (
    !foundArtist.includes(artist.toLowerCase()) &&
    !artist.toLowerCase().includes(foundArtist)
  ) return null;
  if (
    !foundTitle.includes(title.toLowerCase()) &&
    !title.toLowerCase().includes(foundTitle)
  ) return null;

  return {
    spotifyUrl: album.external_urls.spotify,
    coverUrl: album.images?.[1]?.url || null,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MyNeedleRequest;
    const genres = body.genres?.trim() ?? "";
    const artists = body.artists?.trim() ?? "";

    if (!genres && !artists) {
      return NextResponse.json(
        { error: "Please provide genres or reference artists." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY on server." },
        { status: 500 }
      );
    }

    const prompt = buildPrompt(genres, artists);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          tools: [{ google_search: {} }],
          generationConfig: {
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Gemini request failed: ${errorText}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? "")
        .join("")
        .trim() ?? "";

    if (!text) {
      return NextResponse.json(
        { error: "Gemini returned an empty response." },
        { status: 502 }
      );
    }

    const parsed = parseJsonText(text);

const token = await getSpotifyToken();
for (const album of parsed.albums) {
  const spotify = await getSpotifyData(album.artist, album.title, token);
  if (spotify) {
    album.spotify_url = spotify.spotifyUrl;
    album.cover_url = spotify.coverUrl;
  }
}

return NextResponse.json(parsed);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

