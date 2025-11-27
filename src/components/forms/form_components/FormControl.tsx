'use client'

import { cn } from '@/app/utils/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

export interface FormControlProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const FormControl = forwardRef<HTMLInputElement, FormControlProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || props.name || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-3 py-2 border rounded-md transition-colors',
            'bg-background text-foreground',
            'placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error ? 'border-red-500 focus:ring-red-500' : 'border-input',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormControl.displayName = 'FormControl'

export default FormControl
