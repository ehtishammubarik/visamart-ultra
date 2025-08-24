import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'

// Custom Auth Hook
import { useAuth } from './providers/AuthProvider'

// Layout Components
import { MainLayout } from './components/layout/MainLayout-ultra'
import { AuthLayout } from './components/layout/AuthLayout'
import { DashboardLayout } from './components/layout/DashboardLayout'

// Pages
import { HomePage } from './pages/HomePage-ultra'
import { LoginPage } from './pages/auth/LoginPage-ultra'
import { RegisterPage } from './pages/auth/RegisterPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { AgentOnboardingPage } from './pages/dashboard/AgentOnboardingPage'
import { AgentDirectoryPage } from './pages/AgentDirectoryPage'
import { ServiceListingPage } from './pages/ServiceListingPage'
import { ProfilePage } from './pages/dashboard/ProfilePage'
import { NotFoundPage } from './pages/NotFoundPage'

// Components
import { ProtectedRoute } from './components/auth/ProtectedRoute-ultra'
import { LoadingSpinner } from './components/ui/LoadingSpinner'

function App() {
  const location = useLocation()
  const { isLoading, error, isDevelopmentMode } = useAuth()

  // Show loading spinner while authentication initializes
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <div className="space-y-2">
            <p className="text-muted-foreground">Loading VisaMart...</p>
            {isDevelopmentMode && (
              <p className="text-xs text-blue-600 font-medium">
                🚀 Development Mode - Auth0 Bypass Active
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Show error if authentication fails to initialize
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="text-destructive text-5xl">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground">Authentication Error</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <p className="text-sm text-red-700 font-semibold mb-2">Error Details:</p>
            <p className="text-sm text-red-600">{error}</p>
            {isDevelopmentMode && (
              <p className="text-xs text-blue-600 mt-2">
                Development mode should bypass this error. Check console for details.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <button 
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
            {isDevelopmentMode && (
              <button 
                onClick={() => {
                  localStorage.removeItem('visamart-dev-user')
                  window.location.reload()
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
              >
                Reset Development Session
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense 
        fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="agents" element={<AgentDirectoryPage />} />
            <Route path="services" element={<ServiceListingPage />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="agent-onboarding" element={<AgentOnboardingPage />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default App