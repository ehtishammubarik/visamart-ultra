// VisaMart ULTRA - Mobile-First Responsive Container System
// Comprehensive mobile-optimized layout components

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

// Base responsive container with safe areas and proper spacing
interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  center?: boolean
  animate?: boolean
}

export function ResponsiveContainer({ 
  children, 
  className, 
  size = 'lg',
  padding = 'md',
  center = false,
  animate = false
}: ResponsiveContainerProps) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12'
  }

  const containerClasses = cn(
    'w-full safe-left safe-right',
    sizeClasses[size],
    paddingClasses[padding],
    center && 'mx-auto',
    className
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={containerClasses}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={containerClasses}>
      {children}
    </div>
  )
}

// Mobile-optimized grid system
interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

export function ResponsiveGrid({ 
  children, 
  className, 
  cols = 3,
  gap = 'md',
  responsive = true 
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-3 sm:gap-4 lg:gap-6',
    lg: 'gap-4 sm:gap-6 lg:gap-8',
    xl: 'gap-6 sm:gap-8 lg:gap-12'
  }

  const getColClasses = () => {
    if (!responsive) {
      return `grid-cols-${cols}`
    }

    // Mobile-first responsive grid
    switch (cols) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-1 sm:grid-cols-2'
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      case 5:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
      case 6:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <div className={cn(
      'grid',
      getColClasses(),
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

// Mobile-optimized card container
interface ResponsiveCardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
  animate?: boolean
  glass?: boolean
}

export function ResponsiveCard({ 
  children, 
  className, 
  padding = 'md',
  hover = false,
  animate = false,
  glass = false 
}: ResponsiveCardProps) {
  const paddingClasses = {
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  }

  const cardClasses = cn(
    'rounded-lg border transition-all duration-200',
    glass 
      ? 'glass border-white/20' 
      : 'bg-white border-gray-200 shadow-sm',
    paddingClasses[padding],
    hover && 'hover:shadow-md hover:scale-[1.01] cursor-pointer',
    className
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={hover ? { scale: 1.02, y: -2 } : {}}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={cardClasses}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={cardClasses}>
      {children}
    </div>
  )
}

// Mobile-optimized section with proper spacing
interface ResponsiveSectionProps {
  children: React.ReactNode
  className?: string
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'gray' | 'transparent'
}

export function ResponsiveSection({ 
  children, 
  className, 
  spacing = 'md',
  background = 'transparent' 
}: ResponsiveSectionProps) {
  const spacingClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32'
  }

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    transparent: 'bg-transparent'
  }

  return (
    <section className={cn(
      'w-full safe-left safe-right',
      spacingClasses[spacing],
      backgroundClasses[background],
      className
    )}>
      {children}
    </section>
  )
}

// Mobile-first flex layout
interface ResponsiveFlexProps {
  children: React.ReactNode
  className?: string
  direction?: 'row' | 'col' | 'responsive'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: 'sm' | 'md' | 'lg'
  wrap?: boolean
}

export function ResponsiveFlex({ 
  children, 
  className,
  direction = 'responsive',
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false
}: ResponsiveFlexProps) {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
    responsive: 'flex-col sm:flex-row'
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }

  const gapClasses = {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-3 sm:gap-4',
    lg: 'gap-4 sm:gap-6'
  }

  return (
    <div className={cn(
      'flex',
      directionClasses[direction],
      alignClasses[align],
      justifyClasses[justify],
      gapClasses[gap],
      wrap && 'flex-wrap',
      className
    )}>
      {children}
    </div>
  )
}

// Mobile-optimized stack layout (vertical spacing)
interface ResponsiveStackProps {
  children: React.ReactNode
  className?: string
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export function ResponsiveStack({ 
  children, 
  className,
  spacing = 'md',
  align = 'stretch'
}: ResponsiveStackProps) {
  const spacingClasses = {
    sm: 'space-y-2 sm:space-y-3',
    md: 'space-y-4 sm:space-y-6',
    lg: 'space-y-6 sm:space-y-8',
    xl: 'space-y-8 sm:space-y-12'
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }

  return (
    <div className={cn(
      'flex flex-col',
      spacingClasses[spacing],
      alignClasses[align],
      className
    )}>
      {children}
    </div>
  )
}

// Mobile-safe typography wrapper
interface ResponsiveTextProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'destructive'
  truncate?: boolean
}

export function ResponsiveText({ 
  children, 
  className,
  size = 'md',
  weight = 'normal',
  color = 'default',
  truncate = false
}: ResponsiveTextProps) {
  const sizeClasses = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl lg:text-5xl'
  }

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive'
  }

  return (
    <div className={cn(
      sizeClasses[size],
      weightClasses[weight],
      colorClasses[color],
      truncate && 'truncate',
      className
    )}>
      {children}
    </div>
  )
}

// Responsive breakpoint utility component
interface ResponsiveBreakpointProps {
  children: React.ReactNode
  show: 'mobile' | 'tablet' | 'desktop' | 'mobile-tablet' | 'tablet-desktop'
}

export function ResponsiveBreakpoint({ children, show }: ResponsiveBreakpointProps) {
  const showClasses = {
    mobile: 'block sm:hidden',
    tablet: 'hidden sm:block lg:hidden',
    desktop: 'hidden lg:block',
    'mobile-tablet': 'block lg:hidden',
    'tablet-desktop': 'hidden sm:block'
  }

  return (
    <div className={showClasses[show]}>
      {children}
    </div>
  )
}