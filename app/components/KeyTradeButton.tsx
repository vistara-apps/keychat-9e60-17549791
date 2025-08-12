
'use client'

import { useState } from 'react'
import { ShoppingCart, TrendingDown, Loader2 } from 'lucide-react'

interface KeyTradeButtonProps {
  variant: 'buy' | 'sell'
  price: number
  quantity?: number
  isLoading?: boolean
  disabled?: boolean
  onTrade: (quantity: number) => Promise<void>
}

export function KeyTradeButton({
  variant,
  price,
  quantity = 1,
  isLoading = false,
  disabled = false,
  onTrade
}: KeyTradeButtonProps) {
  const [tradeQuantity, setTradeQuantity] = useState(quantity)
  const [isTrading, setIsTrading] = useState(false)

  const handleTrade = async () => {
    if (disabled || isTrading) return
    
    setIsTrading(true)
    try {
      await onTrade(tradeQuantity)
    } catch (error) {
      console.error('Trade failed:', error)
    } finally {
      setIsTrading(false)
    }
  }

  const totalCost = price * tradeQuantity
  const isBuy = variant === 'buy'

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-body font-medium">
          Quantity
        </label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTradeQuantity(Math.max(1, tradeQuantity - 1))}
            className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-muted"
            disabled={tradeQuantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            value={tradeQuantity}
            onChange={(e) => setTradeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="input-field w-16 text-center"
            min="1"
          />
          <button
            onClick={() => setTradeQuantity(tradeQuantity + 1)}
            className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-muted"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 px-4 bg-muted rounded-md">
        <span className="text-body font-medium">
          {isBuy ? 'Total Cost' : 'You Receive'}
        </span>
        <span className="text-heading font-bold">
          {totalCost.toFixed(4)} ETH
        </span>
      </div>

      <button
        onClick={handleTrade}
        disabled={disabled || isLoading || isTrading}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
          isBuy
            ? 'btn-primary'
            : 'bg-warning hover:bg-warning/90 text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {(isLoading || isTrading) ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {isBuy ? (
              <ShoppingCart className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>
              {isBuy ? 'Buy Keys' : 'Sell Keys'}
            </span>
          </>
        )}
      </button>

      {isBuy && (
        <p className="text-caption text-textSecondary text-center">
          Price increases with each purchase due to bonding curve
        </p>
      )}
    </div>
  )
}
