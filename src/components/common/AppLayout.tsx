"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    User,
    LogOut,
    FolderOpenDot,
    LayoutDashboard
} from 'lucide-react';
import { createSPASassClient } from "@/lib/supabase/client";
import Header from './Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const client = await createSPASassClient();
            await client.logout();
            router.push('/user/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };



    const navigation = [
        { name: 'Dashboard', href: '/user', icon: LayoutDashboard },
        //   { name: 'Favoriten', href: '/user/favorites', icon:BookHeart  },
        { name: 'Projekte', href: '/user/projects', icon: FolderOpenDot },
        { name: 'Profil', href: '/user/user-settings', icon: User },
    ];

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (

        <div >
            <Header />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}             

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-30 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>


                {/* Navigation */}
                <nav className="mt-6 px-1 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-1 py-1 text-sm font-medium rounded-md ${isActive
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon
                                    className={`mr-1 h-1 w-1 ${isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                                        }`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                    
                    {/* Ausloggen Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full group flex items-center px-1 py-1 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        <LogOut className="mr-1 h-1 w-1 text-red-400 group-hover:text-red-500" />
                        Ausloggen
                    </button>
                </nav>

            </div>

            {/* Main Content mit Margin für Sidebar */}
            <main className=" lg:ml-64 p-0.5">
                {children}
            </main>
        </div>
   
    );
}