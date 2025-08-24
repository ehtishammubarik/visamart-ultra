// VisaMart ULTRA - Analytics Dashboard
// Comprehensive analytics and reporting for agents

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Users,
  DollarSign,
  FileText,
  Clock,
  Star,
  Globe,
  Target,
  Award,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'

import { useAuth } from '../../providers/AuthProvider'
import { useSubagents } from '../../agents/hooks/useSubagents'
import { PrimaryButton, SecondaryButton, GhostButton, TouchButton } from '../../components/ui/Button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { 
  ResponsiveContainer, 
  ResponsiveGrid, 
  ResponsiveCard, 
  ResponsiveFlex,
  ResponsiveStack,
  ResponsiveText
} from '../../components/layout/ResponsiveContainer'
import { useBreakpoint } from '../../hooks/useResponsive'

interface AnalyticsData {
  overview: {
    totalRevenue: number
    totalApplications: number
    conversionRate: number
    averageValue: number
    growthRate: number
    newClients: number
    repeatClients: number
    clientSatisfaction: number
  }
  timeSeriesData: {
    date: string
    revenue: number
    applications: number
    conversions: number
  }[]
  servicePerformance: {
    name: string
    revenue: number
    applications: number
    conversionRate: number
    avgProcessingTime: number
    rating: number
    trend: 'up' | 'down' | 'stable'
  }[]
  countryData: {
    country: string
    applications: number
    revenue: number
    avgProcessingTime: number
    successRate: number
  }[]
  clientInsights: {
    demographics: {
      ageRanges: { range: string; percentage: number }[]
      topCountries: { country: string; count: number }[]
      visaTypes: { type: string; count: number }[]
    }
    behavior: {
      avgTimeToDecision: number
      mostCommonQueries: string[]
      peakHours: { hour: number; activity: number }[]
    }
  }
}

