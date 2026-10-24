# P5 Express backend

This folder reuses the existing P2 `server.js` without any changes.

## Setup

1. Copy your original Task P2 `.env` file into this folder and name it `.env`.
2. If you do not have that file, copy `.env.example` to `.env` and enter your SendGrid API key and verified sender email.
3. In this folder, run `npm install` and then `npm start`.
4. Keep this terminal running. It should show `Server running at http://localhost:3000`.

The backend expects POST requests to `http://localhost:3000/subscribe` with JSON `{ "email": "person@example.com" }`.

Do not commit `.env`, and do not edit `server.js` for this task.
