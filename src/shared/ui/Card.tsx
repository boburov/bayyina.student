import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children:  ReactNode
  hover?:    boolean
  padding?:  'sm' | 'md' | 'lg' | 'none'
  className?: string
}

const paddingMap = {
  none: '',
  sm:   'p-3',
  md:   'p-4',
  lg:   'p-5',
}

export const Card = ({
  children,
  hover = false,
  padding = 'none',
  className = '',
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-sm border border-stone-200',
        hover && 'transition-colors cursor-pointer hover:bg-stone-50',
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
