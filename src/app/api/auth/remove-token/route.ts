import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "توکن حذف شد" });
  response.cookies.set({
    name: "access_token",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: true,
  });

  return response;
}
