export const timeAgo = (dateStr) => {
  if (!dateStr) return 'Recently'
  const d = new Date(dateStr)
  const diff = Math.floor((Date.now() - d) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
}

export const formatSalary = (min, max, currency = 'USD', period = 'YEAR') => {
  if (!min && !max) return null
  const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n
  const sym = currency === 'USD' ? '$' : currency === 'INR' ? '₹' : currency
  const per = period === 'YEAR' ? '/yr' : period === 'MONTH' ? '/mo' : '/hr'
  if (min && max) return `${sym}${fmt(min)} – ${sym}${fmt(max)}${per}`
  if (min) return `${sym}${fmt(min)}+${per}`
  return `Up to ${sym}${fmt(max)}${per}`
}

export const employmentBadgeColor = (type) => {
  const map = {
    FULLTIME: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    PARTTIME: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    CONTRACTOR: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    INTERN: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  }
  return map[type] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
}

export const formatEmploymentType = (type) => {
  const map = { FULLTIME: 'Full-time', PARTTIME: 'Part-time', CONTRACTOR: 'Contract', INTERN: 'Internship' }
  return map[type] || type
}
