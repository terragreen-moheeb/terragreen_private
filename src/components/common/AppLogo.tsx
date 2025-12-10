'use client';

import Link from 'next/link';
import QLucideIcon from '@/components/ui/LucideIcon';
import Image from 'next/image';

interface AppLogoProps {
  showIcon?: boolean;
}

export const AppLogo = ({ showIcon = true }: AppLogoProps) => {
  return (
    <Link href="/user/dashboard" className="flex items-center gap-2">
    

      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={144}
          height={58}
          className="w-[114px] object-contain"
          draggable={false}
        />
      </div>

    </Link>
  );
};
