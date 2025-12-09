'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobal } from '@/utils/supabase/context/GlobalContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Header from '@/components/common/Header';

export default function LandingPage() {
  const { user, loading } = useGlobal();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div itemScope itemType="https://schema.org/WebPage">
        <Header />
        <main role="main">

        </main>
      </div>
    </>
  );
}