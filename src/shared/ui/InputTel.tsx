import { forwardRef, useRef, useCallback } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

function applyMask(digits: string): string {
  const d = digits.slice(0, 12)
  let r = '+'
  if (d.length > 0)  r += d.slice(0, 3)
  if (d.length > 3)  r += ` (${d.slice(3, 5)}`
  if (d.length > 5)  r += `) ${d.slice(5, 8)}`
  if (d.length > 8)  r += `-${d.slice(8, 10)}`
  if (d.length > 10) r += `-${d.slice(10, 12)}`
  return r
}

/** Returns only 9 local digits (no country code) */
export function phoneDigits(formatted: string): string {
  const d = digitsOnly(formatted)
  return d.startsWith('998') ? d.slice(3) : d
}

interface InputTelProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  value?:    string
  onChange?: (formatted: string) => void
  label?:    string
  error?:    string
}

export const InputTel = forwardRef<HTMLInputElement, InputTelProps>(
  ({ value = '', onChange, label, error, className = '', id, ...props }, ref) => {
    const inputId  = id ?? label?.toLowerCase().replace(/\s+/g, '-') ?? 'phone'
    const innerRef = useRef<HTMLInputElement>(null)
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? innerRef

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = digitsOnly(e.target.value).slice(0, 12)
      onChange?.(raw.length > 0 ? applyMask(raw) : '')
    }, [onChange])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault()
        const raw = digitsOnly(e.currentTarget.value)
        if (raw.length > 0) {
          const trimmed = raw.slice(0, -1)
          onChange?.(trimmed.length > 0 ? applyMask(trimmed) : '')
        }
      }
    }, [onChange])

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-stone-700">
            {label}
          </label>
        )}
        <input
          ref={resolvedRef}
          id={inputId}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="+998 (__) ___-__-__"
          className={cn(
            'w-full h-10 rounded-sm border bg-white px-3 text-sm text-stone-900',
            'placeholder:text-stone-400 outline-none',
            'transition-colors duration-150',
            'focus:border-brown-800',
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-stone-300 hover:border-stone-400',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  },
)

InputTel.displayName = 'InputTel'
