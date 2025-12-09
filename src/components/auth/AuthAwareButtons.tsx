"use client";
import Link from "next/link";
import { buttonVariants } from '../ui/button';
import QLucideIcon from '../ui/LucideIcon';
import { cn } from '@/utils/utils';
import { useGlobal } from '@/utils/supabase/context/GlobalContext';

export default function AuthAwareButtons() {
    const { user, loading } = useGlobal();

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
    return user ? (
        <Link
            href="/user"
            className={cn(buttonVariants({ variant: "primary", size: "md" }))}
        >
            Dashboard
        </Link>
    ) : (
        <Link
            href="/login"
            className={cn(buttonVariants({ variant: "outline", size: "md" }))}
        >
            Anmelden
        </Link>
    );
}