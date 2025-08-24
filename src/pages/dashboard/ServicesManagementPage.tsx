// VisaMart ULTRA - Services Management Page
// Comprehensive service management interface for agents

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Eye,
  Trash2,
  MoreHorizontal,
  Star,
  Globe,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Settings,
  Copy,
  Share2,
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Upload,
  Archive,
  Calendar,
  MapPin,
  Tag,
  Zap,
  Target
} from 'lucide-react'

import { useAuth } from '../../providers/AuthProvider'
import { useSubagents } from '../../agents/hooks/useSubagents'
import { PrimaryButton, SecondaryButton, GhostButton, TouchButton } from '../../components/ui/Button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useToast } from '../../components/ui/Toaster'
import { 
  ResponsiveContainer, 
  ResponsiveGrid, 
  ResponsiveCard, 
  ResponsiveFlex,
  ResponsiveStack,
  ResponsiveText
} from '../../components/layout/ResponsiveContainer'
import { useBreakpoint } from '../../hooks/useResponsive'

interface Service {
  id: string
  title: string
  description: string
  visaType: string
  targetCountry: string
  processingTime: string
  basePrice: number
  embassyFee: number
  totalPrice: number
  status: 'active' | 'draft' | 'paused' | 'archived'
  applications: number
  conversionRate: number
  revenue: number
  rating: number
  reviews: number
  createdDate: string
  lastModified: string
  featured: boolean
  requirements: string[]
  tags: string[]
}

interface ServiceFilters {
  status: 'all' | 'active' | 'draft' | 'paused' | 'archived'
  visaType: 'all' | 'tourist' | 'business' | 'student' | 'work' | 'family'
  sortBy: 'title' | 'price' | 'applications' | 'revenue' | 'rating' | 'created'
  sortOrder: 'asc' | 'desc'
}

