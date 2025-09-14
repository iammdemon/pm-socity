import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Protect admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // Protect dashboard routes (user must be logged in at least)
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // allow only logged in users
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
