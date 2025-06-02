import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { key, userId } = await req.json();

  if (!key || !userId) {
    return NextResponse.json(
      { success: false, error: "Missing key or userId" },
      { status: 400 },
    );
  }

  if (key.length > 10 && userId.includes("@")) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, error: "Invalid key or userId" },
      { status: 400 },
    );
  }
}
