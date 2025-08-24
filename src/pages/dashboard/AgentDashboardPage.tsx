// VisaMart ULTRA - Comprehensive Agent Dashboard
// Full-featured agent dashboard with analytics, management, and real-time updates

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  Settings,
  Calendar,
  Globe,
  Star,
  Award,
  Zap,
  Target,
  Activity,
  Bell,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  MessageCircle,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

import { useAuth } from '../../providers/AuthProvider'
import { useSubagents } from '../../agents/hooks/useSubagents'
import { PrimaryButton, SecondaryButton, GhostButton, TouchButton } from '../../components/ui/Button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { 
  ResponsiveContainer, 
  ResponsiveGrid, 
  ResponsiveCard, 
  ResponsiveSection,
  ResponsiveFlex,
  ResponsiveStack
} from '../../components/layout/ResponsiveContainer'
import { useBreakpoint } from '../../hooks/useResponsive'

interface DashboardStats {
  totalApplications: number
  activeApplications: number
  approvedApplications: number
  monthlyRevenue: number
  conversionRate: number
  averageProcessingTime: number
  clientSatisfaction: number
  totalClients: number
}

interface RecentApplication {
  id: string
  clientName: string
  visaType: string
  country: string
  status: 'pending' | 'approved' | 'rejected' | 'processing'
  submittedDate: string
  priority: 'high' | 'medium' | 'low'
  value: number
}

interface ServicePerformance {
  name: string
  applications: number
  revenue: number
  conversionRate: number
  trend: 'up' | 'down' | 'stable'
}

