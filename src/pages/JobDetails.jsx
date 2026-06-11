import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Building2, ExternalLink, Bookmark, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { getJobDetails, getSimilarJobs } from '../services/jobService'
import { useSaved } from '../context/SavedContext'
import { JobDetailSkeleton, JobCardSkeleton } from '../components/LoadingSkeleton'
import JobCard from '../components/JobCard'
import { timeAgo, formatSalary, formatEmploymentType, employmentBadgeColor } from '../utils/helpers'

export default function JobDetails() {
  const { id } = useParams()
  const { toggle, isSaved } = useSaved()
  const [job, setJob] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    setError(null)
    getJobDetails(id)
      .then(d => {
        setJob(d.data?.[0] || null)
        setLoading(false)
      })
      .catch(() => { setError('Failed to load job details'); setLoading(false) })

    getSimilarJobs(id).then(d => setSimilar(d.data?.slice(0, 4) || [])).catch(() => {})
  }, [id])

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JobDetailSkeleton />
    </div>
  )

  if (error || !job) return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <p className="text-gray-500">{error || 'Job not found'}</p>
      <Link to="/jobs" className="mt-4 inline-block text-brand-600 hover:underline text-sm">← Back to jobs</Link>
    </div>
  )

  const saved = isSaved(job.job_id)
  const salary = formatSalary(job.job_min_salary, job.job_max_salary, job.job_salary_currency, job.job_salary_period)

  const handleSave = () => {
    toggle(job)
    toast.success(saved ? 'Removed from saved jobs' : 'Job saved!', { icon: saved ? '🗑️' : '🔖' })
  }

  const renderList = (items) => {
    if (!items || !items.length) return null
    return (
      <ul className="space-y-2 mt-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle size={14} className="text-accent-500 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-6">
        <ArrowLeft size={15} /> Back to Jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {job.employer_logo
                  ? <img src={job.employer_logo} alt={job.employer_name} className="w-12 h-12 object-contain" />
                  : <Building2 size={24} className="text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{job.job_title}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{job.employer_name}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${employmentBadgeColor(job.job_employment_type)}`}>
                    {formatEmploymentType(job.job_employment_type)}
                  </span>
                  {job.job_is_remote && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">Remote</span>
                  )}
                  {salary && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">{salary}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 text-xs text-gray-500">
              {(job.job_city || job.job_country) && (
                <span className="flex items-center gap-1"><MapPin size={12} />{[job.job_city, job.job_country].filter(Boolean).join(', ')}</span>
              )}
              <span className="flex items-center gap-1"><Clock size={12} />{timeAgo(job.job_posted_at_datetime_utc)}</span>
            </div>
          </div>

          {/* Description */}
          {job.job_description && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Job Description</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line line-clamp-[20]">
                {job.job_description}
              </div>
            </div>
          )}

          {/* Responsibilities */}
          {job.job_highlights?.Responsibilities?.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Responsibilities</h2>
              {renderList(job.job_highlights.Responsibilities)}
            </div>
          )}

          {/* Qualifications */}
          {job.job_highlights?.Qualifications?.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Requirements</h2>
              {renderList(job.job_highlights.Qualifications)}
            </div>
          )}

          {/* Benefits */}
          {job.job_highlights?.Benefits?.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Benefits</h2>
              {renderList(job.job_highlights.Benefits)}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Apply card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 sticky top-24">
            <a
              href={job.job_apply_link}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors text-sm mb-3"
            >
              Apply Now <ExternalLink size={14} />
            </a>
            <button
              onClick={handleSave}
              className={`w-full flex items-center justify-center gap-2 px-5 py-3 border rounded-xl font-medium text-sm transition-colors ${
                saved
                  ? 'border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-800 dark:bg-brand-900/20 dark:text-brand-400'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Save Job'}
            </button>

            {/* Company info */}
            <div className="mt-5 pt-5 border-t border-gray-50 dark:border-gray-800 space-y-3">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                  {job.employer_logo
                    ? <img src={job.employer_logo} alt="" className="w-7 h-7 object-contain" />
                    : <Building2 size={14} className="text-gray-400" />}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{job.employer_name}</span>
              </div>
              {job.employer_website && (
                <a href={job.employer_website} target="_blank" rel="noreferrer" className="text-xs text-brand-500 hover:underline flex items-center gap-1">
                  Visit website <ExternalLink size={10} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar jobs */}
      {similar.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">Similar Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similar.map(j => <JobCard key={j.job_id} job={j} />)}
          </div>
        </div>
      )}
    </div>
  )
}
