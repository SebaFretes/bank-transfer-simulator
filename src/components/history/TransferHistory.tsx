import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTransferStore } from '../../store/transferStore'
import { useAccountStore } from '../../store/accountStore'

export default function TransferHistory() {
  const { t } = useTranslation()
  const { transfers } = useTransferStore()
  const { accounts } = useAccountStore()

  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
  const [filterAmount, setFilterAmount] = useState('')

  const getAccountName = (id: string) =>
    accounts.find((a) => a.id === id)?.name ?? id

  const filtered = transfers.filter((tr) => {
    const fromName = getAccountName(tr.fromAccountId).toLowerCase()
    const toName = getAccountName(tr.toAccountId).toLowerCase()
    const matchFrom = fromName.includes(filterFrom.toLowerCase())
    const matchTo = toName.includes(filterTo.toLowerCase())
    const matchAmount = filterAmount ? tr.amount >= parseFloat(filterAmount) : true
    return matchFrom && matchTo && matchAmount
  })

  const total = filtered.reduce((sum, tr) => sum + tr.amount, 0)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">{t('history.title')}</h2>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder={t('history.filterFrom')}
          value={filterFrom}
          onChange={(e) => setFilterFrom(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
        />
        <input
          type="text"
          placeholder={t('history.filterTo')}
          value={filterTo}
          onChange={(e) => setFilterTo(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
        />
        <input
          type="number"
          placeholder={t('history.filterAmount')}
          value={filterAmount}
          onChange={(e) => setFilterAmount(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
        />
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{t('history.noTransfers')}</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((tr) => (
            <div
              key={tr.id}
              className="flex items-center justify-between border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={accounts.find((a) => a.id === tr.fromAccountId)?.photo}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{getAccountName(tr.fromAccountId)}</p>
                  <p className="text-xs text-gray-400">→ {getAccountName(tr.toAccountId)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-blue-600">${tr.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-400">
                  {new Date(tr.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      {filtered.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <span className="font-medium">{t('history.total')}</span>
          <span className="font-bold text-blue-600">${total.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}