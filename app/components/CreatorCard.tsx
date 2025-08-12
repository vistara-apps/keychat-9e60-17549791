
'use client'

import { Creator, Key } from '../types'
import { Users, TrendingUp, DollarSign } from 'lucide-react'
import { BondingCurveChart } from './BondingCurveChart'

interface CreatorCardProps {
  creator: Creator
  keyData: Key
  variant?: 'compact' | 'detailed'
  onBuyKey: (creatorId: string) => void
  onViewProfile: (creatorId: string) => void
}

export function CreatorCard({ 
  creator, 
  keyData, 
  variant = 'compact',
  onBuyKey,
  onViewProfile 
}: CreatorCardProps) {
  const formatPrice = (price: number) => `${price.toFixed(4)} ETH`
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  if (variant === 'compact') {
    return (
      <div className="card-compact hover:shadow-glow cursor-pointer transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {creator.username[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-textPrimary">{creator.username}</h3>
              <p className="text-caption text-textSecondary truncate max-w-32">
                {creator.chatRoomName}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="price-display">{formatPrice(keyData.currentPrice)}</div>
            <div className="flex items-center space-x-2 text-caption text-textSecondary">
              <Users className="w-3 h-3" />
              <span>{keyData.totalSupply} keys</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="key-badge">
            {creator.revenueSharePercentage}% Revenue Share
          </div>
          <button
            onClick={() => onBuyKey(creator.farcasterId)}
            className="btn-primary text-caption px-3 py-1.5"
          >
            Buy Key
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-xl">
              {creator.username[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-heading font-bold">{creator.username}</h2>
            <p className="text-body text-textSecondary mb-1">
              {creator.chatRoomName}
            </p>
            {creator.followerCount && (
              <div className="flex items-center space-x-1 text-caption text-textSecondary">
                <Users className="w-4 h-4" />
                <span>{formatNumber(creator.followerCount)} followers</span>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onViewProfile(creator.farcasterId)}
          className="btn-secondary text-caption"
        >
          View Profile
        </button>
      </div>

      <p className="text-body text-textSecondary mb-6">
        {creator.chatRoomDescription}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-md">
          <div className="price-display">{formatPrice(keyData.currentPrice)}</div>
          <div className="text-caption text-textSecondary mt-1">Current Price</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-md">
          <div className="text-heading font-bold text-textPrimary">{keyData.totalSupply}</div>
          <div className="text-caption text-textSecondary mt-1">Total Keys</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-md">
          <div className="text-heading font-bold text-textPrimary">{formatPrice(keyData.totalVolumeTraded)}</div>
          <div className="text-caption text-textSecondary mt-1">Volume</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>Price Chart</span>
        </h4>
        <BondingCurveChart data={keyData.priceHistory} variant="simple" />
      </div>

      <div className="flex items-center justify-between">
        <div className="revenue-badge flex items-center space-x-1">
          <DollarSign className="w-3 h-3" />
          <span>{creator.revenueSharePercentage}% Revenue Share</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onBuyKey(creator.farcasterId)}
            className="btn-primary"
          >
            Buy Key
          </button>
        </div>
      </div>
    </div>
  )
}
