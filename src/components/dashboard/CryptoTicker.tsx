import { useTranslation } from 'react-i18next'
import { useCryptoWS } from '../../hooks/useCryptoWS'

const LABELS: Record<string, string> = {
  'BINANCE:BTCUSDT': 'BTC',
  'BINANCE:ETHUSDT': 'ETH',
  'BINANCE:BNBUSDT': 'BNB',
}

const LOGOS: Record<string, string> = {
  'BINANCE:BTCUSDT': 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  'BINANCE:ETHUSDT': 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  'BINANCE:BNBUSDT': 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
}

export default function CryptoTicker() {
  const { t } = useTranslation()
  const { trades, connected } = useCryptoWS()

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          {t('dashboard.cryptoMarket')}
        </h3>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            connected
              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
              : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}
        >
          {connected ? '● Live' : '○ Disconnected'}
        </span>
      </div>

      <div className="space-y-3">
        {Object.entries(LABELS).map(([symbol, label]) => {
          const trade = trades[symbol]
          return (
            <div
              key={symbol}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <img src={LOGOS[symbol]} className="w-8 h-8 rounded-lg" alt={label} />
                <span className="font-semibold text-gray-900 dark:text-white">{label}</span>
              </div>
              {trade ? (
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">
                    ${trade.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">vol: {trade.volume.toFixed(4)}</p>
                </div>
              ) : (
                <span className="text-xs text-gray-400">Esperando...</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
