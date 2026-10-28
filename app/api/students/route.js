import { NextResponse } from "next/server";
import { searchStudents } from "@/lib/queries";

// GET /api/students?q=...  -> universal search (summer + winter)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  return NextResponse.json(searchStudents(q));
}
