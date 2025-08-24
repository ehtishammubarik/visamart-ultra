// VisaMart ULTRA - Mock Test Agents
// Comprehensive test agent data for development and demonstration

export interface TestAgent {
  id: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    profilePhoto?: string
  }
  businessInfo: {
    companyName: string
    licenseNumber: string
    licenseType: string
    businessAddress: string
    businessPhone: string
    website?: string
    establishedYear: number
  }
  expertise: {
    yearsOfExperience: string
    specializations: string[]
    countries: string[]
    languages: string[]
    successRate: number
    totalApplications: number
  }
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'resubmitted'
  verificationStatus: {
    documentsVerified: boolean
    licenseVerified: boolean
    backgroundCheckPassed: boolean
    profileCompleted: boolean
  }
  performance: {
    rating: number
    reviews: number
    monthlyRevenue: number
    activeServices: number
    responseTime: number // in hours
  }
  services: {
    id: string
    title: string
    visaType: string
    targetCountry: string
    price: number
    processingTime: string
    featured: boolean
  }[]
  joinedDate: string
  lastActive: string
  description: string
  certifications: string[]
  awards: string[]
}

export const mockTestAgents: TestAgent[] = [
  {
    id: 'agent-001',
    personalInfo: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@visamart.dev',
      phone: '+1-555-0123',
      dateOfBirth: '1985-03-15',
      profilePhoto: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=2563eb&color=fff&size=128'
    },
    businessInfo: {
      companyName: 'Global Visa Solutions',
      licenseNumber: 'GVS-2024-001',
      licenseType: 'Immigration Consultant License',
      businessAddress: '123 Business Plaza, New York, NY 10001',
      businessPhone: '+1-555-0124',
      website: 'https://globalvisasolutions.com',
      establishedYear: 2018
    },
    expertise: {
      yearsOfExperience: '6',
      specializations: ['Tourist Visas', 'Business Visas', 'Student Visas'],
      countries: ['United States', 'Canada', 'United Kingdom', 'Australia'],
      languages: ['English', 'Spanish', 'French'],
      successRate: 94.2,
      totalApplications: 847
    },
    status: 'approved',
    verificationStatus: {
      documentsVerified: true,
      licenseVerified: true,
      backgroundCheckPassed: true,
      profileCompleted: true
    },
    performance: {
      rating: 4.8,
      reviews: 156,
      monthlyRevenue: 12450,
      activeServices: 8,
      responseTime: 2.3
    },
    services: [
      {
        id: 'srv-001',
        title: 'US Tourist Visa - Premium Service',
        visaType: 'tourist',
        targetCountry: 'United States',
        price: 899,
        processingTime: '10-15 business days',
        featured: true
      },
      {
        id: 'srv-002',
        title: 'Canada Business Visa - Express',
        visaType: 'business',
        targetCountry: 'Canada',
        price: 1299,
        processingTime: '8-12 business days',
        featured: true
      }
    ],
    joinedDate: '2024-02-15',
    lastActive: '2024-08-24',
    description: 'Experienced immigration consultant specializing in North American visas with over 6 years of expertise. Dedicated to providing personalized service with highest success rates.',
    certifications: [
      'Certified Immigration Consultant (CIC)',
      'International Association of Immigration Lawyers (IAIL)',
      'Visa Application Specialist Certification'
    ],
    awards: [
      'Top Performer 2023 - VisaMart',
      'Excellence in Client Service Award',
      'Highest Success Rate - Q3 2024'
    ]
  },
  {
    id: 'agent-002',
    personalInfo: {
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@visamart.dev',
      phone: '+44-20-7123-4567',
      dateOfBirth: '1982-07-22',
      profilePhoto: 'https://ui-avatars.com/api/?name=Michael+Chen&background=059669&color=fff&size=128'
    },
    businessInfo: {
      companyName: 'European Visa Experts',
      licenseNumber: 'EVE-2024-002',
      licenseType: 'European Immigration License',
      businessAddress: '456 Immigration House, London, EC1A 1BB, UK',
      businessPhone: '+44-20-7123-4568',
      website: 'https://europeanvisaexperts.co.uk',
      establishedYear: 2020
    },
    expertise: {
      yearsOfExperience: '4',
      specializations: ['Schengen Visas', 'UK Visas', 'Work Permits', 'Family Reunification'],
      countries: ['Germany', 'France', 'United Kingdom', 'Netherlands', 'Switzerland'],
      languages: ['English', 'Mandarin', 'German', 'French'],
      successRate: 91.7,
      totalApplications: 623
    },
    status: 'approved',
    verificationStatus: {
      documentsVerified: true,
      licenseVerified: true,
      backgroundCheckPassed: true,
      profileCompleted: true
    },
    performance: {
      rating: 4.9,
      reviews: 98,
      monthlyRevenue: 15200,
      activeServices: 12,
      responseTime: 1.8
    },
    services: [
      {
        id: 'srv-003',
        title: 'German Tourist Visa - Standard',
        visaType: 'tourist',
        targetCountry: 'Germany',
        price: 750,
        processingTime: '15-20 business days',
        featured: true
      },
      {
        id: 'srv-004',
        title: 'UK Work Visa - Skilled Worker',
        visaType: 'work',
        targetCountry: 'United Kingdom',
        price: 1899,
        processingTime: '25-30 business days',
        featured: false
      }
    ],
    joinedDate: '2024-01-08',
    lastActive: '2024-08-24',
    description: 'European visa specialist with extensive knowledge of EU immigration policies. Fluent in multiple languages and experienced in complex work visa applications.',
    certifications: [
      'EU Immigration Law Certificate',
      'Schengen Visa Specialist',
      'UK Immigration Advisor (OISC Level 2)'
    ],
    awards: [
      'Rising Star Agent 2024',
      'Client Choice Award - Europe',
      'Innovation in Service Delivery'
    ]
  },
  {
    id: 'agent-003',
    personalInfo: {
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@visamart.dev',
      phone: '+91-11-2345-6789',
      dateOfBirth: '1990-11-08',
      profilePhoto: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=7C3AED&color=fff&size=128'
    },
    businessInfo: {
      companyName: 'Asia Pacific Visa Services',
      licenseNumber: 'APVS-2024-003',
      licenseType: 'International Migration Advisor',
      businessAddress: '789 Business Tower, New Delhi, 110001, India',
      businessPhone: '+91-11-2345-6790',
      website: 'https://asiapacificvisa.com',
      establishedYear: 2019
    },
    expertise: {
      yearsOfExperience: '5',
      specializations: ['Student Visas', 'Skilled Migration', 'Tourist Visas', 'Family Visas'],
      countries: ['Australia', 'New Zealand', 'Canada', 'Singapore', 'United States'],
      languages: ['English', 'Hindi', 'Punjabi', 'Bengali'],
      successRate: 89.3,
      totalApplications: 432
    },
    status: 'approved',
    verificationStatus: {
      documentsVerified: true,
      licenseVerified: true,
      backgroundCheckPassed: true,
      profileCompleted: true
    },
    performance: {
      rating: 4.6,
      reviews: 87,
      monthlyRevenue: 9800,
      activeServices: 6,
      responseTime: 3.1
    },
    services: [
      {
        id: 'srv-005',
        title: 'Australian Student Visa - Complete Package',
        visaType: 'student',
        targetCountry: 'Australia',
        price: 1299,
        processingTime: '20-25 business days',
        featured: true
      },
      {
        id: 'srv-006',
        title: 'Canada Express Entry - Skilled Worker',
        visaType: 'work',
        targetCountry: 'Canada',
        price: 2199,
        processingTime: '4-6 months',
        featured: true
      }
    ],
    joinedDate: '2024-03-20',
    lastActive: '2024-08-23',
    description: 'Specialized in Asia-Pacific migration with deep understanding of student visa requirements and skilled migration programs. Passionate about helping families reunite.',
    certifications: [
      'Migration Agent Registration (MARA)',
      'Student Visa Specialist Certification',
      'Points-based System Expert'
    ],
    awards: [
      'Best Student Visa Agent 2024',
      'Community Service Recognition',
      'Multilingual Service Excellence'
    ]
  },
  {
    id: 'agent-004',
    personalInfo: {
      firstName: 'Ahmed',
      lastName: 'Al-Rashid',
      email: 'ahmed.alrashid@visamart.dev',
      phone: '+971-4-123-4567',
      dateOfBirth: '1987-09-12',
      profilePhoto: 'https://ui-avatars.com/api/?name=Ahmed+Al-Rashid&background=DC2626&color=fff&size=128'
    },
    businessInfo: {
      companyName: 'Middle East Visa Consultancy',
      licenseNumber: 'MEVC-2024-004',
      licenseType: 'GCC Immigration License',
      businessAddress: '321 Emirates Towers, Dubai, UAE',
      businessPhone: '+971-4-123-4568',
      website: 'https://middleeastvisaconsult.ae',
      establishedYear: 2017
    },
    expertise: {
      yearsOfExperience: '7',
      specializations: ['Business Visas', 'Investment Visas', 'Work Permits', 'Golden Visas'],
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'United States', 'United Kingdom'],
      languages: ['Arabic', 'English', 'French', 'Urdu'],
      successRate: 96.1,
      totalApplications: 298
    },
    status: 'submitted',
    verificationStatus: {
      documentsVerified: true,
      licenseVerified: true,
      backgroundCheckPassed: false,
      profileCompleted: true
    },
    performance: {
      rating: 4.7,
      reviews: 45,
      monthlyRevenue: 18900,
      activeServices: 5,
      responseTime: 4.2
    },
    services: [
      {
        id: 'srv-007',
        title: 'UAE Golden Visa - Investment Route',
        visaType: 'investment',
        targetCountry: 'UAE',
        price: 4999,
        processingTime: '30-45 business days',
        featured: true
      }
    ],
    joinedDate: '2024-07-15',
    lastActive: '2024-08-22',
    description: 'High-net-worth individual specialist focusing on investment visas and business migration in the GCC region. Extensive network of government contacts.',
    certifications: [
      'GCC Business Immigration Expert',
      'Investment Visa Specialist',
      'UAE Golden Visa Certified Advisor'
    ],
    awards: [
      'Premium Service Provider 2023',
      'High-Value Client Specialist'
    ]
  },
  {
    id: 'agent-005',
    personalInfo: {
      firstName: 'Elena',
      lastName: 'Rodriguez',
      email: 'elena.rodriguez@visamart.dev',
      phone: '+34-91-123-4567',
      dateOfBirth: '1988-04-30',
      profilePhoto: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=F59E0B&color=fff&size=128'
    },
    businessInfo: {
      companyName: 'Iberian Visa Services',
      licenseNumber: 'IVS-2024-005',
      licenseType: 'EU Immigration Consultant',
      businessAddress: '654 Gran Via, Madrid, 28013, Spain',
      businessPhone: '+34-91-123-4568',
      website: 'https://iberianvisaservices.es',
      establishedYear: 2021
    },
    expertise: {
      yearsOfExperience: '3',
      specializations: ['Tourist Visas', 'Family Reunification', 'EU Blue Card', 'Student Visas'],
      countries: ['Spain', 'Portugal', 'France', 'Italy', 'Germany'],
      languages: ['Spanish', 'Portuguese', 'English', 'Italian'],
      successRate: 82.4,
      totalApplications: 156
    },
    status: 'draft',
    verificationStatus: {
      documentsVerified: false,
      licenseVerified: false,
      backgroundCheckPassed: false,
      profileCompleted: false
    },
    performance: {
      rating: 4.3,
      reviews: 23,
      monthlyRevenue: 4200,
      activeServices: 3,
      responseTime: 6.8
    },
    services: [
      {
        id: 'srv-008',
        title: 'Spain Tourist Visa - Basic Service',
        visaType: 'tourist',
        targetCountry: 'Spain',
        price: 450,
        processingTime: '20-25 business days',
        featured: false
      }
    ],
    joinedDate: '2024-08-10',
    lastActive: '2024-08-20',
    description: 'Emerging immigration consultant with focus on Southern European destinations. Specialized in family reunification cases with personal touch.',
    certifications: [
      'EU Immigration Law Basic Certificate',
      'Spanish Immigration Procedures'
    ],
    awards: []
  },
  {
    id: 'agent-006',
    personalInfo: {
      firstName: 'David',
      lastName: 'Kim',
      email: 'david.kim@visamart.dev',
      phone: '+82-2-1234-5678',
      dateOfBirth: '1985-12-03',
      profilePhoto: 'https://ui-avatars.com/api/?name=David+Kim&background=6366F1&color=fff&size=128'
    },
    businessInfo: {
      companyName: 'Asia Gateway Immigration',
      licenseNumber: 'AGI-2024-006',
      licenseType: 'Korean Immigration Specialist',
      businessAddress: '987 Gangnam Finance Center, Seoul, 06292, South Korea',
      businessPhone: '+82-2-1234-5679',
      website: 'https://asiagateway.kr',
      establishedYear: 2016
    },
    expertise: {
      yearsOfExperience: '8',
      specializations: ['Work Visas', 'Student Visas', 'Family Visas', 'Investment Visas'],
      countries: ['South Korea', 'Japan', 'United States', 'Canada', 'Australia'],
      languages: ['Korean', 'English', 'Japanese', 'Mandarin'],
      successRate: 93.8,
      totalApplications: 1024
    },
    status: 'rejected',
    verificationStatus: {
      documentsVerified: true,
      licenseVerified: false,
      backgroundCheckPassed: true,
      profileCompleted: true
    },
    performance: {
      rating: 4.5,
      reviews: 187,
      monthlyRevenue: 14600,
      activeServices: 9,
      responseTime: 2.9
    },
    services: [
      {
        id: 'srv-009',
        title: 'Korean Work Visa (E-7)',
        visaType: 'work',
        targetCountry: 'South Korea',
        price: 1599,
        processingTime: '15-20 business days',
        featured: false
      }
    ],
    joinedDate: '2024-05-22',
    lastActive: '2024-08-18',
    description: 'Veteran immigration specialist with extensive experience in East Asian visa processes. Known for complex case resolution and corporate immigration.',
    certifications: [
      'Korean Immigration Law Expert',
      'Corporate Immigration Specialist',
      'Asia-Pacific Migration Advisor'
    ],
    awards: [
      'Veteran Agent Recognition 2023',
      'Corporate Client Excellence Award'
    ]
  }
]

