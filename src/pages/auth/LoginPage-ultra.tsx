import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Globe, 
  ArrowRight, 
  Shield, 
  Code,
  User,
  UserCheck
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../providers/AuthProvider'

export function LoginPage() {
  const { login, isAuthenticated, isDevelopmentMode } = useAuth()
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = () => {
    login()
  }

  const handleGuestMode = () => {
    // In development mode, allow guest browsing
    if (isDevelopmentMode) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
              <Globe className="h-7 w-7" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">VisaMart</span>
              {isDevelopmentMode && (
                <span className="block text-xs text-blue-600 font-semibold">ULTRA DEV</span>
              )}
            </div>
          </Link>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-center text-3xl font-bold text-gray-900"
        >
          Sign in to your account
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 text-center text-sm text-gray-600"
        >
          Access your visa services dashboard
          {isDevelopmentMode && (
            <span className="block mt-1 text-blue-600 font-medium">
              🚀 Development mode: Instant mock authentication
            </span>
          )}
        </motion.p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm py-8 px-4 shadow-xl ring-1 ring-black ring-opacity-5 sm:rounded-lg sm:px-10 border border-white/20"
        >
          {isDevelopmentMode ? (
            // Development Mode Login
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Development Mode</h3>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Choose your mock user type for testing:
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      // Set mock regular user
                      localStorage.setItem('visamart-dev-user-preference', 'user')
                      handleLogin()
                    }}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Continue as Regular User
                  </Button>
                  <Button
                    onClick={() => {
                      // Set mock agent user
                      localStorage.setItem('visamart-dev-user-preference', 'agent')
                      handleLogin()
                    }}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Continue as Agent User
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <Button
                onClick={handleGuestMode}
                variant="ghost"
                className="w-full"
              >
                Continue as Guest (Browse Only)
              </Button>
            </div>
          ) : (
            // Production Mode Login
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold text-amber-800">Secure Authentication</h3>
                </div>
                <p className="text-sm text-amber-700">
                  Sign in securely with Auth0 to access your VisaMart account.
                </p>
              </div>

              <Button
                onClick={handleLogin}
                className="w-full flex justify-center py-3 px-4 text-lg"
              >
                Sign in with Auth0
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/auth/register"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <Link to="/terms" className="underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="underline">Privacy Policy</Link>
              </p>
              {isDevelopmentMode && (
                <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                  <p className="font-medium">Development Build Info:</p>
                  <p>Host: {window.location.host}</p>
                  <p>Auth: Mock System</p>
                  <p>Mode: ULTRA Development</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}