"use client";
import React from 'react';
import Link from 'next/link';
import { useGlobal } from '@/utils/supabase/context/GlobalContext';
import QLucideIcon, { QLucideIconType } from '@/components/ui/LucideIcon';
import { userMenuItems } from '@/config/UserMenuItems';
import AppLayout from '@/components/common/AppLayout';

export default function DashboardContent() {
    const { user } = useGlobal();

    return (
        <AppLayout label={`Hallo ${user?.first_name ?? 'Benutzer'}`} description='Schön, dich wiederzusehen!'>
            <div className="min-h-screen bg-color">

            </div>
        </AppLayout>
    );
}