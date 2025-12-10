// src/lib/context/GlobalContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '../client';

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

    // Simplified: Nur 1 useEffect für initial load
    useEffect(() => {
        const supabase = createClient();

        // Load initial user
        supabase.auth.getUser().then(({ data: { user: authUser } }) => {
            if (authUser) {
                // Get profile
                supabase
                    .from('users_profile')
                    .select('*')
                    .eq('id', authUser.id)
                    .single()
                    .then(({ data: profile, error }) => {
                        if (error && error.code !== 'PGRST116') {
                            console.error('Error loading profile:', error);
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
                        setLoading(false);
                    });
            } else {
                setUser(null);
                setLoading(false);
            }
        }).catch((error) => {
            console.error('Error loading user:', error);
            setUser(null);
            setLoading(false);
        });

        // Auth state listener für Login/Logout
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                // User eingeloggt
                supabase
                    .from('users_profile')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()
                    .then(({ data: profile }) => {
                        setUser({
                            email: session.user.email!,
                            id: session.user.id,
                            created_at: new Date(session.user.created_at),
                            user_type: session.user.user_metadata?.user_type ?? null,
                            first_name: profile?.first_name ?? '',
                            last_name: profile?.last_name ?? '',
                            about_me: profile?.about_me ?? '',
                            fullName: profile ? `${profile.first_name} ${profile.last_name}`.trim() : ''
                        });
                    });
            } else if (event === 'SIGNED_OUT') {
                // User ausgeloggt
                setUser(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Simplified helper functions
    const updateUser = (updatedUser: Partial<CustomUser>) => {
        setUser(prev => prev ? { ...prev, ...updatedUser } : null);
    };

    const refreshUser = async () => {
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (authUser) {
            const { data: profile } = await supabase
                .from('users_profile')
                .select('*')
                .eq('id', authUser.id)
                .single();

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
        } else {
            setUser(null);
        }
    };

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