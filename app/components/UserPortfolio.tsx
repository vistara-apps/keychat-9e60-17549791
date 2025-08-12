
'use client'

import { User, Creator, Key } from '../types'
import { TrendingUp, DollarSign, Users } from 'lucide-react'

interface UserPortfolioProps {
  user: User
  creators: Creator[]
  keys: { [creatorId: string]: Key }
}

export function UserPortfolio({ user, creators, keys }: UserPortfolioProps) {
  const getCreatorById = (creatorId: string) => 
    creators.find(c => c.farcasterId === creatorId)

  const calculateCurrentValue = () => {
    return user.ownedKeys.reduce((total, ownership) => {
      const key = keys[ownership.keyId.replace('key-', '')]
      return total + (key ? key.currentPrice * ownership.quantity : 0)
    }, 0)
  }

  const calculateProfitLoss = () => {
    const currentValue = calculateCurrentValue()
    const totalInvested = user.ownedKeys.reduce((total, ownership) => 
      total + (ownership.purchasePrice * ownership.quantity), 0)
    return currentValue - totalInvested
  }

  const currentValue = calculateCurrentValue()
  const profitLoss = calculateProfitLoss()
  const isProfit = profitLoss >= 0

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-heading font-bold mb-4">Portfolio Overview</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-muted rounded-md">
            <div className="text-display font-bold">{currentValue.toFixed(4)}</div>
            <div className="text-caption text-textSecondary">ETH</div>
            <div className="text-caption text-textSecondary mt-1">Current Value</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-md">
            <div className={`text-display font-bold ${isProfit ? 'text-success' : 'text-error'}`}>
              {isProfit ? '+' : ''}{profitLoss.toFixed(4)}
            </div>
            <div className="text-caption text-textSecondary">ETH</div>
            <div className="text-caption text-textSecondary mt-1">P&L</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-body">
          <span>Keys Held:</span>
          <span className="font-semibold">{user.keysHeldCount}</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-heading font-semibold">Your Keys</h3>
        
        {user.ownedKeys.length === 0 ? (
          <div className="card text-center py-8">
            <Users className="w-12 h-12 mx-auto mb-4 text-textSecondary" />
            <h4 className="font-semibold mb-2">No Keys Yet</h4>
            <p className="text-body text-textSecondary">
              Start by purchasing keys to access exclusive creator chats
            </p>
          </div>
        ) : (
          user.ownedKeys.map((ownership) => {
            const creator = getCreatorById(ownership.keyId.replace('key-', ''))
            const key = keys[ownership.keyId.replace('key-', '')]
            
            if (!creator || !key) return null

            const currentValue = key.currentPrice * ownership.quantity
            const investedValue = ownership.purchasePrice * ownership.quantity
            const profitLoss = currentValue - investedValue
            const isPositive = profitLoss >= 0

            return (
              <div key={ownership.ownershipId} className="card-compact">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">
                        {creator.username[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{creator.username}</h4>
                      <p className="text-caption text-textSecondary">
                        {ownership.quantity} keys
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">
                      {currentValue.toFixed(4)} ETH
                    </div>
                    <div className={`text-caption flex items-center ${
                      isPositive ? 'text-success' : 'text-error'
                    }`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {isPositive ? '+' : ''}{profitLoss.toFixed(4)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-caption text-textSecondary">
                    Avg. Purchase: {ownership.purchasePrice.toFixed(4)} ETH
                  </span>
                  <span className="revenue-badge">
                    {creator.revenueSharePercentage}% Share
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
