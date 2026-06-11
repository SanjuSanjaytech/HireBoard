import { SearchX, Bookmark, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const configs = {
  search: {
    Icon: SearchX,
    title: 'No jobs found',
    desc: 'Try different keywords, a broader location, or remove some filters.',
    action: null,
  },
  saved: {
    Icon: Bookmark,
    title: 'No saved jobs yet',
    desc: 'Browse jobs and click the bookmark icon to save roles you like.',
    action: { to: '/jobs', label: 'Browse Jobs' },
  },
  error: {
    Icon: AlertCircle,
    title: 'Something went wrong',
    desc: 'Could not load jobs. Check your API key or try again shortly.',
    action: null,
  },
}

export default function EmptyState({ type = 'search', message }) {
  const { Icon, title, desc, action } = configs[type] || configs.search
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Icon size={28} className="text-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">{message || desc}</p>
      {action && (
        <Link
          to={action.to}
          className="mt-5 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
