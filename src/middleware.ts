import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  // Si tu veux protéger toutes les routes, laisse vide
  // Pour protéger certaines routes seulement :
  // matcher: ["/dashboard/:path*"]
});

// ⚠️ C’est nécessaire pour Next.js App Router
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
