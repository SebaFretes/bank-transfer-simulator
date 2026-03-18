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

  const getAccountName = (id: string) => accounts.find((a) => a.id === id)?.name ?? id

  const getAccountPhoto = (id: string) => accounts.find((a) => a.id === id)?.photo ?? ''

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
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('history.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {[
          { value: filterFrom, setter: setFilterFrom, placeholder: t('history.filterFrom') },
          { value: filterTo, setter: setFilterTo, placeholder: t('history.filterTo') },
          {
            value: filterAmount,
            setter: setFilterAmount,
            placeholder: t('history.filterAmount'),
            type: 'number',
          },
        ].map(({ value, setter, placeholder, type }) => (
          <input
            key={placeholder}
            type={type ?? 'text'}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-sm">{t('history.noTransfers')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((tr) => (
            <div
              key={tr.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <img
                    src={getAccountPhoto(tr.fromAccountId)}
                    className="w-9 h-9 rounded-full ring-2 ring-white dark:ring-gray-900"
                  />
                  <img
                    src={getAccountPhoto(tr.toAccountId)}
                    className="w-9 h-9 rounded-full ring-2 ring-white dark:ring-gray-900"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {getAccountName(tr.fromAccountId)}
                    <span className="text-gray-400 font-normal mx-2">→</span>
                    {getAccountName(tr.toAccountId)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(tr.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-500">${tr.amount.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('history.total')}
          </span>
          <span className="text-xl font-bold text-blue-500">${total.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}
