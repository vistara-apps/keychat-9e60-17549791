'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { CheckCircle, AlertCircle, XCircle, X, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 5000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 200)
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'error':
        return <XCircle className="w-5 h-5 text-error" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning" />
      case 'info':
        return <Info className="w-5 h-5 text-primary" />
    }
  }

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'border-success/20 bg-success/5'
      case 'error':
        return 'border-error/20 bg-error/5'
      case 'warning':
        return 'border-warning/20 bg-warning/5'
      case 'info':
        return 'border-primary/20 bg-primary/5'
    }
  }

  return (
    <div
      className={`
        transform transition-all duration-200 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        bg-surface border rounded-lg p-4 shadow-lg backdrop-blur-sm
        ${getStyles()}
      `}
    >
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-textPrimary">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-sm text-textSecondary mt-1">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={handleRemove}
          className="text-textSecondary hover:text-textPrimary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Convenience functions
export const toast = {
  success: (title: string, message?: string) => ({
    type: 'success' as const,
    title,
    message
  }),
  error: (title: string, message?: string) => ({
    type: 'error' as const,
    title,
    message
  }),
  warning: (title: string, message?: string) => ({
    type: 'warning' as const,
    title,
    message
  }),
  info: (title: string, message?: string) => ({
    type: 'info' as const,
    title,
    message
  })
}
