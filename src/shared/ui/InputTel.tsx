import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

/** +998 (90) 123-45-67 */
export function applyPhoneMask(raw: string): string {
  const d = digitsOnly(raw)
  const n = (d.startsWith('998') ? d.slice(3) : d.startsWith('0') ? d.slice(1) : d).slice(0, 9)

  if (n.length === 0) return ''
  if (n.length <= 2) return `+998 (${n}`
  if (n.length <= 5) return `+998 (${n.slice(0, 2)}) ${n.slice(2)}`
  if (n.length <= 7) return `+998 (${n.slice(0, 2)}) ${n.slice(2, 5)}-${n.slice(5)}`
  return `+998 (${n.slice(0, 2)}) ${n.slice(2, 5)}-${n.slice(5, 7)}-${n.slice(7)}`
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
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-') ?? 'phone'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(applyPhoneMask(e.target.value))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowed =
        /^[0-9]$/.test(e.key) ||
        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(e.key)
      if (!allowed && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
      }
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-stone-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="+998 (XX) XXX-XX-XX"
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
