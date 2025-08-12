
export interface User {
  farcasterId: string
  walletAddress: string
  ownedKeys: KeyOwnership[]
  keysHeldCount: number
  totalValueLocked: number
}

export interface Creator {
  farcasterId: string
  walletAddress: string
  chatRoomName: string
  chatRoomDescription: string
  keyPriceCurveConfig: BondingCurveConfig
  revenueSharePercentage: number
  profileImage?: string
  username: string
  followerCount?: number
}

export interface Key {
  keyId: string
  creatorId: string
  currentPrice: number
  totalSupply: number
  totalVolumeTraded: number
  bondingCurveAddress: string
  priceHistory: PricePoint[]
}

export interface KeyOwnership {
  ownershipId: string
  keyId: string
  userId: string
  quantity: number
  purchasePrice: number
  purchaseTimestamp: number
}

export interface ChatRoom {
  roomId: string
  creatorId: string
  messages: ChatMessage[]
  moderationConfig: ModerationConfig
}

export interface ChatMessage {
  id: string
  userId: string
  content: string
  timestamp: number
  type: 'text' | 'system'
}

export interface BondingCurveConfig {
  basePrice: number
  priceIncrement: number
  maxSupply?: number
}

export interface ModerationConfig {
  enableSpamFilter: boolean
  maxMessageLength: number
  allowedFileTypes: string[]
}

export interface PricePoint {
  timestamp: number
  price: number
  volume: number
}
