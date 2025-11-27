'use client';

import Link from 'next/link';
import { useGlobal } from '@/utils/supabase/context/GlobalContext';
import QLucideIcon from '@/components/ui/LucideIcon';

interface UserProfileProps {
  variant?: 'desktop' | 'mobile';
}

export const UserProfile = ({ variant = 'desktop' }: UserProfileProps) => {
  const { user } = useGlobal();

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.email || 'Benutzer';

  if (variant === 'mobile') {
    return (
      <div className="border-t border-gray-200 p-4 mt-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            {user?.email && (
              <p className="text-xs text-gray-500">{user.email}</p>
            )}
          </div>
        </div>
        <Link
          href="/auth/logout"
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <QLucideIcon icon="LogOut" size={18} strokeWidth={2} />
          Abmelden
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 border-t border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {displayName}
          </p>
          <Link
            href="/auth/logout"
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Abmelden
          </Link>
        </div>
      </div>
    </div>
  );
};
