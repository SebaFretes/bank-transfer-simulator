import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import TransferPage from './pages/TransferPage'
import HistoryPage from './pages/HistoryPage'
import DashboardPage from './pages/DashboardPage'
import zetaLogo from '../src/assets/zetasuite_logo.jpeg'

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
        <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <img src={zetaLogo} className="h-8 w-8 rounded-lg" alt="Zeta Bank" />
                <span className="font-bold text-white tracking-tight">Zeta Bank</span>
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
                          ? 'bg-[#6B21FF] text-white shadow-lg shadow-[#6B21FF]/25'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
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
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all"
              >
                {i18n.language === 'es' ? 'EN' : 'ES'}
              </button>
              <button
                onClick={() => setDark(!dark)}
                className="text-sm px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all"
              >
                {dark ? '☀️' : '🌙'}
              </button>
            </div>
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
