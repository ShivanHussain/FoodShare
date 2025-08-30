# Smart Waste Food & Donation Tracker

A full‑stack application to reduce food waste by connecting **donors** with nearby **NGOs**, with real‑time donation alerts, analytics dashboards, and route guidance.

> Monorepo with **Node.js/Express** backend, **React + Vite** frontend, and a small **FastAPI** microservice for directions (OpenRouteService).

---

## Features

- Role‑based auth: Donor / NGO / Admin (email+password)
- Donation lifecycle: create → broadcast → accept/claim → track → complete/cancel
- Real‑time notifications via **Socket.io** (NGOs get instant “donation-alert”s)
- Map & routing: Mappls / Google Maps on the frontend; OpenRouteService via FastAPI
- Analytics dashboards for donors and NGOs
- Contact/Feedback & Newsletter subscriptions
- Hardened API with Helmet, CORS, JWT, cookies; file uploads via Cloudinary

---

## Repository Structure

```
/backend           # Express API, MongoDB models, Socket.io, Cloudinary, mail/SMS
/frontend          # React (Vite), Tailwind UI, role-based routing, charts
/ML-Model          # FastAPI microservice exposing /api/directions (OpenRouteService)
```

---

## Tech Stack

- **Backend:** Node.js, Express, Mongoose, JWT, Socket.io, Cloudinary, Nodemailer, Twilio
- **Frontend:** React, Vite, React Router, Redux Toolkit (state), charts/components
- **Python Service:** FastAPI, openrouteservice, python-dotenv
- **Database:** MongoDB (local or Atlas)
- **Build/Dev:** Nodemon, ESLint, Vite

---

##  Prerequisites

- Node.js 18+ and npm
- Python 3.10+ and pip
- MongoDB (local or MongoDB Atlas)
- Accounts/keys for: **Cloudinary**, **Mappls** (or Google Maps), **OpenRouteService**, email SMTP (for mails), Twilio (optional for SMS)

---

## Environment Variables

> **Never commit actual keys.** Create your own `.env` files from these templates.

### Backend (`backend/config/config.env`)

Define at least the following keys (values are examples/notes — replace with your own):

```
PORT=4000
NODE_ENV=development

# Mongo
MONGO_URL=mongodb://localhost:27017
ATLAS_URL=<your_mongodb_atlas_url>

# CORS / Client URLs

FRONTEND_URL=http://localhost:5173

# Auth
JWT_SECRET_KEY=<random_long_string>
JWT_EXPIRES=7d
COOKIE_EXPIRE=7
GOOGLE_CLIENT_ID=<google_oauth_client_id>
GOOGLE_CLIENT_SECRET=<google_oauth_client_secret>

# Media / Maps
CLOUDINARY_CLOUD_NAME=<cloudinary_name>
CLOUDINARY_API_KEY=<cloudinary_key>
CLOUDINARY_API_SECRET=<cloudinary_secret>
GOOGLE_MAPS_API_KEY=<google_maps_key>         # if used
MAPPLS_CLIENT_ID=<mappls_client_id>
MAPPLS_CLIENT_SECRET=<mappls_client_secret>

# Geocoding / Others
OPENCAGE_API_KEY=<opencage_key>
RAPIDAPI_KEY=<optional_if_used>
ABSTRACT_EMAIL_API_KEY=<optional_if_used>

# Email (SMTP)
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL=<your_email>
SMTP_PASSWORD=<your_app_password>

# SMS (optional)
TWILIO_ACCOUNT_SID=<twilio_sid>
tWILIO_AUTH_TOKEN=<twilio_token>
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=<google_oauth_client_id>

# Map providers (choose what you use)
VITE_MAPPLS_MAP_KEY=<mappls_map_key>
MAPPLS_REST_KEY=<mappls_rest_key>
MAPPLS_CLIENT_ID=<mappls_client_id>

GOOGLE_MAPS_API_KEY=<google_maps_js_key>
OPENCAGE_API_KEY=<opencage_key>
```

### Python service (`ML-Model/.env`)

```
ORS_API_KEY=<openrouteservice_key>
```

---

## Local Development

### 1) Backend (API + Socket.io)

```bash
cd backend
npm install
npm run dev     
```

> API base : `http://localhost:4000/api/v1` 

