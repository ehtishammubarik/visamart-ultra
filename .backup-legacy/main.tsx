import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.tsx'
import { ThemeProvider } from './providers/ThemeProvider'
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

// Auth0 configuration with better error handling
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

console.log('Environment check:')
console.log('AUTH0_DOMAIN:', import.meta.env.VITE_AUTH0_DOMAIN)
console.log('AUTH0_CLIENT_ID:', import.meta.env.VITE_AUTH0_CLIENT_ID)
console.log('API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)

// Simple error boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="max-w-md mx-auto text-center space-y-4 bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-red-600">Something went wrong</h1>
            <p className="text-gray-600">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Auth0Provider {...auth0Config}>
            <ThemeProvider defaultTheme="system" storageKey="visamart-ui-theme">
              <ToastProvider>
                <App />
              </ToastProvider>
            </ThemeProvider>
          </Auth0Provider>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('SW registered: ', registration)
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError)
    }
  })
}