# SpaceX Explorer (Next.js, React, TypeScript)

A frontend application for exploring SpaceX launches using the public SpaceX API.

The app focuses on performance, clean architecture, and a solid user experience, including server-side filtering, pagination, and responsive UI states.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- TanStack Query (React Query)
- SCSS Modules


## How to run

```bash
npm install
npm run dev


---

## 📊 Features

```md
## Features

- Launches list with server-side pagination
- Search, filtering, and sorting
- Infinite loading ("Load more")
- Launch details page with rocket and launchpad info
- Favorites stored in LocalStorage
- Responsive UI with loading, empty, and error states


## Architecture Decisions

### 1. Server-side filtering and pagination

The launches list uses the `/launches/query` endpoint instead of fetching all data on the client.

This allows:
- better performance
- scalable filtering and sorting
- reduced data transfer

### 2. React Query as data layer

TanStack Query is used for:
- caching
- deduplication
- pagination (useInfiniteQuery)
- retry logic

This avoids manual state management and simplifies async handling.

### 3. Separation of concerns

The app is structured into clear layers:

- API layer (`lib/api`)
- Data hooks (`hooks`)
- UI components (`components`)

UI components do not handle fetching logic directly.

### 4. Favorites as feature state

Favorites are stored in LocalStorage as a user-specific feature.

A small snapshot of launch data is stored to:
- avoid extra API calls
- allow instant rendering
- support offline usage

### 5. Infinite loading

The launches list uses `useInfiniteQuery` to progressively load data instead of fetching everything at once.

## Tradeoffs

- Favorites are implemented using LocalStorage without a global state (e.g., context or store) to keep the solution simple within the timebox.
- UI components are intentionally not over-abstracted to avoid unnecessary complexity.
- No SSR/SSG is used for the app, focusing instead on client-side data handling for simplicity.


## What I would improve with more time

- Add global state (context) for favorites synchronization
- Implement virtualization for long lists
- Add charts (launch success rate, launches per year)
- Improve accessibility (focus management, keyboard navigation)
- Add URL-based filters (shareable search state)


## Known limitations

- Favorites are stored locally and not shared across devices
- Some launches do not have images or external links