# EventHub

A React-based web application for managing and browsing events. Built as a team learning project with a focus on real-world architecture, authentication, and REST API integration.

---

## Tech Stack

- **Frontend:** React 19 (Vite)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Backend:** Node.js / Express (Events API)
- **Auth:** JWT (JSON Web Tokens) stored in localStorage
- **Database:** SQLite (managed by the API)

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
├── api/            # Fetch wrapper and API call functions
│   ├── api.js      # Central fetch wrapper (attaches token automatically)
│   ├── auth.js     # register, login, getProfile
│   └── users.js    # getUsers, updateUser, deleteUser
├── components/     # Reusable components
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── layout/
│   └── Layout.jsx  # Wraps all pages with Navbar + content area
├── pages/
│   ├── Home.jsx
│   ├── SignIn.jsx
│   ├── SignUp.jsx
│   ├── Users.jsx
│   ├── CreateEvent.jsx
│   └── EventDetails.jsx
├── router/
│   └── router.jsx  # All routes, protected routes included
├── App.jsx         # Application root — place for global providers
└── main.jsx        # Entry point
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

## Environment Variables

Create a `.env` file in the root to override the default API URL:

```
VITE_API_URL=http://localhost:3001/api
```

If no `.env` file is present, the app defaults to `http://localhost:3001/api`.

---

## Git Workflow

- Work on feature branches: `feature/<name>`
- Never push directly to `main`
- Open a Pull Request for every change
- Keep PRs focused on one feature at a time