### 2) Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev     
```

### 3) Python Directions Service (FastAPI)

```bash
cd ML-Model
python -m venv .venv && . .venv/Scripts/activate  
pip install fastapi uvicorn python-dotenv openrouteservice
uvicorn app:app --reload --port 8000
```

## REST API Overview (auto-parsed)

Below is an automatically extracted snapshot of Express routes (method + path). See the source in `/backend/routes` for full details and auth requirements.

| Method | Path | File |
|---|---|---|
| POST | `/api/v1/newsletter/subscribe` | `newsletterRoutes.js` |
| GET | `/api/v1/admin/analytics/category-distribution` | `adminRoutes.js` |
| GET | `/api/v1/admin/analytics/donation-trends` | `adminRoutes.js` |
| GET | `/api/v1/admin/analytics/expiry-analytics` | `adminRoutes.js` |
| GET | `/api/v1/admin/analytics/food-preference` | `adminRoutes.js` |
| GET | `/api/v1/admin/analytics/location-analytics` | `adminRoutes.js` |
| GET | `/api/v1/admin/analytics/monthly-comparison` | `adminRoutes.js` |
| GET | `/api/v1/admin/analytics/ngo-performance` | `adminRoutes.js` |
| GET | `/api/v1/admin/analytics/recent-activity` | `adminRoutes.js` |
| GET | `/api/v1/admin/analytics/status-breakdown` | `adminRoutes.js` |
| GET | `/api/v1/admin/analytics/time-based` | `adminRoutes.js` |
| GET | `/api/v1/admin/analytics/top-donors` | `adminRoutes.js` |
| GET | `/api/v1/admin/contact-messages` | `adminRoutes.js` |
| GET | `/api/v1/admin/dashboard/stats` | `adminRoutes.js` |
| GET | `/api/v1/admin/donations` | `adminRoutes.js` |
| DELETE | `/api/v1/admin/donations/:id` | `adminRoutes.js` |
| PUT | `/api/v1/admin/donations/:id` | `adminRoutes.js` |
| GET | `/api/v1/admin/donations/details/:id` | `adminRoutes.js` |
| GET | `/api/v1/admin/feedbacks` | `adminRoutes.js` |
| GET | `/api/v1/admin/newsletters` | `adminRoutes.js` |
| GET | `/api/v1/admin/ngos` | `adminRoutes.js` |
| GET | `/api/v1/admin/users` | `adminRoutes.js` |
| DELETE | `/api/v1/admin/users/:id` | `adminRoutes.js` |
| GET | `/api/v1/admin/users/:id` | `adminRoutes.js` |
| PATCH | `/api/v1/admin/users/:id/role` | `adminRoutes.js` |
| PATCH | `/api/v1/admin/users/:id/verify` | `adminRoutes.js` |
| GET | `/api/v1/admin/users/details/:id` | `adminRoutes.js` |
| GET | `/api/v1/analytics/donor/dashboard` | `donorAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/donor/food-types` | `donorAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/donor/impact` | `donorAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/donor/performance` | `donorAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/donor/weekly` | `donorAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/ngo/impact/avg-response-time` | `ngoAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/ngo/impact/co2-saved` | `ngoAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/ngo/impact/money-saved` | `ngoAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/ngo/impact/total-meals` | `ngoAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/ngo/impact/total-pickups` | `ngoAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/ngo/impact/waste-reduced` | `ngoAnalyticsRoutes.js` |
| GET | `/api/v1/analytics/ngo/impact/yearly-trend` | `ngoAnalyticsRoutes.js` |
| POST | `/api/v1/auth/google` | `authRoutes.js` |
| POST | `/api/v1/auth/login` | `authRoutes.js` |
| GET | `/api/v1/auth/logout` | `authRoutes.js` |
| GET | `/api/v1/auth/me` | `authRoutes.js` |
| POST | `/api/v1/auth/signup/donor` | `authRoutes.js` |
| POST | `/api/v1/auth/signup/ngo` | `authRoutes.js` |
| GET | `/api/v1/contact/` | `contactRoutes.js` |
| POST | `/api/v1/contact/` | `contactRoutes.js` |
| GET | `/api/v1/donations/` | `donationRoutes.js` |
| POST | `/api/v1/donations/` | `donationRoutes.js` |
| GET | `/api/v1/donations/:id` | `donationRoutes.js` |
| PATCH | `/api/v1/donations/:id/claim` | `donationRoutes.js` |
| PATCH | `/api/v1/donations/:id/status` | `donationRoutes.js` |
| GET | `/api/v1/donations/claimed/donor` | `donationRoutes.js` |
| GET | `/api/v1/donations/claimed/ngo` | `donationRoutes.js` |
| GET | `/api/v1/donations/user/my-donations` | `donationRoutes.js` |
| DELETE | `/api/v1/feedback/:feedbackId` | `feedbackRoutes.js` |
| POST | `/api/v1/feedback/create` | `feedbackRoutes.js` |
| PUT | `/api/v1/feedback/dislike/:feedbackId` | `feedbackRoutes.js` |
| GET | `/api/v1/feedback/given` | `feedbackRoutes.js` |
| PUT | `/api/v1/feedback/like/:feedbackId` | `feedbackRoutes.js` |
| PATCH | `/api/v1/feedback/read/:feedbackId` | `feedbackRoutes.js` |
| GET | `/api/v1/feedback/received` | `feedbackRoutes.js` |
| GET | `/api/v1/feedback/stats/:userId` | `feedbackRoutes.js` |
| GET | `/api/v1/mappls/distance` | `mapplsRoutes.js` |
| GET | `/api/v1/mappls/health` | `mapplsRoutes.js` |
| GET | `/api/v1/mappls/token` | `mapplsRoutes.js` |
| PATCH | `/api/v1/notifications/:id/read` | `notificationRoutes.js` |
| GET | `/api/v1/notifications/my` | `notificationRoutes.js` |
| GET | `/api/v1/notifications/ngo/details` | `notificationRoutes.js` |
| GET | `/api/v1/otp/:donationId/send/:notificationId` | `otpVerificationRoutes.js` |
| GET | `/api/v1/otp/request` | `otpVerificationRoutes.js` |
| POST | `/api/v1/otp/verify-otp` | `otpVerificationRoutes.js` |
| GET | `/api/v1/user/all/feedback` | `userRoutes.js` |
| GET | `/api/v1/user/history/:role` | `userRoutes.js` |
| GET | `/api/v1/user/history/recent/donor` | `userRoutes.js` |
| GET | `/api/v1/user/history/recent/ngo` | `userRoutes.js` |
| GET | `/api/v1/user/history/status` | `userRoutes.js` |
| PUT | `/api/v1/user/password/change` | `userRoutes.js` |
| POST | `/api/v1/user/password/forgot` | `userRoutes.js` |
| PUT | `/api/v1/user/password/reset/:token` | `userRoutes.js` |
| PUT | `/api/v1/user/profile/update` | `userRoutes.js` |

---

## Realtime (Socket.io)

**Server listens for:**
- `disconnect`
- `donation-rejected`
- `new-donation`
- `user-online`

**Server emits:**
- `donation-alert`


## NPM Scripts

### Backend
```json
{
  "start": "node server.js",
  "dev": "cross-env DEBUG=app:* nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Frontend
```json
{
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

---

## Important Folders (Backend)

- `controllers/` — Route handlers (auth, donations, analytics, notifications, admin, etc.)
- `models/` — Mongoose schemas: `User`, `Ngo`, `Donation`, `Notification`, `Feedback`, `ContactMessage`, `OtpVerificationModel`, etc.
- `routes/` — Express routers mounted in `app.js`
- `middlewares/` — Auth, error handler, validation, role checks
- `utils/` — helpers (debug logger, email), third-party service wrappers
- `database/` — Mongo connection helper
- `config/` — `config.env` 

## Frontend Highlights

- Role-based routing guards, navbar with notifications, dashboards for donors/NGOs/admins
- Components organized by feature: `components/admin`, `components/profile`, `components/donationAlerts`, etc.
- Vite-based dev server for fast HMR


---

## Troubleshooting

- **CORS errors:** Ensure `FRONTEND_URL` in `backend/config/config.env` matches your frontend origin.
- **JWT/cookie issues on localhost:** Use the same domain/port in requests; enable `credentials` where needed.
- **Cloudinary upload fails:** Verify `CLOUDINARY_*` envs and that `express-fileupload` is enabled.
- **Socket not connecting:** Check that the frontend is pointing to the backend URL and that ports are open.
- **Mongo connection errors:** Confirm `MONGO_URL` or `ATLAS_URL` and that the DB user/IP whitelist are correct.
- **Directions API failing:** Make sure `ML-Model/.env` has a valid `ORS_API_KEY` and the service is running on port 8000.
- **Windows path issues:** Avoid spaces in project paths; run terminals as Administrator if needed for ports.