export const getAgentByStatus = (status: TestAgent['status']): TestAgent[] => {
  return mockTestAgents.filter(agent => agent.status === status)
}

export const getTopPerformingAgents = (limit: number = 3): TestAgent[] => {
  return mockTestAgents
    .filter(agent => agent.status === 'approved')
    .sort((a, b) => b.performance.rating - a.performance.rating)
    .slice(0, limit)
}

export const getAgentById = (id: string): TestAgent | undefined => {
  return mockTestAgents.find(agent => agent.id === id)
}

export const getAgentsByCountry = (country: string): TestAgent[] => {
  return mockTestAgents.filter(agent => 
    agent.expertise.countries.includes(country) && agent.status === 'approved'
  )
}

export const getAgentsBySpecialization = (specialization: string): TestAgent[] => {
  return mockTestAgents.filter(agent => 
    agent.expertise.specializations.includes(specialization) && agent.status === 'approved'
  )
}

export const getAgentsStats = () => {
  const total = mockTestAgents.length
  const approved = mockTestAgents.filter(a => a.status === 'approved').length
  const pending = mockTestAgents.filter(a => a.status === 'submitted').length
  const draft = mockTestAgents.filter(a => a.status === 'draft').length
  const rejected = mockTestAgents.filter(a => a.status === 'rejected').length
  
  const totalRevenue = mockTestAgents
    .filter(a => a.status === 'approved')
    .reduce((sum, agent) => sum + agent.performance.monthlyRevenue, 0)
  
  const avgRating = mockTestAgents
    .filter(a => a.status === 'approved' && a.performance.reviews > 0)
    .reduce((sum, agent, _, arr) => sum + agent.performance.rating / arr.length, 0)
  
  return {
    total,
    approved,
    pending,
    draft,
    rejected,
    totalRevenue,
    avgRating: Math.round(avgRating * 10) / 10
  }
}