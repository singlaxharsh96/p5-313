# DEV@Deakin P5 Newsletter

This project keeps the previous C1 React website and connects its newsletter form to the supplied P2 Express + SendGrid backend. The original `backend/server.js` is copied unchanged.

## Folders

- `frontend/` — React, Vite and Tailwind-based DEV@Deakin website.
- `backend/` — existing P2 Express server and package setup.

## Run it (two terminals)

### Terminal 1 — backend

1. Put your original Task P2 `.env` file into `backend/.env` (or create it from `backend/.env.example`). It needs `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, and `PORT=3000`.
2. Open a terminal in `backend` and run:

```bash
npm install
npm start
```

Leave this terminal running. Wait for `Server running at http://localhost:3000`.

### Terminal 2 — frontend

1. Open a terminal in `frontend` and run:

```bash
npm install
npm run dev
```

2. Open `http://localhost:5500/` (not port 5173). The unchanged backend CORS configuration accepts `http://localhost:5500` and `http://127.0.0.1:5500` only.

## Test the newsletter

1. Scroll to the bottom of Home.
2. Enter a valid email address and click Subscribe.
3. The browser should show the result returned by the backend.
4. In the backend terminal, look for `Subscription request received`, `SendGrid status: 202`, and `Welcome email sent successfully to: ...` after SendGrid accepts the message.
5. Invalid emails should display a validation/error message. If the backend is stopped, the React page displays a connection error.

The original server sends a SendGrid email and returns HTTP 202 when it is accepted; `response.ok` treats any 2xx response as success. The P5 task sheet requests terminal evidence from the Email API; SendGrid commonly reports `202 Accepted` rather than 200. Do not change the server only to make the status text read 200.

## Important setup notes

- `frontend/.env` contains the Firebase web app configuration from the supplied previous C1 project and is ignored by Git. Do not commit local `.env` files.
- `backend/.env` is intentionally not included in this ZIP because it contains the SendGrid API secret. Copy it from your existing P2 project locally.
- No `node_modules` folders are included. Install dependencies in both folders.
- `backend/server.js` has not been changed.

## P5 requirements checklist

See `P5_TASK_CHECKLIST.md` for the test and submission list.
