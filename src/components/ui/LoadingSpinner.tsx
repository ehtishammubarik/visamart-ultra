import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        muted: "text-muted-foreground",
        white: "text-white",
        current: "text-current",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

interface LoadingSpinnerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  text?: string
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, variant, text, ...props }, ref) => {
    if (text) {
      return (
        <div 
          ref={ref}
          className={cn("flex items-center gap-2", className)} 
          {...props}
        >
          <div className={cn(spinnerVariants({ size, variant }))} />
          <span className="text-sm font-medium">{text}</span>
        </div>
      )
    }

    return (
      <div 
        ref={ref}
        className={cn(spinnerVariants({ size, variant, className }))} 
        {...props}
      />
    )
  }
)
LoadingSpinner.displayName = "LoadingSpinner"

// Page Loading Component
interface PageLoadingProps {
  text?: string
  size?: VariantProps<typeof spinnerVariants>['size']
}

const PageLoading: React.FC<PageLoadingProps> = ({ 
  text = "Loading...", 
  size = "xl" 
}) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
      <LoadingSpinner size={size} />
      <p className="text-muted-foreground text-lg">{text}</p>
    </div>
  )
}

// Skeleton Loading Component
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("animate-pulse rounded-md bg-muted", className)}
        {...props}
      />
    )
  }
)
Skeleton.displayName = "Skeleton"

// Loading Overlay Component
interface LoadingOverlayProps {
  isLoading: boolean
  text?: string
  className?: string
  children: React.ReactNode
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  text = "Loading...",
  className,
  children
}) => {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="bg-background border rounded-lg p-6 shadow-lg">
            <LoadingSpinner size="lg" text={text} />
          </div>
        </div>
      )}
    </div>
  )
}

// Card Loading Skeleton
const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("space-y-4 p-6 border rounded-lg", className)}>
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-20 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}

// Table Loading Skeleton
const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ 
  rows = 5, 
  cols = 4 
}) => {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-4" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-4" />
          ))}
        </div>
      ))}
    </div>
  )
}

export { 
  LoadingSpinner, 
  PageLoading, 
  Skeleton, 
  LoadingOverlay, 
  CardSkeleton, 
  TableSkeleton,
  spinnerVariants 
}