export function AgentDashboardPage() {
  const { user, isDevelopmentMode } = useAuth()
  const { enhanceAgentFeature, activeAgents } = useSubagents()
  const { isMobile, isTablet } = useBreakpoint()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([])
  const [servicePerformance, setServicePerformance] = useState<ServicePerformance[]>([])
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  useEffect(() => {
    loadDashboardData()
  }, [selectedTimeRange])

  const loadDashboardData = async () => {
    setIsLoading(true)
    
    // Simulate API loading with realistic data
    await new Promise(resolve => setTimeout(resolve, 1200))

    const mockStats: DashboardStats = {
      totalApplications: 847,
      activeApplications: 23,
      approvedApplications: 156,
      monthlyRevenue: 12450,
      conversionRate: 78.5,
      averageProcessingTime: 8.2,
      clientSatisfaction: 4.8,
      totalClients: 342
    }

    const mockApplications: RecentApplication[] = [
      {
        id: 'APP-2024-1001',
        clientName: 'Sarah Johnson',
        visaType: 'Tourist Visa',
        country: 'Germany',
        status: 'processing',
        submittedDate: '2024-08-22',
        priority: 'high',
        value: 850
      },
      {
        id: 'APP-2024-1002',
        clientName: 'Michael Chen',
        visaType: 'Business Visa',
        country: 'United States',
        status: 'pending',
        submittedDate: '2024-08-21',
        priority: 'medium',
        value: 1200
      },
      {
        id: 'APP-2024-1003',
        clientName: 'Emma Williams',
        visaType: 'Student Visa',
        country: 'Canada',
        status: 'approved',
        submittedDate: '2024-08-20',
        priority: 'medium',
        value: 950
      },
      {
        id: 'APP-2024-1004',
        clientName: 'David Rodriguez',
        visaType: 'Work Visa',
        country: 'Australia',
        status: 'processing',
        submittedDate: '2024-08-19',
        priority: 'high',
        value: 1500
      }
    ]

    const mockServices: ServicePerformance[] = [
      {
        name: 'Tourist Visas',
        applications: 45,
        revenue: 8750,
        conversionRate: 82.3,
        trend: 'up'
      },
      {
        name: 'Business Visas', 
        applications: 28,
        revenue: 6200,
        conversionRate: 75.8,
        trend: 'up'
      },
      {
        name: 'Student Visas',
        applications: 19,
        revenue: 4100,
        conversionRate: 68.2,
        trend: 'stable'
      },
      {
        name: 'Work Visas',
        applications: 12,
        revenue: 3800,
        conversionRate: 91.7,
        trend: 'up'
      }
    ]

    setStats(mockStats)
    setRecentApplications(mockApplications)
    setServicePerformance(mockServices)
    setIsLoading(false)

    // Trigger subagent enhancement
    if (isDevelopmentMode) {
      enhanceAgentFeature(
        'Dashboard Analytics',
        'Enhanced agent dashboard loaded with comprehensive analytics',
        'medium'
      )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-100 border-green-200'
      case 'processing':
        return 'text-blue-700 bg-blue-100 border-blue-200'
      case 'pending':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200'
      case 'rejected':
        return 'text-red-700 bg-red-100 border-red-200'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-700 bg-red-50'
      case 'medium':
        return 'text-yellow-700 bg-yellow-50'
      case 'low':
        return 'text-green-700 bg-green-50'
      default:
        return 'text-gray-700 bg-gray-50'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <ResponsiveContainer size="xl" center className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center"
          >
            <BarChart3 className="w-8 h-8 text-white" />
          </motion.div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Loading Your Dashboard
            </h3>
            <p className="text-gray-600">
              Preparing your agent analytics and recent activity...
            </p>
          </div>
        </div>
      </ResponsiveContainer>
    )
  }

  if (!stats) return null

  return (
    <ResponsiveContainer size="full">
      <ResponsiveStack spacing="lg">
        {/* Header Section */}
        <ResponsiveSection spacing="sm">
          <ResponsiveFlex direction="responsive" justify="between" align="center" gap="md">
            <div className="min-w-0 flex-1">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Agent Dashboard
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Welcome back, {user?.name?.split(' ')[0] || 'Agent'}! Here's your performance overview.
                  </p>
                </div>
                {isDevelopmentMode && (
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                    <Zap className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">
                      {activeAgents.length} ULTRA Agents Active
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            <ResponsiveFlex direction="row" gap="sm">
              <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select 
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                  className="text-sm font-medium text-gray-700 bg-transparent border-none focus:outline-none"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
              
              <TouchButton
                onClick={() => navigate('/dashboard/services/new')}
                size={isMobile ? 'lg' : 'default'}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add Service
              </TouchButton>
            </ResponsiveFlex>
          </ResponsiveFlex>
        </ResponsiveSection>

        {/* Key Metrics Cards */}
        <ResponsiveSection spacing="sm">
          <ResponsiveGrid cols={isMobile ? 2 : isTablet ? 2 : 4} gap="md">
            {[
              {
                title: 'Total Applications',
                value: stats.totalApplications.toLocaleString(),
                change: '+12%',
                trend: 'up' as const,
                icon: FileText,
                color: 'blue'
              },
              {
                title: 'Monthly Revenue',
                value: formatCurrency(stats.monthlyRevenue),
                change: '+8.2%',
                trend: 'up' as const,
                icon: DollarSign,
                color: 'green'
              },
              {
                title: 'Conversion Rate',
                value: `${stats.conversionRate}%`,
                change: '+2.1%',
                trend: 'up' as const,
                icon: Target,
                color: 'purple'
              },
              {
                title: 'Avg. Processing',
                value: `${stats.averageProcessingTime} days`,
                change: '-0.5 days',
                trend: 'up' as const,
                icon: Clock,
                color: 'orange'
              }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ResponsiveCard padding="md" hover animate className="h-full">
                  <ResponsiveFlex direction="row" justify="between" align="start">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">
                        {metric.title}
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                        {metric.value}
                      </p>
                      <div className="flex items-center space-x-1 mt-2">
                        {metric.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      metric.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      metric.color === 'green' ? 'bg-green-100 text-green-600' :
                      metric.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <metric.icon className="w-6 h-6" />
                    </div>
                  </ResponsiveFlex>
                </ResponsiveCard>
              </motion.div>
            ))}
          </ResponsiveGrid>
        </ResponsiveSection>

        {/* Main Content Grid */}
        <ResponsiveGrid cols={isMobile ? 1 : 3} gap="lg">
          {/* Recent Applications */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={isMobile ? "col-span-1" : "col-span-2"}
          >
            <ResponsiveCard padding="lg">
              <ResponsiveFlex direction="row" justify="between" align="center" className="mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Recent Applications
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Your latest client submissions
                  </p>
                </div>
                <Link 
                  to="/dashboard/applications"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 transition-colors"
                >
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </ResponsiveFlex>

              <ResponsiveStack spacing="sm">
                {recentApplications.map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/applications/${app.id}`)}
                  >
                    <ResponsiveFlex direction="responsive" justify="between" align="start" gap="md">
                      <div className="flex-1 min-w-0">
                        <ResponsiveFlex direction="row" align="center" gap="sm" className="mb-2">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {app.clientName}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            getPriorityColor(app.priority)
                          }`}>
                            {app.priority}
                          </span>
                        </ResponsiveFlex>
                        
                        <ResponsiveFlex direction="row" align="center" gap="sm" className="text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Globe className="w-4 h-4" />
                            <span>{app.visaType}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{app.country}</span>
                          </div>
                        </ResponsiveFlex>
                        
                        <p className="text-xs text-gray-500 mt-1">
                          Submitted {formatDate(app.submittedDate)} • {formatCurrency(app.value)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          getStatusColor(app.status)
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </ResponsiveFlex>
                  </motion.div>
                ))}
              </ResponsiveStack>
            </ResponsiveCard>
          </motion.div>

          {/* Quick Actions & Service Performance */}
          <ResponsiveStack spacing="lg">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ResponsiveCard padding="lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <ResponsiveStack spacing="sm">
                  {[
                    {
                      icon: Plus,
                      title: 'Add New Service',
                      subtitle: 'Create visa service',
                      action: () => navigate('/dashboard/services/new'),
                      color: 'blue'
                    },
                    {
                      icon: Users,
                      title: 'View Clients',
                      subtitle: 'Manage client base',
                      action: () => navigate('/dashboard/clients'),
                      color: 'green'
                    },
                    {
                      icon: BarChart3,
                      title: 'Analytics',
                      subtitle: 'Detailed reports',
                      action: () => navigate('/dashboard/analytics'),
                      color: 'purple'
                    },
                    {
                      icon: Settings,
                      title: 'Profile Settings',
                      subtitle: 'Update your info',
                      action: () => navigate('/dashboard/profile'),
                      color: 'gray'
                    }
                  ].map((action, index) => (
                    <button
                      key={action.title}
                      onClick={action.action}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left w-full"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        action.color === 'green' ? 'bg-green-100 text-green-600' :
                        action.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">
                          {action.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {action.subtitle}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </ResponsiveStack>
              </ResponsiveCard>
            </motion.div>

            {/* Service Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ResponsiveCard padding="lg">
                <ResponsiveFlex direction="row" justify="between" align="center" className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Top Services
                  </h3>
                  <Link 
                    to="/dashboard/analytics"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </ResponsiveFlex>

                <ResponsiveStack spacing="sm">
                  {servicePerformance.map((service, index) => (
                    <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {service.applications} applications • {formatCurrency(service.revenue)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium ${
                          service.trend === 'up' ? 'text-green-600' :
                          service.trend === 'down' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {service.conversionRate}%
                        </span>
                        {service.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : service.trend === 'down' ? (
                          <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
                        ) : (
                          <Activity className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </ResponsiveStack>
              </ResponsiveCard>
            </motion.div>
          </ResponsiveStack>
        </ResponsiveGrid>

        {/* Additional Stats Row */}
        <ResponsiveSection spacing="sm">
          <ResponsiveGrid cols={isMobile ? 1 : isTablet ? 2 : 4} gap="md">
            {[
              {
                title: 'Client Satisfaction',
                value: `${stats.clientSatisfaction}/5.0`,
                icon: Star,
                description: 'Average rating from clients'
              },
              {
                title: 'Active Applications',
                value: stats.activeApplications.toString(),
                icon: Activity,
                description: 'Currently in process'
              },
              {
                title: 'Total Clients',
                value: stats.totalClients.toLocaleString(),
                icon: Users,
                description: 'Unique clients served'
              },
              {
                title: 'Success Rate',
                value: `${Math.round((stats.approvedApplications / stats.totalApplications) * 100)}%`,
                icon: Award,
                description: 'Applications approved'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <ResponsiveCard padding="md" className="text-center">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {stat.title}
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600">
                    {stat.description}
                  </p>
                </ResponsiveCard>
              </motion.div>
            ))}
          </ResponsiveGrid>
        </ResponsiveSection>

        {isDevelopmentMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <ResponsiveCard padding="md" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <ResponsiveFlex direction="row" align="center" gap="md">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 mb-1">
                    🚀 ULTRA Development Mode
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Enhanced agent dashboard with real-time subagent monitoring and advanced analytics.
                    All data shown is for development purposes.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-800">
                    {activeAgents.length} Agents Active
                  </span>
                </div>
              </ResponsiveFlex>
            </ResponsiveCard>
          </motion.div>
        )}
      </ResponsiveStack>
    </ResponsiveContainer>
  )
}