import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App-ultra.tsx'
import { ThemeProvider } from './providers/ThemeProvider'
import { AuthProvider } from './providers/AuthProvider'
import { ToastProvider } from './components/ui/Toaster'
import './index.css'

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

// Environment detection
const hostname = window.location.hostname
const protocol = window.location.protocol
const isIpAddress = /^\d+\.\d+\.\d+\.\d+$/.test(hostname)
const isHttp = protocol === 'http:'
const isDevelopmentMode = isIpAddress || (isHttp && hostname !== 'localhost') || import.meta.env.VITE_DEBUG_MODE === 'true'

console.log('🚀 VisaMart ULTRA Launch Detection:')
console.log('Hostname:', hostname)
console.log('Protocol:', protocol)
console.log('Is IP Address:', isIpAddress)
console.log('Development Mode:', isDevelopmentMode)
console.log('Environment Variables:')
console.log('- AUTH0_DOMAIN:', import.meta.env.VITE_AUTH0_DOMAIN)
console.log('- API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)
console.log('- DEBUG_MODE:', import.meta.env.VITE_DEBUG_MODE)

// Auth0 configuration (only used in production mode)
const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || 'placeholder.auth0.com',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || 'placeholder-client-id',
  authorizationParams: {
    redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE || '',
  },
  cacheLocation: 'localstorage' as const,
  useRefreshTokens: true,
}

// Error boundary with enhanced debugging
class UltraErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error; errorInfo?: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 VisaMart ULTRA Error Boundary:', error, errorInfo)
    this.setState({ errorInfo: errorInfo.componentStack })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center space-y-6 bg-white p-8 rounded-xl shadow-2xl border border-red-200">
            <div className="text-6xl">⚠️</div>
            <h1 className="text-2xl font-bold text-red-600">
              VisaMart Ultra - System Error
            </h1>
            <div className="text-left bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
              <p className="text-sm text-red-700 font-mono">
                {this.state.error?.message || 'Unknown error occurred'}
              </p>
              {isDevelopmentMode && this.state.errorInfo && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-red-600 font-semibold">
                    Component Stack (Dev Mode)
                  </summary>
                  <pre className="text-xs mt-2 overflow-auto max-h-32 text-red-600">
                    {this.state.errorInfo}
                  </pre>
                </details>
              )}
            </div>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors"
              >
                🔄 Reload VisaMart
              </button>
              {isDevelopmentMode && (
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                  <strong>Development Mode Active:</strong> Enhanced error reporting enabled
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Development mode banner component
function DevelopmentBanner() {
  if (!isDevelopmentMode) return null
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-medium shadow-lg">
      🚀 VisaMart ULTRA - Development Mode | IP: {hostname} | 
      <span className="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded">
        Auth0 Bypass Active
      </span>
    </div>
  )
}

// Main App Component with conditional Auth0 Provider
function AppWithAuth() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="visamart-ui-theme">
      <ToastProvider>
        <DevelopmentBanner />
        <div className={isDevelopmentMode ? 'pt-10' : ''}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}

// Render the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UltraErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {isDevelopmentMode ? (
            // Development mode: Skip Auth0Provider entirely
            <AppWithAuth />
          ) : (
            // Production mode: Use Auth0Provider
            <Auth0Provider {...auth0Config}>
              <AppWithAuth />
            </Auth0Provider>
          )}
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </BrowserRouter>
    </UltraErrorBoundary>
  </React.StrictMode>,
)

// Service Worker Registration
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('✅ Service Worker registered:', registration)
    } catch (error) {
      console.log('❌ Service Worker registration failed:', error)
    }
  })
}

// Development mode welcome message
if (isDevelopmentMode) {
  console.log(`
🎉 VisaMart ULTRA Development Mode Activated!

✅ Features Enabled:
- Auth0 Secure Origin Bypass
- Mock Authentication System  
- Enhanced Error Reporting
- Development User Simulation
- Hot Module Replacement
- React DevTools Integration

🚀 Access URL: http://${hostname}:${window.location.port}
📧 Mock Users Available: Regular User & Agent User

Happy Developing! 🛠️
  `)
}