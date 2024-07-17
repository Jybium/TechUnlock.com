import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Define the login route
  const loginRoute = "/login";

  // Extract the token from the cookies
  const token = request.cookies.get("access_token")?.value;

  // Handle /courses/verify route specifically
  if (pathname === "/courses/verify") {
    const trxref = url.searchParams.get("trxref");

    if (!token) {
      // Redirect to login if no token found, with redirect URL parameter and trxref
      url.pathname = loginRoute;
      url.searchParams.set("redirect", pathname);
      if (trxref) {
        url.searchParams.set("trxref", trxref);
      }
      return NextResponse.redirect(url);
    }

    // Clone the request and set the authorization header
    const authHeaderRequest = new Request(request.url, {
      method: request.method,
      headers: new Headers({
        ...Object.fromEntries(request.headers.entries()),
        Authorization: `Bearer ${token}`,
      }),
      body: request.body,
      redirect: "manual",
    });

    // Send the request to the server to check token validity
    const response = await fetch(authHeaderRequest.url, {
      method: authHeaderRequest.method,
      headers: authHeaderRequest.headers,
      body: authHeaderRequest.body,
    });

    if (response.ok) {
      // Continue with the request
      return NextResponse.next();
    } else if (response.status === 401 || response.status === 400) {
      // Redirect to login on unauthorized or bad request, with redirect URL parameter and trxref
      url.pathname = loginRoute;
      url.searchParams.set("redirect", pathname);
      if (trxref) {
        url.searchParams.set("trxref", trxref);
      }
      return NextResponse.redirect(url);
    }
  }

  // General handling for other protected routes
  if (
    pathname.includes("register") ||
    pathname.includes("pay") ||
    pathname.includes("verify") ||
    pathname.startsWith("/dashboard")
  ) {
    if (!token) {
      // Redirect to login if no token found, with redirect URL parameter
      url.pathname = loginRoute;
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // Clone the request and set the authorization header
    const authHeaderRequest = new Request(request.url, {
      method: request.method,
      headers: new Headers({
        ...Object.fromEntries(request.headers.entries()),
        Authorization: `Bearer ${token}`,
      }),
      body: request.body,
      redirect: "manual",
    });

    // Send the request to the server to check token validity
    const response = await fetch(authHeaderRequest.url, {
      method: authHeaderRequest.method,
      headers: authHeaderRequest.headers,
      body: authHeaderRequest.body,
    });

    if (response.ok) {
      // Continue with the request
      return NextResponse.next();
    } else if (response.status === 401 || response.status === 400) {
      // Redirect to login on unauthorized or bad request, with redirect URL parameter
      url.pathname = loginRoute;
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // If the request is for the login route or other non-protected routes, continue with the request
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/courses/:id/:path*", "/dashboard/my-courses"],
};
