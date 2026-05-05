# EventHub

A React-based web application for discovering, browsing, and creating events. Built as a team learning project with a focus on real-world architecture, authentication, interactive maps, and REST API integration.

---

## Tech Stack

- **Frontend:** React 19 (Vite 8)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Maps:** Leaflet + React Leaflet v5 (event location picker & map view)
- **Backend:** Node.js / Express (Events API)
- **Auth:** JWT (JSON Web Tokens) stored in localStorage
- **Database:** SQLite (managed by the API)
- **Deployment:** GitHub Pages (via GitHub Actions)

---

## Requirements

### 1. Events API (required)

The frontend connects to a local REST API. You must run it before starting the frontend.

**Repository:** [https://github.com/WebDev-WBSCodingSchool/events-api](https://github.com/WebDev-WBSCodingSchool/events-api)

> **Important:** Clone the API into a separate folder — **not** inside this project directory.

```bash
# Navigate to a folder outside of the eventhub project first
cd ..

# Clone and start the API
git clone https://github.com/WebDev-WBSCodingSchool/events-api.git
cd events-api
npm install
npm start
```

The API runs on **http://localhost:3001**. The frontend will not work without it.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The frontend runs on **http://localhost:5173**.

---

## Project Structure

```
src/
├── api/                   # Fetch wrapper and API call functions
│   ├── api.js             # Central fetch wrapper (attaches JWT token automatically)
│   ├── auth.js            # register, login, getProfile
│   ├── events.js          # getEvents, getUpcomingEvents, createEvent, getEventById
│   └── users.js           # getUsers, updateUser, deleteUser
├── components/            # Reusable UI components
│   ├── AllEvents.jsx      # Paginated list of all events
│   ├── ErrorMessage.jsx   # Standardised error display
│   ├── EventCard.jsx      # Clickable card for a single event
│   ├── EventMap.jsx       # Leaflet map shown on event detail page
│   ├── Loading.jsx        # Loading spinner / skeleton
│   ├── LocationPicker.jsx # Interactive Leaflet map for picking an event location
│   ├── Navbar.jsx         # Top navigation bar
│   ├── Particles.jsx      # Animated canvas particle background
│   ├── ProtectedRoute.jsx # Redirects unauthenticated users to /signin
│   └── UpcomingEvents.jsx # Highlighted section for upcoming events
├── layout/
│   └── Layout.jsx         # Wraps all pages with Navbar + content area
├── pages/
│   ├── Home.jsx           # Landing page — hero, upcoming events, all events
│   ├── SignIn.jsx         # Login form
│   ├── SignUp.jsx         # Registration form
│   ├── Users.jsx          # List of registered users (edit/delete require auth)
│   ├── CreateEvent.jsx    # Form with location picker to create a new event
│   └── EventDetails.jsx   # Single event view with Leaflet map
├── router/
│   └── router.jsx         # All routes, protected routes included
├── App.jsx                # Application root — place for global providers
└── main.jsx               # Entry point
```

---

## Authentication Flow

1. User registers via `POST /api/users` (email + password)
2. User logs in via `POST /api/auth/login`
3. API returns a JWT token
4. Token is stored in `localStorage`
5. Token is automatically attached to all API requests via the fetch wrapper
6. Protected routes redirect to `/signin` when no token is present
7. Logout removes the token and updates the Navbar immediately

---

## Pages & Routes

| Route | Page | Protected |
|---|---|---|
| `/` | Home | No |
| `/signin` | Sign In | No |
| `/signup` | Sign Up | No |
| `/users` | Registered Users | No (read), Yes (edit/delete) |
| `/create` | Create Event | Yes |
| `/events/:id` | Event Details | No |

---

## Maps

Two Leaflet-powered map components are used:

- **LocationPicker** — used on `/create`. Click anywhere on the map to set the event's latitude/longitude. Defaults to Berlin if no location is set yet.
- **EventMap** — used on `/events/:id`. Shows a read-only marker for the event's coordinates. Renders a fallback message when no location data is available.

---

## Environment Variables

Create a `.env` file in the root to override the default API URL:

```
VITE_API_URL=http://localhost:3001/api
```

If no `.env` file is present, the app defaults to `http://localhost:3001/api`.

---

## Deployment

The app is deployed to **GitHub Pages** automatically on every push to `main` via the workflow in [`.github/workflows/static.yml`](.github/workflows/static.yml).

The built `dist/` folder is served as a static site.

---

## Git Workflow

- Work on feature branches: `feature/<name>`
- Never push directly to `main`
- Open a Pull Request for every change
- Keep PRs focused on one feature at a time
