import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Plus,
  ArrowRight,
  Globe,
  Star,
  DollarSign
} from 'lucide-react'
import { useAuth, useIsAgent } from '../../store/useAuthStore'
import { Button } from '../../components/ui/Button'

export function DashboardPage() {
  const { user } = useAuth0()
  const { user: userData } = useAuth()
  const isAgent = useIsAgent()

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Mock data - in real app this would come from API
  const userStats = {
    applications: 3,
    pending: 1,
    approved: 2,
    inReview: 0
  }

  const agentStats = {
    totalServices: 12,
    activeApplications: 24,
    successRate: 95,
    totalRevenue: 15420,
    monthlyApplications: 18,
    avgProcessingTime: 14
  }

  const recentApplications = [
    {
      id: '1',
      service: 'UK Tourist Visa',
      agent: 'Sarah Johnson',
      status: 'approved',
      submittedDate: '2024-01-15',
      country: 'United Kingdom'
    },
    {
      id: '2', 
      service: 'Schengen Visa',
      agent: 'Mike Chen',
      status: 'pending',
      submittedDate: '2024-01-20',
      country: 'Germany'
    },
    {
      id: '3',
      service: 'US B1/B2 Visa',
      agent: 'Priya Patel',
      status: 'in_review',
      submittedDate: '2024-01-25',
      country: 'United States'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-success bg-success/10'
      case 'pending':
        return 'text-warning bg-warning/10'
      case 'in_review':
        return 'text-primary bg-primary/10'
      case 'rejected':
        return 'text-destructive bg-destructive/10'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatStatus = (status: string) => {
    switch (status) {
      case 'in_review':
        return 'In Review'
      case 'approved':
        return 'Approved'
      case 'pending':
        return 'Pending'
      case 'rejected':
        return 'Rejected'
      default:
        return status
    }
  }

  if (isAgent) {
    return (
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Agent Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user?.name || 'Agent'}! Here's your business overview.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Service
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              title: 'Total Services',
              value: agentStats.totalServices,
              icon: Globe,
              color: 'text-primary',
              bgColor: 'bg-primary/10'
            },
            {
              title: 'Active Applications',
              value: agentStats.activeApplications,
              icon: FileText,
              color: 'text-warning',
              bgColor: 'bg-warning/10'
            },
            {
              title: 'Success Rate',
              value: `${agentStats.successRate}%`,
              icon: TrendingUp,
              color: 'text-success',
              bgColor: 'bg-success/10'
            },
            {
              title: 'Total Revenue',
              value: `$${agentStats.totalRevenue.toLocaleString()}`,
              icon: DollarSign,
              color: 'text-primary',
              bgColor: 'bg-primary/10'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-visa-card transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Create New Service',
              description: 'Add a new visa service to your portfolio',
              icon: Plus,
              color: 'text-primary',
              bgColor: 'bg-primary/5',
              href: '/dashboard/services/new'
            },
            {
              title: 'Review Applications',
              description: 'Check pending applications from clients',
              icon: FileText,
              color: 'text-warning',
              bgColor: 'bg-warning/5',
              href: '/dashboard/applications'
            },
            {
              title: 'View Analytics',
              description: 'Track your performance and earnings',
              icon: BarChart3,
              color: 'text-success',
              bgColor: 'bg-success/5',
              href: '/dashboard/analytics'
            }
          ].map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-visa-card transition-all group"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Applications
              </h2>
              <Link 
                to="/dashboard/applications"
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {application.service}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {application.country} • {new Date(application.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {formatStatus(application.status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No recent applications</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // User Dashboard
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">
          Track your visa applications and discover new services
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            title: 'Total Applications',
            value: userStats.applications,
            icon: FileText,
            color: 'text-primary',
            bgColor: 'bg-primary/10'
          },
          {
            title: 'Pending Review',
            value: userStats.pending,
            icon: Clock,
            color: 'text-warning',
            bgColor: 'bg-warning/10'
          },
          {
            title: 'Approved',
            value: userStats.approved,
            icon: CheckCircle,
            color: 'text-success',
            bgColor: 'bg-success/10'
          },
          {
            title: 'In Review',
            value: userStats.inReview,
            icon: AlertCircle,
            color: 'text-primary',
            bgColor: 'bg-primary/10'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-visa-card transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Browse Services',
            description: 'Find visa services for your destination',
            icon: Globe,
            color: 'text-primary',
            bgColor: 'bg-primary/5',
            href: '/services'
          },
          {
            title: 'Find Agents',
            description: 'Connect with verified visa agents',
            icon: Users,
            color: 'text-success',
            bgColor: 'bg-success/5',
            href: '/agents'
          },
          {
            title: 'Become an Agent',
            description: 'Join our network of trusted agents',
            icon: Star,
            color: 'text-warning',
            bgColor: 'bg-warning/5',
            href: '/dashboard/agent-onboarding'
          }
        ].map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-visa-card transition-all group"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {action.description}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Recent Applications */}
      <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Recent Applications
            </h2>
            <Link 
              to="/dashboard/applications"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          {recentApplications.length > 0 ? (
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {application.service}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Agent: {application.agent} • {new Date(application.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                    {formatStatus(application.status)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start your visa journey by browsing our services
              </p>
              <Button asChild>
                <Link to="/services">
                  Browse Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}