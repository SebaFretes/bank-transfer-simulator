export interface Account {
  id: string
  name: string
  type: 'savings' | 'checking'
  balance: number
  photo: string
}

export interface Transfer {
  id: string
  fromAccountId: string
  toAccountId: string
  amount: number
  timestamp: Date
}

export interface CryptoTrade {
  symbol: string
  price: number
  volume: number
  timestamp: number
}