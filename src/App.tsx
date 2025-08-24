import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'

// Layout Components
import { MainLayout } from './components/layout/MainLayout'
import { AuthLayout } from './components/layout/AuthLayout'
import { DashboardLayout } from './components/layout/DashboardLayout'

// Pages
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { AgentOnboardingPage } from './pages/dashboard/AgentOnboardingPage'
import { AgentDirectoryPage } from './pages/AgentDirectoryPage'
import { ServiceListingPage } from './pages/ServiceListingPage'
import { ProfilePage } from './pages/dashboard/ProfilePage'
import { NotFoundPage } from './pages/NotFoundPage'

// Components
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { LoadingSpinner } from './components/ui/LoadingSpinner'

function App() {
  const location = useLocation()
  const { isLoading, error } = useAuth0()

  // Show loading spinner while Auth0 initializes
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Loading VisaMart...</p>
        </div>
      </div>
    )
  }

  // Show error if Auth0 fails to initialize
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="text-destructive text-5xl">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground">Authentication Error</h1>
          <p className="text-muted-foreground">
            Unable to initialize authentication. Please refresh the page or contact support.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Refresh Page
          </button>
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