export function ServicesManagementPage() {
  const { user, isDevelopmentMode } = useAuth()
  const { enhanceAgentFeature } = useSubagents()
  const { toast } = useToast()
  const { isMobile, isTablet } = useBreakpoint()
  const navigate = useNavigate()

  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<ServiceFilters>({
    status: 'all',
    visaType: 'all',
    sortBy: 'created',
    sortOrder: 'desc'
  })
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [activeService, setActiveService] = useState<Service | null>(null)
  const [showServiceModal, setShowServiceModal] = useState(false)

  useEffect(() => {
    loadServices()
  }, [])

  useEffect(() => {
    applyFiltersAndSearch()
  }, [services, searchQuery, filters])

  const loadServices = async () => {
    setIsLoading(true)
    
    // Simulate API loading
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockServices: Service[] = [
      {
        id: 'srv-001',
        title: 'German Tourist Visa - Standard Processing',
        description: 'Complete tourist visa service for Germany with document preparation, embassy appointment booking, and application tracking.',
        visaType: 'tourist',
        targetCountry: 'Germany',
        processingTime: '15-20 business days',
        basePrice: 850,
        embassyFee: 80,
        totalPrice: 930,
        status: 'active',
        applications: 45,
        conversionRate: 78.5,
        revenue: 38250,
        rating: 4.8,
        reviews: 32,
        createdDate: '2024-06-15',
        lastModified: '2024-08-20',
        featured: true,
        requirements: ['Valid passport', 'Proof of accommodation', 'Travel insurance', 'Bank statements'],
        tags: ['popular', 'fast-processing', 'high-success-rate']
      },
      {
        id: 'srv-002',
        title: 'US Business Visa - Express Service',
        description: 'Fast-track business visa processing for the United States with priority scheduling and comprehensive support.',
        visaType: 'business',
        targetCountry: 'United States',
        processingTime: '10-15 business days',
        basePrice: 1200,
        embassyFee: 160,
        totalPrice: 1360,
        status: 'active',
        applications: 28,
        conversionRate: 85.2,
        revenue: 38080,
        rating: 4.9,
        reviews: 24,
        createdDate: '2024-07-01',
        lastModified: '2024-08-22',
        featured: true,
        requirements: ['Valid passport', 'Business invitation', 'Company registration', 'Financial documents'],
        tags: ['express', 'premium', 'business']
      },
      {
        id: 'srv-003',
        title: 'Canadian Student Visa - Complete Package',
        description: 'Full student visa service including study permit application, accommodation assistance, and arrival support.',
        visaType: 'student',
        targetCountry: 'Canada',
        processingTime: '20-25 business days',
        basePrice: 950,
        embassyFee: 150,
        totalPrice: 1100,
        status: 'active',
        applications: 19,
        conversionRate: 72.1,
        revenue: 18050,
        rating: 4.6,
        reviews: 16,
        createdDate: '2024-05-20',
        lastModified: '2024-08-18',
        featured: false,
        requirements: ['Acceptance letter', 'Financial proof', 'Medical exam', 'Police clearance'],
        tags: ['student', 'comprehensive', 'support-included']
      },
      {
        id: 'srv-004',
        title: 'Australian Work Visa - Skilled Migration',
        description: 'Professional skilled migration service for Australia with skills assessment and points calculation.',
        visaType: 'work',
        targetCountry: 'Australia',
        processingTime: '30-45 business days',
        basePrice: 1500,
        embassyFee: 200,
        totalPrice: 1700,
        status: 'paused',
        applications: 12,
        conversionRate: 91.7,
        revenue: 18360,
        rating: 4.7,
        reviews: 11,
        createdDate: '2024-04-10',
        lastModified: '2024-08-15',
        featured: false,
        requirements: ['Skills assessment', 'IELTS certificate', 'Work experience', 'Health insurance'],
        tags: ['skilled-migration', 'high-value', 'specialized']
      },
      {
        id: 'srv-005',
        title: 'UK Family Reunion Visa - Basic Service',
        description: 'Family reunion visa service for the UK with document verification and application assistance.',
        visaType: 'family',
        targetCountry: 'United Kingdom',
        processingTime: '25-30 business days',
        basePrice: 720,
        embassyFee: 120,
        totalPrice: 840,
        status: 'draft',
        applications: 0,
        conversionRate: 0,
        revenue: 0,
        rating: 0,
        reviews: 0,
        createdDate: '2024-08-20',
        lastModified: '2024-08-22',
        featured: false,
        requirements: ['Family relationship proof', 'Sponsor documents', 'Accommodation proof', 'Financial support'],
        tags: ['family', 'new-service', 'draft']
      }
    ]

    setServices(mockServices)
    setIsLoading(false)

    if (isDevelopmentMode) {
      enhanceAgentFeature(
        'Service Management',
        `Loaded ${mockServices.length} services for management`,
        'medium'
      )
    }
  }

  const applyFiltersAndSearch = () => {
    let filtered = [...services]

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.targetCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.visaType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(service => service.status === filters.status)
    }

    // Apply visa type filter
    if (filters.visaType !== 'all') {
      filtered = filtered.filter(service => service.visaType === filters.visaType)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[filters.sortBy]
      let bValue: any = b[filters.sortBy]

      if (filters.sortBy === 'created' || filters.sortBy === 'title') {
        aValue = filters.sortBy === 'created' ? new Date(a.createdDate) : a.title.toLowerCase()
        bValue = filters.sortBy === 'created' ? new Date(b.createdDate) : b.title.toLowerCase()
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredServices(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-100 border-green-200'
      case 'draft':
        return 'text-gray-700 bg-gray-100 border-gray-200'
      case 'paused':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200'
      case 'archived':
        return 'text-red-700 bg-red-100 border-red-200'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle
      case 'draft':
        return Edit3
      case 'paused':
        return Clock
      case 'archived':
        return Archive
      default:
        return AlertCircle
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const handleServiceAction = async (action: string, serviceId: string) => {
    const service = services.find(s => s.id === serviceId)
    if (!service) return

    switch (action) {
      case 'edit':
        navigate(`/dashboard/services/${serviceId}/edit`)
        break
      case 'view':
        setActiveService(service)
        setShowServiceModal(true)
        break
      case 'duplicate':
        toast({
          type: 'success',
          message: 'Service duplicated successfully'
        })
        break
      case 'archive':
        toast({
          type: 'info',
          message: 'Service archived'
        })
        break
      case 'delete':
        if (confirm('Are you sure you want to delete this service?')) {
          toast({
            type: 'success',
            message: 'Service deleted successfully'
          })
        }
        break
      case 'activate':
        toast({
          type: 'success',
          message: 'Service activated'
        })
        break
      case 'pause':
        toast({
          type: 'info',
          message: 'Service paused'
        })
        break
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedServices.length === 0) {
      toast({
        type: 'warning',
        message: 'Please select services first'
      })
      return
    }

    toast({
      type: 'success',
      message: `${action} applied to ${selectedServices.length} services`
    })
    setSelectedServices([])
  }

  if (isLoading) {
    return (
      <ResponsiveContainer size="xl" center className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <LoadingSpinner size="xl" />
          <ResponsiveText size="lg" weight="medium" color="muted">
            Loading your services...
          </ResponsiveText>
        </div>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer size="full">
      <ResponsiveStack spacing="lg">
        {/* Header */}
        <ResponsiveFlex direction="responsive" justify="between" align="center" gap="md">
          <div>
            <ResponsiveText size="3xl" weight="bold" className="mb-2">
              Service Management
            </ResponsiveText>
            <ResponsiveText color="muted">
              Manage your visa services and track performance
            </ResponsiveText>
          </div>

          <ResponsiveFlex direction="row" gap="sm">
            <TouchButton
              onClick={() => loadServices()}
              variant="outline"
              size={isMobile ? 'lg' : 'default'}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </TouchButton>
            <TouchButton
              onClick={() => navigate('/dashboard/services/new')}
              size={isMobile ? 'lg' : 'default'}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Service
            </TouchButton>
          </ResponsiveFlex>
        </ResponsiveFlex>

        {/* Stats Cards */}
        <ResponsiveGrid cols={isMobile ? 2 : 4} gap="md">
          {[
            {
              title: 'Total Services',
              value: services.length.toString(),
              icon: FileText,
              color: 'blue'
            },
            {
              title: 'Active Services',
              value: services.filter(s => s.status === 'active').length.toString(),
              icon: CheckCircle,
              color: 'green'
            },
            {
              title: 'Total Applications',
              value: services.reduce((acc, s) => acc + s.applications, 0).toString(),
              icon: Users,
              color: 'purple'
            },
            {
              title: 'Total Revenue',
              value: formatCurrency(services.reduce((acc, s) => acc + s.revenue, 0)),
              icon: DollarSign,
              color: 'orange'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ResponsiveCard padding="md" hover>
                <ResponsiveFlex direction="row" justify="between" align="center">
                  <div>
                    <ResponsiveText size="sm" color="muted" className="mb-1">
                      {stat.title}
                    </ResponsiveText>
                    <ResponsiveText size="xl" weight="bold">
                      {stat.value}
                    </ResponsiveText>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    stat.color === 'green' ? 'bg-green-100 text-green-600' :
                    stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </ResponsiveFlex>
              </ResponsiveCard>
            </motion.div>
          ))}
        </ResponsiveGrid>

        {/* Filters and Search */}
        <ResponsiveCard padding="md">
          <ResponsiveFlex direction="responsive" gap="md" align="center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <GhostButton
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="w-4 h-4" />}
            >
              Filters
            </GhostButton>

            {/* Bulk Actions */}
            {selectedServices.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedServices.length} selected
                </span>
                <SecondaryButton
                  size="sm"
                  onClick={() => handleBulkAction('Archive')}
                >
                  Archive
                </SecondaryButton>
                <SecondaryButton
                  size="sm"
                  onClick={() => handleBulkAction('Delete')}
                  variant="destructive"
                >
                  Delete
                </SecondaryButton>
              </div>
            )}
          </ResponsiveFlex>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <ResponsiveGrid cols={isMobile ? 2 : 4} gap="md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="paused">Paused</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visa Type
                    </label>
                    <select
                      value={filters.visaType}
                      onChange={(e) => setFilters({ ...filters, visaType: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="tourist">Tourist</option>
                      <option value="business">Business</option>
                      <option value="student">Student</option>
                      <option value="work">Work</option>
                      <option value="family">Family</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="created">Date Created</option>
                      <option value="title">Title</option>
                      <option value="price">Price</option>
                      <option value="applications">Applications</option>
                      <option value="revenue">Revenue</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order
                    </label>
                    <select
                      value={filters.sortOrder}
                      onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </select>
                  </div>
                </ResponsiveGrid>
              </motion.div>
            )}
          </AnimatePresence>
        </ResponsiveCard>

        {/* Services List */}
        <ResponsiveStack spacing="sm">
          {filteredServices.length === 0 ? (
            <ResponsiveCard padding="lg" className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <ResponsiveText size="lg" weight="medium" className="mb-2">
                No services found
              </ResponsiveText>
              <ResponsiveText color="muted" className="mb-4">
                {searchQuery || filters.status !== 'all' || filters.visaType !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create your first visa service to get started'
                }
              </ResponsiveText>
              {!searchQuery && filters.status === 'all' && filters.visaType === 'all' && (
                <TouchButton
                  onClick={() => navigate('/dashboard/services/new')}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Create Service
                </TouchButton>
              )}
            </ResponsiveCard>
          ) : (
            filteredServices.map((service, index) => {
              const StatusIcon = getStatusIcon(service.status)
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ResponsiveCard padding="lg" hover className="group">
                    <ResponsiveFlex direction="responsive" gap="md" align="start">
                      {/* Service Info */}
                      <div className="flex-1 min-w-0">
                        <ResponsiveFlex direction="row" align="start" gap="md" className="mb-3">
                          {/* Selection Checkbox */}
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedServices([...selectedServices, service.id])
                              } else {
                                setSelectedServices(selectedServices.filter(id => id !== service.id))
                              }
                            }}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />

                          <div className="flex-1 min-w-0">
                            <ResponsiveFlex direction="row" align="center" gap="sm" className="mb-2">
                              <ResponsiveText size="lg" weight="bold" truncate>
                                {service.title}
                              </ResponsiveText>
                              
                              {service.featured && (
                                <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                                  <Star className="w-3 h-3" />
                                  <span>Featured</span>
                                </div>
                              )}

                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(service.status)}`}>
                                <StatusIcon className="w-3 h-3" />
                                <span>{service.status.charAt(0).toUpperCase() + service.status.slice(1)}</span>
                              </div>
                            </ResponsiveFlex>

                            <ResponsiveText size="sm" color="muted" className="mb-3 line-clamp-2">
                              {service.description}
                            </ResponsiveText>

                            <ResponsiveFlex direction="responsive" gap="md" align="center">
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Globe className="w-4 h-4" />
                                  <span>{service.targetCountry}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{service.processingTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Tag className="w-4 h-4" />
                                  <span className="capitalize">{service.visaType}</span>
                                </div>
                              </div>

                              {service.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {service.tags.slice(0, 3).map(tag => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {service.tags.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                      +{service.tags.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </ResponsiveFlex>
                          </div>
                        </ResponsiveFlex>
                      </div>

                      {/* Performance Metrics */}
                      <div className="flex-shrink-0">
                        <ResponsiveGrid cols={isMobile ? 2 : 4} gap="sm" className="mb-4">
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <ResponsiveText size="sm" weight="bold">
                              {formatCurrency(service.totalPrice)}
                            </ResponsiveText>
                            <ResponsiveText size="sm" color="muted">
                              Price
                            </ResponsiveText>
                          </div>

                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <ResponsiveText size="sm" weight="bold">
                              {service.applications}
                            </ResponsiveText>
                            <ResponsiveText size="sm" color="muted">
                              Applications
                            </ResponsiveText>
                          </div>

                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <ResponsiveText size="sm" weight="bold">
                              {service.conversionRate > 0 ? `${service.conversionRate}%` : 'N/A'}
                            </ResponsiveText>
                            <ResponsiveText size="sm" color="muted">
                              Conversion
                            </ResponsiveText>
                          </div>

                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <ResponsiveText size="sm" weight="bold">
                              {formatCurrency(service.revenue)}
                            </ResponsiveText>
                            <ResponsiveText size="sm" color="muted">
                              Revenue
                            </ResponsiveText>
                          </div>
                        </ResponsiveGrid>

                        {/* Actions */}
                        <ResponsiveFlex direction="row" gap="sm" justify="end">
                          <GhostButton
                            size="sm"
                            onClick={() => handleServiceAction('view', service.id)}
                            leftIcon={<Eye className="w-4 h-4" />}
                          >
                            View
                          </GhostButton>
                          
                          <SecondaryButton
                            size="sm"
                            onClick={() => handleServiceAction('edit', service.id)}
                            leftIcon={<Edit3 className="w-4 h-4" />}
                          >
                            Edit
                          </SecondaryButton>

                          <div className="relative group">
                            <GhostButton
                              size="sm"
                              leftIcon={<MoreHorizontal className="w-4 h-4" />}
                            />
                            
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                              <button
                                onClick={() => handleServiceAction('duplicate', service.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate
                              </button>
                              <button
                                onClick={() => handleServiceAction('share', service.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </button>
                              <button
                                onClick={() => navigate(`/dashboard/analytics/service/${service.id}`)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Analytics
                              </button>
                              
                              <hr className="my-1" />
                              
                              {service.status === 'active' ? (
                                <button
                                  onClick={() => handleServiceAction('pause', service.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50"
                                >
                                  <Clock className="w-4 h-4 mr-2" />
                                  Pause
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleServiceAction('activate', service.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Activate
                                </button>
                              )}
                              
                              <button
                                onClick={() => handleServiceAction('archive', service.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Archive className="w-4 h-4 mr-2" />
                                Archive
                              </button>
                              
                              <button
                                onClick={() => handleServiceAction('delete', service.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </ResponsiveFlex>
                      </div>
                    </ResponsiveFlex>
                  </ResponsiveCard>
                </motion.div>
              )
            })
          )}
        </ResponsiveStack>

        {/* Development Mode Info */}
        {isDevelopmentMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ResponsiveCard padding="md" className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <ResponsiveFlex direction="row" align="center" gap="md">
                <Zap className="w-8 h-8 text-green-600" />
                <div className="flex-1">
                  <ResponsiveText weight="bold" className="text-green-900 mb-1">
                    🚀 ULTRA Service Management
                  </ResponsiveText>
                  <ResponsiveText size="sm" className="text-green-700">
                    Enhanced service management with advanced filtering, bulk operations, and real-time analytics.
                    All services shown are for development demonstration.
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