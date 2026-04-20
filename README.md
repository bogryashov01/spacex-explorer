# SpaceX Explorer (Next.js, React, TypeScript)

This is a small frontend app for exploring SpaceX launches using the public SpaceX API.

I focused on building something clean and understandable, with decent UX and without overcomplicating things, especially considering the timebox.

---

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- TanStack Query (React Query)
- SCSS Modules

---

## How to run

```bash
npm install
npm run dev

```

Features

* Launches list with server-side pagination
* Search, filtering and sorting
* “Load more” pagination (infinite loading)
* Launch details page (rocket + launchpad info)
* Favorites stored in LocalStorage
* Loading / error / empty states
* Basic accessibility (ARIA attributes, semantic markup)

⸻

Architecture decisions

Server-side filtering and pagination

Instead of loading everything on the client, the app uses /launches/query from the SpaceX API.

This keeps things more scalable and closer to how a real app would work:

* less data on the client
* filtering and sorting handled by the API
* better performance

⸻

React Query for data handling

I used React Query to avoid managing async state manually.

It handles:

* caching
* request deduplication
* pagination (useInfiniteQuery)
* loading and error states

This made the data layer much simpler and more predictable.

⸻

Separation of concerns

I tried to keep things structured:

* API logic → lib/api
* data hooks → hooks
* UI → components

Components don’t fetch data directly — they just render what they receive.

⸻

Favorites as local feature

Favorites are stored in LocalStorage.

I decided to store a small snapshot of launch data instead of just IDs, so:

* the favorites page renders instantly
* no extra API calls are needed
* it works even without network

⸻

Infinite loading

The list uses useInfiniteQuery to load data step by step instead of fetching everything at once.

⸻

Tradeoffs

* The solution is intentionally kept simple due to the 3–5 hour timebox.
* Favorites are implemented with LocalStorage only (no global state like context).
* No SSR/SSG is used — everything is client-side for simplicity.

⸻

What I would improve with more time

* Add global state (context) for favorites synchronization
* Add virtualization for large lists
* Add charts (launch stats)
* Improve accessibility (keyboard navigation, focus states)
* Sync filters with URL (shareable state)

⸻

Known limitations

* Favorites are stored only locally (not shared across devices)
* Some launches don’t have images or links from the API