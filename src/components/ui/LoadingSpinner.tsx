'use client'

import { cn } from "@/utils/utils"


interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'full'
  className?: string
  message?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  full: 'w-8 h-8',
}

export default function LoadingSpinner({ size = 'md', className, message }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Lädt..."
    >
      <span className="sr-only">{message || 'Lädt...'}</span>
    </div>
  )
}
