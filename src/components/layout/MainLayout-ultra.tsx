import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Menu, 
  X, 
  Globe, 
  Users, 
  FileText, 
  User, 
  Settings,
  LogOut,
  ChevronDown,
  Code
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { useAuth } from '../../providers/AuthProvider'

export function MainLayout() {
  const { isAuthenticated, user, login, logout, isDevelopmentMode } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogin = () => {
    if (isDevelopmentMode) {
      login()
    } else {
      login()
    }
  }

  const handleLogout = () => {
    logout()
  }

  const navItems = [
    { name: 'Services', href: '/services', icon: FileText },
    { name: 'Agents', href: '/agents', icon: Users },
    { name: 'About', href: '/about', icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="font-display text-xl font-bold text-gray-900">
                  VisaMart
                </span>
                {isDevelopmentMode && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                    ULTRA
                  </span>
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff`}
                      alt={user?.name || 'User'}
                      className="h-6 w-6 rounded-full"
                    />
                    <div className="hidden sm:block text-left">
                      <div className="font-medium text-gray-700">
                        {user?.name || 'User'}
                      </div>
                      {isDevelopmentMode && (
                        <div className="text-xs text-blue-600 font-medium">
                          {user?.user_type === 'agent' ? '👤 Mock Agent' : '👤 Mock User'}
                        </div>
                      )}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                      {isDevelopmentMode && (
                        <>
                          <hr className="my-1" />
                          <button
                            onClick={() => {
                              const newUserType = user?.user_type === 'agent' ? 'user' : 'agent'
                              logout()
                              setTimeout(() => login(), 100)
                              setIsUserMenuOpen(false)
                            }}
                            className="flex w-full items-center px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                          >
                            <Code className="mr-2 h-4 w-4" />
                            Switch User Type
                          </button>
                        </>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false)
                          handleLogout()
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex md:items-center md:space-x-3">
                  <Button
                    variant="ghost"
                    onClick={handleLogin}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={handleLogin}
                  >
                    Get Started
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
                
                {!isAuthenticated && (
                  <div className="border-t border-gray-200 pt-4 pb-3 space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        handleLogin()
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        handleLogin()
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                )}

                {isDevelopmentMode && (
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="px-3 py-2 text-xs text-blue-600 font-medium bg-blue-50 rounded">
                      🚀 ULTRA Development Mode Active
                      <br />
                      Auth0 Secure Origin Bypass Enabled
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="font-display text-xl font-bold text-gray-900">
                  VisaMart
                </span>
                {isDevelopmentMode && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                    ULTRA DEV
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                The world's most trusted visa marketplace connecting 
                visa seekers with verified agents for a seamless application experience.
              </p>
              <p className="text-sm text-gray-500">
                © 2024 VisaMart. All rights reserved.
              </p>
              {isDevelopmentMode && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs">
                  <p className="text-blue-800 font-semibold">🚀 Development Build Info:</p>
                  <p className="text-blue-700">Mode: ULTRA Development</p>
                  <p className="text-blue-700">Auth: Mock System Active</p>
                  <p className="text-blue-700">Host: {window.location.host}</p>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/services" className="hover:text-primary">Browse Services</Link></li>
                <li><Link to="/agents" className="hover:text-primary">Find Agents</Link></li>
                <li><Link to="/how-it-works" className="hover:text-primary">How It Works</Link></li>
                <li><Link to="/success-stories" className="hover:text-primary">Success Stories</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}