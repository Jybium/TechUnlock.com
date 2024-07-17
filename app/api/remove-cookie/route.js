import { cookies } from "next/headers";
import { deleteCookie } from "cookies-next";
import { NextResponse } from "next/server";

export async function GET() {
  deleteCookie("access_token", { cookies });

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
