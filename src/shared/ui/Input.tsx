import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-stone-700">{label}</label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2.5 rounded-sm border border-stone-300 bg-white text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-brown-600 ${error ? 'border-red-400 focus:border-red-400' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
