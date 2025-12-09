"use client";
import React from 'react';
import Link from 'next/link';
import { useGlobal } from '@/utils/supabase/context/GlobalContext';
import QLucideIcon, { QLucideIconType } from '@/components/ui/LucideIcon';
import { userMenuItems } from '@/config/UserMenuItems';

export default function DashboardContent() {
    const { user } = useGlobal();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Hallo {user?.fullName ?? ''}
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Schön, Sie wiederzusehen!
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Heute</p>
                            <p className="text-sm font-medium text-gray-600 mt-0.5">
                                {new Date().toLocaleDateString('de-DE', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Cards */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {userMenuItems.slice(1).map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="group"
                        >
                            <div className="relative bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-lg bg-${item.color}-50 mb-4`}>
                                    <QLucideIcon
                                        icon={item.icon as QLucideIconType}
                                        size={22}
                                        strokeWidth={1.5}
                                        className={`text-${item.color}-600`}
                                    />
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-lg font-medium text-gray-900 mb-1.5">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Arrow Icon */}
                                <div className="flex items-center mt-4 text-gray-400 group-hover:text-gray-600 transition-colors">
                                    <span className="text-xs font-medium">Öffnen</span>
                                    <svg
                                        className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}