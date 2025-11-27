// src/app/api/auth/callback/route.ts

import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const code = searchParams.get('code');
  
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  // Helper: Redirect mit Status
  const redirectTo = (path: string, status?: string, message?: string) => {
    const url = new URL(path, origin);
    if (status) url.searchParams.set('status', status);
    if (message) url.searchParams.set('message', message);
    return NextResponse.redirect(url);
  };

  // Helper: MFA Check
  const checkMFA = async () => {
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (aal?.nextLevel === 'aal2' && aal?.currentLevel !== aal?.nextLevel) {
      return redirectTo('/auth/2fa');
    }
    return null;
  };

  // Token Hash Methode (Email-Bestätigung)
  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (error) {
      console.error('[Auth Callback] Verify OTP error:', error);
      return redirectTo('/auth/confirm', 'error', 'Der Link ist ungültig oder abgelaufen.');
    }

    const mfaRedirect = await checkMFA();
    if (mfaRedirect) return mfaRedirect;

    // Check if email was already verified
    const wasAlreadyVerified = data.user?.email_confirmed_at && 
      new Date(data.user.email_confirmed_at).getTime() < Date.now() - 5000;

    return redirectTo('/auth/confirm', wasAlreadyVerified ? 'already_verified' : 'verified');
  }

  // PKCE Code Flow (OAuth/Magic Links)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('[Auth Callback] Exchange code error:', error);
      return redirectTo('/auth/confirm', 'error', 'Der Link ist ungültig oder abgelaufen.');
    }

    const mfaRedirect = await checkMFA();
    if (mfaRedirect) return mfaRedirect;

    return redirectTo('/auth/confirm', 'verified');
  }

  // Kein gültiger Parameter
  return redirectTo('/auth/login', 'error', 'Kein Bestätigungscode gefunden.');
}