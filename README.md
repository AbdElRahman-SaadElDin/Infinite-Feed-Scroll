## Time Spent on the Task

**10 hours**


# Infinite-Feed-Scroll
Responsive infinite scroll feed built with React, TypeScript, React Query, MSW and Tailwind. Includes mocked pagination, network latency simulation, loading indicators, retry on error, and smooth responsive UX.

## Deployment

- Live demo: [https://infinite-scroll-nine-beta.vercel.app/](https://infinite-scroll-nine-beta.vercel.app/)
- **Note:** The app uses MSW (Mock Service Worker) for local API mocking. MSW works perfectly in local development, but causes errors on Vercel deployment because service workers are not supported in the same way in production. For best results, run locally with `npm run dev`.



## Technologies Used

- **React** – UI library for building components
- **TypeScript** – Type-safe JavaScript for development
- **React Query** – Data fetching and caching library
- **MSW (Mock Service Worker)** – API mocking for development
- **Tailwind CSS** – Utility-first CSS framework
- **Axios** – HTTP client for API requests
- **Faker.js** – Generate fake data for mocking
- **Lucide Icons** – Icon library for UI Icons

## Features

### Navbar

- **Tabs Navigation** – Switch between "Users" and "Posts" sections
- **Search Bar** – Filter and search functionality

### Infinite Scroll

- **Automatic Pagination** – Load more items when scrolling near the bottom
- **Loading Indicators** – Visual feedback while fetching data
- **Error Handling** – Graceful error messages and retry logic

### Performance Optimization

- **Tab State Caching** – Each tab saves its previous state (cached data) so switching between tabs doesn't trigger unnecessary re-fetches
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices


