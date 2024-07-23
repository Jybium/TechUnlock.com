import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Define the login route
  const loginRoute = "/login";

  // Extract the token from the cookies
  let token = request.cookies.get("access_token")?.value;

  // Check if the token is in the query parameters
  if (!token) {
    token = url.searchParams.get("token");
    console.log("Token extracted from URL:", token);
  } else {
    console.log("Token extracted from cookies:", token);
  }

  // Add a new header to check for token in session storage
  const tokenFromHeader = request.headers.get("x-access-token");
  console.log("Token extracted from session storage header:", tokenFromHeader);
  if (!token && tokenFromHeader) {
    token = tokenFromHeader;
    console.log("Token extracted from session storage header:", token);
  }

  // Function to redirect to login with redirect URL parameter and optional trxref
  const redirectToLogin = (trxref = null) => {
    url.pathname = loginRoute;
    url.searchParams.set("redirect", pathname);
    if (trxref) {
      url.searchParams.set("trxref", trxref);
    }
    console.log("Redirecting to login with URL:", url.toString());
    return NextResponse.redirect(url);
  };

  // Handle /courses/verify route specifically for redirects and search parameter extraction
  if (pathname === "/courses/verify") {
    const trxref = url.searchParams.get("trxref");

    if (!token) {
      return redirectToLogin(trxref);
    }

    // Skip token validation and continue with the request
    return NextResponse.next();
  }

  // General handling for other protected routes
  if (
    pathname.includes("register") ||
    pathname.includes("pay") ||
    pathname.startsWith("/dashboard")
  ) {
    if (!token) {
      return redirectToLogin();
    }

    try {
      // Send the request to the server to check token validity
      const response = await fetch(request.url, {
        method: request.method,
        headers: {
          ...Object.fromEntries(request.headers.entries()),
          Authorization: `Bearer ${token}`,
        },
        body: request.body,
      });

      if (response.ok) {
        console.log("Token validation successful");
        // Continue with the request
        return NextResponse.next();
      } else {
        console.log("Token validation failed with status:", response.status);
        // Redirect to login on unauthorized or bad request, with redirect URL parameter
        return redirectToLogin();
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Token validation failed with error:", error);
      return redirectToLogin();
    }
  }

  // If the request is for the login route or other non-protected routes, continue with the request
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/courses/:id/:path*", "/dashboard/my-courses", "/courses/verify"],
};
