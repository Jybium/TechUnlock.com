import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BASE_URL = "https://test.techunlock.org/test/api";

async function proxy(request, { params }) {
  const { path = [] } = params;
  const targetPath = Array.isArray(path) ? path.join("/") : path;

  const url = new URL(request.url);
  const targetUrl = `${BASE_URL}/${targetPath}${url.search}`;

  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const init = {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method)
      ? undefined
      : await request.arrayBuffer(),
    redirect: "manual",
  };

  try {
    const res = await fetch(targetUrl, init);
    const data = await res.arrayBuffer();

    const response = new NextResponse(data, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") || "application/json",
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Upstream request failed" },
      { status: 502 }
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
