# SIT313 P5 Newsletter Report

## Website screenshots

- Home page with the newsletter form: **[Insert screenshot here]**
- Newsletter success or validation message: **[Insert screenshot here]**

## Backend / Email API evidence

Insert a screenshot of the backend terminal showing a successful SendGrid response, for example `SendGrid status: 202`, after a real test subscription.

## Repository

GitLab Task P5 repository: **[Paste your repository URL here]**

## Walkthrough video

Panopto video (2–4 minutes): **[Paste your video URL here]**

## Summary

The React newsletter form sends a POST request to the existing Express `/subscribe` endpoint. The backend validates the email and uses SendGrid to send the welcome message. The frontend displays a success or error message based on the HTTP response.
