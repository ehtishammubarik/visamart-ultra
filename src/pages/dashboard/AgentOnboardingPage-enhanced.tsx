// VisaMart ULTRA - Enhanced Agent Onboarding Page
// Mobile-first, comprehensive agent registration with step-by-step flow

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  User,
  Building2,
  FileText,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Star,
  Globe,
  Languages,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Clock,
  AlertCircle,
  Loader2
} from 'lucide-react'

import { Button, PrimaryButton, SecondaryButton } from '../../components/ui/Button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useToast } from '../../components/ui/Toaster'
import { useAuth } from '../../providers/AuthProvider'
import { useSubagents } from '../../agents/hooks/useSubagents'

// Form validation schema
const agentOnboardingSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  
  // Business Information
  companyName: z.string().min(2, 'Company name is required'),
  licenseNumber: z.string().min(5, 'Valid license number is required'),
  licenseType: z.string().min(1, 'License type is required'),
  businessAddress: z.string().min(10, 'Business address is required'),
  businessPhone: z.string().min(10, 'Business phone is required'),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  
  // Experience and Expertise
  yearsOfExperience: z.string().min(1, 'Years of experience is required'),
  specializations: z.array(z.string()).min(1, 'At least one specialization is required'),
  countries: z.array(z.string()).min(1, 'At least one country expertise is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  
  // Documents
  profilePhoto: z.any().optional(),
  licenseDocument: z.any().refine((file) => file?.length > 0, 'License document is required'),
  certifications: z.any().optional(),
  
  // Terms and Agreements
  termsAccepted: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
  privacyAccepted: z.boolean().refine((val) => val === true, 'You must accept the privacy policy'),
  marketingConsent: z.boolean().optional()
})

type AgentOnboardingData = z.infer<typeof agentOnboardingSchema>

const ONBOARDING_STEPS = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Basic personal details',
    icon: User,
    fields: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth']
  },
  {
    id: 'business',
    title: 'Business Details',
    description: 'Company and license information',
    icon: Building2,
    fields: ['companyName', 'licenseNumber', 'licenseType', 'businessAddress', 'businessPhone', 'website']
  },
  {
    id: 'expertise',
    title: 'Expertise & Experience',
    description: 'Your specializations and experience',
    icon: Star,
    fields: ['yearsOfExperience', 'specializations', 'countries', 'languages']
  },
  {
    id: 'documents',
    title: 'Document Upload',
    description: 'License and certifications',
    icon: FileText,
    fields: ['profilePhoto', 'licenseDocument', 'certifications']
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Confirm your information',
    icon: CheckCircle,
    fields: ['termsAccepted', 'privacyAccepted', 'marketingConsent']
  }
]

const VISA_SPECIALIZATIONS = [
  'Tourist Visas',
  'Business Visas',
  'Student Visas',
  'Work Visas',
  'Family Reunion Visas',
  'Transit Visas',
  'Diplomatic Visas',
  'Investment Visas',
  'Skilled Migration',
  'Refugee & Asylum'
]

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia',
  'New Zealand', 'Japan', 'Singapore', 'UAE', 'Netherlands', 'Sweden',
  'Switzerland', 'Norway', 'Denmark', 'Spain', 'Italy', 'Portugal'
]

const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Mandarin', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian'
]

