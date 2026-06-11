import { createContext, useContext, useEffect, useState } from 'react'

const SavedContext = createContext()

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savedJobs')) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(saved))
  }, [saved])

  const toggle = (job) => {
    setSaved(prev =>
      prev.find(j => j.job_id === job.job_id)
        ? prev.filter(j => j.job_id !== job.job_id)
        : [job, ...prev]
    )
  }

  const isSaved = (id) => saved.some(j => j.job_id === id)

  return (
    <SavedContext.Provider value={{ saved, toggle, isSaved }}>
      {children}
    </SavedContext.Provider>
  )
}

export const useSaved = () => useContext(SavedContext)
