'use client';

import { useState } from 'react';
import QLucideIcon from '@/components/ui/LucideIcon';
import { UserNavigation } from '@/components/common/UserNavigation';
import { UserProfile } from '@/components/common/UserProfile';
import { AppLogo } from '@/components/common/AppLogo';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-gray-200">
            <AppLogo />
          </div>

          <div className="flex-1 px-3 py-4">
            <UserNavigation />
          </div>

          <UserProfile variant="desktop" />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
          <AppLogo showIcon={false} />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <QLucideIcon icon={isMobileMenuOpen ? "X" : "Menu"} size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-25 z-40 top-16"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
              <div className="px-4 py-4">
                <UserNavigation onLinkClick={() => setIsMobileMenuOpen(false)} />
              </div>
              <UserProfile variant="mobile" />
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="pt-16 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
