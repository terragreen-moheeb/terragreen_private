'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from "@/components/auth/LoginForm";
import AuthLayout from "../../../components/common/AuthLayout";
import { useGlobal } from '@/lib/context/GlobalContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function LoginPage() {
    const { user, loading } = useGlobal();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/user');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner  />
            </div>
        );
    }

    if (user) {
        return null;
    }

    return (
        <AuthLayout rightImageSrc='/images/auth/immo1.webp'>
            <LoginForm />
        </AuthLayout>
    );
}
