import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { motion } from 'framer-motion'
import { 
  UserPlus, 
  Mail, 
  AlertCircle, 
  CheckCircle,
  Globe,
  Shield,
  Users,
  Award,
  Clock,
  TrendingUp
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

export function RegisterPage() {
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
  const [isRegistering, setIsRegistering] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user && !isLoading) {
      const returnTo = location.state?.from?.pathname || '/dashboard'
      navigate(returnTo, { replace: true })
    }
  }, [isAuthenticated, user, isLoading, navigate, location.state])

  const handleSignUp = async () => {
    if (isRegistering) return
    
    setIsRegistering(true)
    
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
      setIsRegistering(false)
    }
  }

  const handleLogin = async () => {
    if (isRegistering) return
    
    setIsRegistering(true)
    
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
      setIsRegistering(false)
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
          Join VisaMart Today
        </h1>
        <p className="text-gray-600">
          Create your account and start your visa journey with trusted experts
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
              <h4 className="font-medium text-destructive">Registration Error</h4>
              <p className="text-sm text-destructive/80 mt-1">
                {error.message || 'An error occurred during registration. Please try again.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* User Type Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          I want to:
        </label>
        <div className="space-y-3">
          <button
            onClick={() => setUserType('user')}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              userType === 'user'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Users className={`h-6 w-6 mt-1 ${userType === 'user' ? 'text-primary' : 'text-gray-400'}`} />
              <div className="flex-1">
                <div className={`font-medium ${userType === 'user' ? 'text-primary' : 'text-gray-900'}`}>
                  Apply for Visas
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Find trusted agents, get expert guidance, and track your applications
                </div>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Free to join
                  </span>
                  <span className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Secure platform
                  </span>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setUserType('agent')}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              userType === 'agent'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Shield className={`h-6 w-6 mt-1 ${userType === 'agent' ? 'text-primary' : 'text-gray-400'}`} />
              <div className="flex-1">
                <div className={`font-medium ${userType === 'agent' ? 'text-primary' : 'text-gray-900'}`}>
                  Provide Visa Services
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Join our network of verified agents and grow your business
                </div>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Grow income
                  </span>
                  <span className="flex items-center">
                    <Globe className="h-3 w-3 mr-1" />
                    Global reach
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Benefits based on user type */}
      {userType === 'agent' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 bg-success/5 rounded-lg border border-success/20"
        >
          <h4 className="font-medium text-success mb-2 flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Agent Benefits
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Access to global client base</li>
            <li>• Professional verification & credibility</li>
            <li>• Streamlined client management tools</li>
            <li>• Competitive commission structure</li>
          </ul>
        </motion.div>
      )}

      {/* Auth Actions */}
      <div className="space-y-4">
        <Button
          onClick={handleSignUp}
          disabled={isRegistering}
          className="w-full text-base py-3"
          size="lg"
        >
          {isRegistering ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Creating Account...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-5 w-5" />
              Create Account
            </>
          )}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={handleLogin}
            disabled={isRegistering}
            className="text-primary hover:underline font-medium"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary mb-1">10K+</div>
            <div className="text-xs text-gray-600">Happy Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success mb-1">500+</div>
            <div className="text-xs text-gray-600">Trusted Agents</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">95%</div>
            <div className="text-xs text-gray-600">Success Rate</div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 text-center text-sm">
            What you get with VisaMart:
          </h3>
          {[
            {
              icon: Shield,
              title: "Verified & Secure",
              description: "All agents verified with background checks"
            },
            {
              icon: Clock,
              title: "Fast Processing", 
              description: "Average visa approval in 2-3 weeks"
            },
            {
              icon: CheckCircle,
              title: "Success Guarantee",
              description: "Money-back if rejected due to our service"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-start space-x-3"
            >
              <feature.icon className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
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

      {/* Terms */}
      <div className="text-center text-sm text-gray-500">
        <p>
          By creating an account, you agree to our{' '}
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