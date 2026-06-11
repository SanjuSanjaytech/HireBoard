import { Bookmark, MapPin, Clock, Building2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSaved } from '../context/SavedContext'
import { timeAgo, formatSalary, employmentBadgeColor, formatEmploymentType } from '../utils/helpers'

export default function JobCard({ job }) {
  const { toggle, isSaved } = useSaved()
  const saved = isSaved(job.job_id)

  const salary = formatSalary(
    job.job_min_salary,
    job.job_max_salary,
    job.job_salary_currency,
    job.job_salary_period
  )

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-lg hover:shadow-brand-50 dark:hover:shadow-brand-900/20 transition-all duration-200 p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        {/* Company logo */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {job.employer_logo ? (
              <img src={job.employer_logo} alt={job.employer_name} className="w-9 h-9 object-contain" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
            ) : null}
            <Building2 size={20} className="text-gray-400" style={{ display: job.employer_logo ? 'none' : 'block' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">{job.employer_name}</p>
            <Link to={`/jobs/${job.job_id}`} className="block mt-0.5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
                {job.job_title}
              </h3>
            </Link>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={() => toggle(job)}
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            saved
              ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
              : 'text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20'
          }`}
          aria-label={saved ? 'Remove from saved' : 'Save job'}
        >
          <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${employmentBadgeColor(job.job_employment_type)}`}>
          {formatEmploymentType(job.job_employment_type)}
        </span>
        {job.job_is_remote && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
            Remote
          </span>
        )}
        {salary && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            {salary}
          </span>
        )}
      </div>

      {/* Location + time */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <MapPin size={12} />
          <span className="truncate max-w-[160px]">
            {job.job_city && job.job_country
              ? `${job.job_city}, ${job.job_country}`
              : job.job_country || 'Location not specified'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={12} />
          <span>{timeAgo(job.job_posted_at_datetime_utc)}</span>
        </div>
      </div>

      {/* Apply link */}
      <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
        <Link
          to={`/jobs/${job.job_id}`}
          className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
        >
          View details
        </Link>
        {job.job_apply_link && (
          <a
            href={job.job_apply_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
          >
            Apply <ExternalLink size={11} />
          </a>
        )}
      </div>
    </div>
  )
}
