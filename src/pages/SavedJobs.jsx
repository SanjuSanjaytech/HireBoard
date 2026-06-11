import { useSaved } from '../context/SavedContext'
import JobCard from '../components/JobCard'
import EmptyState from '../components/EmptyState'
import { Bookmark } from 'lucide-react'

export default function SavedJobs() {
  const { saved } = useSaved()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
          <Bookmark size={18} className="text-brand-600 dark:text-brand-400" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Jobs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{saved.length} {saved.length === 1 ? 'job' : 'jobs'} saved</p>
        </div>
      </div>

      {saved.length === 0 ? (
        <EmptyState type="saved" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map(job => <JobCard key={job.job_id} job={job} />)}
        </div>
      )}
    </div>
  )
}
