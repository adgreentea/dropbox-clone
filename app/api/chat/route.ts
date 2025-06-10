import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  // TODO: integrate real semantic search and document analysis
  // For MVP we return a placeholder answer
  const answer = `You asked: ${question}. (AI response placeholder)`;

  return NextResponse.json({ answer });
}
