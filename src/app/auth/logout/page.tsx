'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSPASassClient } from '@/lib/supabase/client';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const client = await createSPASassClient();
                await client.logout();
                
                // Kurze Verzögerung für bessere UX
                setTimeout(() => {
                    router.push('/user/login');
                }, 300);
            } catch (error) {
                console.error('Error logging out:', error);
                // Auch bei Fehler zur Login-Seite weiterleiten
                router.push('/user/login');
            }
        };

        handleLogout();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size='full' message='Sie werden abgemeldet...' />
        </div>
    );
}