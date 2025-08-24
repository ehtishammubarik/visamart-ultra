// VisaMart ULTRA - International Landing Page
// Modern, conversion-focused landing inspired by top international marketplace designs

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Globe,
  ArrowRight,
  Users,
  CheckCircle,
  Star,
  Shield,
  Zap,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  Languages,
  PlayCircle,
  ChevronRight,
  Search,
  Filter,
  Eye,
  Heart,
  MessageCircle,
  Sparkles,
  Rocket,
  Target,
  Compass,
  Calendar,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'

import { useAuth } from '../providers/AuthProvider'
import { PrimaryButton, SecondaryButton, GhostButton, TouchButton } from '../components/ui/Button'
import { 
  ResponsiveContainer, 
  ResponsiveGrid, 
  ResponsiveCard, 
  ResponsiveFlex,
  ResponsiveStack,
  ResponsiveText,
  ResponsiveBreakpoint
} from '../components/layout/ResponsiveContainer'
import { useBreakpoint } from '../hooks/useResponsive'
import { getTopPerformingAgents } from '../data/mockAgents'

export function LandingPage() {
  const { isAuthenticated, isDevelopmentMode, login } = useAuth()
  const { isMobile, isTablet } = useBreakpoint()
  const navigate = useNavigate()
  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 300], [0, -50])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8])

  const topAgents = getTopPerformingAgents(6)

  const stats = [
    { label: 'Verified Agents', value: '2,500+', icon: Shield },
    { label: 'Successful Applications', value: '45,000+', icon: CheckCircle },
    { label: 'Countries Covered', value: '150+', icon: Globe },
    { label: 'Customer Rating', value: '4.9/5', icon: Star }
  ]

  const popularCountries = [
    { name: 'United States', flag: '🇺🇸', applications: '12,456', rating: 4.9 },
    { name: 'Canada', flag: '🇨🇦', applications: '8,934', rating: 4.8 },
    { name: 'United Kingdom', flag: '🇬🇧', applications: '7,123', rating: 4.9 },
    { name: 'Germany', flag: '🇩🇪', applications: '6,789', rating: 4.7 },
    { name: 'Australia', flag: '🇦🇺', applications: '5,432', rating: 4.8 },
    { name: 'France', flag: '🇫🇷', applications: '4,321', rating: 4.6 }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      country: 'Nigeria → Canada',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=2563eb&color=fff&size=64',
      rating: 5,
      text: 'VisaMart connected me with an amazing agent who made my Canadian immigration process seamless. I got my visa in just 3 months!'
    },
    {
      name: 'Ahmed Hassan',
      country: 'Egypt → Germany',
      image: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&background=059669&color=fff&size=64',
      rating: 5,
      text: 'The agent I found through VisaMart was professional, knowledgeable, and guided me through every step of my German work visa application.'
    },
    {
      name: 'Maria Santos',
      country: 'Philippines → Australia',
      image: 'https://ui-avatars.com/api/?name=Maria+Santos&background=7C3AED&color=fff&size=64',
      rating: 5,
      text: 'Thanks to VisaMart, I found a trusted agent who helped me secure my Australian student visa. The platform made everything so easy!'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Verified Agents Only',
      description: 'All agents are licensed, background-checked, and performance-monitored for your security.',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access agents specializing in 150+ countries with local expertise and connections.',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'High Success Rates',
      description: '94% average success rate across all visa applications processed through our platform.',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Faster Processing',
      description: 'Our agents expedite your application with insider knowledge and streamlined processes.',
      color: 'orange'
    }
  ]

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      login()
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <ResponsiveContainer center className="relative z-10 py-20">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="text-center"
          >
            {/* Logo & Development Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center space-x-4 mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              {isDevelopmentMode && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-green-800">ULTRA LANDING</span>
                </div>
              )}
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Your Visa Journey
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Connect with verified visa agents worldwide. Get expert guidance, 
                faster processing, and higher success rates for your dream destination.
              </p>
            </motion.div>

            {/* Hero CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
            >
              <TouchButton
                onClick={handleGetStarted}
                size={isMobile ? 'xl' : 'xl'}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl transform hover:scale-105 transition-all duration-300"
                leftIcon={<Rocket className="w-5 h-5" />}
              >
                Get Started Free
              </TouchButton>

              <GhostButton
                onClick={() => setIsVideoModalOpen(true)}
                size={isMobile ? 'lg' : 'xl'}
                leftIcon={<PlayCircle className="w-5 h-5" />}
                className="border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600"
              >
                Watch How It Works
              </GhostButton>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-blue-600 mr-2" />
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </ResponsiveContainer>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </section>

      {/* Popular Countries Section */}
      <ResponsiveContainer className="py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most sought-after countries and find verified agents who specialize in your destination
            </p>
          </motion.div>
        </div>

        <ResponsiveGrid cols={isMobile ? 2 : isTablet ? 3 : 3} gap="lg">
          {popularCountries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => navigate(`/agents?country=${country.name}`)}
            >
              <ResponsiveCard padding="lg" className="text-center hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                  {country.flag}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {country.name}
                </h3>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{country.rating}</span>
                  <span className="text-gray-500">({country.applications} applications)</span>
                </div>
                <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700">
                  <span>Find Agents</span>
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </ResponsiveCard>
            </motion.div>
          ))}
        </ResponsiveGrid>
      </ResponsiveContainer>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <ResponsiveContainer>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Why Choose VisaMart?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're the world's most trusted visa marketplace, connecting you with verified professionals
              </p>
            </motion.div>
          </div>

          <ResponsiveGrid cols={isMobile ? 1 : 2} gap="lg">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <ResponsiveCard padding="lg" className="h-full hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      feature.color === 'green' ? 'bg-green-100 text-green-600' :
                      feature.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </ResponsiveCard>
              </motion.div>
            ))}
          </ResponsiveGrid>
        </ResponsiveContainer>
      </section>

      {/* Top Agents Showcase */}
      <ResponsiveContainer className="py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Top Rated Agents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Meet our highest-rated visa professionals with proven track records
            </p>
            <Link to="/agents">
              <SecondaryButton leftIcon={<Eye className="w-4 h-4" />}>
                View All Agents
              </SecondaryButton>
            </Link>
          </motion.div>
        </div>

        <ResponsiveGrid cols={isMobile ? 1 : isTablet ? 2 : 3} gap="lg">
          {topAgents.slice(0, 6).map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <ResponsiveCard padding="lg" className="text-center hover:shadow-xl transition-all duration-300">
                <div className="relative inline-block mb-4">
                  <img
                    src={agent.personalInfo.profilePhoto}
                    alt={`${agent.personalInfo.firstName} ${agent.personalInfo.lastName}`}
                    className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-blue-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {agent.personalInfo.firstName} {agent.personalInfo.lastName}
                </h3>
                <p className="text-gray-600 mb-3">{agent.businessInfo.companyName}</p>

                <div className="flex items-center justify-center space-x-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-bold">{agent.performance.rating.toFixed(1)}</span>
                  <span className="text-gray-500">({agent.performance.reviews} reviews)</span>
                </div>

                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {agent.expertise.countries.slice(0, 2).map(country => (
                    <span key={country} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {country}
                    </span>
                  ))}
                  {agent.expertise.countries.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{agent.expertise.countries.length - 2}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">{agent.expertise.successRate}%</div>
                    <div className="text-gray-500">Success Rate</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{agent.performance.responseTime}h</div>
                    <div className="text-gray-500">Response Time</div>
                  </div>
                </div>

                <TouchButton
                  onClick={() => navigate(`/agents/${agent.id}`)}
                  className="w-full"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                >
                  Contact Agent
                </TouchButton>
              </ResponsiveCard>
            </motion.div>
          ))}
        </ResponsiveGrid>
      </ResponsiveContainer>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <ResponsiveContainer>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Success Stories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real stories from people who achieved their visa dreams through VisaMart
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <ResponsiveCard padding="lg" className="bg-white shadow-2xl">
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-xl sm:text-2xl text-gray-900 mb-8 leading-relaxed font-medium">
                    "{testimonials[activeTestimonial].text}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="text-left">
                      <div className="font-bold text-gray-900 text-lg">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-blue-600 font-medium">
                        {testimonials[activeTestimonial].country}
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <ResponsiveContainer>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of successful visa applicants who found their perfect agent on VisaMart.
                Start your application today with zero upfront costs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <TouchButton
                  onClick={handleGetStarted}
                  size="xl"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
                  leftIcon={<Target className="w-5 h-5" />}
                >
                  Find Your Agent Now
                </TouchButton>

                <Link to="/agents">
                  <GhostButton
                    size="xl"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
                    leftIcon={<Compass className="w-5 h-5" />}
                  >
                    Browse All Agents
                  </GhostButton>
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center opacity-80">
                <div>
                  <div className="text-3xl font-bold">2,500+</div>
                  <div className="text-sm">Verified Agents</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">94%</div>
                  <div className="text-sm">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">150+</div>
                  <div className="text-sm">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm">Support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">How VisaMart Works</h3>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Demo video would be embedded here</p>
                  <p className="text-sm text-gray-500 mt-2">3:45 - How to find and connect with verified visa agents</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Development Mode Indicator */}
      {isDevelopmentMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold">ULTRA INTERNATIONAL DESIGN</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}