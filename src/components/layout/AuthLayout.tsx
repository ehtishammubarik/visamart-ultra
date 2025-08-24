import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Globe, ArrowLeft } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-success/5">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-10 p-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Globe className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold text-gray-900">
              VisaMart
            </span>
          </Link>

          {/* Back to Home */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='5'/%3E%3Ccircle cx='53' cy='7' r='5'/%3E%3Ccircle cx='53' cy='53' r='5'/%3E%3Ccircle cx='7' cy='53' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-display font-bold mb-6">
                Welcome to VisaMart
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                The world's most trusted visa marketplace connecting visa seekers 
                with verified agents for seamless application experiences.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm text-primary-200">Successful Applications</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-primary-200">Verified Agents</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-primary-200">Success Rate</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-primary-200">Countries Covered</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 1, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-20 right-20 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -1, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-32 left-16 w-12 h-12 bg-white/15 rounded-full backdrop-blur-sm"
          />
        </div>

        {/* Right Side - Auth Forms */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Background Pattern */}
      <div className="lg:hidden fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='3'/%3E%3Ccircle cx='53' cy='7' r='3'/%3E%3Ccircle cx='53' cy='53' r='3'/%3E%3Ccircle cx='7' cy='53' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
    </div>
  )
}