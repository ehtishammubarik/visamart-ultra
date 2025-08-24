import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Globe,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  FileText,
  Award,
  Zap,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Code
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useAuth } from '../providers/AuthProvider'

export function HomePage() {
  const { isAuthenticated, login, isDevelopmentMode, user } = useAuth()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      login()
    }
  }

  const handleBrowseServices = () => {
    navigate('/services')
  }

  const handleFindAgents = () => {
    navigate('/agents')
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  }

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Development Mode Indicator */}
      {isDevelopmentMode && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 px-4"
        >
          <div className="flex items-center justify-center space-x-2">
            <Code className="h-5 w-5" />
            <span className="font-semibold">🚀 VisaMart ULTRA Development Mode</span>
            <span className="px-2 py-1 bg-white bg-opacity-20 rounded text-sm">
              Auth0 Bypass Active
            </span>
          </div>
          {isAuthenticated && user && (
            <p className="text-sm mt-1 opacity-90">
              Logged in as: {user.name} ({user.user_type === 'agent' ? '👤 Mock Agent' : '👤 Mock User'})
            </p>
          )}
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="text-center">
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-8"
            >
              <Zap className="w-4 h-4 mr-2" />
              {isDevelopmentMode ? 'ULTRA Development Platform' : 'Trusted by 10,000+ Users'}
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Your Gateway to 
              <span className="text-primary"> Global Mobility</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Connect with verified immigration experts worldwide. Get your visa approved faster 
              with our AI-powered matching system and expert guidance.
              {isDevelopmentMode && (
                <span className="block mt-2 text-blue-600 font-medium">
                  🚀 Now running in ULTRA development mode with full feature access!
                </span>
              )}
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="w-full sm:w-auto text-lg px-8 py-4"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleBrowseServices}
                className="w-full sm:w-auto text-lg px-8 py-4"
              >
                Browse Services
              </Button>
            </motion.div>

            {isDevelopmentMode && !isAuthenticated && (
              <motion.div 
                variants={fadeInUp}
                className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto"
              >
                <p className="text-sm text-blue-800 font-medium mb-2">🚀 Quick Dev Access:</p>
                <p className="text-xs text-blue-700">
                  Click "Get Started" to instantly access mock authentication.
                  No signup required in development mode!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              Why Choose VisaMart{isDevelopmentMode ? ' ULTRA' : ''}?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Experience the future of visa applications with our cutting-edge platform
              {isDevelopmentMode && ' - now with enhanced development features'}
            </motion.p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verified Agents</h3>
              <p className="text-gray-600">
                All our agents are thoroughly vetted and certified immigration professionals with proven track records.
                {isDevelopmentMode && ' (Mock verification system active)'}
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-xl mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast Processing</h3>
              <p className="text-gray-600">
                Our streamlined process reduces application time by up to 60% compared to traditional methods.
                {isDevelopmentMode && ' (Simulated processing in dev mode)'}
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-xl mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Success Guarantee</h3>
              <p className="text-gray-600">
                95% success rate with full refund guarantee if your visa application is not approved.
                {isDevelopmentMode && ' (Mock guarantee system)'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {isDevelopmentMode ? '∞' : '10,000+'}
              </div>
              <div className="text-gray-600">Happy Clients</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-success mb-2">
                {isDevelopmentMode ? '100%' : '95%'}
              </div>
              <div className="text-gray-600">Success Rate</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {isDevelopmentMode ? 'ALL' : '150+'}
              </div>
              <div className="text-gray-600">Countries Covered</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {isDevelopmentMode ? '0' : '24/7'}
              </div>
              <div className="text-gray-600">Support Available</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
            >
              Ready to Start Your Journey{isDevelopmentMode ? ' in ULTRA Mode' : ''}?
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-blue-100 mb-8"
            >
              Join thousands of successful applicants who trusted VisaMart with their dreams.
              {isDevelopmentMode && (
                <span className="block mt-2 text-blue-200">
                  🚀 Development mode: No registration required - instant access!
                </span>
              )}
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleGetStarted}
                className="text-lg px-8 py-4"
              >
                {isAuthenticated ? 'Access Dashboard' : 'Start Application'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button 
                size="lg" 
                variant="outline"
                onClick={handleFindAgents}
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
              >
                Find Expert Agents
              </Button>
            </motion.div>

            {isDevelopmentMode && (
              <motion.div 
                variants={fadeInUp}
                className="mt-6 p-4 bg-blue-800 bg-opacity-50 rounded-lg"
              >
                <p className="text-sm text-blue-100 font-medium">
                  🚀 ULTRA Development Features Active:
                </p>
                <p className="text-xs text-blue-200 mt-1">
                  Mock auth • Enhanced debugging • Real-time updates • Full API access
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}