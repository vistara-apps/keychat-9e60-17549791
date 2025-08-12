'use client'

import { MessageCircle, Users, Key, Search, Sparkles } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  className = '' 
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          {icon || <Sparkles className="w-8 h-8 text-textTertiary" />}
        </div>
      </div>
      <h3 className="text-heading font-semibold text-textPrimary mb-3">
        {title}
      </h3>
      <p className="text-body text-textSecondary mb-6 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export function EmptyCreators({ onExplore }: { onExplore?: () => void }) {
  return (
    <EmptyState
      icon={<Users className="w-8 h-8 text-primary" />}
      title="No Creators Found"
      description="There are no creators available right now. Check back later for new creators to discover!"
      action={onExplore ? {
        label: "Refresh",
        onClick: onExplore
      } : undefined}
    />
  )
}

export function EmptyChat({ 
  creatorName,
  onSendFirst 
}: { 
  creatorName?: string
  onSendFirst?: () => void 
}) {
  return (
    <EmptyState
      icon={<MessageCircle className="w-8 h-8 text-primary" />}
      title="Start the Conversation"
      description={`Be the first to send a message in ${creatorName ? `${creatorName}'s` : 'this'} exclusive chat!`}
      action={onSendFirst ? {
        label: "Send First Message",
        onClick: onSendFirst
      } : undefined}
    />
  )
}

export function EmptyKeys({ onExplore }: { onExplore?: () => void }) {
  return (
    <EmptyState
      icon={<Key className="w-8 h-8 text-accent" />}
      title="No Keys Yet"
      description="You haven't purchased any creator keys yet. Start exploring creators to unlock exclusive chats!"
      action={onExplore ? {
        label: "Explore Creators",
        onClick: onExplore
      } : undefined}
    />
  )
}

export function EmptySearch({ 
  query,
  onClear 
}: { 
  query?: string
  onClear?: () => void 
}) {
  return (
    <EmptyState
      icon={<Search className="w-8 h-8 text-textTertiary" />}
      title="No Results Found"
      description={`No creators found matching "${query}". Try adjusting your search terms.`}
      action={onClear ? {
        label: "Clear Search",
        onClick: onClear
      } : undefined}
    />
  )
}

export function WelcomeState({ onGetStarted }: { onGetStarted?: () => void }) {
  return (
    <div className="text-center py-16 px-6">
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
      </div>
      <h2 className="text-display font-bold text-textPrimary mb-4">
        Welcome to KeyChat
      </h2>
      <p className="text-body text-textSecondary mb-8 max-w-md mx-auto leading-relaxed">
        Discover exclusive creator communities and unlock premium content by trading creator keys.
      </p>
      <div className="space-y-4 max-w-sm mx-auto">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm text-textSecondary">Browse featured creators</p>
        </div>
        <div className="flex items-center space-x-3 text-left">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Key className="w-4 h-4 text-accent" />
          </div>
          <p className="text-sm text-textSecondary">Purchase keys to unlock chats</p>
        </div>
        <div className="flex items-center space-x-3 text-left">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-4 h-4 text-success" />
          </div>
          <p className="text-sm text-textSecondary">Join exclusive conversations</p>
        </div>
      </div>
      {onGetStarted && (
        <button
          onClick={onGetStarted}
          className="btn-primary mt-8"
        >
          Get Started
        </button>
      )}
    </div>
  )
}
