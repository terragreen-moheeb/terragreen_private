"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { buttonVariants } from '../ui/button';
import QLucideIcon from '../ui/LucideIcon';
import { createClient } from '@/utils/supabase/client';
import { cn } from '@/utils/utils';

export default function AuthAwareButtons() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();
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
                className={cn(buttonVariants({ variant: "outline", size: "md" }))}

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

            className={cn(buttonVariants({ variant: "primary", size: "md" }))}

        >
            Dashboard

        </Link>
    ) : (
        <Link
            href="/(auth)/login"
            className={cn(buttonVariants({ variant: "outline", size: "md" }))}
        >
            Anmelden
        </Link>
    );



}