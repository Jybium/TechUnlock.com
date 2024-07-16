import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Define the login route
  const loginRoute = "/login";

  // Extract the token from the cookies
  const token = request.cookies.get("access_token")?.value;

  // If the user is trying to access a protected route
  if (pathname.startsWith("/courses")) {
    if (!token) {
      // Redirect to login if no token found
      url.pathname = loginRoute;
      return NextResponse.redirect(url);
    }

    // Clone the request and set the authorization header
    const authHeaderRequest = new Request(request.url, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        Authorization: `Bearer ${token}`,
      },
      body: request.body,
      redirect: "manual",
    });

    // Send the request to the server to check token validity
    const response = await fetch(authHeaderRequest);

    if (response.ok) {
      // Continue with the request
      return NextResponse.next();
    } else if (response.status === 401 || response.status === 400) {
      // Redirect to login on unauthorized or bad request
      url.pathname = loginRoute;
      return NextResponse.redirect(url);
    }
  }

  // If the request is for the login route or other non-protected routes, continue with the request
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/courses"],
};
