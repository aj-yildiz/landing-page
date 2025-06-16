# Vastis Waitlist System

This document explains how the waitlist system works and how to access the collected emails.

## How It Works

1. When a user submits their email through the waitlist form, it's processed by the `subscribeToWaitlist` server action.

2. The email is stored locally in a JSON file at `data/waitlist-emails.json` along with a timestamp and source information.

3. All submissions are also logged to the console for backup purposes.

## Accessing the Emails

There are several ways to access the collected emails:

### 1. Admin Page

Visit `/admin/waitlist` in your application to see a table of all collected emails.

### 2. API Endpoint

You can access the emails programmatically through the API endpoint:

\`\`\`
GET /api/waitlist
\`\`\`

This returns a JSON response with all collected emails.

### 3. Direct File Access

The emails are stored in a JSON file at `data/waitlist-emails.json`. You can access this file directly on your server.

## Exporting to Google Sheets

To export the collected emails to Google Sheets:

1. Access the emails using one of the methods above
2. Export the data as CSV
3. Import the CSV into Google Sheets

Alternatively, you can set up a scheduled task to periodically export the emails to Google Sheets using the Google Sheets API.

## Troubleshooting

If you're experiencing issues with the waitlist system:

1. Check the server logs for any error messages
2. Verify that the `data` directory is writable by the application
3. Ensure the application has permission to create and modify files

For any other issues, please contact the development team.
