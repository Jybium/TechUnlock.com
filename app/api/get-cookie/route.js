import { getCookie } from "cookies-next";

export async function GET(req, res) {
  const token = getCookie("access_token", { req, res });
  return NextResponse.json({ token }, { status: 200 });
}
