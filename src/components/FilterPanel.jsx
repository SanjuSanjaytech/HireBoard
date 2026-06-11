import { SlidersHorizontal, X } from 'lucide-react'

const TYPES = [
  { label: 'Full-time', value: 'FULLTIME' },
  { label: 'Part-time', value: 'PARTTIME' },
  { label: 'Contract', value: 'CONTRACTOR' },
  { label: 'Internship', value: 'INTERN' },
]

const DATES = [
  { label: 'Any time', value: '' },
  { label: 'Today', value: 'today' },
  { label: 'Past 3 days', value: '3days' },
  { label: 'Past week', value: 'week' },
  { label: 'Past month', value: 'month' },
]

const SORTS = [
  { label: 'Relevance', value: '' },
  { label: 'Newest', value: 'date' },
]

export default function FilterPanel({ filters, onChange }) {
  const toggle = (key, val) => {
    onChange({ ...filters, [key]: filters[key] === val ? '' : val })
  }
  const hasFilters = filters.employment_type || filters.date_posted || filters.remote

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          <SlidersHorizontal size={16} className="text-brand-600" />
          Filters
        </div>
        {hasFilters && (
          <button
            onClick={() => onChange({ employment_type: '', date_posted: '', remote: false, sort: '' })}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {/* Job Type */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Job Type</p>
        <div className="space-y-2">
          {TYPES.map(t => (
            <label key={t.value} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggle('employment_type', t.value)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                  filters.employment_type === t.value
                    ? 'bg-brand-600 border-brand-600'
                    : 'border-gray-300 dark:border-gray-600 group-hover:border-brand-400'
                }`}
              >
                {filters.employment_type === t.value && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                )}
              </div>
              <span
                onClick={() => toggle('employment_type', t.value)}
                className={`text-sm cursor-pointer transition-colors ${
                  filters.employment_type === t.value ? 'text-brand-600 dark:text-brand-400 font-medium' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Remote toggle */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Work Mode</p>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div
            onClick={() => onChange({ ...filters, remote: !filters.remote })}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
              filters.remote ? 'bg-brand-600 border-brand-600' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            {filters.remote && (
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            )}
          </div>
          <span className={`text-sm cursor-pointer ${filters.remote ? 'text-brand-600 dark:text-brand-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={() => onChange({ ...filters, remote: !filters.remote })}>
            Remote only
          </span>
        </label>
      </div>

      {/* Date posted */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Date Posted</p>
        <div className="space-y-2">
          {DATES.map(d => (
            <label key={d.value} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggle('date_posted', d.value)}
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
                  filters.date_posted === d.value ? 'border-brand-600' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {filters.date_posted === d.value && <div className="w-2 h-2 rounded-full bg-brand-600" />}
              </div>
              <span
                onClick={() => toggle('date_posted', d.value)}
                className={`text-sm cursor-pointer ${filters.date_posted === d.value ? 'text-brand-600 dark:text-brand-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}
              >
                {d.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Sort By</p>
        <div className="flex gap-2">
          {SORTS.map(s => (
            <button
              key={s.value}
              onClick={() => onChange({ ...filters, sort: s.value })}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
                filters.sort === s.value
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
