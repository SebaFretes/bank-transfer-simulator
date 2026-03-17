import { useTranslation } from 'react-i18next'
import { useCryptoWS } from '../../hooks/useCryptoWS'

const LABELS: Record<string, string> = {
  'BINANCE:BTCUSDT': 'BTC',
  'BINANCE:ETHUSDT': 'ETH',
  'BINANCE:BNBUSDT': 'BNB',
}

export default function CryptoTicker() {
  const { t } = useTranslation()
  const { trades, connected } = useCryptoWS()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{t('dashboard.cryptoMarket')}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${connected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {connected ? 'Live' : 'Disconnected'}
        </span>
      </div>

      <div className="space-y-3">
        {Object.entries(LABELS).map(([symbol, label]) => {
          const trade = trades[symbol]
          return (
            <div key={symbol} className="flex items-center justify-between border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3">
              <span className="font-semibold">{label}</span>
              {trade ? (
                <div className="text-right">
                  <p className="font-bold text-blue-600">${trade.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">vol: {trade.volume.toFixed(4)}</p>
                </div>
              ) : (
                <span className="text-xs text-gray-400">Waiting...</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}