'use client';

import Link from 'next/link';
import { useGlobal } from '@/utils/supabase/context/GlobalContext';
import QLucideIcon from '@/components/ui/LucideIcon';
import { cn } from '@/utils/utils';

interface UserProfileProps {
  variant?: 'desktop' | 'mobile';
  isCollapsed?: boolean;
}

export const UserProfile = ({ variant = 'desktop', isCollapsed = false }: UserProfileProps) => {
  const { user } = useGlobal();

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.email || 'Benutzer';

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  if (variant === 'mobile') {
    return (
      <div className="border-t border-gray-200 p-4 mt-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold text-sm">
            {getInitials()}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            {user?.email && (
              <p className="text-xs text-gray-500">{user.email}</p>
            )}
          </div>
        </div>
        <Link
          href="/logout"
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <QLucideIcon icon="LogOut" size={18} strokeWidth={2} />
          Abmelden
        </Link>
      </div>
    );
  }

  // Desktop collapsed state
  if (isCollapsed) {
    return (
      <div className="flex-shrink-0 border-t border-gray-200 p-3">
        <div className="flex flex-col items-center gap-2 group relative">
          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold text-sm">
            {getInitials()}
          </div>
          <Link
            href="/logout"
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Abmelden"
          >
            <QLucideIcon icon="LogOut" size={18} strokeWidth={2} />
          </Link>

          {/* Tooltip */}
          <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none bottom-0">
            {displayName}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
          </div>
        </div>
      </div>
    );
  }

  // Desktop expanded state
  return (
    <div className="flex-shrink-0 border-t border-gray-200 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold text-sm">
          {getInitials()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {displayName}
          </p>
          {user?.email && (
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          )}
        </div>
      </div>
      <Link
        href="/logout"
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          "text-red-600 hover:bg-red-50"
        )}
      >
        <QLucideIcon icon="LogOut" size={18} strokeWidth={2} />
        Abmelden
      </Link>
    </div>
  );
};
