import {NextRequest, NextResponse} from "next/server";
import {getAuthToken} from "./utils/checkCookies";
export async function middleware(request: NextRequest) {
 const token = await getAuthToken();
 const {pathname} = request.nextUrl;
 if (token && ["/login", "/register", "/auth"].some((path) => pathname.startsWith(path))) {
  return NextResponse.redirect(new URL("/profile", request.url));
 }
 if (!token && pathname.startsWith("/profile")) {
  return NextResponse.redirect(new URL("/auth/signup", request.url));
 }

 return NextResponse.next();
}
