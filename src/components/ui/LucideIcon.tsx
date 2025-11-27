import React from 'react';
import { Icon, LucideProps } from 'lucide-react';
import * as LabIcons from '@lucide/lab';
import * as LucideIcons from 'lucide-react';

export interface LucideIconProps {
  icon: keyof typeof LucideIcons | keyof typeof LabIcons;
  className?: string;
  strokeWidth?: number;
  size?: number;
}

export type QLucideIconType = keyof typeof LucideIcons | keyof typeof LabIcons;

const QLucideIcon: React.FC<LucideIconProps> = ({ 
  icon, 
  className, 
  strokeWidth = 1.2,
  size 
}) => {
  // Erst in normalen Lucide Icons suchen
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as React.FC<LucideProps>;
  
  if (IconComponent) {
    // Normales Lucide Icon gefunden
    return (
      <IconComponent 
        className={className} 
        strokeWidth={strokeWidth}
        size={size}
      />
    );
  }

  // Dann in Lab Icons suchen
  const iconNode = LabIcons[icon as keyof typeof LabIcons];
  
  if (iconNode) {
    // Lab Icon gefunden
    return (
      <Icon 
        iconNode={iconNode} 
        className={className} 
        strokeWidth={strokeWidth}
        size={size}
      />
    );
  }

  // Icon nicht gefunden
  console.error(`Icon '${icon}' does not exist in lucide-react or @lucide/lab.`);
  return null;
};

export default QLucideIcon;