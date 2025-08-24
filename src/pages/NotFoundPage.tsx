import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  ArrowLeft, 
  Search, 
  Globe, 
  Users, 
  FileText,
  Compass,
  RotateCcw
} from 'lucide-react'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const quickLinks = [
    {
      title: 'Browse Visa Services',
      description: 'Explore our comprehensive visa services',
      href: '/services',
      icon: FileText,
      color: 'text-primary'
    },
    {
      title: 'Find Agents',
      description: 'Connect with verified visa agents',
      href: '/agents', 
      icon: Users,
      color: 'text-success'
    },
    {
      title: 'Dashboard',
      description: 'Access your account and applications',
      href: '/dashboard',
      icon: Home,
      color: 'text-warning'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-success/5 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='3'/%3E%3Ccircle cx='53' cy='7' r='3'/%3E%3Ccircle cx='53' cy='53' r='3'/%3E%3Ccircle cx='7' cy='53' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 left-16 w-24 h-24 bg-success/10 rounded-full blur-xl"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          variants={stagger}
          initial="initial" 
          animate="animate"
          className="space-y-8"
        >
          {/* 404 Illustration */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="text-8xl sm:text-9xl font-display font-bold text-primary/20 select-none">
              404
            </div>
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Compass className="h-16 w-16 text-primary/40" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Looks like you've ventured into uncharted territory. The page you're looking for 
              doesn't exist or may have been moved.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            variants={fadeInUp} 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={handleGoBack}
              variant="outline"
              size="lg"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </Button>
            <Button
              size="lg"
              className="flex items-center space-x-2"
              asChild
            >
              <Link to="/">
                <Home className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Or explore these popular sections:
            </h2>
            
            <motion.div
              variants={stagger}
              className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <Link
                    to={link.href}
                    className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-visa-card transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`p-3 rounded-lg bg-gray-50 group-hover:bg-primary/5 transition-colors`}>
                        <link.icon className={`h-6 w-6 ${link.color} group-hover:text-primary transition-colors`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div variants={fadeInUp} className="pt-8 border-t border-gray-200">
            <div className="max-w-md mx-auto">
              <p className="text-gray-600 mb-4">
                Looking for something specific? Try searching:
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search visa services, countries..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const searchTerm = (e.target as HTMLInputElement).value
                      if (searchTerm.trim()) {
                        navigate(`/services?search=${encodeURIComponent(searchTerm)}`)
                      }
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.div variants={fadeInUp} className="pt-8">
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 max-w-2xl mx-auto">
              <h3 className="font-semibold text-primary mb-2 flex items-center justify-center">
                <Globe className="h-5 w-5 mr-2" />
                Need Help?
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                If you believe this is an error or you were looking for a specific page, 
                please contact our support team. We're here to help you navigate your visa journey.
              </p>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact">
                    Contact Support
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Fun Fact */}
          <motion.div variants={fadeInUp} className="pt-4">
            <div className="text-sm text-gray-500">
              <p className="flex items-center justify-center">
                <RotateCcw className="h-4 w-4 mr-1" />
                Fun fact: 404 errors are named after room 404 at CERN where the first web server was located!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}