import { Link, useLocation } from 'react-router-dom'
import { Briefcase, Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useSaved } from '../context/SavedContext'
import { useState } from 'react'

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { saved } = useSaved()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/jobs', label: 'Find Jobs' },
    { to: '/saved', label: 'Saved', badge: saved.length },
  ]

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center">
              <Briefcase size={16} className="text-white" />
            </div>
            <span className="gradient-text">HireBoard</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {l.label}
                {l.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-brand-600 text-white rounded-full flex items-center justify-center">
                    {l.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/jobs"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Browse Jobs
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-3 border-t border-gray-100 dark:border-gray-800 animate-fade-in">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
              >
                {l.label}
                {l.badge > 0 && (
                  <span className="w-5 h-5 text-xs bg-brand-600 text-white rounded-full flex items-center justify-center">
                    {l.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
