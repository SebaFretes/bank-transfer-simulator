import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import TransferPage from './pages/TransferPage'
import HistoryPage from './pages/HistoryPage'
import DashboardPage from './pages/DashboardPage'
import zetaLogo from './assets/zetasuite_logo.jpeg'
import { Toaster } from './components/ui/sonner'

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
      <div className="min-h-screen text-gray-900 dark:text-gray-100">
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={zetaLogo} className="h-8 w-8 rounded-lg" alt="Zeta Bank" />
              <span className="font-bold text-gray-900 dark:text-white tracking-tight hidden sm:block">
                Zeta Bank
              </span>
            </div>

            <div className="hidden sm:flex gap-1">
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
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                {i18n.language === 'es' ? 'EN' : 'ES'}
              </button>
              <button
                onClick={() => setDark(!dark)}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>

          <div className="sm:hidden flex border-t border-gray-200 dark:border-gray-800">
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
                  `flex-1 text-center py-2.5 text-xs font-medium transition-all ${
                    isActive ? 'text-[#6B21FF] border-t-2 border-[#6B21FF]' : 'text-gray-400'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TransferPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>

        <Toaster position="bottom-right" richColors closeButton />
      </div>
    </BrowserRouter>
  )
}
