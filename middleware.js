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
  } else {
  }

  // Add a new header to check for token in session storage
  const tokenFromHeader = request.headers.get("x-access-token");

  if (!token && tokenFromHeader) {
    token = tokenFromHeader;
  }

  // Function to redirect to login with redirect URL parameter
  const redirectToLogin = () => {
    url.pathname = loginRoute;
    url.searchParams.set("redirect", pathname);

    return NextResponse.redirect(url);
  };

  // Handle /courses/verify route specifically for redirects and search parameter extraction
  if (pathname === "/courses/verify") {
    const trxref = url.searchParams.get("trxref");

    if (!token) {
      // Allow the request to proceed even if the token is not present

      return NextResponse.next();
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
      const allowedUrls = new Set([
        "https://techunlock.org/api",
        "http://localhost:3000",
      ]);

      // Validate the request URL
      if (!allowedUrls.has(request.url)) {
        throw new Error("Unauthorized request URL");
      }

      const response = await fetch(request.url, {
        method: request.method,
        headers: {
          ...Object.fromEntries(request.headers.entries()),
          Authorization: `Bearer ${token}`, // Ensure the token is properly scoped
        },
        body: request.body,
      });

      // Handle response errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "An error occurred while processing the request."
        );
      }

      if (response.ok) {
        // Continue with the request
        return NextResponse.next();
      } else {
        // Redirect to login on unauthorized or bad request, with redirect URL parameter
        return redirectToLogin();
      }
    } catch (error) {
      // Handle fetch errors

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
