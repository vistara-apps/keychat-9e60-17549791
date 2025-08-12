'use client'

import { useMiniKit, useAddFrame, useClose } from '@coinbase/onchainkit/minikit'
import { useEffect, type ReactNode } from 'react'
import { ArrowLeft, Plus, X } from 'lucide-react'

interface AppShellProps {
  children: ReactNode
  title?: string
  showBack?: boolean
  onBack?: () => void
  currentView?: string
  onNavigateBack?: () => void
  onAddFrame?: () => void
  onClose?: () => void
  onOpenUrl?: (url: string) => void
  showAddFrame?: boolean
}

export function AppShell({ 
  children, 
  title = 'KeyChat', 
  showBack = false, 
  onBack,
  currentView,
  onNavigateBack,
  onAddFrame,
  onClose,
  onOpenUrl,
  showAddFrame = false
}: AppShellProps) {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const addFrame = useAddFrame()
  const close = useClose()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = async () => {
    try {
      const result = await addFrame()
      if (result) {
        console.log('Frame added:', result.url, result.token)
      }
      if (onAddFrame) {
        onAddFrame()
      }
    } catch (error) {
      console.error('Failed to add frame:', error)
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      close()
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (onNavigateBack) {
      onNavigateBack()
    }
  }

  // Dynamic title based on current view
  const getTitle = () => {
    if (currentView === 'creator') return 'Creator Details'
    if (currentView === 'chat') return 'Chat'
    return title
  }

  const shouldShowBack = showBack || (currentView && currentView !== 'home')

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-xl mx-auto">
        <header className="flex items-center justify-between py-4 px-4 border-b border-border bg-surface/95 backdrop-blur-md sticky top-0 z-20 shadow-sm">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            {shouldShowBack && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-muted rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-heading font-bold truncate">{getTitle()}</h1>
          </div>
          
          <div className="flex items-center space-x-1 flex-shrink-0">
            {(showAddFrame || (context && !context.client.added)) && (
              <button
                onClick={handleAddFrame}
                className="flex items-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-lg text-caption font-semibold transition-colors touch-manipulation min-h-[44px]"
                aria-label="Save to Farcaster"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">SAVE</span>
              </button>
            )}
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-textSecondary hover:text-textPrimary touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="px-4 py-6 pb-safe">
          {children}
        </main>
      </div>
    </div>
  )
}
