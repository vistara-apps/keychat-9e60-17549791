'use client'

import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react'

interface ErrorStateProps {
  title: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
  className?: string
}

export function ErrorState({ 
  title, 
  message, 
  action, 
  icon, 
  className = '' 
}: ErrorStateProps) {
  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      <div className="flex justify-center mb-4">
        {icon || <AlertTriangle className="w-12 h-12 text-error" />}
      </div>
      <h3 className="text-heading font-semibold text-textPrimary mb-2">
        {title}
      </h3>
      <p className="text-body text-textSecondary mb-6 max-w-md mx-auto">
        {message}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{action.label}</span>
        </button>
      )}
    </div>
  )
}

export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Connection Error"
      message="Unable to connect to the network. Please check your internet connection and try again."
      action={{
        label: "Try Again",
        onClick: onRetry
      }}
      icon={<WifiOff className="w-12 h-12 text-error" />}
    />
  )
}

export function LoadingError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Loading Failed"
      message="Something went wrong while loading the data. Please try again."
      action={{
        label: "Retry",
        onClick: onRetry
      }}
    />
  )
}

export function NotFoundError({ 
  title = "Not Found",
  message = "The item you're looking for doesn't exist or has been removed.",
  onGoBack
}: { 
  title?: string
  message?: string
  onGoBack?: () => void 
}) {
  return (
    <ErrorState
      title={title}
      message={message}
      action={onGoBack ? {
        label: "Go Back",
        onClick: onGoBack
      } : undefined}
    />
  )
}

export function AccessDeniedError({ onGoBack }: { onGoBack?: () => void }) {
  return (
    <ErrorState
      title="Access Denied"
      message="You don't have permission to access this content. Please purchase a key to continue."
      action={onGoBack ? {
        label: "Go Back",
        onClick: onGoBack
      } : undefined}
    />
  )
}

interface ErrorBoundaryFallbackProps {
  error: Error
  resetError: () => void
}

export function ErrorBoundaryFallback({ error, resetError }: ErrorBoundaryFallbackProps) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <ErrorState
          title="Something went wrong"
          message="An unexpected error occurred. Please try refreshing the page."
          action={{
            label: "Try Again",
            onClick: resetError
          }}
        />
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 p-4 bg-muted rounded-lg">
            <summary className="cursor-pointer text-sm font-medium text-textSecondary">
              Error Details
            </summary>
            <pre className="mt-2 text-xs text-textTertiary overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
