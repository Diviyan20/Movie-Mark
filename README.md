# 🎬 MovieMark – Discover, Explore & Favourite Your Favourite Films

MovieMark is a sleek and responsive movie browsing web application powered by **The Movie Database (TMDB) API**. It lets users search, explore, and favourite their favorite movies with a highly intuitive UI and smooth user experience. Built with **React**, this project emphasizes clean architecture, reusable components, context-based global state management, and real-world API integration.

---

## 🚀 Features

### 🔍 Smart Search & Suggestions
- Real-time search with debounced input handling to prevent API overloading.
- Instant dropdown suggestions as you type.
- Clean UI and graceful fallbacks for no results.

### 🎞 Movie Browsing & Discovery
- Fetches data from TMDB API and displays trending, popular, or top-rated movies.
- Responsive grid layout that adapts across devices.
- Loaded movie posters with polished animations.

### ❤️ Favourites System
- Add or remove favourites with a single click (heart toggle).
- Persistent favourite list managed via **React Context API**.
- Visual feedback with active state styling.

### 🎥 Movie Details Page
- Dynamic routing to fetch and display movie details.
- Includes:
  - Full movie overview
  - Cast list
  - Embedded YouTube trailer (if available)

### ⬇️ Load More with Pagination
- “Load More” button to paginate results without disrupting the grid.
- Maintains search state and appends new results smoothly.

### 🧠 React Best Practices
- Modular, reusable components.
- Global state with **Context API**.
- Optimized re-renders with hooks like `useState` and `useEffect`.
- Debounced inputs via custom hooks.

### 💅 Polished UI/UX
- Fully responsive design.
- Subtle hover animations and transitions.
- Accessible buttons, semantic HTML, and ARIA-friendly interactions.

---

## 🛠️ Tech Stack

| Tech            | Description                                  |
|-----------------|----------------------------------------------|
| React           | UI library for building interactive views    |
| React Router    | Client-side routing for detail pages         |
| TMDB API        | Fetches movie data, trailers, cast info      |
| Context API     | Manages favourites state across components   |
| CSS Flex & Grid | Responsive and dynamic layouts               |
| HTML5/CSS3      | Base markup and styling                      |

---

## Project Deployment
Try out the website here: https://movie-mark.vercel.app/


