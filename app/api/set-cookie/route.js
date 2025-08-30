import { serialize } from "cookie";
import { NextResponse } from "next/server";

/**
 * POST request handler for setting a cookie.
 *
 * @param {Request} req - The incoming request object.
 * @param {NextApiResponse} res - The response object to send back.
 *
 * @returns {NextResponse} - A Next.js response object with JSON content.
 */
export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ message: "Token is required" }, { status: 400 });
  }

  const accessCookie = serialize("access_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    path: "/",
  });

  const response = NextResponse.json(
    { message: "Cookie set successfully" },
    { status: 200 }
  );
  response.headers.append("Set-Cookie", accessCookie);
  return response;
}
