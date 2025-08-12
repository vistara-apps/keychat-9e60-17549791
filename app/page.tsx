'use client'

import { useMiniKit, useAddFrame, useOpenUrl, useClose, useViewProfile, usePrimaryButton, useNotification } from '@coinbase/onchainkit/minikit'
import { useEffect, useState, useCallback } from 'react'
import { AppShell } from './components/AppShell'
import { CreatorCard } from './components/CreatorCard'
import { KeyTradeButton } from './components/KeyTradeButton'
import { ChatFeed } from './components/ChatFeed'
import { BondingCurveChart } from './components/BondingCurveChart'
import { LoadingCard, LoadingButton } from './components/LoadingStates'
import { ToastProvider, useToast, toast } from './components/Toast'
import { EmptyCreators, EmptyChat, WelcomeState } from './components/EmptyStates'

// Mock data for development
const mockCreators = [
  {
    id: '1',
    fid: 123,
    name: 'Alice Creator',
    bio: 'Building the future of decentralized social',
    avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3ed0b4a6-3c8b-4e9b-9b4a-4b5b5b5b5b00/original',
    keyPrice: '0.05',
    totalSupply: 100,
    holders: 25,
    volume: '12.5'
  },
  {
    id: '2', 
    fid: 456,
    name: 'Bob Builder',
    bio: 'Creating amazing DeFi experiences',
    avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4ed0b4a6-3c8b-4e9b-9b4a-4b5b5b5b5b01/original',
    keyPrice: '0.08',
    totalSupply: 75,
    holders: 18,
    volume: '8.2'
  }
]

const mockMessages = [
  { id: '1', sender: 'Alice Creator', content: 'Welcome to my exclusive chat!', timestamp: new Date() },
  { id: '2', sender: 'User123', content: 'Thanks for the alpha!', timestamp: new Date() },
  { id: '3', sender: 'Alice Creator', content: 'Big announcement coming tomorrow 👀', timestamp: new Date() }
]

