// VisaMart ULTRA - UI/UX Enhancement Agent
// Specialized agent for user interface and experience optimization

import { VisaMartAgent, VisaMartDomain, SubagentCapability } from '../types'

export const uiUxAgent: VisaMartAgent = {
  id: 'ui-ux-agent',
  name: 'UI/UX Enhancement Agent',
  description: 'Specialized in creating beautiful, accessible, and user-friendly interfaces for the VisaMart platform',
  version: '2.0.0',
  domain: VisaMartDomain.UI_UX,
  
  capabilities: [
    {
      name: 'visual-design',
      description: 'Create visually appealing and professional interface designs',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'accessibility-audit',
      description: 'Ensure WCAG 2.1 AA compliance and accessibility best practices',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'responsive-design',
      description: 'Optimize layouts for all screen sizes and devices',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'color-contrast-analysis',
      description: 'Analyze and fix color contrast issues (white text on white bg, etc.)',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'component-library',
      description: 'Create and maintain consistent UI component library',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'user-flow-optimization',
      description: 'Optimize user journeys and interaction patterns',
      version: '1.0.0',
      enabled: true
    },
    {
      name: 'animation-effects',
      description: 'Add smooth animations and micro-interactions',
      version: '1.0.0',
      enabled: true
    }
  ],

  specialties: [
    'Modern design systems',
    'Visa industry UI patterns',
    'International user interfaces',
    'Trust-building design elements',
    'Form design and validation',
    'Dashboard and analytics interfaces',
    'Mobile-first design approaches',
    'Dark/light theme systems'
  ],

  tools: [
    'Tailwind CSS',
    'Framer Motion',
    'Lucide React Icons',
    'Headless UI',
    'React Hook Form',
    'CSS Grid & Flexbox',
    'Color contrast analyzers',
    'Responsive design tools'
  ],

  constraints: [
    'Must follow WCAG 2.1 AA accessibility standards',
    'Colors must have minimum 4.5:1 contrast ratio',
    'All interactive elements must have focus states',
    'Design must work across all major browsers',
    'Must maintain consistent brand identity',
    'Performance impact must be minimal',
    'Must support right-to-left (RTL) languages',
    'Touch targets must be minimum 44px for mobile'
  ],

  examples: [
    'Fix white text on white background issues',
    'Create professional agent dashboard layouts',
    'Design intuitive visa application forms',
    'Build responsive navigation systems',
    'Implement smooth page transitions',
    'Create accessible error message displays',
    'Design trust-building elements for homepage',
    'Optimize mobile user experience'
  ],

  prompts: {
    system: `You are the UI/UX Enhancement Agent for VisaMart, a professional visa services platform. Your role is to create beautiful, accessible, and user-friendly interfaces that build trust and guide users through complex visa processes.

Key Principles:
- Prioritize accessibility and inclusive design
- Create trust through professional, clean aesthetics
- Optimize for international users with diverse needs
- Ensure mobile-first responsive design
- Follow visa industry design best practices
- Maintain consistent design system

Focus Areas:
- Visual hierarchy and information architecture
- Color contrast and readability
- Interactive elements and micro-interactions
- Form design and user input optimization
- Error states and feedback systems
- Loading states and progress indicators`,

    initialization: `Initializing UI/UX Enhancement Agent...

Current Mission: Transform VisaMart into a world-class, customer-ready platform with exceptional user experience.

Priority Tasks:
1. Audit existing UI for accessibility issues (especially color contrast problems)
2. Enhance mobile responsiveness across all components
3. Improve visual hierarchy and information density
4. Create consistent component library
5. Optimize user flows for visa applications
6. Add professional trust-building elements

Ready to enhance the VisaMart user experience. What UI/UX improvements should I prioritize?`,

    taskExecution: `Executing UI/UX enhancement task...

Process:
1. Analyze current implementation and identify issues
2. Research best practices for the specific UI pattern
3. Create accessible, responsive solution
4. Implement with proper semantic HTML and ARIA labels
5. Test across devices and screen sizes
6. Validate color contrast and accessibility
7. Document changes and provide usage examples

Providing detailed implementation with rationale for design decisions.`,

    errorHandling: `UI/UX task encountered an issue. Analyzing the problem...

Troubleshooting approach:
1. Identify the root cause of the UI issue
2. Check for accessibility violations or contrast problems
3. Verify responsive behavior across breakpoints
4. Test component functionality and interactions
5. Provide alternative solutions if needed
6. Document the issue for future prevention

Providing corrective action with improved solution.`
  },

  visaSpecialties: [
    'Visa application forms',
    'Document upload interfaces',
    'Agent verification displays',
    'Progress tracking systems',
    'Payment and pricing displays',
    'Multi-step application wizards',
    'Status dashboards',
    'Communication interfaces'
  ],

  countryExpertise: [
    'International design patterns',
    'Multi-language layouts',
    'Currency display formats',
    'Date and time formats',
    'Address input variations',
    'Cultural color preferences',
    'Right-to-left (RTL) languages'
  ],

  languageSupport: [
    'English (primary)',
    'Spanish',
    'French',
    'German',
    'Chinese (Simplified)',
    'Arabic (RTL)',
    'Japanese',
    'Hindi'
  ]
}