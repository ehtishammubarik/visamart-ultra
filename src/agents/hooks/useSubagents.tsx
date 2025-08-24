// VisaMart ULTRA - Subagent React Integration
// React hooks and providers for subagent system

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { subagentManager } from '../core/SubagentManager'
import { useSubagentStore, useActiveAgents, useTasksByStatus } from '../store/subagentStore'
import { 
  TaskType, 
  TaskPriority, 
  TaskStatus, 
  SubagentTask, 
  SubagentResponse 
} from '../types'

interface SubagentContextType {
  // Manager instance
  manager: typeof subagentManager
  
  // Quick task creation methods
  fixUIIssue: (component: string, issue: string, priority?: TaskPriority) => string
  optimizeForMobile: (component: string, priority?: TaskPriority) => string
  enhanceAgentFeature: (feature: string, description: string, priority?: TaskPriority) => string
  auditAccessibility: (component: string, priority?: TaskPriority) => string
  
  // Task execution
  executeTask: (taskId: string) => Promise<SubagentResponse>
  executeAllPendingTasks: () => Promise<SubagentResponse[]>
  
  // State
  activeAgents: string[]
  pendingTasks: SubagentTask[]
  inProgressTasks: SubagentTask[]
  completedTasks: SubagentTask[]
  failedTasks: SubagentTask[]
  
  // Analytics
  getSystemMetrics: () => ReturnType<typeof subagentManager.getSystemMetrics>
  
  // Development
  reset: () => void
  logStatus: () => void
}

const SubagentContext = createContext<SubagentContextType | undefined>(undefined)

interface SubagentProviderProps {
  children: ReactNode
  autoExecute?: boolean
  developmentMode?: boolean
}

export function SubagentProvider({ 
  children, 
  autoExecute = false, 
  developmentMode = true 
}: SubagentProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Zustand store subscriptions
  const activeAgents = useActiveAgents()
  const pendingTasks = useTasksByStatus(TaskStatus.PENDING)
  const inProgressTasks = useTasksByStatus(TaskStatus.IN_PROGRESS)
  const completedTasks = useTasksByStatus(TaskStatus.COMPLETED)
  const failedTasks = useTasksByStatus(TaskStatus.FAILED)

  useEffect(() => {
    // Initialize subagent manager
    if (!isInitialized) {
      console.log('🤖 Initializing Subagent Provider...')
      
      // The manager is already initialized as a singleton
      if (developmentMode) {
        subagentManager.logStatus()
      }
      
      setIsInitialized(true)
    }
  }, [isInitialized, developmentMode])

  useEffect(() => {
    // Auto-execute pending tasks if enabled
    if (autoExecute && pendingTasks.length > 0) {
      console.log(`🚀 Auto-executing ${pendingTasks.length} pending tasks...`)
      subagentManager.executeAllPendingTasks()
    }
  }, [autoExecute, pendingTasks.length])

  const contextValue: SubagentContextType = {
    manager: subagentManager,
    
    // Quick task creation
    fixUIIssue: (component, issue, priority) => 
      subagentManager.fixUIIssue(component, issue, priority),
    optimizeForMobile: (component, priority) => 
      subagentManager.optimizeForMobile(component, priority),
    enhanceAgentFeature: (feature, description, priority) => 
      subagentManager.enhanceAgentFeature(feature, description, priority),
    auditAccessibility: (component, priority) => 
      subagentManager.auditAccessibility(component, priority),
    
    // Task execution
    executeTask: (taskId) => subagentManager.executeTask(taskId),
    executeAllPendingTasks: () => subagentManager.executeAllPendingTasks(),
    
    // State from Zustand store
    activeAgents,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    failedTasks,
    
    // Analytics
    getSystemMetrics: () => subagentManager.getSystemMetrics(),
    
    // Development
    reset: () => subagentManager.reset(),
    logStatus: () => subagentManager.logStatus()
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Initializing Subagent System...</p>
        </div>
      </div>
    )
  }

  return (
    <SubagentContext.Provider value={contextValue}>
      {children}
    </SubagentContext.Provider>
  )
}

