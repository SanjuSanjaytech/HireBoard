import { useState, useCallback } from 'react'
import { searchJobs } from '../services/jobService'

export function useJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [lastParams, setLastParams] = useState({})

  const fetch = useCallback(async (params, reset = true) => {
    setLoading(true)
    setError(null)
    const p = reset ? 1 : page
    try {
      const data = await searchJobs({ ...params, page: p })
      const results = data.data || []
      setJobs(prev => reset ? results : [...prev, ...results])
      setHasMore(results.length === 10)
      setPage(p + 1)
      setLastParams(params)
    } catch (e) {
      setError(e.message || 'Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }, [page])

  const loadMore = () => fetch(lastParams, false)

  return { jobs, loading, error, fetch, loadMore, hasMore }
}
