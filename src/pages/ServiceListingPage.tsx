import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Star,
  User,
  CheckCircle,
  Globe,
  ArrowRight,
  Calendar,
  Shield,
  Zap,
  Award
} from 'lucide-react'
import { Button } from '../components/ui/Button'

// Mock data
const services = [
  {
    id: '1',
    title: 'US Tourist Visa (B1/B2)',
    description: 'Complete assistance for US tourist and business visa application with document preparation and interview guidance.',
    country: 'United States',
    visaType: 'Tourist',
    processingTime: 14,
    totalPrice: 299,
    embassyFee: 160,
    serviceCharges: 139,
    successRate: 98,
    featured: true,
    agent: {
      id: '1',
      name: 'Sarah Johnson',
      company: 'Global Visa Solutions',
      rating: 4.9,
      reviewCount: 127,
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b7b5?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    requirements: ['Valid Passport', 'Photos', 'Bank Statements', 'Employment Letter'],
    highlights: ['Interview Preparation', 'Document Review', '24/7 Support', 'Success Guarantee']
  },
  {
    id: '2',
    title: 'Canada Student Visa',
    description: 'Comprehensive support for Canadian study permit application including university admission guidance.',
    country: 'Canada',
    visaType: 'Student',
    processingTime: 21,
    totalPrice: 450,
    embassyFee: 150,
    serviceCharges: 300,
    successRate: 96,
    featured: false,
    agent: {
      id: '2',
      name: 'Michael Chen',
      company: 'Pacific Immigration Services',
      rating: 4.8,
      reviewCount: 89,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    requirements: ['Acceptance Letter', 'Financial Proof', 'Medical Exam', 'Language Test'],
    highlights: ['University Guidance', 'Financial Planning', 'Medical Assistance', 'Post-arrival Support']
  },
  {
    id: '3',
    title: 'UK Visitor Visa',
    description: 'Expert assistance for UK visitor visa with personalized document preparation and application support.',
    country: 'United Kingdom',
    visaType: 'Tourist',
    processingTime: 10,
    totalPrice: 275,
    embassyFee: 95,
    serviceCharges: 180,
    successRate: 97,
    featured: true,
    agent: {
      id: '3',
      name: 'Priya Patel',
      company: 'European Visa Experts',
      rating: 4.9,
      reviewCount: 156,
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    requirements: ['Valid Passport', 'Bank Statements', 'Accommodation Proof', 'Travel Insurance'],
    highlights: ['Fast Processing', 'Document Verification', 'Expert Review', 'Priority Support']
  },
  {
    id: '4',
    title: 'Germany Work Visa',
    description: 'Professional assistance for German work visa and Blue Card applications with job search support.',
    country: 'Germany',
    visaType: 'Work',
    processingTime: 28,
    totalPrice: 550,
    embassyFee: 75,
    serviceCharges: 475,
    successRate: 94,
    featured: false,
    agent: {
      id: '6',
      name: 'Hans Mueller',
      company: 'Germanic Immigration Services',
      rating: 4.9,
      reviewCount: 112,
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    requirements: ['Job Offer', 'Qualifications', 'Health Insurance', 'Clean Record'],
    highlights: ['Job Search Help', 'Blue Card Eligible', 'Family Support', 'Relocation Assistance']
  },
  {
    id: '5',
    title: 'Australia Tourist Visa',
    description: 'Complete support for Australian visitor visa with fast online application processing.',
    country: 'Australia',
    visaType: 'Tourist',
    processingTime: 7,
    totalPrice: 220,
    embassyFee: 145,
    serviceCharges: 75,
    successRate: 99,
    featured: true,
    agent: {
      id: '7',
      name: 'Emma Wilson',
      company: 'Aussie Visa Pro',
      rating: 4.8,
      reviewCount: 203,
      profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    requirements: ['Valid Passport', 'Health Check', 'Character Check', 'Financial Evidence'],
    highlights: ['Online Application', 'Quick Approval', 'Multiple Entry', '24/7 Tracking']
  },
  {
    id: '6',
    title: 'UAE Golden Visa',
    description: 'Premium service for UAE Golden Visa application with investment and business setup guidance.',
    country: 'United Arab Emirates',
    visaType: 'Investment',
    processingTime: 30,
    totalPrice: 1200,
    embassyFee: 0,
    serviceCharges: 1200,
    successRate: 92,
    featured: false,
    agent: {
      id: '4',
      name: 'Ahmed Al-Rashid',
      company: 'Middle East Immigration Hub',
      rating: 4.7,
      reviewCount: 73,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    requirements: ['Investment Proof', 'Business Plan', 'Financial Statements', 'Property Documents'],
    highlights: ['10-Year Visa', 'Family Inclusion', 'Business Setup', 'Premium Service']
  }
]

export function ServiceListingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500])
  const [sortBy, setSortBy] = useState('featured')

  // Filter and sort logic
  const filteredServices = services
    .filter(service => {
      const matchesSearch = searchQuery === '' || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.country.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCountry = selectedCountry === '' || 
        service.country === selectedCountry
      
      const matchesType = selectedType === '' ||
        service.visaType === selectedType
      
      const matchesPrice = service.totalPrice >= priceRange[0] && 
        service.totalPrice <= priceRange[1]
      
      return matchesSearch && matchesCountry && matchesType && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.totalPrice - b.totalPrice
        case 'price-high':
          return b.totalPrice - a.totalPrice
        case 'processing':
          return a.processingTime - b.processingTime
        case 'success':
          return b.successRate - a.successRate
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.successRate - a.successRate
      }
    })

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-success text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              Visa Services Marketplace
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Compare and choose from hundreds of visa services offered by verified agents worldwide
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search visa services, countries, or visa types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:outline-none text-lg"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">1,200+</div>
                <div className="text-white/80 text-sm">Active Services</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-white/80 text-sm">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">95%</div>
                <div className="text-white/80 text-sm">Average Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">15</div>
                <div className="text-white/80 text-sm">Days Avg Processing</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <motion.div {...fadeInUp} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center gap-4 flex-wrap flex-1">
                {/* Country Filter */}
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Countries</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Australia">Australia</option>
                  <option value="United Arab Emirates">UAE</option>
                </select>

                {/* Visa Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Visa Types</option>
                  <option value="Tourist">Tourist/Visitor</option>
                  <option value="Student">Student</option>
                  <option value="Work">Work</option>
                  <option value="Business">Business</option>
                  <option value="Investment">Investment</option>
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="processing">Fastest Processing</option>
                  <option value="success">Highest Success Rate</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">
                  {filteredServices.length} services found
                </span>
              </div>
            </div>
          </motion.div>

          {/* Service Grid */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-visa-card transition-all duration-300 group relative"
              >
                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-warning text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </div>
                )}

                {/* Service Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Country and Type */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-4 w-4 mr-1" />
                      <span>{service.country}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{service.visaType} Visa</span>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={service.agent.profileImage}
                          alt={service.agent.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {service.agent.verified && (
                          <div className="absolute -top-1 -right-1 bg-success rounded-full p-0.5">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{service.agent.name}</p>
                        <p className="text-gray-600 text-xs">{service.agent.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <Star className="h-3 w-3 text-warning fill-current mr-1" />
                        <span className="font-medium">{service.agent.rating}</span>
                        <span className="text-gray-500 ml-1">({service.agent.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <Clock className="h-4 w-4 text-primary mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{service.processingTime} days</div>
                      <div className="text-xs text-gray-600">Processing</div>
                    </div>
                    <div className="text-center p-3 bg-success/5 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-success mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{service.successRate}%</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-warning/5 rounded-lg">
                      <Award className="h-4 w-4 text-warning mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">Expert</div>
                      <div className="text-xs text-gray-600">Verified</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Service Highlights</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.highlights.slice(0, 4).map((highlight, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-success mr-1 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${service.totalPrice}
                        </div>
                        <div className="text-xs text-gray-500">
                          Service: ${service.serviceCharges} + Embassy: ${service.embassyFee}
                        </div>
                      </div>
                      <Button 
                        className="group-hover:bg-primary/90 transition-colors"
                        asChild
                      >
                        <Link to={`/services/${service.id}`}>
                          Apply Now
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          {filteredServices.length >= 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <Button variant="outline" size="lg">
                Load More Services
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* No Results */}
          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No services found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all available services.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCountry('')
                  setSelectedType('')
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-success/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
              Need Help Finding the Right Service?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our visa experts can help you choose the best service for your specific situation and requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Talk to an Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}