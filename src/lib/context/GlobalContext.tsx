// src/lib/context/GlobalContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Database } from '@/lib/types';
import { createSPASassClient } from '../supabase/client';


export type CustomUser = {
    email: string;
    id: string;
    created_at: Date;
    user_type?: 'admin' | 'user';
    first_name?: string;
    last_name?: string;
    about_me?: string;
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
    const [user, setUser] = useState<CustomUser | null>(null);  // Add this

    const loadUserData = async () => {
        try {
            setLoading(true);
            const supabase = await createSPASassClient();
            const client = supabase.getSupabaseClient();

            // Get user data
            const { data: { user } } = await client.auth.getUser();
            if (user) {
                // Get user profile data
                const { data: profile, error: profileError } = await client
                    .from('users_profile')
                    .select('*')
                    .eq('id', user.id)
                    .single() as {
                        data: Database['public']['Tables']['users_profile']['Row'] | null;
                        error: { code?: string; message?: string } | null
                    };

                if (profileError && profileError.code !== 'PGRST116') {
                    console.error('Error loading user profile:', profileError);
                }

                setUser({
                    // Auth fields
                    email: user.email!,
                    id: user.id,
                    created_at: new Date(user.created_at),
                    user_type: user.user_metadata?.user_type ?? null,
                    first_name: user.user_metadata?.first_name ?? '',
                    last_name: user.user_metadata?.last_name ?? '',
                });
            } else {
                // User is not logged in - this is a valid state, not an error
                setUser(null);
            }

        } catch (error) {
            console.error('Error loading data:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = (updatedUser: Partial<CustomUser>) => {
        setUser(prev => prev ? { ...prev, ...updatedUser } : null);
    };

    const refreshUser = async () => {
        await loadUserData();
    };

    useEffect(() => {
        loadUserData();
    }, []);

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