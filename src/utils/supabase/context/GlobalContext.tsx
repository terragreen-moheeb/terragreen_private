// src/lib/context/GlobalContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Database } from '@/types/types';
import { createClient } from '../client';
import type { User } from '@supabase/supabase-js';

export type CustomUser = {
    email: string;
    id: string;
    created_at: Date;
    user_type?: 'admin' | 'user';
    first_name?: string;
    last_name?: string;
    about_me?: string;
    fullName?: string;
};

interface GlobalContextType {
    loading: boolean;
    user: CustomUser | null;
    updateUser: (updatedUser: Partial<CustomUser>) => void;
    refreshUser: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<CustomUser | null>(null);

    // Zentralisierte Funktion zum Laden der User-Daten
    const loadUserData = useCallback(async (authUser: User | null) => {
        if (!authUser) {
            setUser(null);
            return;
        }

        try {
            const supabase = createClient();

            // Get user profile data
            const { data: profile, error: profileError } = await supabase
                .from('users_profile')
                .select('*')
                .eq('id', authUser.id)
                .single() as {
                    data: Database['public']['Tables']['users_profile']['Row'] | null;
                    error: { code?: string; message?: string } | null
                };

            if (profileError && profileError.code !== 'PGRST116') {
                console.error('Error loading user profile:', profileError);
            }

            setUser({
                email: authUser.email!,
                id: authUser.id,
                created_at: new Date(authUser.created_at),
                user_type: authUser.user_metadata?.user_type ?? null,
                first_name: profile?.first_name ?? '',
                last_name: profile?.last_name ?? '',
                about_me: profile?.about_me ?? '',
                fullName: profile ? `${profile.first_name} ${profile.last_name}`.trim() : ''
            });
        } catch (error) {
            console.error('Error loading user data:', error);
            setUser(null);
        }
    }, []);

    // Initial load und Auth State Listener
    useEffect(() => {
        const supabase = createClient();
        let isMounted = true;

        // Initial user laden
        const initializeAuth = async () => {
            try {
                const { data: { user: authUser } } = await supabase.auth.getUser();

                if (!isMounted) return;

                await loadUserData(authUser);
            } catch (error) {
                console.error('Error initializing auth:', error);
                if (isMounted) {
                    setUser(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        initializeAuth();

        // Auth State Changes listener (wichtig für Login/Logout in anderen Tabs)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (!isMounted) return;

                // Bei bestimmten Events User aktualisieren
                if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
                    await loadUserData(session?.user ?? null);
                }
            }
        );

        // Cleanup
        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, [loadUserData]);

    const updateUser = useCallback((updatedUser: Partial<CustomUser>) => {
        setUser(prev => prev ? { ...prev, ...updatedUser } : null);
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            const supabase = createClient();
            const { data: { user: authUser } } = await supabase.auth.getUser();
            await loadUserData(authUser);
        } catch (error) {
            console.error('Error refreshing user:', error);
        }
    }, [loadUserData]);

    return (
        <GlobalContext.Provider value={{ loading, user, updateUser, refreshUser }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};