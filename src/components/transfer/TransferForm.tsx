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
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('transfer.title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Simulá transferencias entre cuentas internas
          </p>
        </div>

        <div className="bg-gray-900 dark:bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {t('transfer.from')}
            </label>
            <select
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            >
              <option value="">Seleccioná una cuenta</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} — ${acc.balance.toLocaleString()}
                </option>
              ))}
            </select>
            {selectedFrom && (
              <div className="flex items-center gap-3 mt-3 bg-gray-800 rounded-xl px-4 py-3 border border-gray-700">
                <img src={selectedFrom.photo} className="w-9 h-9 rounded-full ring-2 ring-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-white">{selectedFrom.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{selectedFrom.type} · ${selectedFrom.balance.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center my-4">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400">
              ↓
            </div>
          </div>


          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {t('transfer.to')}
            </label>
            <select
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            >
              <option value="">Seleccioná una cuenta</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} — ${acc.balance.toLocaleString()}
                </option>
              ))}
            </select>
            {selectedTo && (
              <div className="flex items-center gap-3 mt-3 bg-gray-800 rounded-xl px-4 py-3 border border-gray-700">
                <img src={selectedTo.photo} className="w-9 h-9 rounded-full ring-2 ring-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-white">{selectedTo.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{selectedTo.type} · ${selectedTo.balance.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>


          <div className="mb-8">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {t('transfer.amount')}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                min={0}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25"
          >
            {t('transfer.confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}