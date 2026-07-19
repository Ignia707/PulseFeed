# PulseFeed

A minimal full-stack authentication & role-based authorization demo — built to learn how a React frontend and an Express/MongoDB backend talk to each other using JWTs.

## What it does

- Register and log in with email/password
- JWT-based auth (token issued on login, required for protected routes)
- Role-based access: regular `user` vs `admin`
- Protected frontend routes (redirect to login if logged out, redirect to unauthorized if wrong role)
- Persistent login across page refresh (`localStorage`)
- Conditional navbar based on auth state

## Tech stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
**Frontend:** React (Vite), React Router, Context API

## Running locally

**Backend**

```bash
cd backend
npm install
npm start
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_BACKEND_API_URL` in `frontend/.env` and `MONGO_URI` / `JWT_SECRET` / `FRONTEND_URL` in `backend/.env` before running.

## Next milestones

- [ ] Admin panel: view/manage users, change roles
- [ ] Posts feature: create/read posts, admin moderation
- [ ] Image uploads on posts

---
