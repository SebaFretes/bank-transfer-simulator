import { useState, useEffect } from 'react'
import type { CryptoTrade } from '../types'

const SYMBOLS = ['BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:BNBUSDT']

export function useCryptoWS() {
  const [trades, setTrades] = useState<Record<string, CryptoTrade>>({})
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const ws = new WebSocket(`wss://ws.finnhub.io?token=${import.meta.env.VITE_FINNHUB_TOKEN}`)

    ws.onopen = () => {
      setConnected(true)
      SYMBOLS.forEach((symbol) => {
        ws.send(JSON.stringify({ type: 'subscribe', symbol }))
      })
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'trade' && data.data) {
        data.data.forEach((trade: { s: string; p: number; v: number; t: number }) => {
          setTrades((prev) => ({
            ...prev,
            [trade.s]: {
              symbol: trade.s,
              price: trade.p,
              volume: trade.v,
              timestamp: trade.t,
            },
          }))
        })
      }
    }

    ws.onclose = () => setConnected(false)

    return () => {
      SYMBOLS.forEach((symbol) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'unsubscribe', symbol }))
        }
      })
      ws.close()
    }
  }, [])

  return { trades, connected }
}