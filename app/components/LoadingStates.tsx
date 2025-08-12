'use client'

import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  )
}

interface LoadingButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function LoadingButton({ 
  children, 
  isLoading = false, 
  className = '', 
  onClick,
  disabled = false 
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative ${className} ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" className="text-current" />
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  )
}

export function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
      <div className="flex flex-col items-center space-y-3">
        <LoadingSpinner size="lg" className="text-primary" />
        <p className="text-textSecondary text-sm">Loading...</p>
      </div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="card-compact animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted-dark rounded-full"></div>
          <div>
            <div className="h-4 bg-muted-dark rounded w-24 mb-2"></div>
            <div className="h-3 bg-muted-dark rounded w-32"></div>
          </div>
        </div>
        <div className="text-right">
          <div className="h-5 bg-muted-dark rounded w-20 mb-2"></div>
          <div className="h-3 bg-muted-dark rounded w-16"></div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="h-6 bg-muted-dark rounded w-24"></div>
        <div className="h-8 bg-muted-dark rounded w-20"></div>
      </div>
    </div>
  )
}

export function LoadingMessage() {
  return (
    <div className="space-y-1 animate-pulse">
      <div className="flex items-center space-x-2">
        <div className="h-3 bg-muted-dark rounded w-16"></div>
        <div className="h-3 bg-muted-dark rounded w-12"></div>
      </div>
      <div className="bg-muted-dark rounded-md p-3">
        <div className="h-4 bg-muted rounded w-full mb-2"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
    </div>
  )
}
