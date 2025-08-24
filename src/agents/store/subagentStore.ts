// VisaMart ULTRA - Subagent State Management
// Advanced state management for autonomous agents

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { persist } from 'zustand/middleware'
import { 
  SubagentContext, 
  SubagentTask, 
  SubagentResponse, 
  VisaMartAgent,
  TaskType,
  TaskPriority,
  TaskStatus,
  VisaMartDomain
} from '../types'

interface SubagentStore {
  // State
  agents: Map<string, VisaMartAgent>
  contexts: Map<string, SubagentContext>
  tasks: Map<string, SubagentTask>
  activeAgents: string[]
  globalState: Record<string, any>
  
  // Agent Management
  registerAgent: (agent: VisaMartAgent) => void
  unregisterAgent: (agentId: string) => void
  activateAgent: (agentId: string) => void
  deactivateAgent: (agentId: string) => void
  
  // Task Management
  createTask: (task: Omit<SubagentTask, 'id' | 'createdAt' | 'updatedAt'>) => string
  assignTask: (taskId: string, agentId: string) => void
  updateTask: (taskId: string, updates: Partial<SubagentTask>) => void
  completeTask: (taskId: string, result: any) => void
  failTask: (taskId: string, error: string) => void
  
  // Context Management
  createContext: (agentId: string) => SubagentContext
  updateContext: (agentId: string, updates: Partial<SubagentContext>) => void
  getContext: (agentId: string) => SubagentContext | undefined
  
  // Communication
  sendMessage: (agentId: string, message: string, metadata?: Record<string, any>) => void
  broadcastMessage: (message: string, excludeAgents?: string[]) => void
  
  // State Management
  setGlobalState: (key: string, value: any) => void
  getGlobalState: (key: string) => any
  clearGlobalState: () => void
  
  // Analytics
  getTasksByAgent: (agentId: string) => SubagentTask[]
  getTasksByStatus: (status: TaskStatus) => SubagentTask[]
  getTasksByType: (type: TaskType) => SubagentTask[]
  getAgentMetrics: (agentId: string) => AgentMetrics
  
  // Utilities
  reset: () => void
}

interface AgentMetrics {
  totalTasks: number
  completedTasks: number
  failedTasks: number
  averageExecutionTime: number
  successRate: number
  lastActivity: Date
}

// Generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const useSubagentStore = create<SubagentStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        agents: new Map(),
        contexts: new Map(),
        tasks: new Map(),
        activeAgents: [],
        globalState: {},

        // Agent Management
        registerAgent: (agent) => {
          set((state) => {
            const newAgents = new Map(state.agents)
            newAgents.set(agent.id, agent)
            console.log(`🤖 Agent registered: ${agent.name} (${agent.id})`)
            return { agents: newAgents }
          })
        },

        unregisterAgent: (agentId) => {
          set((state) => {
            const newAgents = new Map(state.agents)
            const newContexts = new Map(state.contexts)
            newAgents.delete(agentId)
            newContexts.delete(agentId)
            console.log(`🤖 Agent unregistered: ${agentId}`)
            return { 
              agents: newAgents, 
              contexts: newContexts,
              activeAgents: state.activeAgents.filter(id => id !== agentId)
            }
          })
        },

        activateAgent: (agentId) => {
          set((state) => {
            if (!state.activeAgents.includes(agentId)) {
              console.log(`🟢 Agent activated: ${agentId}`)
              return { activeAgents: [...state.activeAgents, agentId] }
            }
            return state
          })
        },

        deactivateAgent: (agentId) => {
          set((state) => {
            console.log(`🔴 Agent deactivated: ${agentId}`)
            return { activeAgents: state.activeAgents.filter(id => id !== agentId) }
          })
        },

        // Task Management
        createTask: (taskData) => {
          const taskId = generateId()
          const now = new Date()
          const task: SubagentTask = {
            id: taskId,
            ...taskData,
            createdAt: now,
            updatedAt: now
          }

          set((state) => {
            const newTasks = new Map(state.tasks)
            newTasks.set(taskId, task)
            console.log(`📋 Task created: ${task.title} (${taskId})`)
            return { tasks: newTasks }
          })

          return taskId
        },

        assignTask: (taskId, agentId) => {
          set((state) => {
            const newTasks = new Map(state.tasks)
            const task = newTasks.get(taskId)
            if (task) {
              task.assignedAgent = agentId
              task.status = TaskStatus.IN_PROGRESS
              task.updatedAt = new Date()
              console.log(`🎯 Task assigned: ${taskId} → ${agentId}`)
            }
            return { tasks: newTasks }
          })
        },

        updateTask: (taskId, updates) => {
          set((state) => {
            const newTasks = new Map(state.tasks)
            const task = newTasks.get(taskId)
            if (task) {
              Object.assign(task, updates, { updatedAt: new Date() })
              console.log(`📝 Task updated: ${taskId}`)
            }
            return { tasks: newTasks }
          })
        },

        completeTask: (taskId, result) => {
          set((state) => {
            const newTasks = new Map(state.tasks)
            const task = newTasks.get(taskId)
            if (task) {
              task.status = TaskStatus.COMPLETED
              task.result = result
              task.completedAt = new Date()
              task.updatedAt = new Date()
              console.log(`✅ Task completed: ${taskId}`)
            }
            return { tasks: newTasks }
          })
        },

        failTask: (taskId, error) => {
          set((state) => {
            const newTasks = new Map(state.tasks)
            const task = newTasks.get(taskId)
            if (task) {
              task.status = TaskStatus.FAILED
              task.error = error
              task.updatedAt = new Date()
              console.log(`❌ Task failed: ${taskId} - ${error}`)
            }
            return { tasks: newTasks }
          })
        },

        // Context Management
        createContext: (agentId) => {
          const context: SubagentContext = {
            agentId,
            sessionId: generateId(),
            state: {},
            capabilities: [],
            memory: {
              shortTerm: {},
              longTerm: {},
              conversationHistory: [],
              knowledgeBase: []
            },
            tools: []
          }

          set((state) => {
            const newContexts = new Map(state.contexts)
            newContexts.set(agentId, context)
            return { contexts: newContexts }
          })

          return context
        },

        updateContext: (agentId, updates) => {
          set((state) => {
            const newContexts = new Map(state.contexts)
            const context = newContexts.get(agentId)
            if (context) {
              Object.assign(context, updates)
            }
            return { contexts: newContexts }
          })
        },

        getContext: (agentId) => {
          return get().contexts.get(agentId)
        },

        // Communication
        sendMessage: (agentId, message, metadata = {}) => {
          const context = get().getContext(agentId)
          if (context) {
            context.memory.conversationHistory.push({
              id: generateId(),
              timestamp: new Date(),
              speaker: 'system',
              content: message,
              metadata
            })
            get().updateContext(agentId, { memory: context.memory })
          }
        },

        broadcastMessage: (message, excludeAgents = []) => {
          const { activeAgents } = get()
          activeAgents.forEach(agentId => {
            if (!excludeAgents.includes(agentId)) {
              get().sendMessage(agentId, message)
            }
          })
        },

        // State Management
        setGlobalState: (key, value) => {
          set((state) => ({
            globalState: { ...state.globalState, [key]: value }
          }))
        },

        getGlobalState: (key) => {
          return get().globalState[key]
        },

        clearGlobalState: () => {
          set({ globalState: {} })
        },

        // Analytics
        getTasksByAgent: (agentId) => {
          return Array.from(get().tasks.values()).filter(task => task.assignedAgent === agentId)
        },

        getTasksByStatus: (status) => {
          return Array.from(get().tasks.values()).filter(task => task.status === status)
        },

        getTasksByType: (type) => {
          return Array.from(get().tasks.values()).filter(task => task.type === type)
        },

        getAgentMetrics: (agentId) => {
          const tasks = get().getTasksByAgent(agentId)
          const completed = tasks.filter(t => t.status === TaskStatus.COMPLETED)
          const failed = tasks.filter(t => t.status === TaskStatus.FAILED)
          
          const avgExecTime = completed.length > 0 
            ? completed.reduce((sum, task) => {
                return sum + (task.completedAt!.getTime() - task.createdAt.getTime())
              }, 0) / completed.length
            : 0

          return {
            totalTasks: tasks.length,
            completedTasks: completed.length,
            failedTasks: failed.length,
            averageExecutionTime: avgExecTime,
            successRate: tasks.length > 0 ? (completed.length / tasks.length) * 100 : 0,
            lastActivity: tasks.length > 0 
              ? new Date(Math.max(...tasks.map(t => t.updatedAt.getTime())))
              : new Date()
          }
        },

        // Utilities
        reset: () => {
          set({
            agents: new Map(),
            contexts: new Map(),
            tasks: new Map(),
            activeAgents: [],
            globalState: {}
          })
          console.log('🔄 Subagent store reset')
        }
      }),
      {
        name: 'visamart-subagent-store',
        partialize: (state) => ({
          globalState: state.globalState
          // Note: Maps don't serialize well, so we only persist globalState
        })
      }
    )
  )
)

// Convenience hooks
export const useActiveAgents = () => useSubagentStore(state => state.activeAgents)
export const useAgentTasks = (agentId: string) => useSubagentStore(state => state.getTasksByAgent(agentId))
export const useTasksByStatus = (status: TaskStatus) => useSubagentStore(state => state.getTasksByStatus(status))
export const useAgentMetrics = (agentId: string) => useSubagentStore(state => state.getAgentMetrics(agentId))