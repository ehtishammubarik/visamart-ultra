import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react'

export interface Toast {
  id: string
  title?: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: Toast[]
  toast: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }
    
    setToasts((prev) => [...prev, newToast])

    // Auto dismiss after duration (default 5 seconds)
    setTimeout(() => {
      dismiss(id)
    }, toast.duration || 5000)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const value = { toasts, toast, dismiss }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastComponent({ toast }: { toast: Toast }) {
  const { dismiss } = useToast()

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />
      case 'info':
        return <Info className="h-5 w-5 text-primary" />
    }
  }

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-success/20'
      case 'error':
        return 'border-destructive/20'
      case 'warning':
        return 'border-warning/20'
      case 'info':
        return 'border-primary/20'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`relative flex w-full items-start gap-3 rounded-lg border bg-white p-4 shadow-lg ${getBorderColor()}`}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      
      <div className="flex-1 space-y-1">
        {toast.title && (
          <h4 className="text-sm font-semibold text-gray-900">
            {toast.title}
          </h4>
        )}
        <p className="text-sm text-gray-700">{toast.message}</p>
        
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        onClick={() => dismiss(toast.id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

// Helper functions for common toast types
export const toast = {
  success: (message: string, options?: Partial<Toast>) => {
    const context = React.useContext(ToastContext)
    context?.toast({ type: 'success', message, ...options })
  },
  error: (message: string, options?: Partial<Toast>) => {
    const context = React.useContext(ToastContext)
    context?.toast({ type: 'error', message, ...options })
  },
  warning: (message: string, options?: Partial<Toast>) => {
    const context = React.useContext(ToastContext)
    context?.toast({ type: 'warning', message, ...options })
  },
  info: (message: string, options?: Partial<Toast>) => {
    const context = React.useContext(ToastContext)
    context?.toast({ type: 'info', message, ...options })
  },
}