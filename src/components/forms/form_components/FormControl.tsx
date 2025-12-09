'use client'

import { cn } from '@/utils/utils'
import { InputHTMLAttributes, forwardRef, useState } from 'react'
import QLucideIcon from '@/components/ui/LucideIcon'

export interface FormControlProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  labelClassName?: string
}

const FormControl = forwardRef<HTMLInputElement, FormControlProps>(
  ({ label, error, helperText, className, labelClassName, id, type, ...props }, ref) => {
    const inputId = id || props.name || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`
    const [showPassword, setShowPassword] = useState(false)
    const isPasswordField = type === 'password'

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className={cn("block text-base", labelClassName)}>
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={isPasswordField && showPassword ? 'text' : type}
            className={cn(
              'w-full px-4 py-3.5 text-base border border-gray-200 rounded-md transition-colors duration-200',
              'bg-white text-gray-900 placeholder:text-gray-400',
              'focus:outline-none focus:border-primary-500',
              'hover:border-gray-300',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
              error && 'border-red-400 focus:border-red-500',
              isPasswordField && 'pr-12',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
              aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
            >
              {showPassword ? (
                <QLucideIcon icon="EyeOff" size={20} strokeWidth={2} />
              ) : (
                <QLucideIcon icon="Eye" size={20} strokeWidth={2} />
              )}
            </button>
          )}
        </div>
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500 font-medium">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormControl.displayName = 'FormControl'

export default FormControl
