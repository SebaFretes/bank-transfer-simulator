import { useTranslation } from 'react-i18next'
import { useTransferStore } from '../../store/transferStore'
import { useAccountStore } from '../../store/accountStore'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardStats() {
  const { t } = useTranslation()
  const { transfers } = useTransferStore()
  const { accounts } = useAccountStore()

  const totalTransferred = transfers.reduce((sum, tr) => sum + tr.amount, 0)

  const txCountByAccount = accounts.map((acc) => ({
    name: acc.name.split(' ')[0],
    transactions: transfers.filter(
      (tr) => tr.fromAccountId === acc.id || tr.toAccountId === acc.id
    ).length,
  }))

  const topAccount = txCountByAccount.reduce(
    (top, acc) => (acc.transactions > top.transactions ? acc : top),
    { name: '-', transactions: 0 }
  )

  return (
    <div className="space-y-4">
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
          <p className="text-sm text-gray-500">{t('dashboard.totalTransactions')}</p>
          <p className="text-3xl font-bold mt-1">{transfers.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
          <p className="text-sm text-gray-500">{t('dashboard.totalTransferred')}</p>
          <p className="text-3xl font-bold mt-1">${totalTransferred.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
          <p className="text-sm text-gray-500">{t('dashboard.topAccount')}</p>
          <p className="text-3xl font-bold mt-1">{topAccount.name}</p>
        </div>
      </div>

      {/* Gráfica */}
      {transfers.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h3 className="font-bold mb-4">Transacciones por cuenta</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={txCountByAccount}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="transactions" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}