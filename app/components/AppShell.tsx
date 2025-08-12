
'use client'

import { useMiniKit, useAddFrame, useClose } from '@coinbase/onchainkit/minikit'
import { useEffect, type ReactNode } from 'react'
import { ArrowLeft, Plus, X } from 'lucide-react'

interface AppShellProps {
  children: ReactNode
  title?: string
  showBack?: boolean
  onBack?: () => void
}

export function AppShell({ children, title = 'KeyChat', showBack = false, onBack }: AppShellProps) {
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
    } catch (error) {
      console.error('Failed to add frame:', error)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-xl mx-auto px-4">
        <header className="flex items-center justify-between py-4 border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            {showBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-heading font-bold">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {context && !context.client.added && (
              <button
                onClick={handleAddFrame}
                className="flex items-center space-x-1 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-md text-caption font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>SAVE</span>
              </button>
            )}
            <button
              onClick={close}
              className="p-2 hover:bg-muted rounded-md transition-colors text-textSecondary hover:text-textPrimary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
