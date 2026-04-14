import { NextResponse } from "next/server";
import { getRadarByWeek } from "@/lib/radars";

export async function GET(
  _request: Request,
  { params }: { params: { week: string } }
) {
  const radar = await getRadarByWeek(params.week);
  if (!radar) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(radar);
}

