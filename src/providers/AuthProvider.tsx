import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface User {
  id: string
  name: string
  email: string
  picture?: string
  is_agent: boolean
  user_type: 'user' | 'agent'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: () => void
  logout: () => void
  isDevelopmentMode: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// Mock user for development mode
const MOCK_USER: User = {
  id: 'dev_user_123',
  name: 'John Developer',
  email: 'john@visamart.dev',
  picture: 'https://ui-avatars.com/api/?name=John+Developer&background=2563eb&color=fff',
  is_agent: false,
  user_type: 'user'
}

const MOCK_AGENT: User = {
  id: 'dev_agent_123',
  name: 'Jane Agent',
  email: 'jane@visamart.dev',
  picture: 'https://ui-avatars.com/api/?name=Jane+Agent&background=059669&color=fff',
  is_agent: true,
  user_type: 'agent'
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [developmentUser, setDevelopmentUser] = useState<User | null>(null)
  const [isDevLoading, setIsDevLoading] = useState(true)
  
  // Detect if we're in development mode (IP address or localhost without HTTPS)
  const isDevelopmentMode = React.useMemo(() => {
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    
    // Use development mode if:
    // 1. IP address (not localhost/domain)
    // 2. HTTP protocol (not HTTPS)
    // 3. Debug mode enabled
    const isIpAddress = /^\d+\.\d+\.\d+\.\d+$/.test(hostname)
    const isHttp = protocol === 'http:'
    const isDebugMode = import.meta.env.VITE_DEBUG_MODE === 'true'
    
    return isIpAddress || (isHttp && hostname !== 'localhost') || isDebugMode
  }, [])

  // Auth0 hooks (only used in production mode)
  const auth0 = useAuth0()
  
  useEffect(() => {
    if (isDevelopmentMode) {
      // Auto-login in development mode after 1 second
      const timer = setTimeout(() => {
        const savedUser = localStorage.getItem('visamart-dev-user')
        if (savedUser) {
          try {
            setDevelopmentUser(JSON.parse(savedUser))
          } catch {
            setDevelopmentUser(MOCK_USER)
          }
        } else {
          setDevelopmentUser(MOCK_USER)
        }
        setIsDevLoading(false)
      }, 1000)
      
      return () => clearTimeout(timer)
    } else {
      setIsDevLoading(false)
    }
  }, [isDevelopmentMode])

  // Development mode authentication
  if (isDevelopmentMode) {
    const devLogin = () => {
      const userType = window.confirm(
        'Choose user type:\nOK = Regular User\nCancel = Agent User'
      )
      const selectedUser = userType ? MOCK_USER : MOCK_AGENT
      setDevelopmentUser(selectedUser)
      localStorage.setItem('visamart-dev-user', JSON.stringify(selectedUser))
    }

    const devLogout = () => {
      setDevelopmentUser(null)
      localStorage.removeItem('visamart-dev-user')
    }

    return (
      <AuthContext.Provider
        value={{
          user: developmentUser,
          isAuthenticated: !!developmentUser,
          isLoading: isDevLoading,
          error: null,
          login: devLogin,
          logout: devLogout,
          isDevelopmentMode: true
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }

  // Production mode - use Auth0
  const transformAuth0User = (auth0User: any): User => ({
    id: auth0User.sub,
    name: auth0User.name || auth0User.email,
    email: auth0User.email,
    picture: auth0User.picture,
    is_agent: auth0User['https://visamart.com/is_agent'] || false,
    user_type: auth0User['https://visamart.com/is_agent'] ? 'agent' : 'user'
  })

  return (
    <AuthContext.Provider
      value={{
        user: auth0.user ? transformAuth0User(auth0.user) : null,
        isAuthenticated: auth0.isAuthenticated,
        isLoading: auth0.isLoading,
        error: auth0.error?.message || null,
        login: () => auth0.loginWithRedirect({ appState: { returnTo: '/dashboard' } }),
        logout: () => auth0.logout({ logoutParams: { returnTo: window.location.origin } }),
        isDevelopmentMode: false
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}