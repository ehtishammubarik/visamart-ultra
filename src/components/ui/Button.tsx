// VisaMart ULTRA - Enhanced Button Component
// Fixes color contrast, accessibility, and mobile optimization issues

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { LoadingSpinner } from './LoadingSpinner'

const buttonVariants = cva(
  // Base styles with improved accessibility and contrast
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group active:scale-95",
  {
    variants: {
      variant: {
        primary: [
          // High contrast primary button
          "bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus-visible:ring-blue-500",
          "border border-blue-700",
          "disabled:bg-gray-400 disabled:text-gray-100 disabled:border-gray-400"
        ],
        secondary: [
          // Clear secondary with proper contrast
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:ring-gray-500",
          "border border-gray-300",
          "disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
        ],
        outline: [
          // Outline with sufficient contrast
          "border-2 border-blue-600 bg-transparent text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-500",
          "disabled:border-gray-300 disabled:text-gray-400 disabled:bg-transparent"
        ],
        ghost: [
          // Ghost with hover states
          "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500",
          "disabled:text-gray-400 disabled:hover:bg-transparent"
        ],
        destructive: [
          // High contrast destructive
          "bg-red-600 text-white shadow-lg hover:bg-red-700 focus-visible:ring-red-500",
          "border border-red-700",
          "disabled:bg-gray-400 disabled:text-gray-100 disabled:border-gray-400"
        ],
        success: [
          // Success variant with proper contrast
          "bg-green-600 text-white shadow-lg hover:bg-green-700 focus-visible:ring-green-500",
          "border border-green-700",
          "disabled:bg-gray-400 disabled:text-gray-100 disabled:border-gray-400"
        ]
      },
      size: {
        xs: "h-8 px-3 text-xs min-w-[64px]", // Minimum touch target
        sm: "h-9 px-4 text-sm min-w-[80px]",
        default: "h-10 px-6 text-sm min-w-[100px]",
        lg: "h-12 px-8 text-base min-w-[120px]", // Better for mobile
        xl: "h-14 px-10 text-lg min-w-[140px]", // Excellent mobile target
        icon: "h-10 w-10" // Square icon button
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "size">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  ariaLabel?: string // Better accessibility
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    fullWidth,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ariaLabel,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {/* Loading state */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-current/20 backdrop-blur-[2px]">
            <LoadingSpinner size="sm" className="text-current" />
          </div>
        )}

        {/* Button content */}
        <div className={cn(
          "flex items-center justify-center gap-2",
          loading && "opacity-0"
        )}>
          {leftIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          
          {children && (
            <span className="truncate">
              {children}
            </span>
          )}
          
          {rightIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Ripple effect overlay */}
        <div className="absolute inset-0 opacity-0 group-active:opacity-20 bg-white rounded-md transition-opacity duration-150" />
      </motion.button>
    )
  }
)

Button.displayName = "Button"

// Specialized button variants for common VisaMart use cases
export const PrimaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="primary" {...props} />
)

export const SecondaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="secondary" {...props} />
)

export const OutlineButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="outline" {...props} />
)

export const GhostButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="ghost" {...props} />
)

export const DestructiveButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="destructive" {...props} />
)

export const SuccessButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="success" {...props} />
)

// Mobile-optimized button for touch interfaces
export const TouchButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'size'>>(
  (props, ref) => <Button ref={ref} size="lg" {...props} />
)

// Loading button with built-in loading state management
export function LoadingButton({
  onClick,
  children,
  ...props
}: ButtonProps & {
  onClick?: () => Promise<void> | void
}) {
  const [loading, setLoading] = React.useState(false)

  const handleClick = async () => {
    if (!onClick) return
    
    setLoading(true)
    try {
      await onClick()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      {...props}
      loading={loading}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}

PrimaryButton.displayName = "PrimaryButton"
SecondaryButton.displayName = "SecondaryButton"
OutlineButton.displayName = "OutlineButton"
GhostButton.displayName = "GhostButton"
DestructiveButton.displayName = "DestructiveButton"
SuccessButton.displayName = "SuccessButton"
TouchButton.displayName = "TouchButton"

export { Button, buttonVariants }