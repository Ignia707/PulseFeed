# PulseFeed

A full-stack authentication & role-based authorization demo — built to learn how a React frontend and an Express/MongoDB backend talk to each other using JWTs.

## What it offers

- Register and log in with email/password
- JWT-based auth
- Three-tier role system: `user` → `admin` → `superadmin`, with admins able to promote users and superadmins demote admins
- Image uploads (any logged-in user) via Cloudinary, with a personal gallery and a public gallery
- Admin-only image moderation (delete)
- Admin/Superadmin dashboards for managing user roles

## Tech stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Multer, Cloudinary
- **Frontend:** React (Vite), React Router, Context API

## Deployments

- Frontend: Vercel
- Backend: Render

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

## NOTE

- Set `VITE_BACKEND_API_URL` in `frontend/.env` (must include the `/api` prefix, e.g. `http://localhost:3000/api`)

- `MONGO_URI` / `JWT_SECRET` / `FRONTEND_URL` / Cloudinary credentials in `backend/.env` before running.

## Next Features

- [ ] Image download
- [ ] Full-scale image view lightbox overlay

---
