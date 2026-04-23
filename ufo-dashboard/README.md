# UFO Sightings Dashboard

A React + TypeScript application for visualising UFO sightings data, grouped by week and displayed in an interactive bar chart.

## Tech Stack

* React (Vite)
* TypeScript
* Redux Toolkit
* Recharts
* Tailwind CSS
* Vitest + React Testing Library

---

## Features

* Weekly aggregation of sightings data
* Interactive navigation between weeks
* Bar chart visualisation using Recharts
* Centralised state management with Redux Toolkit
* Derived data handled via selectors (clean separation of concerns)
* Loading and error state handling
* Responsive UI for different screen sizes
* Unit and component testing

---

## Architecture Overview

The application follows a clear separation of responsibilities:

* **API Layer** – Fetches raw sightings data
* **Redux Slice** – Stores normalised data and UI state (e.g. current week index)
* **Selectors** – Handle all data transformation (grouping by week, chart formatting)
* **Components** – Focus purely on presentation

This approach keeps components lightweight and ensures that business logic is centralised and reusable.

---

## Key Improvements (Based on Feedback)

* Moved date parsing and transformation into the async thunk
* Removed data manipulation from components
* Introduced selectors for derived state
* Centralised week navigation logic in Redux
* Improved type safety across the application
* Cleaned up project structure and removed unused files

---

## Installation

```bash
cd ufo-dashboard
npm install
npm run dev
```

App runs at: http://localhost:5173/

---

## Running Tests

```bash
npm test
```

---

## Notes & Future Improvements

* Explore RTK Query to simplify API handling and caching
* Add more comprehensive test coverage (selectors & reducers)
* Improve accessibility of chart components
* Consider migrating to Next.js for SSR and routing

---

## References

* Redux Toolkit: https://redux.js.org/
* Recharts: https://recharts.org/
* Tailwind CSS: https://tailwindcss.com/
* date-fns: https://date-fns.org/
