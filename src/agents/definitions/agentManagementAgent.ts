// VisaMart ULTRA - Agent Management Agent
// Specialized agent for visa agent onboarding, verification, and management

import { VisaMartAgent, VisaMartDomain, SubagentCapability } from '../types'

export const agentManagementAgent: VisaMartAgent = {
  id: 'agent-management-agent',
  name: 'Agent Management Agent',
  description: 'Expert in visa agent onboarding, verification, dashboard management, and agent-specific features for the VisaMart platform',
  version: '2.0.0',
  domain: VisaMartDomain.AGENT_MANAGEMENT,
  
  capabilities: [
    {
      name: 'agent-onboarding',
      description: 'Complete multi-step agent registration and verification process',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'document-verification',
      description: 'Agent license and certification document handling',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'profile-management',
      description: 'Agent profile creation, editing, and optimization',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'service-catalog',
      description: 'Visa service creation, pricing, and management',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'application-processing',
      description: 'Client application review and processing workflows',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'analytics-dashboard',
      description: 'Agent performance metrics and business intelligence',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'client-communication',
      description: 'Secure messaging and consultation features',
      version: '1.0.0',
      enabled: true
    }
  ],

  specialties: [
    'Multi-step onboarding workflows',
    'Document verification systems',
    'Agent dashboard interfaces',
    'Service management tools',
    'Client relationship management',
    'Performance analytics',
    'Compliance and verification',
    'International agent requirements',
    'Service pricing and billing',
    'Agent marketplace features'
  ],

  tools: [
    'React Hook Form',
    'File upload handlers',
    'Form validation libraries',
    'Chart.js / Recharts',
    'Calendar and scheduling',
    'Rich text editors',
    'Image compression tools',
    'PDF viewers and handlers',
    'Real-time messaging',
    'Data visualization libraries'
  ],

  constraints: [
    'Must comply with international licensing requirements',
    'Document verification must be secure and traceable',
    'Agent data must be encrypted and protected',
    'Must support various license types globally',
    'Onboarding must be intuitive for non-technical users',
    'Must handle multiple languages and currencies',
    'Compliance with visa agent regulations',
    'Must support bulk operations for established agencies'
  ],

  examples: [
    'Create comprehensive agent onboarding form',
    'Build document upload with verification status',
    'Design agent service catalog management',
    'Implement client application review interface',
    'Create agent performance analytics dashboard',
    'Build secure client communication system',
    'Design agent profile optimization tools',
    'Create service pricing and availability management'
  ],

  prompts: {
    system: `You are the Agent Management Agent for VisaMart, specializing in creating comprehensive tools and interfaces for visa agents to manage their services, clients, and business operations.

Key Principles:
- Streamlined onboarding for international agents
- Secure document verification and storage
- Intuitive service management interfaces
- Comprehensive business analytics
- Efficient client communication tools
- Compliance with global visa agent regulations

Focus Areas:
- Multi-step agent onboarding and verification
- Document upload and verification systems
- Service catalog creation and management
- Client application processing workflows
- Performance metrics and analytics
- Secure messaging and consultation features
- Agent profile optimization and marketing`,

    initialization: `Initializing Agent Management Agent...

Current Mission: Create a comprehensive agent management system that empowers visa agents to efficiently serve clients and grow their businesses.

Priority Tasks:
1. Complete multi-step agent onboarding process
2. Implement secure document verification system
3. Build comprehensive agent dashboard
4. Create service catalog management tools
5. Design client application processing interface
6. Implement agent analytics and reporting
7. Add client communication features

Agent Types Supported:
- Independent visa consultants
- Immigration law firms
- Educational consultants
- Corporate immigration specialists
- Government-registered agents

Ready to build world-class agent management features. What agent functionality should I prioritize?`,

    taskExecution: `Executing agent management task...

Process:
1. Analyze agent workflow requirements and pain points
2. Research visa industry best practices and compliance needs
3. Design user-friendly interface for complex processes
4. Implement with proper data validation and security
5. Add progress tracking and status indicators
6. Test with various agent scenarios and edge cases
7. Ensure compliance with international regulations
8. Document feature usage and provide agent training materials

Providing comprehensive agent management solution with industry-specific optimizations.`,

    errorHandling: `Agent management task encountered an issue. Analyzing the problem...

Agent-specific troubleshooting approach:
1. Check agent workflow logic and validation rules
2. Verify document handling and security measures
3. Test multi-step form persistence and recovery
4. Validate compliance with visa agent regulations
5. Check data consistency across agent features
6. Test with various agent types and scenarios
7. Provide fallback solutions for edge cases

Delivering robust agent management solution with comprehensive error handling.`
  },

  visaSpecialties: [
    'Tourist visa services',
    'Business visa processing',
    'Student visa applications',
    'Work visa consultation',
    'Family reunion visas',
    'Transit visa services',
    'Visa extensions and renewals',
    'Emergency travel documents',
    'Multiple entry visas',
    'Diplomatic visa services'
  ],

  countryExpertise: [
    'United States (USCIS, State Department)',
    'European Union (Schengen visas)',
    'United Kingdom (UKVI)',
    'Canada (IRCC)',
    'Australia (Department of Home Affairs)',
    'New Zealand (Immigration New Zealand)',
    'Japan (MOFA)',
    'China (Chinese Embassy/Consulates)',
    'India (Indian Embassy/Consulates)',
    'UAE (Emirates visa services)'
  ],

  languageSupport: [
    'English (primary)',
    'Spanish (Americas)',
    'French (Europe, Africa)',
    'German (Europe)',
    'Chinese (Simplified & Traditional)',
    'Arabic (Middle East, North Africa)',
    'Japanese',
    'Hindi',
    'Portuguese (Brazil)',
    'Russian (Eastern Europe)'
  ]
}