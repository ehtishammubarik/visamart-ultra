import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { motion } from 'framer-motion'
import {
  Globe,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  FileText,
  Award,
  Zap,
  TrendingUp,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import { Button } from '../components/ui/Button'

export function HomePage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      loginWithRedirect({
        appState: { returnTo: '/dashboard' }
      })
    }
  }

  const handleBrowseServices = () => {
    navigate('/services')
  }

  const handleFindAgents = () => {
    navigate('/agents')
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-success/5 py-20 sm:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='3'/%3E%3Ccircle cx='53' cy='7' r='3'/%3E%3Ccircle cx='53' cy='53' r='3'/%3E%3Ccircle cx='7' cy='53' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-10 w-24 h-24 bg-success/10 rounded-full blur-xl"
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div {...fadeInUp}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6">
                Your Visa Journey
                <span className="block text-primary">Simplified</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Connect with verified visa agents worldwide. Get expert guidance, 
                transparent pricing, and seamless application processing for your dream destination.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="text-lg px-8 py-4 bg-primary hover:bg-primary/90"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleBrowseServices}
                className="text-lg px-8 py-4"
              >
                Browse Services
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-gray-600">Successful Applications</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-success mb-2">500+</div>
                <div className="text-gray-600">Verified Agents</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-success mb-2">50+</div>
                <div className="text-gray-600">Countries Covered</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose VisaMart?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our comprehensive visa application platform
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Verified Agents",
                description: "All agents undergo rigorous verification and background checks for your security and peace of mind.",
                color: "text-success"
              },
              {
                icon: Clock,
                title: "Fast Processing",
                description: "Streamlined processes and expert guidance ensure your visa application is processed quickly and efficiently.",
                color: "text-primary"
              },
              {
                icon: Star,
                title: "Success Guarantee",
                description: "95% success rate with money-back guarantee if your application is rejected due to our service error.",
                color: "text-warning"
              },
              {
                icon: Globe,
                title: "Global Coverage",
                description: "Access visa services for 50+ countries with local expertise and insider knowledge.",
                color: "text-primary"
              },
              {
                icon: FileText,
                title: "Document Support",
                description: "Complete document review, preparation assistance, and real-time application tracking.",
                color: "text-success"
              },
              {
                icon: Users,
                title: "Expert Guidance",
                description: "Get personalized advice from experienced agents who understand visa requirements inside out.",
                color: "text-warning"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-visa-card transition-all duration-300 border border-transparent hover:border-primary/10"
              >
                <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-success/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your visa approved in 4 simple steps
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                step: "01",
                title: "Choose Service",
                description: "Browse verified agents and select the visa service that matches your needs.",
                icon: Globe
              },
              {
                step: "02", 
                title: "Submit Application",
                description: "Complete your application with guided assistance and document upload.",
                icon: FileText
              },
              {
                step: "03",
                title: "Expert Review",
                description: "Your assigned agent reviews and optimizes your application for success.",
                icon: Award
              },
              {
                step: "04",
                title: "Get Your Visa",
                description: "Track progress in real-time and receive your approved visa documents.",
                icon: CheckCircle
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white font-bold text-xl mb-6">
                  {step.step}
                </div>
                
                {/* Connector Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20 -z-10" />
                )}
                
                <step.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section for Agents */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Join Our Network of Verified Agents
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Grow your visa consultation business with our trusted platform. 
              Connect with clients worldwide and increase your revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                variant="secondary"
                onClick={handleFindAgents}
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-gray-100"
              >
                Become an Agent
                <Users className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleFindAgents}
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
              >
                Learn More
              </Button>
            </div>

            {/* Agent Benefits */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Grow Your Business",
                  description: "Access a global client base and increase your revenue streams"
                },
                {
                  icon: Zap,
                  title: "Streamlined Tools",
                  description: "Use our advanced platform to manage clients and applications efficiently"
                },
                {
                  icon: Award,
                  title: "Build Credibility",
                  description: "Get verified badge and showcase your expertise to potential clients"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <benefit.icon className="h-12 w-12 text-primary-200 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-100 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thousands of successful visa applications and happy clients
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Student Visa to Canada",
                content: "VisaMart made my student visa application incredibly smooth. The agent guided me through every step and my visa was approved in just 3 weeks!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b7b5?w=150&h=150&fit=crop&crop=face"
              },
              {
                name: "Michael Chen",
                role: "Work Visa to Australia", 
                content: "Professional service with transparent pricing. The document checklist feature saved me so much time. Highly recommend!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              },
              {
                name: "Priya Patel",
                role: "Tourist Visa to Europe",
                content: "Excellent support team and very responsive agent. They helped me get my Schengen visa approved on the first try. Thank you VisaMart!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-warning fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Ready to Start Your Visa Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful applicants who chose VisaMart for their visa needs
            </p>
            
            <Button
              size="lg"
              variant="secondary"
              onClick={handleGetStarted}
              className="text-lg px-8 py-4 bg-white text-primary hover:bg-gray-100"
            >
              Start Your Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}