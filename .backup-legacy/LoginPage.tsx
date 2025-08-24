import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { motion } from 'framer-motion'
import { 
  LogIn, 
  Mail, 
  AlertCircle, 
  CheckCircle,
  Globe,
  Shield,
  Users
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

export function LoginPage() {
  const { 
    loginWithRedirect, 
    isAuthenticated, 
    isLoading, 
    error, 
    user 
  } = useAuth0()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [userType, setUserType] = useState<'user' | 'agent'>('user')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user && !isLoading) {
      const returnTo = location.state?.from?.pathname || '/dashboard'
      navigate(returnTo, { replace: true })
    }
  }, [isAuthenticated, user, isLoading, navigate, location.state])

  const handleLogin = async () => {
    if (isLoggingIn) return
    
    setIsLoggingIn(true)
    
    try {
      await loginWithRedirect({
        appState: { 
          returnTo: location.state?.from?.pathname || '/dashboard',
          userType 
        },
        authorizationParams: {
          screen_hint: 'signin',
          prompt: 'login'
        }
      })
    } catch (error) {
      console.error('Login error:', error)
      setIsLoggingIn(false)
    }
  }

  const handleSignUp = async () => {
    if (isLoggingIn) return
    
    setIsLoggingIn(true)
    
    try {
      await loginWithRedirect({
        appState: { 
          returnTo: location.state?.from?.pathname || '/dashboard',
          userType 
        },
        authorizationParams: {
          screen_hint: 'signup',
          prompt: 'login'
        }
      })
    } catch (error) {
      console.error('Sign up error:', error)
      setIsLoggingIn(false)
    }
  }

  // Show loading if Auth0 is processing or already authenticated
  if (isLoading || (isAuthenticated && user)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600">
            {isAuthenticated ? 'Redirecting to dashboard...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Welcome to VisaMart
        </h1>
        <p className="text-gray-600">
          Sign in to your account to continue your visa journey
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-lg bg-destructive/10 border border-destructive/20"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div>
              <h4 className="font-medium text-destructive">Authentication Error</h4>
              <p className="text-sm text-destructive/80 mt-1">
                {error.message || 'An error occurred during authentication. Please try again.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* User Type Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          I am a:
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setUserType('user')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              userType === 'user'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-6 w-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Visa Seeker</div>
            <div className="text-xs text-gray-500">Apply for visas</div>
          </button>
          <button
            onClick={() => setUserType('agent')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              userType === 'agent'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            <Shield className="h-6 w-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Visa Agent</div>
            <div className="text-xs text-gray-500">Provide services</div>
          </button>
        </div>
      </div>

      {/* Auth Actions */}
      <div className="space-y-4">
        <Button
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="w-full text-base py-3"
          size="lg"
        >
          {isLoggingIn ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Signing In...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </>
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleSignUp}
          disabled={isLoggingIn}
          className="w-full text-base py-3"
          size="lg"
        >
          {isLoggingIn ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Creating Account...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-5 w-5" />
              Create New Account
            </>
          )}
        </Button>
      </div>

      {/* Features */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 text-center">
          Why choose VisaMart?
        </h3>
        <div className="space-y-3">
          {[
            {
              icon: Shield,
              title: "Secure & Trusted",
              description: "Bank-level security with verified agents"
            },
            {
              icon: Globe,
              title: "Global Coverage", 
              description: "Visa services for 50+ countries worldwide"
            },
            {
              icon: CheckCircle,
              title: "95% Success Rate",
              description: "Proven track record with money-back guarantee"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-start space-x-3"
            >
              <feature.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {feature.title}
                </div>
                <div className="text-gray-600 text-xs">
                  {feature.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center text-sm text-gray-500">
        <p>
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </motion.div>
  )
}