// Main hook for using subagents
export function useSubagents(): SubagentContextType {
  const context = useContext(SubagentContext)
  if (context === undefined) {
    throw new Error('useSubagents must be used within a SubagentProvider')
  }
  return context
}

// Convenience hooks for specific functionality
export function useUIFixes() {
  const { fixUIIssue, auditAccessibility, executeTask } = useSubagents()
  
  const fixWhiteTextIssue = (component: string) => {
    const taskId = fixUIIssue(
      component,
      'Fix white text on white background visibility issues',
      TaskPriority.CRITICAL
    )
    return executeTask(taskId)
  }

  const fixContrastIssues = (component: string) => {
    const taskId = auditAccessibility(component, TaskPriority.HIGH)
    return executeTask(taskId)
  }

  return {
    fixUIIssue,
    auditAccessibility,
    fixWhiteTextIssue,
    fixContrastIssues,
    executeTask
  }
}

export function useMobileOptimization() {
  const { optimizeForMobile, executeTask } = useSubagents()
  
  const optimizeComponent = (component: string) => {
    const taskId = optimizeForMobile(component, TaskPriority.HIGH)
    return executeTask(taskId)
  }

  return {
    optimizeForMobile,
    optimizeComponent,
    executeTask
  }
}

export function useAgentManagement() {
  const { enhanceAgentFeature, executeTask } = useSubagents()
  
  const enhanceOnboarding = () => {
    const taskId = enhanceAgentFeature(
      'Agent Onboarding',
      'Complete multi-step agent onboarding with document verification',
      TaskPriority.HIGH
    )
    return executeTask(taskId)
  }

  const buildAgentDashboard = () => {
    const taskId = enhanceAgentFeature(
      'Agent Dashboard',
      'Create comprehensive agent dashboard with analytics and service management',
      TaskPriority.HIGH
    )
    return executeTask(taskId)
  }

  return {
    enhanceAgentFeature,
    enhanceOnboarding,
    buildAgentDashboard,
    executeTask
  }
}

// Development hooks
export function useSubagentDevelopment() {
  const { 
    getSystemMetrics, 
    reset, 
    logStatus, 
    manager,
    activeAgents,
    pendingTasks,
    completedTasks,
    failedTasks
  } = useSubagents()
  
  const [metrics, setMetrics] = useState<ReturnType<typeof getSystemMetrics> | null>(null)
  
  useEffect(() => {
    const updateMetrics = () => setMetrics(getSystemMetrics())
    updateMetrics()
    
    const interval = setInterval(updateMetrics, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [getSystemMetrics])

  const createTestTasks = () => {
    manager.fixUIIssue('HomePage', 'Fix white text on white background', TaskPriority.CRITICAL)
    manager.optimizeForMobile('Dashboard', TaskPriority.HIGH)
    manager.enhanceAgentFeature('Onboarding', 'Complete agent registration flow', TaskPriority.MEDIUM)
    manager.auditAccessibility('MainLayout', TaskPriority.HIGH)
  }

  return {
    metrics,
    activeAgents,
    pendingTasks,
    completedTasks,
    failedTasks,
    createTestTasks,
    reset,
    logStatus
  }
}

// Hook for monitoring task execution
export function useTaskMonitoring() {
  const { pendingTasks, inProgressTasks, completedTasks, failedTasks } = useSubagents()
  
  const totalTasks = pendingTasks.length + inProgressTasks.length + 
                    completedTasks.length + failedTasks.length
  
  const completionRate = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0
  const failureRate = totalTasks > 0 ? (failedTasks.length / totalTasks) * 100 : 0
  
  return {
    totalTasks,
    pendingCount: pendingTasks.length,
    inProgressCount: inProgressTasks.length,
    completedCount: completedTasks.length,
    failedCount: failedTasks.length,
    completionRate,
    failureRate,
    isWorking: inProgressTasks.length > 0,
    hasErrors: failedTasks.length > 0
  }
}