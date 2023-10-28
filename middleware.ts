import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && req.nextUrl.pathname === "/portal")
    return NextResponse.redirect(new URL("/talks", req.url));

  if (!user && req.nextUrl.pathname === "/talks")
    return NextResponse.redirect(new URL("/portal", req.url));

  return res;
}

// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // if user is signed in and the current path is / redirect the user to /account
//   if (user && req.nextUrl.pathname === "/talks") {
//     console.log("logged in");
//     return NextResponse.redirect(new URL("/account", req.url));
//   }

//   // if user is not signed in and the current path is not / redirect the user to /
//   if (!user && req.nextUrl.pathname !== "/") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }
//   console.log("no user");
//   return res;
// }

export const config = {
  matcher: ["/portal", "/talks"],
};
