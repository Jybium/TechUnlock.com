import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  cookieStore.delete("access_token");
  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
