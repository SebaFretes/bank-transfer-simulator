import DashboardStats from '../components/dashboard/DashboardStats'
import CryptoTicker from '../components/dashboard/CryptoTicker'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <CryptoTicker />
    </div>
  )
}