'use client'

import { useMiniKit, useAddFrame, useOpenUrl, useClose, useViewProfile, usePrimaryButton, useNotification } from '@coinbase/onchainkit/minikit'
import { useEffect, useState, useCallback } from 'react'
import { AppShell } from './components/AppShell'
import { CreatorCard } from './components/CreatorCard'
import { KeyTradeButton } from './components/KeyTradeButton'
import { ChatFeed } from './components/ChatFeed'
import { BondingCurveChart } from './components/BondingCurveChart'

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

export default function KeyChatApp() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [currentView, setCurrentView] = useState<'home' | 'creator' | 'chat'>('home')
  const [selectedCreator, setSelectedCreator] = useState<typeof mockCreators[0] | null>(null)
  const [userKeys, setUserKeys] = useState<string[]>([])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')

  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  const close = useClose()
  const viewProfile = useViewProfile()
  const sendNotification = useNotification()

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
    // Simulate key purchase
    setUserKeys(prev => [...prev, creatorId])
    
    // Send notification
    try {
      await sendNotification({
        title: 'Key Purchased! 🔑',
        body: `You now have access to ${selectedCreator?.name}'s exclusive chat!`
      })
    } catch (error) {
      console.error('Failed to send notification:', error)
    }
  }, [sendNotification, selectedCreator])

  const handleSellKey = useCallback((creatorId: string) => {
    setUserKeys(prev => prev.filter(id => id !== creatorId))
  }, [])

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
        <div className="space-y-lg">
          <div className="text-center space-y-md">
            <h1 className="text-3xl font-bold tracking-tight text-textPrimary">
              KeyChat
            </h1>
            <p className="text-base leading-7 text-textSecondary">
              Unlock exclusive creator chats by trading keys
            </p>
          </div>

          <div className="space-y-md">
            <h2 className="text-xl font-semibold text-textPrimary">Featured Creators</h2>
            <div className="space-y-sm">
              {mockCreators.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  variant="compact"
                  hasKey={userKeys.includes(creator.id)}
                  onSelect={() => handleCreatorSelect(creator)}
                  onViewProfile={() => handleViewProfile(creator.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {currentView === 'creator' && selectedCreator && (
        <div className="space-y-lg">
          <CreatorCard
            creator={selectedCreator}
            variant="detailed"
            hasKey={userKeys.includes(selectedCreator.id)}
            onSelect={() => {}}
            onViewProfile={() => handleViewProfile(selectedCreator.id)}
          />

          <BondingCurveChart
            variant="interactive"
            currentPrice={parseFloat(selectedCreator.keyPrice)}
            totalSupply={selectedCreator.totalSupply}
          />

          <div className="grid grid-cols-2 gap-sm">
            <KeyTradeButton
              variant="buy"
              price={selectedCreator.keyPrice}
              onTrade={() => handleBuyKey(selectedCreator.id)}
              disabled={userKeys.includes(selectedCreator.id)}
            />
            <KeyTradeButton
              variant="sell"
              price={selectedCreator.keyPrice}
              onTrade={() => handleSellKey(selectedCreator.id)}
              disabled={!userKeys.includes(selectedCreator.id)}
            />
          </div>

          {userKeys.includes(selectedCreator.id) && (
            <button
              onClick={handleEnterChat}
              className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              Enter Exclusive Chat
            </button>
          )}
        </div>
      )}

      {currentView === 'chat' && selectedCreator && (
        <div className="space-y-lg">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-textPrimary">
              {selectedCreator.name}'s Chat
            </h2>
            <p className="text-sm leading-5 text-textSecondary">
              Exclusive access for key holders
            </p>
          </div>

          <ChatFeed
            messages={messages}
            newMessage={newMessage}
            onMessageChange={setNewMessage}
            onSendMessage={() => handleSendMessage(newMessage)}
          />
        </div>
      )}
    </AppShell>
  )
}
