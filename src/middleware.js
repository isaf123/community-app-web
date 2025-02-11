import { NextResponse } from "next/server";
import axios from "axios";
export async function middleware(request) {
  try {
    const token = request.cookies.get("token-user")?.value;
    const url = request.nextUrl.pathname;

    if (url.startsWith("/login") && token) {
      return NextResponse.rewrite(new URL("/", request.url));
    }

    if (url.startsWith("/admin")) {
      if (!token) {
        return NextResponse.rewrite(new URL("/", request.url));
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}user/get-user`,
        { headers: { Authorization: token } }
      );

      const dataUser = response.data;
      if (dataUser?.role !== "admin") {
        return NextResponse.rewrite(new URL("/", request.url));
      }
    }

    if (url == "/login-admin" && token) {
      return NextResponse.rewrite(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("error");
  }
}

export const config = {
  matcher: ["/login", "/admin", "/login-admin", "/", "/admin-userlist"],
};
