'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { userMenuItems } from '@/config/UserMenuItems';
import QLucideIcon, { QLucideIconType } from '@/components/ui/LucideIcon';
import { cn } from '@/utils/utils';

interface UserNavigationProps {
  onLinkClick?: () => void;
  isCollapsed?: boolean;
}

export const UserNavigation = ({ onLinkClick, isCollapsed = false }: UserNavigationProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === `/${href}` || pathname.startsWith(`/${href}/`);
  };

  const handleClick = () => {
    onLinkClick?.();
  };

  return (
    <nav className={cn("space-y-1", isCollapsed ? "px-2" : "px-3")}>
      {userMenuItems.map((item) => (
        <Link
          key={item.href}
          href={`/${item.href}`}
          onClick={handleClick}
          className={cn(
            "flex items-center gap-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group relative",
            isCollapsed ? "px-3 justify-center" : "px-3",
            isActive(item.href)
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-700 '
          )}
          title={isCollapsed ? item.title : undefined}
        >
          <QLucideIcon
            icon={item.icon as QLucideIconType}
            size={20}
            strokeWidth={2}
            className={cn(
              "transition-colors",
              isActive(item.href) ? "text-primary-700" : "text-gray-600 group-hover:text-gray-900"
            )}
          />  
            <div className="absolute left-full  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-primary-500" />
            </div>
       
          {!isCollapsed && <span className="truncate">{item.title}</span>}

          {/* Tooltip für collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
              {item.title}
            </div>
          )}
        </Link>
      ))}
    </nav>
  );
};
