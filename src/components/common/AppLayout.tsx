'use client';

import { useState } from 'react';
import QLucideIcon from '@/components/ui/LucideIcon';
import { UserNavigation } from '@/components/common/UserNavigation';
import { UserProfile } from '@/components/common/UserProfile';
import { AppLogo } from '@/components/common/AppLogo';
import { cn } from '@/utils/utils';

export default function AppLayout({
  children,
  label,
  description,
headerContent
}: Readonly<{
  children: React.ReactNode;
  label?: string;
  description?: string;
    headerContent?: React.ReactNode;

}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ease-in-out z-30",
          isCollapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          {/* Header mit Logo und Toggle */}
          <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 border-b border-gray-200">
            {!isCollapsed && <AppLogo />}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",
                isCollapsed && "mx-auto"
              )}
              aria-label={isCollapsed ? "Sidebar erweitern" : "Sidebar einklappen"}
            >
              <QLucideIcon
                icon={isCollapsed ? "ChevronRight" : "ChevronLeft"}
                size={20}
                strokeWidth={2}
              />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-4 overflow-y-auto">
            <UserNavigation isCollapsed={isCollapsed} />
          </div>

          {/* User Profile am Ende */}
          <UserProfile variant="desktop" isCollapsed={isCollapsed} />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 shadow-sm">
          <AppLogo showIcon={false} />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <QLucideIcon icon={isMobileMenuOpen ? "X" : "Menu"} size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 top-16 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto transform transition-transform">
              <div className="px-4 py-4">
                <UserNavigation onLinkClick={() => setIsMobileMenuOpen(false)} />
              </div>
              <UserProfile variant="mobile" />
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        <main className="pt-16 lg:pt-0">
          <div className='bg-color py-5 '>
            <div className='app-layout flex items-start justify-between border-b border-gray-200 pb-2 '>
              <div>
                {label && (
                  <h1 className='text-black text-2xl font-semibold '>
                    {label}
                  </h1>
                )}
                {description && (
                  <p className='text-sec-500 mt-1 text-sm'>
                    {description}
                  </p>
                )}
              </div>
              <div className='flex gap-3'>
                {headerContent}
              </div>
            </div>


          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
