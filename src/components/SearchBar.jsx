import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ onSearch, initialQuery = '', initialLocation = '', compact = false }) {
  const [query, setQuery] = useState(initialQuery)
  const [location, setLocation] = useState(initialLocation)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch({ query, location })
    } else {
      navigate(`/jobs?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(location)}`)
    }
  }

  if (compact) {
    return (
      <form onSubmit={submit} className="flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Job title or keyword..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
        </div>
        <button type="submit" className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors">
          Search
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/60 dark:shadow-gray-900/60 border border-gray-100 dark:border-gray-800">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Job title, keyword, or company..."
            className="w-full pl-11 pr-4 py-3.5 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
        </div>
        <div className="hidden sm:block w-px bg-gray-200 dark:bg-gray-700 my-2" />
        <div className="relative flex-1">
          <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="City, state, or remote..."
            className="w-full pl-11 pr-4 py-3.5 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-semibold rounded-xl transition-all text-sm"
        >
          <Search size={16} />
          Search Jobs
        </button>
      </div>
    </form>
  )
}