export function AnalyticsDashboardPage() {
  const { user, isDevelopmentMode } = useAuth()
  const { enhanceAgentFeature } = useSubagents()
  const { isMobile, isTablet } = useBreakpoint()

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'applications' | 'conversions'>('revenue')

  useEffect(() => {
    loadAnalytics()
  }, [selectedTimeRange])

  const loadAnalytics = async () => {
    setIsLoading(true)
    
    // Simulate API loading
    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockAnalytics: AnalyticsData = {
      overview: {
        totalRevenue: 127450,
        totalApplications: 342,
        conversionRate: 78.5,
        averageValue: 950,
        growthRate: 23.5,
        newClients: 89,
        repeatClients: 67,
        clientSatisfaction: 4.7
      },
      timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 5000) + 2000,
        applications: Math.floor(Math.random() * 15) + 5,
        conversions: Math.floor(Math.random() * 12) + 3
      })),
      servicePerformance: [
        {
          name: 'German Tourist Visa',
          revenue: 45200,
          applications: 52,
          conversionRate: 84.6,
          avgProcessingTime: 18,
          rating: 4.8,
          trend: 'up'
        },
        {
          name: 'US Business Visa',
          revenue: 38080,
          applications: 28,
          conversionRate: 89.3,
          avgProcessingTime: 12,
          rating: 4.9,
          trend: 'up'
        },
        {
          name: 'Canadian Student Visa',
          revenue: 22100,
          applications: 22,
          conversionRate: 72.7,
          avgProcessingTime: 25,
          rating: 4.5,
          trend: 'stable'
        },
        {
          name: 'Australian Work Visa',
          revenue: 18360,
          applications: 12,
          conversionRate: 91.7,
          avgProcessingTime: 35,
          rating: 4.7,
          trend: 'up'
        },
        {
          name: 'UK Family Visa',
          revenue: 3710,
          applications: 5,
          conversionRate: 60.0,
          avgProcessingTime: 28,
          rating: 4.2,
          trend: 'down'
        }
      ],
      countryData: [
        { country: 'Germany', applications: 52, revenue: 45200, avgProcessingTime: 18, successRate: 94.2 },
        { country: 'United States', applications: 28, revenue: 38080, avgProcessingTime: 12, successRate: 96.4 },
        { country: 'Canada', applications: 22, revenue: 22100, avgProcessingTime: 25, successRate: 90.9 },
        { country: 'Australia', applications: 12, revenue: 18360, avgProcessingTime: 35, successRate: 100 },
        { country: 'United Kingdom', applications: 8, revenue: 6720, avgProcessingTime: 28, successRate: 87.5 }
      ],
      clientInsights: {
        demographics: {
          ageRanges: [
            { range: '18-25', percentage: 15 },
            { range: '26-35', percentage: 35 },
            { range: '36-45', percentage: 28 },
            { range: '46-55', percentage: 15 },
            { range: '56+', percentage: 7 }
          ],
          topCountries: [
            { country: 'India', count: 45 },
            { country: 'China', count: 38 },
            { country: 'Nigeria', count: 22 },
            { country: 'Brazil', count: 18 },
            { country: 'Philippines', count: 15 }
          ],
          visaTypes: [
            { type: 'Tourist', count: 89 },
            { type: 'Business', count: 67 },
            { type: 'Student', count: 45 },
            { type: 'Work', count: 34 },
            { type: 'Family', count: 23 }
          ]
        },
        behavior: {
          avgTimeToDecision: 4.2,
          mostCommonQueries: [
            'Processing time expectations',
            'Required documents list',
            'Interview preparation',
            'Application status updates',
            'Fee structure clarification'
          ],
          peakHours: Array.from({ length: 24 }, (_, i) => ({
            hour: i,
            activity: Math.floor(Math.random() * 50) + 10
          }))
        }
      }
    }

    setAnalytics(mockAnalytics)
    setIsLoading(false)

    if (isDevelopmentMode) {
      enhanceAgentFeature(
        'Analytics Dashboard',
        'Comprehensive analytics loaded with performance insights',
        'high'
      )
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-600" />
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  if (isLoading) {
    return (
      <ResponsiveContainer size="xl" center className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center"
          >
            <BarChart3 className="w-8 h-8 text-white" />
          </motion.div>
          <div className="text-center">
            <ResponsiveText size="xl" weight="bold" className="mb-2">
              Loading Analytics
            </ResponsiveText>
            <ResponsiveText color="muted">
              Crunching your performance data...
            </ResponsiveText>
          </div>
        </div>
      </ResponsiveContainer>
    )
  }

  if (!analytics) return null

  return (
    <ResponsiveContainer size="full">
      <ResponsiveStack spacing="lg">
        {/* Header */}
        <ResponsiveFlex direction="responsive" justify="between" align="center" gap="md">
          <div>
            <ResponsiveText size="3xl" weight="bold" className="mb-2">
              Analytics Dashboard
            </ResponsiveText>
            <ResponsiveText color="muted">
              Comprehensive performance insights and trends
            </ResponsiveText>
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
              onClick={loadAnalytics}
              variant="outline"
              size={isMobile ? 'lg' : 'default'}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </TouchButton>

            <TouchButton
              onClick={() => {/* Export logic */}}
              size={isMobile ? 'lg' : 'default'}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export
            </TouchButton>
          </ResponsiveFlex>
        </ResponsiveFlex>

        {/* Key Metrics Overview */}
        <ResponsiveGrid cols={isMobile ? 2 : 4} gap="md">
          {[
            {
              title: 'Total Revenue',
              value: formatCurrency(analytics.overview.totalRevenue),
              change: `+${analytics.overview.growthRate}%`,
              trend: 'up' as const,
              icon: DollarSign,
              color: 'green'
            },
            {
              title: 'Total Applications',
              value: analytics.overview.totalApplications.toLocaleString(),
              change: '+15.2%',
              trend: 'up' as const,
              icon: FileText,
              color: 'blue'
            },
            {
              title: 'Conversion Rate',
              value: formatPercentage(analytics.overview.conversionRate),
              change: '+2.3%',
              trend: 'up' as const,
              icon: Target,
              color: 'purple'
            },
            {
              title: 'Client Satisfaction',
              value: `${analytics.overview.clientSatisfaction}/5.0`,
              change: '+0.2',
              trend: 'up' as const,
              icon: Star,
              color: 'orange'
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ResponsiveCard padding="lg" hover animate>
                <ResponsiveFlex direction="row" justify="between" align="start">
                  <div className="flex-1">
                    <ResponsiveText size="sm" color="muted" className="mb-1">
                      {metric.title}
                    </ResponsiveText>
                    <ResponsiveText size="2xl" weight="bold" className="mb-2">
                      {metric.value}
                    </ResponsiveText>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(metric.trend)}
                      <ResponsiveText size="sm" className={getTrendColor(metric.trend)}>
                        {metric.change}
                      </ResponsiveText>
                      <ResponsiveText size="sm" color="muted">
                        vs last period
                      </ResponsiveText>
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

        {/* Charts Section */}
        <ResponsiveGrid cols={isMobile ? 1 : 3} gap="lg">
          {/* Time Series Chart Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={isMobile ? "col-span-1" : "col-span-2"}
          >
            <ResponsiveCard padding="lg">
              <ResponsiveFlex direction="row" justify="between" align="center" className="mb-6">
                <div>
                  <ResponsiveText size="lg" weight="bold" className="mb-1">
                    Performance Trends
                  </ResponsiveText>
                  <ResponsiveText size="sm" color="muted">
                    {selectedTimeRange === '7d' ? 'Last 7 days' : 
                     selectedTimeRange === '30d' ? 'Last 30 days' :
                     selectedTimeRange === '90d' ? 'Last 90 days' : 'Last year'}
                  </ResponsiveText>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value as any)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="revenue">Revenue</option>
                    <option value="applications">Applications</option>
                    <option value="conversions">Conversions</option>
                  </select>
                </div>
              </ResponsiveFlex>

              {/* Simplified Chart Visualization */}
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <ResponsiveText weight="medium" className="text-blue-900 mb-1">
                    Interactive Chart
                  </ResponsiveText>
                  <ResponsiveText size="sm" color="muted">
                    Chart visualization would be rendered here using a charting library
                  </ResponsiveText>
                </div>
              </div>

              <ResponsiveGrid cols={3} gap="md">
                {[
                  { label: 'Peak Day', value: formatCurrency(Math.max(...analytics.timeSeriesData.map(d => d.revenue))) },
                  { label: 'Average', value: formatCurrency(analytics.timeSeriesData.reduce((acc, d) => acc + d.revenue, 0) / analytics.timeSeriesData.length) },
                  { label: 'Growth', value: '+23.5%' }
                ].map(stat => (
                  <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-lg">
                    <ResponsiveText size="sm" color="muted" className="mb-1">
                      {stat.label}
                    </ResponsiveText>
                    <ResponsiveText weight="bold">
                      {stat.value}
                    </ResponsiveText>
                  </div>
                ))}
              </ResponsiveGrid>
            </ResponsiveCard>
          </motion.div>

          {/* Top Countries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ResponsiveCard padding="lg">
              <ResponsiveFlex direction="row" justify="between" align="center" className="mb-6">
                <ResponsiveText size="lg" weight="bold">
                  Top Countries
                </ResponsiveText>
                <Link 
                  to="/dashboard/analytics/countries"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </ResponsiveFlex>

              <ResponsiveStack spacing="sm">
                {analytics.countryData.slice(0, 5).map((country, index) => (
                  <div key={country.country} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <ResponsiveText weight="medium" className="mb-0.5">
                          {country.country}
                        </ResponsiveText>
                        <ResponsiveText size="sm" color="muted">
                          {country.applications} applications
                        </ResponsiveText>
                      </div>
                    </div>
                    <div className="text-right">
                      <ResponsiveText weight="bold">
                        {formatCurrency(country.revenue)}
                      </ResponsiveText>
                      <ResponsiveText size="sm" color="muted">
                        {formatPercentage(country.successRate)} success
                      </ResponsiveText>
                    </div>
                  </div>
                ))}
              </ResponsiveStack>
            </ResponsiveCard>
          </motion.div>
        </ResponsiveGrid>

        {/* Service Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ResponsiveCard padding="lg">
            <ResponsiveFlex direction="row" justify="between" align="center" className="mb-6">
              <div>
                <ResponsiveText size="lg" weight="bold" className="mb-1">
                  Service Performance
                </ResponsiveText>
                <ResponsiveText size="sm" color="muted">
                  Detailed breakdown of your visa services
                </ResponsiveText>
              </div>
              <Link 
                to="/dashboard/services"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Manage Services
              </Link>
            </ResponsiveFlex>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Service</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700">Revenue</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700">Applications</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700">Conversion</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700">Avg Time</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700">Rating</th>
                    <th className="text-center py-3 px-2 font-medium text-gray-700">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.servicePerformance.map((service, index) => (
                    <motion.tr
                      key={service.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-2">
                        <ResponsiveText weight="medium" className="mb-1">
                          {service.name}
                        </ResponsiveText>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <ResponsiveText weight="bold">
                          {formatCurrency(service.revenue)}
                        </ResponsiveText>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <ResponsiveText>
                          {service.applications}
                        </ResponsiveText>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <ResponsiveText>
                          {formatPercentage(service.conversionRate)}
                        </ResponsiveText>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <ResponsiveText>
                          {service.avgProcessingTime} days
                        </ResponsiveText>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <ResponsiveText>
                            {service.rating.toFixed(1)}
                          </ResponsiveText>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <div className="flex justify-center">
                          {getTrendIcon(service.trend)}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ResponsiveCard>
        </motion.div>

        {/* Client Insights */}
        <ResponsiveGrid cols={isMobile ? 1 : 3} gap="lg">
          {/* Demographics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ResponsiveCard padding="lg">
              <ResponsiveText size="lg" weight="bold" className="mb-6">
                Client Demographics
              </ResponsiveText>

              <div className="space-y-6">
                <div>
                  <ResponsiveText weight="medium" className="mb-3">
                    Age Distribution
                  </ResponsiveText>
                  <ResponsiveStack spacing="sm">
                    {analytics.clientInsights.demographics.ageRanges.map(range => (
                      <div key={range.range} className="flex items-center justify-between">
                        <ResponsiveText size="sm">
                          {range.range} years
                        </ResponsiveText>
                        <div className="flex items-center space-x-2 flex-1 mx-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${range.percentage}%` }}
                            />
                          </div>
                          <ResponsiveText size="sm" weight="medium">
                            {range.percentage}%
                          </ResponsiveText>
                        </div>
                      </div>
                    ))}
                  </ResponsiveStack>
                </div>

                <div>
                  <ResponsiveText weight="medium" className="mb-3">
                    Top Client Countries
                  </ResponsiveText>
                  <ResponsiveStack spacing="sm">
                    {analytics.clientInsights.demographics.topCountries.slice(0, 3).map(country => (
                      <div key={country.country} className="flex items-center justify-between">
                        <ResponsiveText size="sm">
                          {country.country}
                        </ResponsiveText>
                        <ResponsiveText size="sm" weight="medium">
                          {country.count} clients
                        </ResponsiveText>
                      </div>
                    ))}
                  </ResponsiveStack>
                </div>
              </div>
            </ResponsiveCard>
          </motion.div>

          {/* Visa Types Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <ResponsiveCard padding="lg">
              <ResponsiveText size="lg" weight="bold" className="mb-6">
                Visa Type Distribution
              </ResponsiveText>

              {/* Pie Chart Placeholder */}
              <div className="h-48 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                  <ResponsiveText weight="medium" className="text-purple-900 mb-1">
                    Pie Chart
                  </ResponsiveText>
                  <ResponsiveText size="sm" color="muted">
                    Interactive pie chart would be rendered here
                  </ResponsiveText>
                </div>
              </div>

              <ResponsiveStack spacing="sm">
                {analytics.clientInsights.demographics.visaTypes.map(type => (
                  <div key={type.type} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <ResponsiveText size="sm">
                      {type.type} Visa
                    </ResponsiveText>
                    <ResponsiveText size="sm" weight="medium">
                      {type.count}
                    </ResponsiveText>
                  </div>
                ))}
              </ResponsiveStack>
            </ResponsiveCard>
          </motion.div>

          {/* Client Behavior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <ResponsiveCard padding="lg">
              <ResponsiveText size="lg" weight="bold" className="mb-6">
                Client Behavior
              </ResponsiveText>

              <ResponsiveStack spacing="md">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <ResponsiveText weight="medium" className="text-blue-900">
                      Decision Time
                    </ResponsiveText>
                  </div>
                  <ResponsiveText size="2xl" weight="bold" className="text-blue-900 mb-1">
                    {analytics.clientInsights.behavior.avgTimeToDecision} days
                  </ResponsiveText>
                  <ResponsiveText size="sm" className="text-blue-700">
                    Average time to make decision
                  </ResponsiveText>
                </div>

                <div>
                  <ResponsiveText weight="medium" className="mb-3">
                    Common Questions
                  </ResponsiveText>
                  <ResponsiveStack spacing="sm">
                    {analytics.clientInsights.behavior.mostCommonQueries.slice(0, 3).map((query, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ResponsiveText size="sm" weight="medium" className="text-gray-600">
                            {index + 1}
                          </ResponsiveText>
                        </div>
                        <ResponsiveText size="sm">
                          {query}
                        </ResponsiveText>
                      </div>
                    ))}
                  </ResponsiveStack>
                </div>
              </ResponsiveStack>
            </ResponsiveCard>
          </motion.div>
        </ResponsiveGrid>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <ResponsiveCard padding="lg" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <ResponsiveFlex direction="responsive" justify="between" align="center" gap="md">
              <div>
                <ResponsiveText size="lg" weight="bold" className="text-blue-900 mb-1">
                  Ready to optimize your performance?
                </ResponsiveText>
                <ResponsiveText className="text-blue-700">
                  Use these insights to improve your services and increase revenue
                </ResponsiveText>
              </div>
              
              <ResponsiveFlex direction="row" gap="sm">
                <SecondaryButton
                  onClick={() => {/* Download report */}}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download Report
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => {/* View recommendations */}}
                  leftIcon={<Target className="w-4 h-4" />}
                >
                  View Recommendations
                </PrimaryButton>
              </ResponsiveFlex>
            </ResponsiveFlex>
          </ResponsiveCard>
        </motion.div>

        {/* Development Mode Info */}
        {isDevelopmentMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <ResponsiveCard padding="md" className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <ResponsiveFlex direction="row" align="center" gap="md">
                <Zap className="w-8 h-8 text-green-600" />
                <div className="flex-1">
                  <ResponsiveText weight="bold" className="text-green-900 mb-1">
                    🚀 ULTRA Analytics Engine
                  </ResponsiveText>
                  <ResponsiveText size="sm" className="text-green-700">
                    Advanced analytics dashboard with predictive insights and real-time reporting.
                    All data shown is simulated for development demonstration.
                  </ResponsiveText>
                </div>
              </ResponsiveFlex>
            </ResponsiveCard>
          </motion.div>
        )}
      </ResponsiveStack>
    </ResponsiveContainer>
  )
}