import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { Shield, AlertCircle } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAgent?: boolean
  fallback?: React.ReactNode
}

export function ProtectedRoute({ 
  children, 
  requireAgent = false,
  fallback 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect, user, error } = useAuth0()
  const location = useLocation()

  // Show loading spinner while Auth0 is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show error if authentication failed
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center space-y-4 bg-white p-8 rounded-xl shadow-lg"
        >
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">Authentication Error</h2>
          <p className="text-gray-600">
            {error.message || 'An error occurred during authentication.'}
          </p>
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => loginWithRedirect()}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Login
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return fallback || <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  // Check agent requirement
  if (requireAgent && user && !user['https://visamart.com/is_agent']) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center space-y-6 bg-white p-8 rounded-xl shadow-lg"
        >
          <Shield className="h-16 w-16 text-warning mx-auto" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Agent Access Required
            </h2>
            <p className="text-gray-600">
              This area is only accessible to verified agents. 
              Please complete the agent onboarding process to gain access.
            </p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => window.location.href = '/dashboard/agent-onboarding'}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Agent Onboarding
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Render protected content
  return <>{children}</>
}

// Higher-order component version for easier use
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: { requireAgent?: boolean }
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute requireAgent={options?.requireAgent}>
        <WrappedComponent {...props} />
      </ProtectedRoute>
    )
  }
}

// Hook for checking authentication status
export function useRequireAuth(requireAgent = false) {
  const { isAuthenticated, isLoading, user } = useAuth0()
  const location = useLocation()

  const isAgent = user ? user['https://visamart.com/is_agent'] : false

  if (isLoading) {
    return { isLoading: true, isAuthorized: false, redirectTo: null }
  }

  if (!isAuthenticated) {
    return { 
      isLoading: false, 
      isAuthorized: false, 
      redirectTo: '/auth/login',
      state: { from: location }
    }
  }

  if (requireAgent && !isAgent) {
    return {
      isLoading: false,
      isAuthorized: false,
      redirectTo: '/dashboard/agent-onboarding'
    }
  }

  return { isLoading: false, isAuthorized: true, redirectTo: null }
}