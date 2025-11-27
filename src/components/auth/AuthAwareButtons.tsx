"use client";
import { useState, useEffect } from 'react';
import { createSPASassClient } from '@/lib/supabase/client';
import Link from "next/link";
import { Button, getButtonClasses } from '../ui/button';
import QLucideIcon from '../ui/LucideIcon';

export default function AuthAwareButtons({ variant = 'full' }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loginOpen, setLoginOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const supabase = await createSPASassClient();
                const { data: { user } } = await supabase.getSupabaseClient().auth.getUser();
                setIsAuthenticated(!!user);
            } catch (error) {
                console.error('Error checking auth status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        // Skeleton placeholder to prevent layout shift
        return (
            <div
                className={getButtonClasses('outline', variant === 'full' ? 'full' : 'md', "items-center justify-center sm:text-lg text-sm opacity-50 pointer-events-none")}
            >
                <QLucideIcon icon="User" className="mr-1 h-1 w-1 hidden sm:block" />
                <span className="invisible">Anmelden</span>
            </div>
        );
    }

    // Navigation buttons for the header
    return isAuthenticated ? (
        <Link
            href="/user"
            className={
                getButtonClasses('outline', variant === 'full' ? 'full' : 'md', " items-center justify-center sm:text-lg text-sm")
            }

        >
            <QLucideIcon icon="LayoutDashboard" className="mr-1 h-1 w-1 hidden sm:block" />

            Dashboard
        </Link>
    ) : (
        <>
            <Button
                onClick={() => setLoginOpen(true)}
                className='items-center justify-center sm:text-base text-sm'
                variant='outline'
                size={variant === 'full' ? 'full' : 'md'}
            >
                <QLucideIcon icon="User" className="mr-1 h-1 w-1 hidden sm:block" />
                Anmelden
            </Button>
        </>
    );



}