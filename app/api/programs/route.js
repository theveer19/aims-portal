import { NextResponse } from "next/server";
import { getProgramsFor } from "@/lib/queries";

// GET /api/programs?university=1&session=3
// Returns only the active programs for the given university + session
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const university = searchParams.get("university");
  const session = searchParams.get("session");
  if (!university || !session) return NextResponse.json([]);
  return NextResponse.json(getProgramsFor(university, session));
}
