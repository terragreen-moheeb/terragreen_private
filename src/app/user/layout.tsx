"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobal } from '@/utils/supabase/context/GlobalContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useGlobal();
  const router = useRouter();

  // Redirect logic - MUSS VOR allen conditional returns stehen!
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  // Zeige Loading Spinner während loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Wenn kein User, zeige auch Loading (redirect läuft im Hintergrund)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Nur wenn User geladen ist, zeige children
  return <>{children}</>;
}
