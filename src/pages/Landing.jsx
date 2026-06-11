import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Globe, TrendingUp, Search, Bookmark, Bell } from 'lucide-react'
import SearchBar from '../components/SearchBar'

const stats = [
  { value: '50K+', label: 'Live Job Listings' },
  { value: '10K+', label: 'Companies Hiring' },
  { value: '120+', label: 'Countries' },
  { value: '98%', label: 'Uptime' },
]

const features = [
  { Icon: Zap, title: 'Real-time Listings', desc: 'Jobs updated live via JSearch API. Always fresh, never stale.' },
  { Icon: Search, title: 'Smart Search', desc: 'Search by keyword and location. Filter by type, date, and remote.' },
  { Icon: Bookmark, title: 'Save Jobs', desc: 'Bookmark roles and revisit them anytime. Stored locally, no account needed.' },
  { Icon: Shield, title: 'Verified Sources', desc: 'Jobs sourced directly from company career pages and top job boards.' },
  { Icon: Globe, title: 'Global Reach', desc: 'Find remote roles or onsite opportunities across 120+ countries.' },
  { Icon: Bell, title: 'Filter & Sort', desc: 'Full-time, part-time, contract, internship — filter to exactly what you need.' },
]

const categories = [
  { label: 'React Developer', query: 'react developer' },
  { label: 'Node.js', query: 'nodejs developer' },
  { label: 'Full Stack', query: 'full stack developer' },
  { label: 'Python', query: 'python developer' },
  { label: 'DevOps', query: 'devops engineer' },
  { label: 'UI/UX Design', query: 'ui ux designer' },
  { label: 'Data Engineer', query: 'data engineer' },
  { label: 'Mobile Dev', query: 'mobile developer' },
]

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-20 pb-28 px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-brand-100/60 to-transparent dark:from-brand-900/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold rounded-full mb-6 border border-brand-100 dark:border-brand-800">
            <TrendingUp size={12} />
            Real-time jobs powered by JSearch API
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
            Find your next{' '}
            <span className="gradient-text">developer role</span>
            <br />without the noise
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            HireBoard surfaces real job listings from across the web. Search, filter, save, and apply — all in one clean interface.
          </p>

          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar />
          </div>

          <p className="text-xs text-gray-400 mb-10">Popular: {' '}
            {['React', 'Node.js', 'Python', 'Remote'].map((t, i) => (
              <span key={t}>
                <Link to={`/jobs?q=${t}`} className="text-brand-500 hover:underline">{t}</Link>
                {i < 3 ? ' · ' : ''}
              </span>
            ))}
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {stats.map(s => (
            <div key={s.label} className="text-center p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="font-display text-2xl font-bold gradient-text">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Browse by role</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(c => (
              <Link
                key={c.label}
                to={`/jobs?q=${encodeURIComponent(c.query)}`}
                className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 hover:shadow-sm transition-all"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Everything you need to land a job
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
              No account required. No spam. Just jobs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mb-4 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                  <Icon size={18} className="text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-brand-600 to-brand-700 rounded-3xl p-12 shadow-xl shadow-brand-200/50 dark:shadow-brand-900/50">
          <h2 className="font-display text-3xl font-bold text-white mb-3">Ready to find your next role?</h2>
          <p className="text-brand-200 text-sm mb-8">Thousands of developer jobs updated in real time.</p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors text-sm"
          >
            Browse All Jobs <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
