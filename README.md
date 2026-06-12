# HireBoard — Developer Job Search Platform

A modern, production-ready job board web application built with React.js and Vite. HireBoard allows developers to search real-time job listings, filter by type and date, save favourites, and apply directly — all with a polished SaaS-quality UI and full dark mode support.

---

## Live Demo

🔗 **[hire-board-omega.vercel.app](https://hire-board-omega.vercel.app)**

---

## Screenshots

### Landing Page
![Landing Page](https://github.com/user-attachments/assets/a2eae5bf-61fe-4c8a-8bfa-d9935102c6c4)

### Job Search
![Job Search](https://github.com/user-attachments/assets/75c48d06-3f32-4535-9553-eb513f28794a)

### Job Details
![Job Details](https://github.com/user-attachments/assets/4aee3a28-54c7-4e8e-ac9c-4cb897c383ac)

### Saved Jobs
![Saved Jobs](https://github.com/user-attachments/assets/f4fc81ae-990a-4064-b495-669116d50ac2)

---

## Features

- **Real-time job listings** via JSearch API (RapidAPI)
- **Keyword + location search** with paginated results
- **Advanced filters** — job type, remote only, date posted, sort order
- **Job detail page** — description, responsibilities, requirements, benefits, similar jobs
- **Save jobs** — localStorage-based, no account required
- **Dark mode** — system preference + manual toggle
- **Loading skeletons** — smooth perceived performance
- **Toast notifications** — save/remove feedback
- **Empty & error states** — clear user guidance
- **Fully responsive** — mobile, tablet, desktop
- **CI/CD pipeline** — GitHub Actions → Vercel
- **API fallback system** — automatically switches to mock data on rate limits (429) or API downtime, with toast notifications informing users
---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18, Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| API | JSearch (RapidAPI) |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

---

## Folder Structure

```
src/
src/
├── components/        # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── SearchBar.jsx
│   ├── FilterPanel.jsx
│   ├── JobCard.jsx
│   ├── LoadingSkeleton.jsx
│   ├── EmptyState.jsx
│   └── ThemeToggle.jsx
├── pages/             # Route-level page components
│   ├── Landing.jsx
│   ├── Jobs.jsx
│   ├── JobDetails.jsx
│   └── SavedJobs.jsx
├── services/          # API integration layer
│   └── jobService.js
├── hooks/             # Custom React hooks
│   └── useJobs.js
├── utils/             # Utility/helper functions
│   └── helpers.js
├── context/           # React context providers
│   ├── ThemeContext.jsx
│   └── SavedContext.jsx
├── data/              # Static mock data for API fallback
│   └── mockJobs.js        
└── App.jsx
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- RapidAPI account with JSearch API access

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hireboard.git
cd hireboard

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_JSEARCH_API_KEY=your_rapidapi_key_here
```

### Getting your JSearch API Key

1. Go to [RapidAPI — JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
2. Create a free account and subscribe to JSearch (free tier available)
3. Copy your API key from the **Header Parameters** section
4. Paste it into your `.env` file

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## GitHub Actions CI/CD

The pipeline is defined in `.github/workflows/ci.yml` and triggers on every push to `main`.

### Pipeline Steps

1. **Checkout** — pulls the latest code
2. **Set up Node.js 20** — with npm cache enabled
3. **Install dependencies** — `npm ci` for clean, reproducible installs
4. **Lint** — runs ESLint across all `.js` and `.jsx` files
5. **Build** — runs `vite build` with the API key injected from GitHub Secrets
6. **Verify** — confirms the `dist/` folder was created successfully
7. **Upload artifact** — stores the build for 7 days

### Setting up GitHub Secrets

1. Go to your repository → **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `VITE_JSEARCH_API_KEY`
4. Value: your RapidAPI key

---

## Deployment on Vercel

### One-click deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Add environment variable: `VITE_JSEARCH_API_KEY`
5. Click **Deploy**

Vercel auto-detects Vite. The `vercel.json` handles SPA routing so direct URL access works correctly.

### Manual deploy via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

## Future Improvements

- [ ] Job alerts via email subscription
- [ ] Advanced salary range filter
- [ ] Company profile pages
- [ ] Resume upload + AI job matching
- [ ] Job application tracker
- [ ] PWA support for offline saved jobs

---

## Author

**Bangaru Sanjay**
[LinkedIn](https://www.linkedin.com/in/bangaru-sanjay-423b82303) · [GitHub](https://github.com/SanjuSanjaytech) · [Portfolio](https://bangaru-sanjay.netlify.app)

---

## License

MIT
