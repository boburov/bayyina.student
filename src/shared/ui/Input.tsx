import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:     string
  error?:     string
  leftIcon?:  ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-stone-700">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-10 rounded-sm border bg-white px-3 text-sm text-stone-900',
              'placeholder:text-stone-400 outline-none',
              'transition-colors duration-150',
              'focus:border-brown-800',
              error
                ? 'border-red-400 focus:border-red-500'
                : 'border-stone-300 hover:border-stone-400',
              leftIcon  && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
