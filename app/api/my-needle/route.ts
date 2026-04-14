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
    return NextResponse.json(parsed);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

