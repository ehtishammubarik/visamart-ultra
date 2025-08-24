import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Search,
  Filter,
  Star,
  MapPin,
  Globe,
  Users,
  Award,
  Clock,
  CheckCircle,
  Languages,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react'
import { Button } from '../components/ui/Button'

// Mock data
const agents = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'Global Visa Solutions',
    rating: 4.9,
    reviewCount: 127,
    successRate: 98,
    location: 'New York, USA',
    languages: ['English', 'Spanish'],
    specialties: ['US Visa', 'UK Visa', 'Schengen Visa'],
    experience: '8+ years',
    avgProcessingTime: '12 days',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b7b5?w=150&h=150&fit=crop&crop=face',
    verified: true,
    totalClients: 350,
    price: 'From $150'
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'Pacific Immigration Services',
    rating: 4.8,
    reviewCount: 89,
    successRate: 96,
    location: 'Vancouver, Canada',
    languages: ['English', 'Mandarin', 'Cantonese'],
    specialties: ['Canada PR', 'Student Visa', 'Work Permit'],
    experience: '12+ years',
    avgProcessingTime: '15 days',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: true,
    totalClients: 580,
    price: 'From $200'
  },
  {
    id: '3',
    name: 'Priya Patel',
    company: 'European Visa Experts',
    rating: 4.9,
    reviewCount: 156,
    successRate: 97,
    location: 'London, UK',
    languages: ['English', 'Hindi', 'Gujarati'],
    specialties: ['UK Visa', 'EU Residence', 'Business Visa'],
    experience: '10+ years',
    avgProcessingTime: '10 days',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    verified: true,
    totalClients: 420,
    price: 'From $175'
  },
  {
    id: '4',
    name: 'Ahmed Al-Rashid',
    company: 'Middle East Immigration Hub',
    rating: 4.7,
    reviewCount: 73,
    successRate: 94,
    location: 'Dubai, UAE',
    languages: ['English', 'Arabic', 'French'],
    specialties: ['UAE Visa', 'GCC Permits', 'Investor Visa'],
    experience: '6+ years',
    avgProcessingTime: '8 days',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: true,
    totalClients: 240,
    price: 'From $120'
  },
  {
    id: '5',
    name: 'Maria Rodriguez',
    company: 'Latin America Visa Solutions',
    rating: 4.8,
    reviewCount: 94,
    successRate: 95,
    location: 'Mexico City, Mexico',
    languages: ['Spanish', 'English', 'Portuguese'],
    specialties: ['Mexico Visa', 'Brazil Visa', 'Student Exchange'],
    experience: '7+ years',
    avgProcessingTime: '14 days',
    profileImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    verified: true,
    totalClients: 310,
    price: 'From $100'
  },
  {
    id: '6',
    name: 'Hans Mueller',
    company: 'Germanic Immigration Services',
    rating: 4.9,
    reviewCount: 112,
    successRate: 99,
    location: 'Berlin, Germany',
    languages: ['German', 'English', 'French'],
    specialties: ['Germany Visa', 'EU Blue Card', 'Family Reunion'],
    experience: '15+ years',
    avgProcessingTime: '16 days',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    verified: true,
    totalClients: 650,
    price: 'From $180'
  }
]

export function AgentDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort logic
  const filteredAgents = agents
    .filter(agent => {
      const matchesSearch = searchQuery === '' || 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCountry = selectedCountry === '' || 
        agent.location.includes(selectedCountry)
      
      const matchesSpecialty = selectedSpecialty === '' ||
        agent.specialties.some(s => s.includes(selectedSpecialty))
      
      return matchesSearch && matchesCountry && matchesSpecialty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.reviewCount - a.reviewCount
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience)
        case 'success':
          return b.successRate - a.successRate
        default:
          return 0
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
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              Find Your Trusted Visa Agent
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Connect with verified professionals who specialize in your destination country
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by agent name, company, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:outline-none text-lg"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-primary-200 text-sm">Verified Agents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-primary-200 text-sm">Countries Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">95%</div>
                <div className="text-primary-200 text-sm">Average Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-primary-200 text-sm">Support Available</div>
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
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="UAE">United Arab Emirates</option>
                </select>

                {/* Specialty Filter */}
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Specialties</option>
                  <option value="US Visa">US Visa</option>
                  <option value="UK Visa">UK Visa</option>
                  <option value="Student Visa">Student Visa</option>
                  <option value="Work Permit">Work Permit</option>
                  <option value="Business Visa">Business Visa</option>
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="reviews">Sort by Reviews</option>
                  <option value="experience">Sort by Experience</option>
                  <option value="success">Sort by Success Rate</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">
                  {filteredAgents.length} agents found
                </span>
              </div>
            </div>
          </motion.div>

          {/* Agent Grid */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAgents.map((agent) => (
              <motion.div
                key={agent.id}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-visa-card transition-all duration-300 group"
              >
                {/* Agent Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={agent.profileImage}
                        alt={agent.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {agent.verified && (
                        <div className="absolute -top-1 -right-1 bg-success rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {agent.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{agent.company}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-warning fill-current mr-1" />
                          <span className="font-medium">{agent.rating}</span>
                          <span className="text-gray-500 ml-1">({agent.reviewCount})</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{agent.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Details */}
                <div className="p-6">
                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Languages className="h-4 w-4 mr-2" />
                      <span className="font-medium">Languages:</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {agent.languages.join(', ')}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-success">{agent.successRate}%</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-primary">{agent.avgProcessingTime}</div>
                      <div className="text-xs text-gray-600">Avg. Processing</div>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">{agent.price}</span>
                      <span className="text-sm text-gray-500 ml-1">per service</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="group-hover:bg-primary/90 transition-colors"
                      asChild
                    >
                      <Link to={`/agents/${agent.id}`}>
                        View Profile
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Quick Stats Footer */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {agent.totalClients} clients served
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {agent.experience} experience
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          {filteredAgents.length >= 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <Button variant="outline" size="lg">
                Load More Agents
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* No Results */}
          {filteredAgents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No agents found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all available agents.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCountry('')
                  setSelectedSpecialty('')
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
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let us help you find the perfect visa agent for your specific needs.
              Our team will match you with verified professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Get Personalized Recommendations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}