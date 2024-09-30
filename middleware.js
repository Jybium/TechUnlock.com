import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Define the login route
  const loginRoute = "/login";

  // Extract the token from cookies or query parameters
  let token = request.cookies.get("access_token")?.value;
  if (!token) {
    token = url.searchParams.get("token");
  }

  // Function to redirect to login with redirect URL parameter
  const redirectToLogin = () => {
    url.pathname = loginRoute;
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  };

  // Handle /courses/verify route specifically for redirects
  if (pathname === "/courses/verify") {
    const trxref = url.searchParams.get("trxref");
    return NextResponse.next(); // Allow request without token
  }

  // Handle other protected routes
  if (
    pathname.includes("register") ||
    pathname.includes("pay") ||
    pathname.startsWith("/dashboard")
  ) {
    if (!token) {
      return redirectToLogin();
    }

    try {
      // Remove allowed URLs check or refine it to check only the base origin
      const requestUrl = new URL(request.url).origin;
      const allowedUrls = new Set([
        "https://techunlock.org",
        "http://localhost:3000",
        "http://localhost:3001",
      ]);

      if (!allowedUrls.has(requestUrl)) {
        throw new Error("Unauthorized request URL");
      }

      // Validate the token by making an API request to the backend
      const response = await fetch(`${requestUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Token validation failed");
      }

      return NextResponse.next();
    } catch (error) {
      return redirectToLogin();
    }
  }

  // Continue with the request for non-protected routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/courses/:id/:path*", "/dashboard/:path*", "/courses/verify"],
};
