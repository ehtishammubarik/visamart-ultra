// VisaMart ULTRA - Subagent System Types
// Inspired by claude-awesome-agents architecture

export interface SubagentCapability {
  name: string
  description: string
  version: string
  enabled: boolean
  dependencies?: string[]
}

export interface SubagentContext {
  agentId: string
  sessionId: string
  currentTask?: string
  state: Record<string, any>
  capabilities: SubagentCapability[]
  memory: AgentMemory
  tools: string[]
}

export interface AgentMemory {
  shortTerm: Record<string, any>
  longTerm: Record<string, any>
  conversationHistory: ConversationTurn[]
  knowledgeBase: KnowledgeItem[]
}

export interface ConversationTurn {
  id: string
  timestamp: Date
  speaker: 'user' | 'agent' | 'system'
  content: string
  metadata?: Record<string, any>
}

export interface KnowledgeItem {
  id: string
  category: string
  title: string
  content: string
  relevance: number
  lastUpdated: Date
  source: string
}

export interface SubagentTask {
  id: string
  type: TaskType
  priority: TaskPriority
  status: TaskStatus
  title: string
  description: string
  context: Record<string, any>
  assignedAgent: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  result?: any
  error?: string
}

export enum TaskType {
  UI_ENHANCEMENT = 'ui_enhancement',
  MOBILE_OPTIMIZATION = 'mobile_optimization',
  BUG_FIX = 'bug_fix',
  FEATURE_DEVELOPMENT = 'feature_development',
  CODE_REVIEW = 'code_review',
  TESTING = 'testing',
  DEPLOYMENT = 'deployment',
  DOCUMENTATION = 'documentation',
  PERFORMANCE_OPTIMIZATION = 'performance_optimization',
  SECURITY_AUDIT = 'security_audit'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface SubagentDefinition {
  id: string
  name: string
  description: string
  version: string
  capabilities: SubagentCapability[]
  specialties: string[]
  tools: string[]
  constraints: string[]
  examples: string[]
  prompts: {
    system: string
    initialization: string
    taskExecution: string
    errorHandling: string
  }
}

export interface SubagentResponse {
  agentId: string
  taskId: string
  success: boolean
  result?: any
  error?: string
  suggestions?: string[]
  nextSteps?: string[]
  confidence: number
  executionTime: number
  metadata?: Record<string, any>
}

// VisaMart specific agent types
export interface VisaMartAgent extends SubagentDefinition {
  domain: VisaMartDomain
  visaSpecialties?: string[]
  countryExpertise?: string[]
  languageSupport?: string[]
}

export enum VisaMartDomain {
  UI_UX = 'ui_ux',
  MOBILE = 'mobile',
  BACKEND = 'backend',
  AGENT_MANAGEMENT = 'agent_management',
  VISA_PROCESSING = 'visa_processing',
  CUSTOMER_SUPPORT = 'customer_support',
  ANALYTICS = 'analytics',
  SECURITY = 'security',
  TESTING = 'testing',
  DEVOPS = 'devops'
}