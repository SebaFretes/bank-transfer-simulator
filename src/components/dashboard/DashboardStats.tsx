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
    transactions: transfers.filter((tr) => tr.fromAccountId === acc.id || tr.toAccountId === acc.id)
      .length,
  }))

  const topAccount = txCountByAccount.reduce(
    (top, acc) => (acc.transactions > top.transactions ? acc : top),
    { name: '-', transactions: 0 }
  )

  const stats = [
    { label: t('dashboard.totalTransactions'), value: transfers.length },
    { label: t('dashboard.totalTransferred'), value: `$${totalTransferred.toLocaleString()}` },
    { label: t('dashboard.topAccount'), value: topAccount.name },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {label}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      {transfers.length > 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
            Transacciones por cuenta
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={txCountByAccount}>
              <XAxis
                dataKey="name"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#111827',
                  border: '1px solid #1f2937',
                  borderRadius: '12px',
                  color: '#f9fafb',
                }}
              />
              <Bar dataKey="transactions" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm text-center py-12">
          <p className="text-gray-400 text-sm">Realizá transferencias para ver las estadísticas</p>
        </div>
      )}
    </div>
  )
}
