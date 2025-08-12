
import { Creator, Key, User } from '../types'

export const mockCreators: Creator[] = [
  {
    farcasterId: '1',
    walletAddress: '0x1234...5678',
    chatRoomName: 'Tech Innovation Hub',
    chatRoomDescription: 'Discussions about cutting-edge technology, startups, and innovation trends.',
    keyPriceCurveConfig: {
      basePrice: 0.001,
      priceIncrement: 0.0001,
    },
    revenueSharePercentage: 10,
    profileImage: '/api/placeholder/64/64',
    username: 'techguru',
    followerCount: 15420,
  },
  {
    farcasterId: '2',
    walletAddress: '0x2345...6789',
    chatRoomName: 'Crypto Alpha Group',
    chatRoomDescription: 'Exclusive insights on DeFi, NFTs, and emerging crypto opportunities.',
    keyPriceCurveConfig: {
      basePrice: 0.005,
      priceIncrement: 0.0005,
    },
    revenueSharePercentage: 15,
    profileImage: '/api/placeholder/64/64',
    username: 'cryptowhale',
    followerCount: 8934,
  },
  {
    farcasterId: '3',
    walletAddress: '0x3456...7890',
    chatRoomName: 'Design & UX Collective',
    chatRoomDescription: 'A community for designers to share work, get feedback, and discuss trends.',
    keyPriceCurveConfig: {
      basePrice: 0.002,
      priceIncrement: 0.0002,
    },
    revenueSharePercentage: 12,
    profileImage: '/api/placeholder/64/64',
    username: 'designpro',
    followerCount: 5672,
  },
]

export const mockKeys: { [creatorId: string]: Key } = {
  '1': {
    keyId: 'key-1',
    creatorId: '1',
    currentPrice: 0.0035,
    totalSupply: 150,
    totalVolumeTraded: 0.48,
    bondingCurveAddress: '0xabc...def',
    priceHistory: [
      { timestamp: Date.now() - 86400000, price: 0.001, volume: 10 },
      { timestamp: Date.now() - 43200000, price: 0.0025, volume: 25 },
      { timestamp: Date.now() - 21600000, price: 0.003, volume: 35 },
      { timestamp: Date.now(), price: 0.0035, volume: 80 },
    ],
  },
  '2': {
    keyId: 'key-2',
    creatorId: '2',
    currentPrice: 0.0087,
    totalSupply: 89,
    totalVolumeTraded: 0.32,
    bondingCurveAddress: '0xdef...ghi',
    priceHistory: [
      { timestamp: Date.now() - 86400000, price: 0.005, volume: 5 },
      { timestamp: Date.now() - 43200000, price: 0.007, volume: 15 },
      { timestamp: Date.now() - 21600000, price: 0.0085, volume: 25 },
      { timestamp: Date.now(), price: 0.0087, volume: 44 },
    ],
  },
  '3': {
    keyId: 'key-3',
    creatorId: '3',
    currentPrice: 0.0048,
    totalSupply: 67,
    totalVolumeTraded: 0.21,
    bondingCurveAddress: '0xghi...jkl',
    priceHistory: [
      { timestamp: Date.now() - 86400000, price: 0.002, volume: 8 },
      { timestamp: Date.now() - 43200000, price: 0.003, volume: 18 },
      { timestamp: Date.now() - 21600000, price: 0.0045, volume: 25 },
      { timestamp: Date.now(), price: 0.0048, volume: 16 },
    ],
  },
}

export const mockUser: User = {
  farcasterId: 'user-123',
  walletAddress: '0xuser...1234',
  ownedKeys: [
    {
      ownershipId: 'own-1',
      keyId: 'key-1',
      userId: 'user-123',
      quantity: 3,
      purchasePrice: 0.003,
      purchaseTimestamp: Date.now() - 3600000,
    },
    {
      ownershipId: 'own-2',
      keyId: 'key-2',
      userId: 'user-123',
      quantity: 1,
      purchasePrice: 0.0075,
      purchaseTimestamp: Date.now() - 7200000,
    },
  ],
  keysHeldCount: 4,
  totalValueLocked: 0.0184,
}
