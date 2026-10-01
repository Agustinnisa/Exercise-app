import { NextResponse } from "next/server";

export function middleware(request) {
  // 1. Logika Maintenance Mode
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const isMaintenancePage = request.nextUrl.pathname === "/maintenance";

  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // 2. Logika Logger (khusus path /api)
  if (request.nextUrl.pathname.startsWith("/api")) {
    const waktu = new Date().toISOString();
    console.log(`[${waktu}] ${request.method} ${request.nextUrl.pathname}`);
  }

  // 3. Logika Auth Guard (khusus path /favorites)
  // if (request.nextUrl.pathname.startsWith("/favorites")) {
  //   const token = request.cookies.get("token");
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};