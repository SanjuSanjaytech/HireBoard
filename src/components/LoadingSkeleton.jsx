export function JobCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex-shrink-0" />
        <div className="flex-1">
          <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded mb-2" />
          <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800 rounded mb-1" />
          <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
        <div className="h-5 w-14 bg-gray-100 dark:bg-gray-800 rounded-full" />
      </div>
      <div className="mt-3 flex justify-between">
        <div className="h-3 w-28 bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
      </div>
      <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between">
        <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="h-6 w-14 bg-gray-100 dark:bg-gray-800 rounded-lg" />
      </div>
    </div>
  )
}

export function JobDetailSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 animate-pulse">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800" />
        <div className="flex-1">
          <div className="h-6 w-2/3 bg-gray-100 dark:bg-gray-800 rounded mb-2" />
          <div className="h-4 w-1/3 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-100 dark:bg-gray-800 rounded mb-3" style={{ width: `${70 + Math.random() * 30}%` }} />
      ))}
    </div>
  )
}
