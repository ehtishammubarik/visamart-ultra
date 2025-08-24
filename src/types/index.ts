// Core User Types
export interface User {
  id: string
  auth0_user_id: string
  email: string
  first_name: string
  last_name: string
  profile_picture?: string
  user_type: UserType
  status: UserStatus
  email_verified: boolean
  phone_number?: string
  contact_preference: ContactPreference
  is_agent: boolean
  created_at: string
  updated_at: string
}

export interface Agent {
  id: string
  user_id: string
  company_name?: string
  license_number?: string
  profile_status: ProfileStatus
  kyc_status: KYCStatus
  regions_expertise: string[]
  visa_categories: string[]
  languages_spoken: string[]
  experience_years: string
  website_url?: string
  office_address?: string
  bio?: string
  specializations?: string[]
  success_rate?: number
  average_processing_days?: number
  total_applications?: number
  verification_documents?: string[]
  admin_notes?: string
  rejection_reason?: string
  created_at: string
  updated_at: string
  user?: User
}

// Enums
export enum UserType {
  USER = 'user',
  AGENT = 'agent'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

export enum ContactPreference {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  SMS = 'SMS'
}

export enum ProfileStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  RESUBMITTED = 'RESUBMITTED'
}

export enum KYCStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

// Service Types
export interface VisaService {
  id: string
  agent_id: string
  title: string
  description: string
  visa_type: string
  destination_country: string
  processing_time_days: number
  total_price: number
  embassy_fee: number
  service_charges: number
  requirements: string[]
  success_rate?: number
  is_featured: boolean
  status: ServiceStatus
  created_at: string
  updated_at: string
  agent?: Agent
}

export enum ServiceStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

// Application Types
export interface ServiceApplication {
  id: string
  user_id: string
  agent_id: string
  service_id: string
  application_reference: string
  status: ApplicationStatus
  applicant_first_name: string
  applicant_last_name: string
  applicant_email: string
  applicant_phone?: string
  travel_date?: string
  purpose_of_travel?: string
  previous_rejections?: boolean
  additional_notes?: string
  agent_notes?: string
  estimated_completion?: string
  created_at: string
  updated_at: string
  service?: VisaService
  agent?: Agent
  documents?: ApplicationDocument[]
}

export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  DOCUMENTS_REQUESTED = 'DOCUMENTS_REQUESTED',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Document Types
export interface ApplicationDocument {
  id: string
  application_id: string
  document_name: string
  file_path: string
  original_filename: string
  file_size_bytes: number
  status: DocumentStatus
  is_required: boolean
  uploaded_by_user_id: string
  created_at: string
}

export interface AgentDocument {
  id: string
  agent_id: string
  document_type: DocumentType
  file_name: string
  original_filename: string
  file_path: string
  file_size: number
  mime_type: string
  status: DocumentStatus
  created_at: string
}

export enum DocumentType {
  BUSINESS_LICENSE = 'business_license',
  ID_DOCUMENT = 'id_document',
  CERTIFICATE = 'certificate',
  OTHER = 'other'
}

export enum DocumentStatus {
  UPLOADED = 'uploaded',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  PENDING = 'pending'
}

// Master Data Types
export interface Country {
  code: string
  name: string
  region: string
  is_popular: boolean
}

export interface VisaCategory {
  code: string
  name: string
  description: string
  is_popular: boolean
}

export interface Language {
  code: string
  name: string
  native_name: string
  is_popular: boolean
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  status: 'success' | 'error'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface ErrorResponse {
  error: string
  message: string
  details?: Record<string, any>
}

// Authentication Types
export interface LoginRequest {
  auth0_token: string
  user_type: UserType
}

export interface LoginResponse {
  access_token: string
  token_type: string
  expires_in: number
  user: {
    id: string
    email: string
    first_name: string
    last_name: string
    user_type: string
    is_agent: boolean
  }
  is_new_user: boolean
}

// UI Component Types
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface TableColumn<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

export interface FilterOption {
  key: string
  label: string
  type: 'select' | 'range' | 'checkbox' | 'search'
  options?: SelectOption[]
  min?: number
  max?: number
}

// Theme Types
export type Theme = 'dark' | 'light' | 'system'

// Search and Filter Types
export interface SearchFilters {
  query?: string
  visa_type?: string
  destination_country?: string
  min_price?: number
  max_price?: number
  max_processing_days?: number
  agent_id?: string
  is_featured?: boolean
  status?: string
}

export interface SortOption {
  field: string
  direction: 'asc' | 'desc'
}

// Statistics Types
export interface DashboardStats {
  total_applications?: number
  pending_applications?: number
  approved_applications?: number
  total_services?: number
  active_services?: number
  success_rate?: number
  average_processing_time?: number
  total_revenue?: number
}

// Notification Types
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  created_at: string
  action_url?: string
}

// File Upload Types
export interface FileUploadConfig {
  maxSize: number
  allowedTypes: string[]
  multiple?: boolean
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  status: 'uploading' | 'uploaded' | 'error'
  progress?: number
}

// Navigation Types
export interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType<any>
  badge?: string | number
  children?: NavigationItem[]
}

// Form Types
export interface FormFieldError {
  field: string
  message: string
}

export interface FormState {
  isSubmitting: boolean
  errors: FormFieldError[]
  isDirty: boolean
  isValid: boolean
}