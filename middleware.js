import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const loginRoute = "/login";

  const hasToken = Boolean(request.cookies.get("access_token")?.value);
  // Allow unauthenticated preview access to dashboard course pages
  if (
    pathname.startsWith("/dashboard/courses") &&
    url.searchParams.get("preview") === "1"
  ) {
    return NextResponse.next();
  }

  const redirectToLogin = () => {
    url.pathname = loginRoute;
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  };

  if (pathname === "/courses/verify") {
    return NextResponse.next();
  }

  // Allow unauthenticated access to admin auth pages
  if (pathname === "/admin/login" || pathname === "/admin/forgot") {
    return NextResponse.next();
  }

  if (
    pathname.includes("register") ||
    pathname.includes("pay") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin")
  ) {
    if (!hasToken) {
      return redirectToLogin();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/courses/:id/:path*",
    "/dashboard/:path*",
    "/courses/verify",
    "/admin/:path*",
  ],
};