function KeyChatAppContent() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [currentView, setCurrentView] = useState<'home' | 'creator' | 'chat'>('home')
  const [selectedCreator, setSelectedCreator] = useState<typeof mockCreators[0] | null>(null)
  const [userKeys, setUserKeys] = useState<string[]>([])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)

  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  const close = useClose()
  const viewProfile = useViewProfile()
  const sendNotification = useNotification()
  const { showToast } = useToast()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame()
    if (result) {
      console.log('Frame added:', result.url, result.token)
    }
  }, [addFrame])

  const handleViewProfile = useCallback((creatorId: string) => {
    const creator = mockCreators.find(c => c.id === creatorId)
    if (creator) {
      viewProfile(creator.fid)
    }
  }, [viewProfile])

  const handleSendMessage = useCallback((content: string) => {
    if (content.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        sender: 'You',
        content: content.trim(),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, newMsg])
      setNewMessage('')
    }
  }, [])

  const handleBuyKey = useCallback(async (creatorId: string) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate key purchase
      setUserKeys(prev => [...prev, creatorId])
      
      // Show success toast
      showToast(toast.success(
        'Key Purchased! 🔑',
        `You now have access to ${selectedCreator?.name}'s exclusive chat!`
      ))
      
      // Send notification
      try {
        await sendNotification({
          title: 'Key Purchased! 🔑',
          body: `You now have access to ${selectedCreator?.name}'s exclusive chat!`
        })
      } catch (error) {
        console.error('Failed to send notification:', error)
      }
    } catch (error) {
      showToast(toast.error(
        'Purchase Failed',
        'Unable to purchase key. Please try again.'
      ))
    } finally {
      setIsLoading(false)
    }
  }, [sendNotification, selectedCreator, showToast])

  const handleSellKey = useCallback(async (creatorId: string) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setUserKeys(prev => prev.filter(id => id !== creatorId))
      
      showToast(toast.success(
        'Key Sold! 💰',
        'Your key has been sold successfully.'
      ))
    } catch (error) {
      showToast(toast.error(
        'Sale Failed',
        'Unable to sell key. Please try again.'
      ))
    } finally {
      setIsLoading(false)
    }
  }, [showToast])

  const handleCreatorSelect = useCallback((creator: typeof mockCreators[0]) => {
    setSelectedCreator(creator)
    setCurrentView('creator')
  }, [])

  const handleEnterChat = useCallback(() => {
    if (selectedCreator && userKeys.includes(selectedCreator.id)) {
      setCurrentView('chat')
    }
  }, [selectedCreator, userKeys])

  // Primary button configuration
  usePrimaryButton(
    { 
      text: currentView === 'home' ? 'EXPLORE CREATORS' : 
            currentView === 'creator' ? (userKeys.includes(selectedCreator?.id || '') ? 'ENTER CHAT' : 'BUY KEY') :
            'BACK TO CREATOR'
    },
    () => {
      if (currentView === 'home') {
        // Stay on home, maybe scroll to creators
      } else if (currentView === 'creator') {
        if (userKeys.includes(selectedCreator?.id || '')) {
          handleEnterChat()
        } else if (selectedCreator) {
          handleBuyKey(selectedCreator.id)
        }
      } else {
        setCurrentView('creator')
      }
    }
  )

  return (
    <AppShell
      onAddFrame={handleAddFrame}
      onClose={close}
      onOpenUrl={openUrl}
      showAddFrame={context && !context.client.added}
      currentView={currentView}
      onNavigateBack={() => {
        if (currentView === 'creator') setCurrentView('home')
        else if (currentView === 'chat') setCurrentView('creator')
      }}
    >
      {currentView === 'home' && (
        <div className="space-y-8">
          {isFirstTime ? (
            <WelcomeState 
              onGetStarted={() => setIsFirstTime(false)}
            />
          ) : (
            <>
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg mb-2">
                  <span className="text-2xl font-bold text-white">K</span>
                </div>
                <h1 className="text-display font-bold text-textPrimary">
                  KeyChat
                </h1>
                <p className="text-body text-textSecondary max-w-md mx-auto">
                  Unlock exclusive creator chats by trading keys
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-heading font-semibold text-textPrimary">Featured Creators</h2>
                  <span className="text-caption text-textTertiary">{mockCreators.length} creators</span>
                </div>
                
                <div className="space-y-4">
                  {isLoading ? (
                    // Show loading cards
                    Array.from({ length: 2 }).map((_, i) => (
                      <LoadingCard key={i} />
                    ))
                  ) : mockCreators.length === 0 ? (
                    <EmptyCreators onExplore={() => window.location.reload()} />
                  ) : (
                    mockCreators.map((creator) => (
                      <div 
                        key={creator.id}
                        className="card-compact hover:shadow-lg cursor-pointer transition-all duration-300 hover:border-primary/30 hover:scale-[1.02]"
                        onClick={() => handleCreatorSelect(creator)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border-2 border-primary/10">
                              <span className="text-primary font-bold text-lg">
                                {creator.name[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-textPrimary truncate">{creator.name}</h3>
                              <p className="text-caption text-textSecondary truncate">
                                {creator.bio}
                              </p>
                              <div className="flex items-center space-x-3 mt-1">
                                <span className="text-xs text-textTertiary">{creator.holders} holders</span>
                                <span className="text-xs text-textTertiary">•</span>
                                <span className="text-xs text-textTertiary">{creator.volume} ETH volume</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right flex-shrink-0">
                            <div className="price-display text-sm">{creator.keyPrice} ETH</div>
                            {userKeys.includes(creator.id) && (
                              <div className="status-badge-success text-xs mt-1">
                                Owned
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {currentView === 'creator' && selectedCreator && (
        <div className="space-y-8">
          {/* Creator Header */}
          <div className="card-elevated">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border-2 border-primary/10">
                <span className="text-primary font-bold text-2xl">
                  {selectedCreator.name[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-display font-bold text-textPrimary mb-2">
                  {selectedCreator.name}
                </h1>
                <p className="text-body text-textSecondary mb-3">
                  {selectedCreator.bio}
                </p>
                <div className="flex items-center space-x-4 text-caption text-textTertiary">
                  <span>{selectedCreator.holders} holders</span>
                  <span>•</span>
                  <span>{selectedCreator.volume} ETH volume</span>
                  <span>•</span>
                  <span>{selectedCreator.totalSupply} keys</span>
                </div>
              </div>
              <button
                onClick={() => handleViewProfile(selectedCreator.id)}
                className="btn-ghost text-caption"
              >
                View Profile
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="price-display text-lg">{selectedCreator.keyPrice} ETH</div>
                <div className="text-caption text-textSecondary mt-1">Current Price</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-heading font-bold text-textPrimary">{selectedCreator.totalSupply}</div>
                <div className="text-caption text-textSecondary mt-1">Total Keys</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-heading font-bold text-textPrimary">{selectedCreator.volume}</div>
                <div className="text-caption text-textSecondary mt-1">Volume (ETH)</div>
              </div>
            </div>

            {/* Status Badge */}
            {userKeys.includes(selectedCreator.id) && (
              <div className="flex justify-center mb-4">
                <div className="status-badge-success">
                  ✓ You own this creator's key
                </div>
              </div>
            )}
          </div>

          {/* Bonding Curve Chart */}
          <div className="card">
            <h3 className="text-heading font-semibold mb-4">Price Chart</h3>
            <BondingCurveChart
              variant="interactive"
              currentPrice={parseFloat(selectedCreator.keyPrice)}
              totalSupply={selectedCreator.totalSupply}
            />
          </div>

          {/* Trading Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <LoadingButton
              isLoading={isLoading}
              onClick={() => handleBuyKey(selectedCreator.id)}
              disabled={userKeys.includes(selectedCreator.id)}
              className="btn-primary w-full"
            >
              {userKeys.includes(selectedCreator.id) ? 'Already Owned' : `Buy Key (${selectedCreator.keyPrice} ETH)`}
            </LoadingButton>
            <LoadingButton
              isLoading={isLoading}
              onClick={() => handleSellKey(selectedCreator.id)}
              disabled={!userKeys.includes(selectedCreator.id)}
              className="btn-secondary w-full"
            >
              {!userKeys.includes(selectedCreator.id) ? 'Not Owned' : `Sell Key (${selectedCreator.keyPrice} ETH)`}
            </LoadingButton>
          </div>

          {/* Enter Chat Button */}
          {userKeys.includes(selectedCreator.id) && (
            <button
              onClick={handleEnterChat}
              className="w-full btn-accent text-lg py-4 shadow-lg hover:shadow-xl"
            >
              🚀 Enter Exclusive Chat
            </button>
          )}
        </div>
      )}

      {currentView === 'chat' && selectedCreator && (
        <div className="space-y-6">
          {/* Chat Header */}
          <div className="card-compact">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border-2 border-primary/10">
                <span className="text-primary font-bold">
                  {selectedCreator.name[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-heading font-semibold text-textPrimary">
                  {selectedCreator.name}'s Chat
                </h2>
                <p className="text-caption text-textSecondary">
                  Exclusive access for key holders • {messages.length} messages
                </p>
              </div>
              <div className="status-badge-success text-xs">
                🔑 Access Granted
              </div>
            </div>
          </div>

          {/* Chat Feed */}
          <div className="card p-0 flex flex-col h-96">
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-textPrimary">Community Chat</h3>
                <span className="text-caption text-textSecondary">
                  {messages.length} messages
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <EmptyChat 
                  creatorName={selectedCreator.name}
                  onSendFirst={() => {
                    // Focus on input
                    const input = document.querySelector('input[placeholder="Type your message..."]') as HTMLInputElement
                    input?.focus()
                  }}
                />
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="space-y-2 animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <span className="text-caption font-semibold text-primary">
                        {message.sender}
                      </span>
                      <span className="text-caption text-textTertiary">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className="bg-muted rounded-lg p-3 hover:bg-muted-dark transition-colors">
                      <p className="text-body text-textPrimary">{message.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-border bg-surface">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(newMessage)}
                  placeholder="Type your message..."
                  className="flex-1 input-field"
                  maxLength={280}
                />
                <LoadingButton
                  isLoading={false}
                  onClick={() => handleSendMessage(newMessage)}
                  disabled={!newMessage.trim()}
                  className="btn-primary px-6"
                >
                  Send
                </LoadingButton>
              </div>
              <div className="text-caption text-textTertiary mt-2 text-right">
                {newMessage.length}/280
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  )
}

export default function KeyChatApp() {
  return (
    <ToastProvider>
      <KeyChatAppContent />
    </ToastProvider>
  )
}
