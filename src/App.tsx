import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import TransferPage from './pages/TransferPage'
import HistoryPage from './pages/HistoryPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  const { t, i18n } = useTranslation()
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                Z
              </div>
              <span className="font-bold text-gray-900 dark:text-white tracking-tight">Zeta Bank</span>
            </div>

            <div className="flex gap-1">
              {[
                { to: '/', label: t('nav.transfer') },
                { to: '/history', label: t('nav.history') },
                { to: '/dashboard', label: t('nav.dashboard') },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-all"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-all"
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TransferPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #374151',
            },
          }}
        />
      </div>
    </BrowserRouter>
  )
}