// VisaMart ULTRA - Agent Management Page (Admin)
// Administrative interface for managing agent onboarding and verification

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Users,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  FileText,
  Star,
  MapPin,
  Globe,
  Mail,
  Phone,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  MoreHorizontal,
  MessageCircle,
  UserPlus,
  UserCheck,
  UserX,
  Zap,
  BarChart3,
  TrendingUp,
  DollarSign
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
import { mockTestAgents, getAgentByStatus, getAgentsStats, type TestAgent } from '../../data/mockAgents'

interface AgentFilters {
  status: 'all' | 'draft' | 'submitted' | 'approved' | 'rejected' | 'resubmitted'
  country: 'all' | string
  specialization: 'all' | string
  sortBy: 'name' | 'joinedDate' | 'rating' | 'revenue' | 'applications'
  sortOrder: 'asc' | 'desc'
}

export function AgentManagementPage() {
  const { user, isDevelopmentMode } = useAuth()
  const { enhanceAgentFeature } = useSubagents()
  const { toast } = useToast()
  const { isMobile, isTablet } = useBreakpoint()
  const navigate = useNavigate()

  const [agents, setAgents] = useState<TestAgent[]>([])
  const [filteredAgents, setFilteredAgents] = useState<TestAgent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<AgentFilters>({
    status: 'all',
    country: 'all',
    specialization: 'all',
    sortBy: 'joinedDate',
    sortOrder: 'desc'
  })
  const [selectedAgent, setSelectedAgent] = useState<TestAgent | null>(null)
  const [showAgentModal, setShowAgentModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadAgents()
  }, [])

  useEffect(() => {
    applyFiltersAndSearch()
  }, [agents, searchQuery, filters])

  const loadAgents = async () => {
    setIsLoading(true)
    
    // Simulate API loading
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setAgents(mockTestAgents)
    setIsLoading(false)

    if (isDevelopmentMode) {
      enhanceAgentFeature(
        'Agent Management System',
        'Loaded comprehensive agent management interface with verification workflow',
        'high'
      )
    }
  }

  const applyFiltersAndSearch = () => {
    let filtered = [...agents]

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(agent =>
        `${agent.personalInfo.firstName} ${agent.personalInfo.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.businessInfo.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.personalInfo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.expertise.countries.some(country => country.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(agent => agent.status === filters.status)
    }

    // Apply country filter
    if (filters.country !== 'all') {
      filtered = filtered.filter(agent => agent.expertise.countries.includes(filters.country))
    }

    // Apply specialization filter
    if (filters.specialization !== 'all') {
      filtered = filtered.filter(agent => agent.expertise.specializations.includes(filters.specialization))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (filters.sortBy) {
        case 'name':
          aValue = `${a.personalInfo.firstName} ${a.personalInfo.lastName}`.toLowerCase()
          bValue = `${b.personalInfo.firstName} ${b.personalInfo.lastName}`.toLowerCase()
          break
        case 'joinedDate':
          aValue = new Date(a.joinedDate)
          bValue = new Date(b.joinedDate)
          break
        case 'rating':
          aValue = a.performance.rating
          bValue = b.performance.rating
          break
        case 'revenue':
          aValue = a.performance.monthlyRevenue
          bValue = b.performance.monthlyRevenue
          break
        case 'applications':
          aValue = a.expertise.totalApplications
          bValue = b.expertise.totalApplications
          break
        default:
          aValue = a.joinedDate
          bValue = b.joinedDate
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredAgents(filtered)
  }

  const handleAgentAction = async (action: string, agent: TestAgent) => {
    switch (action) {
      case 'approve':
        toast({
          type: 'success',
          title: 'Agent Approved',
          message: `${agent.personalInfo.firstName} ${agent.personalInfo.lastName} has been approved as a verified agent.`
        })
        // Update agent status in real app
        break
      case 'reject':
        toast({
          type: 'info',
          title: 'Agent Rejected',
          message: 'Rejection reason sent to agent via email.'
        })
        break
      case 'suspend':
        toast({
          type: 'warning',
          title: 'Agent Suspended',
          message: 'Agent account has been temporarily suspended.'
        })
        break
      case 'view':
        setSelectedAgent(agent)
        setShowAgentModal(true)
        break
      case 'message':
        toast({
          type: 'info',
          message: 'Message composer opened'
        })
        break
    }

    if (isDevelopmentMode) {
      enhanceAgentFeature(
        'Agent Action',
        `Performed ${action} on agent ${agent.personalInfo.firstName} ${agent.personalInfo.lastName}`,
        'medium'
      )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-100 border-green-200'
      case 'submitted':
        return 'text-blue-700 bg-blue-100 border-blue-200'
      case 'draft':
        return 'text-gray-700 bg-gray-100 border-gray-200'
      case 'rejected':
        return 'text-red-700 bg-red-100 border-red-200'
      case 'resubmitted':
        return 'text-orange-700 bg-orange-100 border-orange-200'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle
      case 'submitted':
        return Clock
      case 'draft':
        return FileText
      case 'rejected':
        return XCircle
      case 'resubmitted':
        return RefreshCw
      default:
        return AlertTriangle
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const agentStats = getAgentsStats()

  if (isLoading) {
    return (
      <ResponsiveContainer size="xl" center className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <LoadingSpinner size="xl" />
          <ResponsiveText size="lg" weight="medium" color="muted">
            Loading agent management system...
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
              Agent Management
            </ResponsiveText>
            <ResponsiveText color="muted">
              Manage agent onboarding, verification, and performance monitoring
            </ResponsiveText>
          </div>

          <ResponsiveFlex direction="row" gap="sm">
            <TouchButton
              onClick={loadAgents}
              variant="outline"
              size={isMobile ? 'lg' : 'default'}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </TouchButton>
            <TouchButton
              onClick={() => navigate('/admin/agents/invite')}
              size={isMobile ? 'lg' : 'default'}
              leftIcon={<UserPlus className="w-4 h-4" />}
            >
              Invite Agent
            </TouchButton>
          </ResponsiveFlex>
        </ResponsiveFlex>

        {/* Stats Overview */}
        <ResponsiveGrid cols={isMobile ? 2 : 5} gap="md">
          {[
            {
              title: 'Total Agents',
              value: agentStats.total.toString(),
              icon: Users,
              color: 'blue',
              change: null
            },
            {
              title: 'Approved',
              value: agentStats.approved.toString(),
              icon: CheckCircle,
              color: 'green',
              change: '+3 this week'
            },
            {
              title: 'Pending Review',
              value: agentStats.pending.toString(),
              icon: Clock,
              color: 'orange',
              change: '2 urgent'
            },
            {
              title: 'Monthly Revenue',
              value: formatCurrency(agentStats.totalRevenue),
              icon: DollarSign,
              color: 'purple',
              change: '+15.3%'
            },
            {
              title: 'Avg Rating',
              value: `${agentStats.avgRating}/5.0`,
              icon: Star,
              color: 'yellow',
              change: '+0.2 pts'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ResponsiveCard padding="md" hover>
                <ResponsiveFlex direction="row" justify="between" align="start" className="mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    stat.color === 'green' ? 'bg-green-100 text-green-600' :
                    stat.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                    stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </ResponsiveFlex>
                <ResponsiveText size="2xl" weight="bold" className="mb-1">
                  {stat.value}
                </ResponsiveText>
                <ResponsiveText size="sm" color="muted" className="mb-1">
                  {stat.title}
                </ResponsiveText>
                {stat.change && (
                  <ResponsiveText size="sm" className="text-green-600">
                    {stat.change}
                  </ResponsiveText>
                )}
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
                placeholder="Search agents by name, company, or email..."
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
                      <option value="submitted">Pending Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="draft">Draft</option>
                      <option value="resubmitted">Resubmitted</option>
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
                      <option value="joinedDate">Join Date</option>
                      <option value="name">Name</option>
                      <option value="rating">Rating</option>
                      <option value="revenue">Revenue</option>
                      <option value="applications">Applications</option>
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

                  <div className="flex items-end">
                    <GhostButton
                      onClick={() => {
                        setFilters({
                          status: 'all',
                          country: 'all',
                          specialization: 'all',
                          sortBy: 'joinedDate',
                          sortOrder: 'desc'
                        })
                        setSearchQuery('')
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </GhostButton>
                  </div>
                </ResponsiveGrid>
              </motion.div>
            )}
          </AnimatePresence>
        </ResponsiveCard>

        {/* Agents List */}
        <ResponsiveStack spacing="sm">
          {filteredAgents.length === 0 ? (
            <ResponsiveCard padding="lg" className="text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <ResponsiveText size="lg" weight="medium" className="mb-2">
                No agents found
              </ResponsiveText>
              <ResponsiveText color="muted">
                {searchQuery || filters.status !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'No agents have registered yet'
                }
              </ResponsiveText>
            </ResponsiveCard>
          ) : (
            filteredAgents.map((agent, index) => {
              const StatusIcon = getStatusIcon(agent.status)
              
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <ResponsiveCard padding="lg" hover className="group">
                    <ResponsiveFlex direction="responsive" gap="md" align="start">
                      {/* Agent Info */}
                      <div className="flex-1 min-w-0">
                        <ResponsiveFlex direction="row" align="start" gap="md" className="mb-4">
                          {/* Avatar */}
                          <img
                            src={agent.personalInfo.profilePhoto}
                            alt={`${agent.personalInfo.firstName} ${agent.personalInfo.lastName}`}
                            className="w-12 h-12 rounded-full ring-2 ring-gray-200 flex-shrink-0"
                          />

                          {/* Basic Info */}
                          <div className="flex-1 min-w-0">
                            <ResponsiveFlex direction="row" align="center" gap="sm" className="mb-2">
                              <ResponsiveText size="lg" weight="bold" truncate>
                                {agent.personalInfo.firstName} {agent.personalInfo.lastName}
                              </ResponsiveText>
                              
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                                <StatusIcon className="w-3 h-3" />
                                <span>{agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}</span>
                              </div>

                              {agent.status === 'approved' && (
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <ResponsiveText size="sm" weight="medium">
                                    {agent.performance.rating.toFixed(1)}
                                  </ResponsiveText>
                                  <ResponsiveText size="sm" color="muted">
                                    ({agent.performance.reviews} reviews)
                                  </ResponsiveText>
                                </div>
                              )}
                            </ResponsiveFlex>

                            <ResponsiveText weight="medium" className="mb-1">
                              {agent.businessInfo.companyName}
                            </ResponsiveText>

                            <ResponsiveFlex direction="row" align="center" gap="sm" className="mb-3 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4" />
                                <span className="truncate">{agent.personalInfo.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>Joined {formatDate(agent.joinedDate)}</span>
                              </div>
                            </ResponsiveFlex>

                            {/* Expertise */}
                            <ResponsiveFlex direction="row" gap="md" align="center" className="mb-3">
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Award className="w-4 h-4" />
                                <span>{agent.expertise.yearsOfExperience} years</span>
                              </div>
                              
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Globe className="w-4 h-4" />
                                <span>{agent.expertise.countries.length} countries</span>
                              </div>

                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <FileText className="w-4 h-4" />
                                <span>{agent.expertise.totalApplications} applications</span>
                              </div>
                            </ResponsiveFlex>

                            {/* Countries and Specializations */}
                            <div className="flex flex-wrap gap-1 mb-2">
                              {agent.expertise.countries.slice(0, 3).map(country => (
                                <span
                                  key={country}
                                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                >
                                  {country}
                                </span>
                              ))}
                              {agent.expertise.countries.length > 3 && (
                                <span className="text-xs text-gray-500 py-1">
                                  +{agent.expertise.countries.length - 3} more
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {agent.expertise.specializations.slice(0, 2).map(spec => (
                                <span
                                  key={spec}
                                  className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                                >
                                  {spec}
                                </span>
                              ))}
                              {agent.expertise.specializations.length > 2 && (
                                <span className="text-xs text-gray-500 py-1">
                                  +{agent.expertise.specializations.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        </ResponsiveFlex>
                      </div>

                      {/* Performance Stats & Actions */}
                      <div className="flex-shrink-0">
                        {agent.status === 'approved' && (
                          <ResponsiveGrid cols={2} gap="sm" className="mb-4">
                            <div className="text-center p-2 bg-green-50 rounded-lg">
                              <ResponsiveText size="sm" weight="bold" className="text-green-900">
                                {formatCurrency(agent.performance.monthlyRevenue)}
                              </ResponsiveText>
                              <ResponsiveText size="sm" className="text-green-700">
                                Monthly
                              </ResponsiveText>
                            </div>
                            <div className="text-center p-2 bg-blue-50 rounded-lg">
                              <ResponsiveText size="sm" weight="bold" className="text-blue-900">
                                {agent.performance.activeServices}
                              </ResponsiveText>
                              <ResponsiveText size="sm" className="text-blue-700">
                                Services
                              </ResponsiveText>
                            </div>
                          </ResponsiveGrid>
                        )}

                        {/* Action Buttons */}
                        <ResponsiveFlex direction="row" gap="sm" justify="end">
                          <GhostButton
                            size="sm"
                            onClick={() => handleAgentAction('view', agent)}
                            leftIcon={<Eye className="w-4 h-4" />}
                          >
                            View
                          </GhostButton>

                          {agent.status === 'submitted' && (
                            <>
                              <SecondaryButton
                                size="sm"
                                onClick={() => handleAgentAction('approve', agent)}
                                leftIcon={<Check className="w-4 h-4" />}
                                className="text-green-700 border-green-300 hover:bg-green-50"
                              >
                                Approve
                              </SecondaryButton>
                              <SecondaryButton
                                size="sm"
                                onClick={() => handleAgentAction('reject', agent)}
                                leftIcon={<X className="w-4 h-4" />}
                                variant="destructive"
                              >
                                Reject
                              </SecondaryButton>
                            </>
                          )}

                          <GhostButton
                            size="sm"
                            onClick={() => handleAgentAction('message', agent)}
                            leftIcon={<MessageCircle className="w-4 h-4" />}
                          >
                            Message
                          </GhostButton>
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
                    🚀 ULTRA Agent Management System
                  </ResponsiveText>
                  <ResponsiveText size="sm" className="text-green-700">
                    Advanced agent verification workflow with automated screening, performance monitoring, and comprehensive admin tools.
                    All agents shown are test data for development demonstration.
                  </ResponsiveText>
                </div>
                <div className="text-right">
                  <ResponsiveText weight="bold" className="text-green-900">
                    {agents.length} Test Agents
                  </ResponsiveText>
                  <ResponsiveText size="sm" className="text-green-700">
                    Loaded from mock data
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