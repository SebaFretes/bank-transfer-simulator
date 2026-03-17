import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTransfer } from '../../hooks/useTransfer'

export default function TransferForm() {
  const { t } = useTranslation()
  const { execute, accounts } = useTransfer()

  const [fromId, setFromId] = useState('')
  const [toId, setToId] = useState('')
  const [amount, setAmount] = useState('')

  const selectedFrom = accounts.find((a) => a.id === fromId)
  const selectedTo = accounts.find((a) => a.id === toId)

  const handleSubmit = () => {
    const success = execute(fromId, toId, parseFloat(amount))
    if (success) {
      setFromId('')
      setToId('')
      setAmount('')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-6">{t('transfer.title')}</h2>

      {/* Cuenta origen */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{t('transfer.from')}</label>
        <select
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
        >
          <option value="">--</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} — ${acc.balance.toLocaleString()}
            </option>
          ))}
        </select>
        {selectedFrom && (
          <div className="flex items-center gap-2 mt-2">
            <img src={selectedFrom.photo} className="w-8 h-8 rounded-full" />
            <span className="text-sm">{selectedFrom.name}</span>
          </div>
        )}
      </div>

      {/* Cuenta destino */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{t('transfer.to')}</label>
        <select
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
        >
          <option value="">--</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} — ${acc.balance.toLocaleString()}
            </option>
          ))}
        </select>
        {selectedTo && (
          <div className="flex items-center gap-2 mt-2">
            <img src={selectedTo.photo} className="w-8 h-8 rounded-full" />
            <span className="text-sm">{selectedTo.name}</span>
          </div>
        )}
      </div>

      {/* Monto */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">{t('transfer.amount')}</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
          min={0}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        {t('transfer.confirm')}
      </button>
    </div>
  )
}