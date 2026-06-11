import axios from 'axios'
import { mockJobs } from "../data/mockJobs";

const BASE = 'https://jsearch.p.rapidapi.com'

const api = axios.create({
  baseURL: BASE,
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_JSEARCH_API_KEY,
    'x-rapidapi-host': 'jsearch.p.rapidapi.com',
  },
})

export const searchJobs = async ({
  query = "developer",
  location = "",
  page = 1,
  employment_type = "",
  date_posted = "",
}) => {
  const q = location
    ? `${query} in ${location}`
    : query;

  const params = {
    query: q,
    page,
    num_pages: 1,
  };

  if (employment_type)
    params.employment_types =
      employment_type;

  if (date_posted)
    params.date_posted =
      date_posted;

  try {
    const { data } = await api.get(
      "/search",
      { params }
    );

    return data;
  } catch (error) {
    if (
      error.response?.status === 429
    ) {
      return {
        data: mockJobs,
        fallback: true,
      };
    }

    throw error;
  }
};

export const getJobDetails = async (job_id) => {

  if (job_id.startsWith('mock-')) {
    return {
      data: mockJobs.filter(
        job => job.job_id === job_id
      )
    }
  }

  const { data } = await api.get(
    '/job-details',
    {
      params: { job_id }
    }
  )

  return data
}

export const getSimilarJobs = async (job_id) => {
  const { data } = await api.get('/similar-jobs', { params: { job_id, num_pages: 1 } })
  return data
}
