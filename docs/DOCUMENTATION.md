# HIREBOARD
### Technical Documentation

| Author | Stack | Live Demo | Repository |
|---|---|---|---|
| Bangaru Sanjay | React · Vite · Tailwind CSS | [hire-board-omega.vercel.app](https://hire-board-omega.vercel.app) | [github.com/SanjuSanjaytech/HireBoard](https://github.com/SanjuSanjaytech/HireBoard) |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Application Features](#3-application-features)
   - 3.1 [Landing Page](#31-landing-page)
   - 3.2 [Job Search](#32-job-search)
   - 3.3 [Advanced Filters](#33-advanced-filters)
   - 3.4 [Job Cards](#34-job-cards)
   - 3.5 [Job Details Page](#35-job-details-page)
   - 3.6 [Save Jobs Feature](#36-save-jobs-feature)
   - 3.7 [Dark Mode](#37-dark-mode)
4. [Technical Architecture](#4-technical-architecture)
5. [API Integration](#5-api-integration)
6. [State Management](#6-state-management)
7. [Reliability & Fallback Strategy](#7-reliability--fallback-strategy)
8. [User Experience Features](#8-user-experience-features)
9. [CI/CD Pipeline](#9-cicd-pipeline)
10. [Deployment](#10-deployment)

---

## 1. Executive Summary

HireBoard is a production-ready job board web application that enables developers to search, filter, save, and apply for real-time job listings. Built with React.js, Vite, and Tailwind CSS, and powered by the JSearch API via RapidAPI, the project demonstrates enterprise-grade frontend engineering practices including CI/CD automation, fallback reliability mechanisms, and mobile-first responsive design.

> **Key Highlights**
> - Real-time job data via JSearch API (RapidAPI)
> - Full dark mode support with system-preference detection
> - Mobile-first responsive design
> - Production deployed on Vercel with automated CI/CD via GitHub Actions
> - API fallback mechanism for 100% demonstrability under rate-limited conditions

**Live Demo:** https://hire-board-omega.vercel.app  
**GitHub:** https://github.com/SanjuSanjaytech/HireBoard

---

## 2. Project Overview

HireBoard was engineered with a strong focus on user experience, reliability, and engineering best practices. The application surfaces live job listings and provides a polished, SaaS-product aesthetic throughout.

### Technology Stack

| Component | Technology / Detail |
|---|---|
| Frontend Framework | React.js + Vite |
| Styling | Tailwind CSS |
| API Integration | JSearch API via RapidAPI |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

---

## 3. Application Features

### 3.1 Landing Page

**Location:** `src/pages/Landing.jsx`

The landing page serves as the entry point with a SaaS-product aesthetic designed to create a strong first impression.

| Section | Description |
|---|---|
| Hero | Large headline, subtext, and full search bar with keyword and location inputs |
| Stats | Four key statistics: 50K+ listings, 10K+ companies, 120+ countries, 98% uptime |
| Browse by Role | Quick-access category chips (React, Node.js, Full Stack, Python, DevOps, etc.) |
| Features Grid | Six feature cards highlighting the platform capabilities |
| CTA Banner | Gradient call-to-action section encouraging users to browse jobs |

**Design decisions:**
- Gradient background blur on the hero section creates visual depth
- Stats section builds trust before the user clicks through
- Category chips pre-fill search queries for faster discovery
- Fully responsive — stacks vertically on mobile

---

### 3.2 Job Search

**Location:** `src/pages/Jobs.jsx`, `src/components/SearchBar.jsx`, `src/hooks/useJobs.js`, `src/services/jobService.js`

The job search feature is the core functionality of HireBoard. It integrates with the JSearch API to return real-time listings based on user input.

**How it works:**

1. User enters a keyword (e.g. "React Developer") and optional location (e.g. "Hyderabad")
2. The `useJobs` custom hook calls `searchJobs()` from `jobService.js`
3. The service constructs the query, appending location if provided
4. Results are returned as paginated job objects and rendered as `JobCard` components
5. A "Load more" button fetches the next page of results

**SearchBar component:**
- Two modes: full (landing page) and compact (jobs page)
- Keyword and location fields
- Submits on Enter key or button click
- URL parameter support (`?q=react&loc=hyderabad`) for shareable searches

**API call format:**

```
GET /search?query=react+developer+in+hyderabad&page=1&num_pages=1
Headers: x-rapidapi-key, x-rapidapi-host
```

---

### 3.3 Advanced Filters

**Location:** `src/components/FilterPanel.jsx`

The filter panel allows users to narrow results without performing a new search. Filters trigger instant API calls.

| Filter | Options |
|---|---|
| Job Type | Full-time, Part-time, Contract, Internship |
| Work Mode | Remote only toggle |
| Date Posted | Any time, Today, Past 3 days, Past week, Past month |
| Sort By | Relevance, Newest |

**Implementation details:**
- Each filter change calls `doSearch()` with updated parameters
- Active filters are highlighted in brand colour
- A "Clear" button resets all filters at once — only shown when filters are active
- On mobile, the filter panel is hidden by default and toggled via a "Filters" button

---

### 3.4 Job Cards

**Location:** `src/components/JobCard.jsx`

Each listing is displayed as a card with all key information visible at a glance.

**Colour-coded employment badges:**

| Badge Type | Colour |
|---|---|
| Full-time | Green |
| Part-time | Blue |
| Contract | Orange |
| Internship | Purple |
| Remote | Teal |
| Salary | Amber |

**Information displayed on each card:**
- Company logo (with fallback icon if unavailable)
- Company name, job title, location, and time posted
- Employment type badge, remote badge, and salary badge (shown only when applicable)
- Save / unsave bookmark button
- View details link and Apply button

---

### 3.5 Job Details Page

**Location:** `src/pages/JobDetails.jsx`

Clicking "View details" navigates to a dedicated page with complete job information.

**Sections displayed:**
- Company logo, title, employer name, and role badges
- Full job description
- Responsibilities, Qualifications, and Benefits lists
- Apply Now button linking directly to the company application page
- Save / unsave button with toast feedback
- Company sidebar with website link
- Similar Jobs section (4 cards)

**Technical implementation:**
- Job ID is passed as a URL parameter (`/jobs/:id`)
- `getJobDetails(job_id)` fetches full data from JSearch
- `getSimilarJobs(job_id)` fetches related listings in parallel
- Page scrolls to top on every new job load
- Loading skeleton shown while data is fetching

---

### 3.6 Save Jobs Feature

**Location:** `src/context/SavedContext.jsx`, `src/pages/SavedJobs.jsx`

Users can bookmark jobs without creating an account. Saved jobs persist across sessions via localStorage.

- Bookmark icon toggles saved state on any job card
- `SavedContext` provides `toggle`, `isSaved`, and `clearAll` functions globally
- Navbar shows live badge counter of saved jobs
- Empty state shown when no jobs are saved
- Saved jobs are stored in `localStorage` under the key `savedJobs`
- A "Clear All" button removes all saved jobs at once with a confirmation toast

**Persistence:** Jobs remain saved even after closing and reopening the browser, as long as the user does not clear their browser data.

---

### 3.7 Dark Mode

**Location:** `src/context/ThemeContext.jsx`, `src/components/ThemeToggle.jsx`

Full dark mode support across all pages and components using Tailwind CSS `dark:` variants.

- System preference auto-detected on first load (`prefers-color-scheme`)
- Manual toggle stored in `localStorage` under the key `theme`
- Moon / sun icon in Navbar switches theme and applies / removes the `dark` class on the `<html>` element
- All Tailwind styles use `dark:` variants for complete theme coverage

---

## 4. Technical Architecture

HireBoard follows a layered, separation-of-concerns architecture that clearly delineates UI, business logic, API communication, and global state.

### Layer Overview

| Layer | Location | Responsibility |
|---|---|---|
| Components | `src/components/` | Reusable UI elements (Navbar, JobCard, FilterPanel, etc.) |
| Pages | `src/pages/` | Route-level screens (Landing, Jobs, JobDetails, SavedJobs) |
| Services | `src/services/` | API communication and data fetching |
| Hooks | `src/hooks/` | Business logic, state management, pagination |
| Context | `src/context/` | Global state (theme, saved jobs) |
| Utils | `src/utils/` | Helper functions (date formatting, salary formatting, badge colours) |
| Data | `src/data/` | Static mock data for API fallback |

### Data Flow Pipeline

```
User Interaction
      ↓
Page Component  (Jobs.jsx)
      ↓
Custom Hook     (useJobs.js)
      ↓
Service Layer   (jobService.js)
      ↓
JSearch API  ──or──  mockJobs.js fallback
      ↓
State Update → Re-render
```

---

## 5. API Integration

HireBoard integrates with the JSearch API via RapidAPI to surface real-time job listings. API calls are encapsulated within the service layer (`jobService.js`) and orchestrated through the `useJobs` custom hook.

### Search Endpoint

```
GET /search?query=react+developer+in+hyderabad&page=1&num_pages=1
```

### Filter Parameters

| Parameter | Description |
|---|---|
| `query` | Keyword + optional location string |
| `page` | Pagination index (1-based) |
| `num_pages` | Number of result pages per request |
| `job_type` | `full_time` \| `part_time` \| `contract` \| `internship` |
| `date_posted` | `today` \| `3days` \| `week` \| `month` |
| `sort_by` | `relevance` \| `date` |

---

## 6. State Management

HireBoard uses React Context API for global state management across two primary contexts.

### Theme Context

Manages dark / light mode state. Persists user preference to `localStorage` and applies or removes the `dark` CSS class on the document root.

### Saved Jobs Context

Provides `toggle`, `isSaved`, and `clearAll` functions globally. Persists saved job data to `localStorage` so bookmarks survive page refreshes without requiring user authentication.

---

## 7. Reliability & Fallback Strategy

To ensure the application remains fully functional during API failures, HireBoard implements an automatic fallback to local mock data. All features — search, filter, save, and details — continue to work with mock data, ensuring the application is always demonstrable.

**Location:** `src/services/jobService.js`, `src/data/mockJobs.js`

### Fallback Trigger Conditions

| Trigger | Behaviour |
|---|---|
| HTTP 429 (rate limit exceeded) | Loads `mockJobs.js`, shows warning toast |
| Network failure | Loads `mockJobs.js`, shows warning toast |
| Any unhandled API error | Loads `mockJobs.js`, shows error toast |

### Toast Notification Reference

| Action | Message | Type |
|---|---|---|
| Save a job | Job saved! | Success |
| Remove saved job | Removed from saved | Success |
| API fallback activated | Showing demo data — API limit reached | Warning |
| API error | Failed to load jobs. Check your API key. | Error |

> **Why this matters:** In a production environment, external API dependencies are a reliability risk. This fallback ensures the application is always demonstrable and never shows a broken state to the user.

---

## 8. User Experience Features

### Loading & Error States

**Location:** `src/components/LoadingSkeleton.jsx`, `src/components/EmptyState.jsx`

| State | Component | Trigger |
|---|---|---|
| Job card skeletons | `LoadingSkeleton` | While job results fetch |
| Job detail skeleton | `LoadingSkeleton` | While detail page fetches |
| No results | `EmptyState` (search) | Zero results returned |
| No saved jobs | `EmptyState` (saved) | Saved jobs list is empty |
| API error | `EmptyState` (error) | API call fails |

**Loading skeleton details:**
- `JobCardSkeleton` displayed in a grid while job results are loading
- `JobDetailSkeleton` displayed on the details page while job data is fetching
- Skeletons use a soft pulse animation to indicate activity
- 6 skeletons shown on the jobs page, 1 on the details page

Each empty state includes a relevant icon, title, description, and an action button where applicable.

### Mobile-First Responsive Design

All pages and components are built mobile-first. The layout adapts across breakpoints using Tailwind CSS utility classes, ensuring a seamless experience on any screen size.

---

## 9. CI/CD Pipeline

**Location:** `.github/workflows/ci.yml`

A GitHub Actions pipeline runs on every push to `main`, validating code quality before changes reach production.

| Step | Description |
|---|---|
| Checkout | Pulls latest code onto GitHub runner |
| Setup Node.js 20 | Installs Node with npm cache enabled |
| Install dependencies | `npm ci` for clean, reproducible install |
| Lint check | ESLint across all `.js` and `.jsx` files |
| Production build | `vite build` with API key from GitHub Secrets |
| Verify build | Confirms `dist/` folder created successfully |
| Upload artifact | Stores build output for 7 days |

> **Why CI/CD matters:** Every code change is automatically validated before it can affect production. If the lint check or build fails, the team is notified immediately. This prevents broken code from reaching users.

---

## 10. Deployment

**Platform:** Vercel  
**Live URL:** https://hire-board-omega.vercel.app  
**Configuration:** `vercel.json`

### vercel.json Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

> **Note — Client-Side Routing:** The `rewrites` rule ensures React Router's client-side routing works correctly on direct URL access. Routes like `/jobs/123` do not return a 404.

**Environment variable:** `VITE_JSEARCH_API_KEY` is stored securely as a Vercel environment variable and injected at build time. It is never exposed in the codebase or version control.

---

*HireBoard · Bangaru Sanjay*