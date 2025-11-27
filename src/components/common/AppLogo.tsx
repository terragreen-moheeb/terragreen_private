'use client';

import Link from 'next/link';
import QLucideIcon from '@/components/ui/LucideIcon';

interface AppLogoProps {
  showIcon?: boolean;
}

export const AppLogo = ({ showIcon = true }: AppLogoProps) => {
  return (
    <Link href="/user" className="flex items-center gap-2">
      {showIcon && (
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
          <QLucideIcon icon="Sprout" size={20} strokeWidth={2} className="text-white" />
        </div>
      )}
      <span className="text-lg font-semibold text-gray-900">TerraGreen</span>
    </Link>
  );
};
