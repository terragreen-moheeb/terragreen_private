'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { createClient } from '@/utils/supabase/client';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const client =  createClient();
                await client.auth.signOut();
                
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