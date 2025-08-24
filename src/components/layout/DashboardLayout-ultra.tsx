// VisaMart ULTRA - Enhanced Dashboard Layout
// Mobile-first responsive layout with ULTRA AuthProvider integration

import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Menu,
  X,
  Home,
  User,
  Settings,
  FileText,
  Users,
  BarChart3,
  Bell,
  LogOut,
  ChevronDown,
  ChevronLeft,
  Plus,
  Search,
  Filter,
  Zap,
  Shield,
  Code,
  Smartphone
} from 'lucide-react'

import { useAuth } from '../../providers/AuthProvider'
import { useSubagents } from '../../agents/hooks/useSubagents'
import { Button, GhostButton, TouchButton } from '../ui/Button'
import { LoadingSpinner } from '../ui/LoadingSpinner'

export function DashboardLayout() {
  const { isAuthenticated, user, login, logout, isDevelopmentMode } = useAuth()
  const { activeAgents, executingTasks } = useSubagents()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobileView) {
      setIsSidebarOpen(false)
    }
  }, [location.pathname, isMobileView])

  // Mock user type detection (in real app, this would come from user data)
  const isAgent = user?.user_type === 'agent' || user?.email?.includes('agent')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Enhanced navigation items based on user type
  const getNavigationItems = () => {
    const commonItems = [
      { 
        name: 'Dashboard', 
        href: '/dashboard', 
        icon: Home,
        description: 'Overview and quick actions'
      },
      { 
        name: 'Profile', 
        href: '/dashboard/profile', 
        icon: User,
        description: 'Personal settings and preferences'
      },
    ]

    if (isAgent) {
      return [
        ...commonItems,
        { 
          name: 'Agent Onboarding', 
          href: '/dashboard/agent-onboarding', 
          icon: FileText,
          description: 'Complete your agent verification',
          badge: 'NEW'
        },
        { 
          name: 'My Services', 
          href: '/dashboard/services', 
          icon: Settings,
          description: 'Manage your visa services'
        },
        { 
          name: 'Applications', 
          href: '/dashboard/applications', 
          icon: Users,
          description: 'Track client applications'
        },
        { 
          name: 'Analytics', 
          href: '/dashboard/analytics', 
          icon: BarChart3,
          description: 'Performance insights'
        },
      ]
    }

    return [
      ...commonItems,
      { 
        name: 'My Applications', 
        href: '/dashboard/applications', 
        icon: FileText,
        description: 'Track your visa applications'
      },
      { 
        name: 'Saved Services', 
        href: '/dashboard/saved', 
        icon: Settings,
        description: 'Services you bookmarked'
      },
      { 
        name: 'Become an Agent', 
        href: '/dashboard/agent-onboarding', 
        icon: Users,
        description: 'Join our agent network',
        badge: 'POPULAR'
      },
    ]
  }

  const navigationItems = getNavigationItems()

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  // Breadcrumb generation
  const getBreadcrumbs = () => {
    const segments = location.pathname.split('/').filter(Boolean)
    return segments.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '),
      href: '/' + segments.slice(0, index + 1).join('/'),
      isLast: index === segments.length - 1
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center safe-top safe-bottom">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600">Please sign in to access your dashboard</p>
          </div>
          <TouchButton 
            onClick={login} 
            className="w-full"
            size="lg"
          >
            Sign In to Continue
          </TouchButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 safe-top safe-bottom">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen || !isMobileView ? 0 : '-100%'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-lg lg:translate-x-0 lg:static lg:inset-0 flex flex-col"
      >
        {/* Enhanced Logo Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-gray-900">
                VisaMart
              </span>
              {isDevelopmentMode && (
                <div className="flex items-center space-x-1 mt-1">
                  <Zap className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                    ULTRA
                  </span>
                </div>
              )}
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* User Info Card (Mobile) */}
        {isMobileView && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff`}
                alt={user?.name || 'User'}
                className="h-12 w-12 rounded-full ring-2 ring-blue-100"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {user?.name || 'User'}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {isAgent ? 'Agent' : 'Customer'}
                  </span>
                  {isDevelopmentMode && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {user?.user_type || 'mock'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = isActivePath(item.href)
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => isMobileView && setIsSidebarOpen(false)}
                className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.name}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {!isActive && item.description && (
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}

          {/* Subagent Status (Development) */}
          {isDevelopmentMode && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-green-800">🤖 Subagents</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-700">{activeAgents.length} active</span>
                  </div>
                </div>
                <div className="text-xs text-green-700">
                  {executingTasks.length > 0 ? (
                    <div className="flex items-center space-x-1">
                      <LoadingSpinner size="sm" variant="current" />
                      <span>Executing {executingTasks.length} tasks</span>
                    </div>
                  ) : (
                    'All systems operational'
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Desktop User Profile */}
        {!isMobileView && (
          <div className="border-t border-gray-200 p-4">
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm hover:bg-gray-50 transition-all duration-200 group"
              >
                <img
                  src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff`}
                  alt={user?.name || 'User'}
                  className="h-10 w-10 rounded-full ring-2 ring-gray-200 group-hover:ring-blue-200"
                />
                <div className="flex-1 text-left min-w-0">
                  <div className="font-semibold text-gray-900 truncate">
                    {user?.name || 'User'}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {isAgent ? 'Agent' : 'Customer'}
                    </span>
                    {isDevelopmentMode && (
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded font-medium">
                        {user?.user_type || 'mock'}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5 border border-gray-200"
                  >
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="mr-3 h-4 w-4 text-gray-400" />
                      Settings
                    </Link>
                    
                    {isDevelopmentMode && (
                      <>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={() => {
                            const newUserType = user?.user_type === 'agent' ? 'user' : 'agent'
                            logout()
                            setTimeout(() => login(), 100)
                            setIsProfileMenuOpen(false)
                          }}
                          className="flex w-full items-center px-4 py-3 text-sm text-blue-700 hover:bg-blue-50 transition-colors"
                        >
                          <Code className="mr-3 h-4 w-4 text-blue-500" />
                          Switch User Type
                        </button>
                      </>
                    )}
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        handleLogout()
                      }}
                      className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="mr-3 h-4 w-4 text-gray-400" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Enhanced Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile Header Left */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Breadcrumb Navigation */}
              <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-1 text-sm">
                  {getBreadcrumbs().map((crumb, index) => (
                    <li key={crumb.href} className="flex items-center">
                      {index > 0 && (
                        <ChevronLeft className="h-3 w-3 text-gray-400 mx-1 rotate-180" />
                      )}
                      {crumb.isLast ? (
                        <span className="font-semibold text-gray-900">
                          {crumb.name}
                        </span>
                      ) : (
                        <Link
                          to={crumb.href}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {crumb.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Mobile Page Title */}
              <h1 className="sm:hidden text-lg font-semibold text-gray-900 truncate">
                {getPageTitle(location.pathname)}
              </h1>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Quick Actions for Agents */}
              {isAgent && (
                <TouchButton
                  onClick={() => navigate('/dashboard/services/new')}
                  className="hidden sm:flex"
                  size="sm"
                  leftIcon={<Plus className="h-4 w-4" />}
                >
                  New Service
                </TouchButton>
              )}

              {/* Mobile view indicator */}
              {isDevelopmentMode && isMobileView && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-800 rounded-lg text-xs">
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile</span>
                </div>
              )}

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Mobile Profile Menu */}
              {isMobileView && (
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="relative"
                >
                  <img
                    src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff`}
                    alt={user?.name || 'User'}
                    className="h-8 w-8 rounded-full ring-2 ring-gray-200"
                  />
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 z-50"
                    >
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false)
                          handleLogout()
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

function getPageTitle(pathname: string): string {
  const pathMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/profile': 'Profile',
    '/dashboard/agent-onboarding': 'Agent Onboarding',
    '/dashboard/services': 'My Services',
    '/dashboard/applications': 'Applications',
    '/dashboard/analytics': 'Analytics',
    '/dashboard/saved': 'Saved Services',
  }

  return pathMap[pathname] || 'Dashboard'
}