# P5 Newsletter checklist

## Functional checks
- [ ] Backend starts on port 3000.
- [ ] Frontend starts on port 5500, which is permitted by the unchanged server CORS settings.
- [ ] Empty or invalid email is rejected by the frontend/backend.
- [ ] Subscribe sends POST `/subscribe` with JSON `{email}`.
- [ ] Successful request shows the API response message in the frontend.
- [ ] Failed requests show a useful error message.
- [ ] Backend terminal displays a successful SendGrid status (normally `202`).
- [ ] Test with an email inbox you can access, and verify the welcome email arrives.

## Submission checks from P5 brief
- [ ] Create GitLab project `Task P5` and set visibility to Internal.
- [ ] Commit source files and resources with meaningful messages.
- [ ] Do not commit either `.env` file or any `node_modules` directory.
- [ ] Capture frontend screenshots.
- [ ] Capture backend terminal screenshot showing successful SendGrid status.
- [ ] Record a 2–4 minute walkthrough and upload to Panopto.
- [ ] Prepare a short report containing screenshots, repository link and video link.
- [ ] Submit to OnTrack and respond to feedback.
