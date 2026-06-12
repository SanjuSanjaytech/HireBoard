import { Link } from 'react-router-dom'
import { Briefcase, Github, Linkedin } from 'lucide-react'


const socials = [
  {
    icon: Github,
    href: 'https://github.com/SanjuSanjaytech',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/bangaru-sanjay-423b82303',
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center">
                <Briefcase size={16} className="text-white" />
              </div>
              <span className="gradient-text">HireBoard</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              Find your next developer role. Real-time job listings powered by JSearch API.
            </p>
            <div className="flex gap-3 mt-4">
              {socials.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Navigation</p>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/jobs', 'Find Jobs'], ['/saved', 'Saved Jobs']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Job Types</p>
            <ul className="space-y-2">
              {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map(t => (
                <li key={t}>
                  <Link to={`/jobs?type=${t.toLowerCase()}`} className="text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} HireBoard. Built with React + Vite + JSearch API.</p>
          <p className="text-xs text-gray-400">Powered by <a href="https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch" target="_blank" rel="noreferrer" className="text-brand-500 hover:underline">JSearch API</a></p>
        </div>
      </div>
    </footer>
  )
}
