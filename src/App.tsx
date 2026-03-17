import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Toaster } from 'react-hot-toast'
import TransferPage from './pages/TransferPage'
import HistoryPage from './pages/HistoryPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex items-center justify-between">
          <div className="flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-600' : 'text-gray-600 dark:text-gray-300'
              }
            >
              {t('nav.transfer')}
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-600' : 'text-gray-600 dark:text-gray-300'
              }
            >
              {t('nav.history')}
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'font-bold text-blue-600' : 'text-gray-600 dark:text-gray-300'
              }
            >
              {t('nav.dashboard')}
            </NavLink>
          </div>
          <button
            onClick={toggleLanguage}
            className="text-sm px-3 py-1 rounded border border-gray-300 dark:border-gray-600"
          >
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
        </nav>

        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TransferPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>

        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  )
}