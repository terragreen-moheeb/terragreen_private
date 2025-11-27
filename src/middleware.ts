import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Prüfe auf Supabase Auth Code (Email-Bestätigung)
  const code = url.searchParams.get('code');
  if (code && url.pathname === '/') {
    const callbackUrl = new URL('/api/auth/callback', request.url);
    callbackUrl.searchParams.set('code', code);
    return NextResponse.redirect(callbackUrl);
  }

  // Prüfe auf Supabase Auth Fehler in URL oder Hash
  const error = url.searchParams.get('error');
  const errorCode = url.searchParams.get('error_code');
  const errorDescription = url.searchParams.get('error_description');

  if (error || errorCode) {
    const loginUrl = new URL('/auth/login', request.url);

    if (errorCode === 'otp_expired') {
      loginUrl.searchParams.set('message', 'Der Email-Link ist abgelaufen oder wurde bereits verwendet.');
      loginUrl.searchParams.set('type', 'error');
    } else {
      loginUrl.searchParams.set('message', errorDescription || 'Ein Fehler ist aufgetreten.');
      loginUrl.searchParams.set('type', 'error');
    }

    return NextResponse.redirect(loginUrl);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
