import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { SlidersHorizontal, X } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import JobCard from '../components/JobCard'
import { JobCardSkeleton } from '../components/LoadingSkeleton'
import EmptyState from '../components/EmptyState'
import { useJobs } from '../hooks/useJobs'

export default function Jobs() {
  const [searchParams] = useSearchParams()
  const { jobs, loading, error, fetch, loadMore, hasMore } = useJobs()
  const [filters, setFilters] = useState({ employment_type: '', date_posted: '', remote: false, sort: '' })
  const [showFilters, setShowFilters] = useState(false)
  const [query, setQuery] = useState(searchParams.get('q') || 'developer')
  const [location, setLocation] = useState(searchParams.get('loc') || '')

  const doSearch = useCallback((q, loc, f) => {
    const params = {
      query: f.remote ? `${q} remote` : q,
      location: loc,
      employment_type: f.employment_type,
      date_posted: f.date_posted,
    }
    fetch(params, true)
  }, [fetch])

  useEffect(() => {
    doSearch(query, location, filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (error) toast.error('Failed to load jobs. Check your API key.')
  }, [error])

  const handleSearch = ({ query: q, location: loc }) => {
    setQuery(q)
    setLocation(loc)
    doSearch(q, loc, filters)
  }

  const handleFilters = (f) => {
    setFilters(f)
    doSearch(query, location, f)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search bar */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} initialQuery={query} initialLocation={location} />
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {loading ? 'Searching...' : `${jobs.length} jobs found`}
        </p>
        <button
          onClick={() => setShowFilters(o => !o)}
          className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {showFilters ? <X size={15} /> : <SlidersHorizontal size={15} />}
          {showFilters ? 'Hide' : 'Filters'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Filter sidebar */}
        <aside className={`flex-shrink-0 w-56 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="sticky top-24">
            <FilterPanel filters={filters} onChange={handleFilters} />
          </div>
        </aside>

        {/* Job list */}
        <main className="flex-1 min-w-0">
          {loading && jobs.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => <JobCardSkeleton key={i} />)}
            </div>
          ) : error && jobs.length === 0 ? (
            <EmptyState type="error" />
          ) : jobs.length === 0 ? (
            <EmptyState type="search" />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobs.map(job => <JobCard key={job.job_id} job={job} />)}
                {loading && [...Array(2)].map((_, i) => <JobCardSkeleton key={`sk-${i}`} />)}
              </div>
              {hasMore && !loading && (
                <div className="mt-8 text-center">
                  <button
                    onClick={loadMore}
                    className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-400 hover:text-brand-600 transition-all"
                  >
                    Load more jobs
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
