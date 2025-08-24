import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Agent, UserType } from '../types'

interface AuthState {
  user: User | null
  agent: Agent | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: User) => void
  setAgent: (agent: Agent) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  login: (user: User, agent?: Agent) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  updateAgent: (updates: Partial<Agent>) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      agent: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      },

      setAgent: (agent) => {
        set({ agent })
      },

      setLoading: (loading) => {
        set({ isLoading: loading })
      },

      setError: (error) => {
        set({ error })
      },

      login: (user, agent) => {
        set({
          user,
          agent,
          isAuthenticated: true,
          error: null,
        })
      },

      logout: () => {
        set({
          user: null,
          agent: null,
          isAuthenticated: false,
          error: null,
        })
        // Clear persisted state
        localStorage.removeItem('visamart-auth-storage')
      },

      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          })
        }
      },

      updateAgent: (updates) => {
        const currentAgent = get().agent
        if (currentAgent) {
          set({
            agent: { ...currentAgent, ...updates },
          })
        }
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'visamart-auth-storage',
      partialize: (state) => ({
        user: state.user,
        agent: state.agent,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Helper hooks for convenience
export const useAuth = () => {
  const { user, agent, isAuthenticated, isLoading, error } = useAuthStore()
  return { user, agent, isAuthenticated, isLoading, error }
}

export const useUser = () => {
  const user = useAuthStore((state) => state.user)
  return user
}

export const useAgent = () => {
  const agent = useAuthStore((state) => state.agent)
  return agent
}

export const useIsAgent = () => {
  const user = useAuthStore((state) => state.user)
  return user?.is_agent || false
}

export const useUserType = () => {
  const user = useAuthStore((state) => state.user)
  return user?.user_type || UserType.USER
}