export function AgentOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  
  const { user, isDevelopmentMode } = useAuth()
  const { toast } = useToast()
  const { enhanceAgentFeature } = useSubagents()

  const methods = useForm<AgentOnboardingData>({
    resolver: zodResolver(agentOnboardingSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      specializations: [],
      countries: [],
      languages: ['English'],
      termsAccepted: false,
      privacyAccepted: false,
      marketingConsent: false
    }
  })

  const { watch, trigger, getValues, setValue } = methods

  // Watch form values for step validation
  const watchedValues = watch()

  useEffect(() => {
    // Auto-save progress in development mode
    if (isDevelopmentMode) {
      localStorage.setItem('visamart-agent-onboarding', JSON.stringify(getValues()))
    }
  }, [watchedValues, isDevelopmentMode, getValues])

  // Load saved progress in development mode
  useEffect(() => {
    if (isDevelopmentMode) {
      const saved = localStorage.getItem('visamart-agent-onboarding')
      if (saved) {
        try {
          const data = JSON.parse(saved)
          Object.keys(data).forEach((key) => {
            setValue(key as keyof AgentOnboardingData, data[key])
          })
        } catch (error) {
          console.error('Failed to load saved progress:', error)
        }
      }
    }
  }, [isDevelopmentMode, setValue])

  const validateCurrentStep = async () => {
    const currentStepFields = ONBOARDING_STEPS[currentStep].fields
    const isValid = await trigger(currentStepFields as (keyof AgentOnboardingData)[])
    
    if (isValid && !completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    
    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    
    if (!isValid) {
      toast({
        type: 'error',
        message: 'Please complete all required fields before proceeding'
      })
      return
    }

    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (data: AgentOnboardingData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create agent enhancement task
      await enhanceAgentFeature(
        'Agent Registration',
        `Process onboarding for ${data.firstName} ${data.lastName} - ${data.companyName}`,
        'high' as any
      )

      toast({
        type: 'success',
        title: 'Application Submitted Successfully!',
        message: 'Your agent application is being reviewed. You will receive an email within 24 hours.'
      })

      // Clear saved progress
      if (isDevelopmentMode) {
        localStorage.removeItem('visamart-agent-onboarding')
      }

    } catch (error) {
      toast({
        type: 'error',
        title: 'Submission Failed',
        message: 'Please try again or contact support if the issue persists.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) return 'completed'
    if (stepIndex === currentStep) return 'current'
    return 'pending'
  }

  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 safe-top safe-bottom">
      <div className="mobile-container py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Become a Verified Agent
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our network of trusted visa professionals and help travelers achieve their dreams
          </p>
          
          {isDevelopmentMode && (
            <div className="mt-4 p-3 bg-blue-100 border border-blue-200 rounded-lg inline-block">
              <p className="text-sm text-blue-800 font-medium">
                🚀 Development Mode: Auto-save enabled, enhanced debugging active
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Step Navigation (Mobile: Horizontal Scroll, Desktop: Full Width) */}
        <div className="mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex overflow-x-auto sm:overflow-visible sm:justify-center space-x-2 sm:space-x-4 pb-2 sm:pb-0">
            {ONBOARDING_STEPS.map((step, index) => {
              const status = getStepStatus(index)
              const Icon = step.icon
              
              return (
                <motion.button
                  key={step.id}
                  onClick={() => {
                    if (completedSteps.includes(index) || index <= currentStep) {
                      setCurrentStep(index)
                    }
                  }}
                  className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg transition-all min-w-[120px] sm:min-w-[140px] ${
                    status === 'completed'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : status === 'current'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-400 border border-gray-200'
                  } ${
                    completedSteps.includes(index) || index <= currentStep
                      ? 'cursor-pointer hover:scale-105'
                      : 'cursor-not-allowed'
                  }`}
                  whileHover={{ scale: completedSteps.includes(index) || index <= currentStep ? 1.05 : 1 }}
                  whileTap={{ scale: completedSteps.includes(index) || index <= currentStep ? 0.95 : 1 }}
                >
                  <Icon className="w-5 h-5 mb-2" />
                  <span className="text-xs font-medium text-center leading-tight">
                    {step.title}
                  </span>
                  {status === 'completed' && (
                    <CheckCircle className="w-3 h-3 mt-1 text-green-600" />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Main Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 0 && <PersonalInfoStep />}
                    {currentStep === 1 && <BusinessDetailsStep />}
                    {currentStep === 2 && <ExpertiseStep specializations={VISA_SPECIALIZATIONS} countries={COUNTRIES} languages={LANGUAGES} />}
                    {currentStep === 3 && <DocumentsStep />}
                    {currentStep === 4 && <ReviewStep />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="bg-gray-50 px-6 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                <SecondaryButton
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Previous
                </SecondaryButton>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>~{Math.max(1, 5 - currentStep)} min remaining</span>
                </div>

                {currentStep < ONBOARDING_STEPS.length - 1 ? (
                  <PrimaryButton
                    type="button"
                    onClick={handleNext}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Continue
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    type="submit"
                    loading={isSubmitting}
                    rightIcon={!isSubmitting && <CheckCircle className="w-4 h-4" />}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                  >
                    Submit Application
                  </PrimaryButton>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

// Step Components
function PersonalInfoStep() {
  const { register, formState: { errors } } = useForm<AgentOnboardingData>()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600 text-sm">
          Please provide your personal details for verification purposes
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">
            First Name *
          </label>
          <input
            {...register('firstName')}
            className="form-input"
            placeholder="John"
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="form-error">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            Last Name *
          </label>
          <input
            {...register('lastName')}
            className="form-input"
            placeholder="Doe"
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="form-error">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="form-label">
          <Mail className="w-4 h-4 inline mr-2" />
          Email Address *
        </label>
        <input
          {...register('email')}
          type="email"
          className="form-input"
          placeholder="john.doe@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className="form-error">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number *
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="form-input"
            placeholder="+1 (555) 123-4567"
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="form-error">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date of Birth *
          </label>
          <input
            {...register('dateOfBirth')}
            type="date"
            className="form-input"
            autoComplete="bday"
          />
          {errors.dateOfBirth && (
            <p className="form-error">{errors.dateOfBirth.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function BusinessDetailsStep() {
  const { register, formState: { errors } } = useForm<AgentOnboardingData>()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Business Information</h2>
        <p className="text-gray-600 text-sm">
          Tell us about your business and professional credentials
        </p>
      </div>

      <div>
        <label className="form-label">
          <Building2 className="w-4 h-4 inline mr-2" />
          Company Name *
        </label>
        <input
          {...register('companyName')}
          className="form-input"
          placeholder="ABC Immigration Services"
          autoComplete="organization"
        />
        {errors.companyName && (
          <p className="form-error">{errors.companyName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">
            <Award className="w-4 h-4 inline mr-2" />
            License Number *
          </label>
          <input
            {...register('licenseNumber')}
            className="form-input"
            placeholder="LIC-12345-2024"
          />
          {errors.licenseNumber && (
            <p className="form-error">{errors.licenseNumber.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">License Type *</label>
          <select {...register('licenseType')} className="form-input">
            <option value="">Select license type</option>
            <option value="immigration-consultant">Immigration Consultant</option>
            <option value="immigration-lawyer">Immigration Lawyer</option>
            <option value="registered-agent">Registered Migration Agent</option>
            <option value="notary-public">Notary Public</option>
            <option value="other">Other</option>
          </select>
          {errors.licenseType && (
            <p className="form-error">{errors.licenseType.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="form-label">
          <MapPin className="w-4 h-4 inline mr-2" />
          Business Address *
        </label>
        <textarea
          {...register('businessAddress')}
          className="form-input min-h-[80px]"
          placeholder="123 Business St, Suite 100, City, State/Province, Postal Code, Country"
          autoComplete="street-address"
        />
        {errors.businessAddress && (
          <p className="form-error">{errors.businessAddress.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Business Phone *</label>
          <input
            {...register('businessPhone')}
            type="tel"
            className="form-input"
            placeholder="+1 (555) 987-6543"
            autoComplete="work tel"
          />
          {errors.businessPhone && (
            <p className="form-error">{errors.businessPhone.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Website (Optional)</label>
          <input
            {...register('website')}
            type="url"
            className="form-input"
            placeholder="https://www.yourwebsite.com"
            autoComplete="url"
          />
          {errors.website && (
            <p className="form-error">{errors.website.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

interface ExpertiseStepProps {
  specializations: string[]
  countries: string[]
  languages: string[]
}

function ExpertiseStep({ specializations, countries, languages }: ExpertiseStepProps) {
  const { register, watch, setValue, formState: { errors } } = useForm<AgentOnboardingData>()
  const watchSpecializations = watch('specializations') || []
  const watchCountries = watch('countries') || []
  const watchLanguages = watch('languages') || []

  const toggleSelection = (
    field: 'specializations' | 'countries' | 'languages',
    value: string,
    currentValues: string[]
  ) => {
    if (currentValues.includes(value)) {
      setValue(field, currentValues.filter(item => item !== value))
    } else {
      setValue(field, [...currentValues, value])
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Expertise & Experience</h2>
        <p className="text-gray-600 text-sm">
          Help us understand your areas of expertise and experience level
        </p>
      </div>

      <div>
        <label className="form-label">
          <Clock className="w-4 h-4 inline mr-2" />
          Years of Experience *
        </label>
        <select {...register('yearsOfExperience')} className="form-input">
          <option value="">Select experience level</option>
          <option value="1-2">1-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="6-10">6-10 years</option>
          <option value="11-15">11-15 years</option>
          <option value="16+">16+ years</option>
        </select>
        {errors.yearsOfExperience && (
          <p className="form-error">{errors.yearsOfExperience.message}</p>
        )}
      </div>

      <div>
        <label className="form-label">
          <Star className="w-4 h-4 inline mr-2" />
          Visa Specializations * (Select all that apply)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {specializations.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => toggleSelection('specializations', spec, watchSpecializations)}
              className={`p-3 text-left border rounded-lg transition-all ${
                watchSpecializations.includes(spec)
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{spec}</span>
                {watchSpecializations.includes(spec) && (
                  <CheckCircle className="w-4 h-4" />
                )}
              </div>
            </button>
          ))}
        </div>
        {errors.specializations && (
          <p className="form-error">{errors.specializations.message}</p>
        )}
      </div>

      <div>
        <label className="form-label">
          <Globe className="w-4 h-4 inline mr-2" />
          Country Expertise * (Select countries you specialize in)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country}
              type="button"
              onClick={() => toggleSelection('countries', country, watchCountries)}
              className={`p-2 text-left border rounded-lg transition-all ${
                watchCountries.includes(country)
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{country}</span>
                {watchCountries.includes(country) && (
                  <CheckCircle className="w-3 h-3" />
                )}
              </div>
            </button>
          ))}
        </div>
        {errors.countries && (
          <p className="form-error">{errors.countries.message}</p>
        )}
      </div>

      <div>
        <label className="form-label">
          <Languages className="w-4 h-4 inline mr-2" />
          Languages Spoken * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => toggleSelection('languages', language, watchLanguages)}
              className={`p-2 text-left border rounded-lg transition-all ${
                watchLanguages.includes(language)
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{language}</span>
                {watchLanguages.includes(language) && (
                  <CheckCircle className="w-3 h-3" />
                )}
              </div>
            </button>
          ))}
        </div>
        {errors.languages && (
          <p className="form-error">{errors.languages.message}</p>
        )}
      </div>
    </div>
  )
}

function DocumentsStep() {
  const { register, formState: { errors } } = useForm<AgentOnboardingData>()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Document Upload</h2>
        <p className="text-gray-600 text-sm">
          Upload required documents for verification. All documents must be clear and legible.
        </p>
      </div>

      <div className="space-y-6">
        <DocumentUpload
          label="Profile Photo (Optional)"
          description="Professional headshot (JPG, PNG, max 5MB)"
          accept="image/*"
          {...register('profilePhoto')}
        />

        <DocumentUpload
          label="Professional License *"
          description="Your immigration consultant/lawyer license (PDF, JPG, PNG, max 10MB)"
          accept=".pdf,image/*"
          required
          {...register('licenseDocument')}
          error={errors.licenseDocument?.message as string}
        />

        <DocumentUpload
          label="Additional Certifications (Optional)"
          description="Any additional certifications or qualifications (PDF, max 10MB)"
          accept=".pdf"
          {...register('certifications')}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Document Requirements</h3>
            <div className="mt-1 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Documents must be current and valid</li>
                <li>All text must be clearly visible</li>
                <li>No screenshots or poor quality images</li>
                <li>Documents in foreign languages must include certified translations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DocumentUpload({ label, description, accept, required, error, ...props }: {
  label: string
  description: string
  accept: string
  required?: boolean
  error?: string
  [key: string]: any
}) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  return (
    <div>
      <label className="form-label">
        <FileText className="w-4 h-4 inline mr-2" />
        {label}
      </label>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : uploadedFile
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          {uploadedFile ? (
            <div className="flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
              <div>
                <p className="text-sm font-medium text-green-800">{uploadedFile.name}</p>
                <p className="text-xs text-green-600">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-primary cursor-pointer">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">{accept} files accepted</p>
              </div>
            </>
          )}
        </div>
        
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept={accept}
          required={required}
          onChange={handleFileChange}
          {...props}
        />
      </div>
      
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

function ReviewStep() {
  const { register, watch, formState: { errors } } = useForm<AgentOnboardingData>()
  const watchedValues = watch()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Review & Submit</h2>
        <p className="text-gray-600 text-sm">
          Please review your information and accept our terms to complete your application
        </p>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="font-medium text-gray-900">Application Summary</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Name:</span>
            <span className="ml-2 font-medium">
              {watchedValues.firstName} {watchedValues.lastName}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Company:</span>
            <span className="ml-2 font-medium">{watchedValues.companyName}</span>
          </div>
          <div>
            <span className="text-gray-600">License:</span>
            <span className="ml-2 font-medium">{watchedValues.licenseNumber}</span>
          </div>
          <div>
            <span className="text-gray-600">Experience:</span>
            <span className="ml-2 font-medium">{watchedValues.yearsOfExperience} years</span>
          </div>
        </div>

        {watchedValues.specializations && watchedValues.specializations.length > 0 && (
          <div>
            <span className="text-gray-600 text-sm">Specializations:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {watchedValues.specializations.map((spec) => (
                <span
                  key={spec}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            {...register('termsAccepted')}
            type="checkbox"
            className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label className="ml-3 text-sm text-gray-700">
            I accept the{' '}
            <a href="/terms" target="_blank" className="text-primary underline">
              Terms and Conditions
            </a>{' '}
            and understand the requirements for becoming a verified agent *
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="form-error ml-7">{errors.termsAccepted.message}</p>
        )}

        <div className="flex items-start">
          <input
            {...register('privacyAccepted')}
            type="checkbox"
            className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label className="ml-3 text-sm text-gray-700">
            I agree to the{' '}
            <a href="/privacy" target="_blank" className="text-primary underline">
              Privacy Policy
            </a>{' '}
            and consent to the processing of my personal data *
          </label>
        </div>
        {errors.privacyAccepted && (
          <p className="form-error ml-7">{errors.privacyAccepted.message}</p>
        )}

        <div className="flex items-start">
          <input
            {...register('marketingConsent')}
            type="checkbox"
            className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label className="ml-3 text-sm text-gray-700">
            I would like to receive updates about new features, marketing communications, and business opportunities (optional)
          </label>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Next Steps</h3>
            <div className="mt-1 text-sm text-green-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Your application will be reviewed within 24 hours</li>
                <li>We'll verify your documents and credentials</li>
                <li>You'll receive an email with the verification status</li>
                <li>Once approved, you can start offering services immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}