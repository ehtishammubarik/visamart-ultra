import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import {
  User,
  Agent,
  VisaService,
  ServiceApplication,
  Country,
  VisaCategory,
  Language,
  ApiResponse,
  PaginatedResponse,
  LoginRequest,
  LoginResponse,
  SearchFilters,
  SortOption,
} from '../types'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const API_VERSION = 'v1'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getStoredToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - redirect to login
          this.handleUnauthorized()
        }
        return Promise.reject(error)
      }
    )
  }

  private getStoredToken(): string | null {
    // In a real app, you'd get this from Auth0 or your auth store
    return localStorage.getItem('visamart_access_token')
  }

  private handleUnauthorized() {
    // Clear stored auth and redirect to login
    localStorage.removeItem('visamart_access_token')
    window.location.href = '/auth/login'
  }

  // Authentication endpoints
  async login(authData: LoginRequest): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>('/auth/login', authData)
    
    // Store the token
    localStorage.setItem('visamart_access_token', response.data.access_token)
    
    return response.data
  }

  async register(authData: LoginRequest): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>('/auth/register', authData)
    
    // Store the token
    localStorage.setItem('visamart_access_token', response.data.access_token)
    
    return response.data
  }

  // User endpoints
  async getCurrentUser(): Promise<User> {
    const response = await this.api.get<User>('/users/me')
    return response.data
  }

  async updateCurrentUser(updates: Partial<User>): Promise<User> {
    const response = await this.api.put<User>('/users/me', updates)
    return response.data
  }

  // Agent endpoints
  async getAgentProfile(): Promise<Agent> {
    const response = await this.api.get<Agent>('/agents/profile')
    return response.data
  }

  async createOrUpdateAgentProfile(profileData: Partial<Agent>): Promise<Agent> {
    const response = await this.api.post<Agent>('/agents/profile', profileData)
    return response.data
  }

  async submitAgentProfile(): Promise<Agent> {
    const response = await this.api.post<Agent>('/agents/profile/submit')
    return response.data
  }

  async getAgents(filters?: SearchFilters): Promise<PaginatedResponse<Agent>> {
    const response = await this.api.get<PaginatedResponse<Agent>>('/agents', {
      params: filters,
    })
    return response.data
  }

  // Service endpoints
  async getServices(filters?: SearchFilters, sort?: SortOption): Promise<PaginatedResponse<VisaService>> {
    const response = await this.api.get<PaginatedResponse<VisaService>>('/services', {
      params: { ...filters, ...sort },
    })
    return response.data
  }

  async getService(id: string): Promise<VisaService> {
    const response = await this.api.get<VisaService>(`/services/${id}`)
    return response.data
  }

  async createService(serviceData: Partial<VisaService>): Promise<VisaService> {
    const response = await this.api.post<VisaService>('/services', serviceData)
    return response.data
  }

  async updateService(id: string, updates: Partial<VisaService>): Promise<VisaService> {
    const response = await this.api.put<VisaService>(`/services/${id}`, updates)
    return response.data
  }

  async deleteService(id: string): Promise<void> {
    await this.api.delete(`/services/${id}`)
  }

  // Application endpoints
  async getApplications(): Promise<ServiceApplication[]> {
    const response = await this.api.get<ServiceApplication[]>('/applications')
    return response.data
  }

  async getApplication(id: string): Promise<ServiceApplication> {
    const response = await this.api.get<ServiceApplication>(`/applications/${id}`)
    return response.data
  }

  async createApplication(applicationData: Partial<ServiceApplication>): Promise<ServiceApplication> {
    const response = await this.api.post<ServiceApplication>('/applications', applicationData)
    return response.data
  }

  async updateApplication(id: string, updates: Partial<ServiceApplication>): Promise<ServiceApplication> {
    const response = await this.api.put<ServiceApplication>(`/applications/${id}`, updates)
    return response.data
  }

  // Master data endpoints
  async getCountries(): Promise<Country[]> {
    const response = await this.api.get<Country[]>('/master-data/countries')
    return response.data
  }

  async getVisaCategories(): Promise<VisaCategory[]> {
    const response = await this.api.get<VisaCategory[]>('/master-data/visa-categories')
    return response.data
  }

  async getLanguages(): Promise<Language[]> {
    const response = await this.api.get<Language[]>('/master-data/languages')
    return response.data
  }

  // File upload endpoints
  async uploadFile(file: File, purpose: string): Promise<{ id: string; url: string }> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('purpose', purpose)

    const response = await this.api.post<{ id: string; url: string }>('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  async deleteFile(fileId: string): Promise<void> {
    await this.api.delete(`/files/${fileId}`)
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.api.get<{ status: string; timestamp: string }>('/health')
    return response.data
  }
}

// Create singleton instance
export const apiService = new ApiService()

// React Query keys for consistent cache management
export const queryKeys = {
  // User keys
  currentUser: ['user', 'current'] as const,
  
  // Agent keys
  agentProfile: ['agent', 'profile'] as const,
  agents: (filters?: SearchFilters) => ['agents', 'list', filters] as const,
  
  // Service keys
  services: (filters?: SearchFilters, sort?: SortOption) => ['services', 'list', filters, sort] as const,
  service: (id: string) => ['services', 'detail', id] as const,
  
  // Application keys
  applications: ['applications', 'list'] as const,
  application: (id: string) => ['applications', 'detail', id] as const,
  
  // Master data keys
  countries: ['master-data', 'countries'] as const,
  visaCategories: ['master-data', 'visa-categories'] as const,
  languages: ['master-data', 'languages'] as const,
} as const

export default apiService