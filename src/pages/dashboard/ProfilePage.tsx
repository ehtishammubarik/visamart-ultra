import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Save,
  Edit,
  Shield,
  Bell,
  Globe,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'
import { useAuth, useIsAgent } from '../../store/useAuthStore'
import { Button } from '../../components/ui/Button'

export function ProfilePage() {
  const { user } = useAuth0()
  const { user: userData } = useAuth()
  const isAgent = useIsAgent()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile')

  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.given_name || '',
    lastName: user?.family_name || '',
    email: user?.email || '',
    phone: '',
    country: '',
    city: '',
    bio: '',
    contactPreference: 'EMAIL' as 'EMAIL' | 'PHONE' | 'SMS',
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    applicationUpdates: true,
    newsletter: true,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePreferenceChange = (field: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = () => {
    // TODO: Save profile data via API
    console.log('Saving profile:', formData)
    setIsEditing(false)
  }

  const handleSavePreferences = () => {
    // TODO: Save preferences via API
    console.log('Saving preferences:', preferences)
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div {...fadeInUp}>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div 
        {...fadeInUp}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-primary to-primary/80"></div>
        <div className="px-8 pb-8">
          <div className="flex items-end -mt-16 mb-6">
            <div className="relative">
              <img
                src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff&size=128`}
                alt={user?.name || 'User'}
                className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.name || 'User'}
              </h2>
              <p className="text-gray-600">
                {isAgent ? 'Visa Agent' : 'Visa Applicant'} • Member since {new Date().getFullYear()}
              </p>
              {isAgent && (
                <div className="flex items-center mt-2">
                  <Shield className="h-4 w-4 text-success mr-1" />
                  <span className="text-sm text-success font-medium">Verified Agent</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        {activeTab === 'profile' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-gray-900">
                Personal Information
              </h3>
              <Button
                variant={isEditing ? 'outline' : 'default'}
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                className="flex items-center space-x-2"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formData.firstName || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formData.lastName || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{formData.email}</span>
                  {user?.email_verified && (
                    <Shield className="h-4 w-4 text-success ml-2" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed here. Contact support if needed.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formData.phone || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                {isEditing ? (
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                  </select>
                ) : (
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <Globe className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formData.country || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your city"
                  />
                ) : (
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formData.city || 'Not provided'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            {isAgent && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell clients about your experience and expertise..."
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <span>{formData.bio || 'No bio provided'}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Notification Preferences
            </h3>

            <div className="space-y-6">
              {[
                {
                  key: 'emailNotifications',
                  title: 'Email Notifications',
                  description: 'Receive updates about your applications via email'
                },
                {
                  key: 'smsNotifications', 
                  title: 'SMS Notifications',
                  description: 'Get text message alerts for urgent updates'
                },
                {
                  key: 'applicationUpdates',
                  title: 'Application Updates',
                  description: 'Notifications when application status changes'
                },
                {
                  key: 'marketingEmails',
                  title: 'Marketing Emails',
                  description: 'Receive promotional offers and service updates'
                },
                {
                  key: 'newsletter',
                  title: 'Newsletter',
                  description: 'Monthly newsletter with visa tips and updates'
                }
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                  <div>
                    <h4 className="font-medium text-gray-900">{pref.title}</h4>
                    <p className="text-gray-600 text-sm">{pref.description}</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange(pref.key, !preferences[pref.key as keyof typeof preferences])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences[pref.key as keyof typeof preferences] ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences[pref.key as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button onClick={handleSavePreferences}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Security Settings
            </h3>

            <div className="space-y-8">
              {/* Account Security */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Account Security</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-success mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Extra security for your account</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Password</p>
                        <p className="text-sm text-gray-600">Last changed 6 months ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </div>
              </div>

              {/* Login History */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Recent Login Activity</h4>
                <div className="space-y-3">
                  {[
                    { device: 'Chrome on Windows', location: 'New York, US', time: '2 hours ago', current: true },
                    { device: 'Safari on iPhone', location: 'New York, US', time: '1 day ago', current: false },
                    { device: 'Firefox on macOS', location: 'Boston, US', time: '3 days ago', current: false },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {session.device}
                          {session.current && (
                            <span className="ml-2 px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-600">
                          {session.location} • {session.time}
                        </p>
                      </div>
                      {!session.current && (
                        <button className="text-destructive text-sm hover:underline">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}