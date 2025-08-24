import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Building,
  Award,
  Upload,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Globe,
  Languages,
  Calendar,
  Shield,
  AlertCircle,
  Clock,
  Star
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useAuth, useIsAgent } from '../../store/useAuthStore'
import { ProfileStatus } from '../../types'

interface FormData {
  // Personal Details
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Business Details
  companyName: string
  licenseNumber: string
  website: string
  officeAddress: string
  
  // Expertise
  regionsExpertise: string[]
  visaCategories: string[]
  languagesSpoken: string[]
  experienceYears: string
  bio: string
  specializations: string[]
  
  // Documents
  businessLicense: File | null
  idDocument: File | null
  certificates: File[]
}

export function AgentOnboardingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isAgent = useIsAgent()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>(ProfileStatus.DRAFT)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    licenseNumber: '',
    website: '',
    officeAddress: '',
    regionsExpertise: [],
    visaCategories: [],
    languagesSpoken: [],
    experienceYears: '',
    bio: '',
    specializations: [],
    businessLicense: null,
    idDocument: null,
    certificates: []
  })

  const totalSteps = 5

  // Mock data
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IN', name: 'India' },
    { code: 'CN', name: 'China' },
  ]

  const visaTypes = [
    { code: 'tourist', name: 'Tourist/Visitor Visa' },
    { code: 'business', name: 'Business Visa' },
    { code: 'student', name: 'Student Visa' },
    { code: 'work', name: 'Work Visa' },
    { code: 'transit', name: 'Transit Visa' },
    { code: 'family', name: 'Family Reunion' },
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ar', name: 'Arabic' },
  ]

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayToggle = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    
    handleInputChange(field, newArray)
  }

  const handleFileUpload = (field: keyof FormData, file: File) => {
    handleInputChange(field, file)
  }

  const handleSubmitProfile = () => {
    // TODO: Submit to API
    console.log('Submitting profile:', formData)
    setProfileStatus(ProfileStatus.SUBMITTED)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  // If already an agent, show status
  if (isAgent && profileStatus !== ProfileStatus.DRAFT) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="mb-8">
            {profileStatus === ProfileStatus.SUBMITTED && (
              <Clock className="h-16 w-16 text-warning mx-auto mb-4" />
            )}
            {profileStatus === ProfileStatus.APPROVED && (
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            )}
            {profileStatus === ProfileStatus.REJECTED && (
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            )}
          </div>

          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            {profileStatus === ProfileStatus.SUBMITTED && 'Application Under Review'}
            {profileStatus === ProfileStatus.APPROVED && 'Welcome to VisaMart!'}
            {profileStatus === ProfileStatus.REJECTED && 'Application Needs Updates'}
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {profileStatus === ProfileStatus.SUBMITTED && 
              'Your agent application is being reviewed by our team. We\'ll notify you once the review is complete.'}
            {profileStatus === ProfileStatus.APPROVED && 
              'Your agent profile has been approved! You can now start offering your services on VisaMart.'}
            {profileStatus === ProfileStatus.REJECTED && 
              'We need some additional information to approve your agent profile. Please review and update your application.'}
          </p>

          <div className="space-x-4">
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
            >
              Go to Dashboard
            </Button>
            {profileStatus === ProfileStatus.APPROVED && (
              <Button onClick={() => navigate('/dashboard/services')}>
                Create Your First Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {profileStatus === ProfileStatus.REJECTED && (
              <Button onClick={() => setProfileStatus(ProfileStatus.DRAFT)}>
                Update Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Become a VisaMart Agent
        </h1>
        <p className="text-gray-600">
          Join our network of trusted visa experts and grow your business
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <AnimatePresence mode="wait" custom={currentStep}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <User className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Personal Details
                  </h2>
                  <p className="text-gray-600">
                    Let's start with your basic information
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Business Information
                  </h2>
                  <p className="text-gray-600">
                    Tell us about your business and credentials
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Business Name *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your Business Name"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Number *
                      </label>
                      <input
                        type="text"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Professional License Number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Office Address *
                    </label>
                    <textarea
                      value={formData.officeAddress}
                      onChange={(e) => handleInputChange('officeAddress', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Complete business address"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Expertise */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Your Expertise
                  </h2>
                  <p className="text-gray-600">
                    Share your experience and areas of specialization
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Countries */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Countries You Specialize In *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleArrayToggle('regionsExpertise', country.code)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            formData.regionsExpertise.includes(country.code)
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Globe className="h-4 w-4 mb-1" />
                          <div className="text-sm font-medium">{country.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visa Types */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Visa Categories *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {visaTypes.map((visa) => (
                        <button
                          key={visa.code}
                          type="button"
                          onClick={() => handleArrayToggle('visaCategories', visa.code)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            formData.visaCategories.includes(visa.code)
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <FileText className="h-4 w-4 mb-1" />
                          <div className="text-sm font-medium">{visa.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Languages You Speak *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          type="button"
                          onClick={() => handleArrayToggle('languagesSpoken', language.code)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            formData.languagesSpoken.includes(language.code)
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Languages className="h-4 w-4 mb-1" />
                          <div className="text-sm font-medium">{language.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => handleInputChange('experienceYears', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select Experience Level</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Documents */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Required Documents
                  </h2>
                  <p className="text-gray-600">
                    Upload your verification documents
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Business License */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business License *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload your business registration or license
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('businessLicense', e.target.files[0])}
                        className="hidden"
                        id="business-license"
                      />
                      <label
                        htmlFor="business-license"
                        className="inline-block px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90"
                      >
                        Choose File
                      </label>
                      {formData.businessLicense && (
                        <p className="text-sm text-success mt-2">
                          ✓ {formData.businessLicense.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ID Document */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Government ID *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload your passport or national ID
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('idDocument', e.target.files[0])}
                        className="hidden"
                        id="id-document"
                      />
                      <label
                        htmlFor="id-document"
                        className="inline-block px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90"
                      >
                        Choose File
                      </label>
                      {formData.idDocument && (
                        <p className="text-sm text-success mt-2">
                          ✓ {formData.idDocument.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Review & Submit
                  </h2>
                  <p className="text-gray-600">
                    Please review your information before submitting
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Personal Details
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                        <p><span className="font-medium">Email:</span> {formData.email}</p>
                        <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Building className="h-5 w-5 mr-2" />
                        Business Information
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Company:</span> {formData.companyName}</p>
                        <p><span className="font-medium">License:</span> {formData.licenseNumber}</p>
                        <p><span className="font-medium">Website:</span> {formData.website || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        Expertise
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Countries:</span> {formData.regionsExpertise.length} selected</p>
                        <p><span className="font-medium">Visa Types:</span> {formData.visaCategories.length} selected</p>
                        <p><span className="font-medium">Languages:</span> {formData.languagesSpoken.length} selected</p>
                        <p><span className="font-medium">Experience:</span> {formData.experienceYears}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Documents
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-1" />
                          Business License: {formData.businessLicense?.name || 'Not uploaded'}
                        </p>
                        <p className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-1" />
                          Government ID: {formData.idDocument?.name || 'Not uploaded'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Agreement */}
                  <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold text-primary mb-3 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Agent Agreement
                    </h4>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p>By submitting this application, you agree to:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Provide accurate and truthful information</li>
                        <li>Maintain professional standards and ethical practices</li>
                        <li>Comply with VisaMart's terms of service and agent guidelines</li>
                        <li>Keep client information confidential and secure</li>
                      </ul>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={handleSubmitProfile}
                      className="px-8"
                    >
                      Submit Application
                      <CheckCircle className="ml-2 h-5 w-5" />
                    </Button>
                    <p className="text-sm text-gray-500 mt-3">
                      Our team will review your application within 2-3 business days
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center px-8 py-6 bg-gray-50 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}