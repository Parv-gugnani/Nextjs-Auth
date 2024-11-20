import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "b22fe10036b0497e9aadbb0a717c782a";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}