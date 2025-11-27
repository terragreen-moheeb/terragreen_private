'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { userMenuItems } from '@/config/UserMenuItems';
import QLucideIcon, { QLucideIconType } from '@/components/ui/LucideIcon';

interface UserNavigationProps {
  onLinkClick?: () => void;
}

export const UserNavigation = ({ onLinkClick }: UserNavigationProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === `/${href}` || pathname.startsWith(`/${href}/`);
  };

  const handleClick = () => {
    onLinkClick?.();
  };

  return (
    <nav className="space-y-1">
      <Link
        href="/user"
        onClick={handleClick}
        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          pathname === '/user'
            ? 'bg-emerald-50 text-emerald-700'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <QLucideIcon icon="LayoutDashboard" size={20} strokeWidth={2} />
        Dashboard
      </Link>

      {userMenuItems.map((item, index) => (
        <Link
          key={index}
          href={`/${item.href}`}
          onClick={handleClick}
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            isActive(item.href)
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <QLucideIcon icon={item.icon as QLucideIconType} size={20} strokeWidth={2} />
          {item.title}
        </Link>
      ))}
    </nav>
  );
};
