import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;
  if (
    token &&
    ["/login", "/register", "/auth"].some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  if (!token && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/auth/signup", request.url));
  }

  return NextResponse.next();
}
