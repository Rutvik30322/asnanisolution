# Email Troubleshooting Guide for Render Deployment

## Diagnosing Email Issues

If the contact form email functionality is not working on your Render deployment, follow these steps to diagnose and fix the issue.

## Step 1: Verify API Routes Are Working

First, check if the API routes are accessible:

```bash
curl https://your-app-name.onrender.com/api/test
```

If this returns a 404 error, the API routes are not being properly handled. This is likely due to the static file serving middleware intercepting API requests.

### Fix for API Routes:

1. Ensure the `serveStatic` function in `server/vite.ts` has the following code to skip API routes:

```typescript
app.use("*", (req, res, next) => {
  // Skip API routes to ensure they're handled by their own handlers
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.resolve(distPath, "index.html"));
});
```

2. Rebuild and redeploy the application.

## Step 2: Check Email Configuration

Once API routes are working, use the diagnostics endpoint to check your email configuration:

```bash
curl https://your-app-name.onrender.com/api/email-diagnostics
```

This will show:
- Environment variables related to email
- SMTP connection test results
- Any errors encountered

## Step 3: Verify Gmail Settings

### App Password

For Gmail, you MUST use an app password, not your regular password:

1. Go to your Google Account > Security > App passwords
2. Generate a new app password for "Mail" and your device
3. Update the `SMTP_PASS` environment variable in Render with this password

### Gmail-Specific Configuration

The application automatically applies Gmail-specific settings:

```typescript
if (host.includes('gmail')) {
 // console.log('Using Gmail-specific settings');
  Object.assign(transporterConfig, {
    service: 'gmail',
    secure: true, // Force secure for Gmail
    port: 465, // Force port 465 for Gmail with SSL
  });
}
```

This ensures:
- Port 465 is used (required for Gmail with SSL)
- Secure connection is enabled
- Gmail service is specified

## Step 4: Test Email Sending

Test the email functionality directly:

```bash
curl https://your-app-name.onrender.com/api/test-email
```

Check the response for any error messages.

## Step 5: Common Gmail Error Codes

### Authentication Errors (535)

```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

**Fix:**
- Generate a new app password
- Ensure you're using the correct Gmail address
- Check if your Google account has additional security restrictions

### Connection Issues

```
Error: Connection refused or Connection timeout
```

**Fix:**
- Verify `SMTP_HOST` and `SMTP_PORT` are correct
- Check if Render has any outbound connection restrictions

### Security Errors

```
Error: Invalid login: Application-specific password required
```

**Fix:**
- You must use an app password, not your regular password
- Enable 2-Step Verification and generate an app password

## Step 6: Check Render Logs

For detailed error information:

1. Go to your Render dashboard
2. Select your web service
3. Click on the "Logs" tab
4. Filter for "email" or "SMTP" to find relevant log entries

## Step 7: Update Environment Variables

If you need to update environment variables:

1. Go to your Render dashboard
2. Select your web service
3. Click on the "Environment" tab
4. Update the necessary variables
5. Click "Save Changes"
6. Redeploy your application

## Step 8: Gmail Account Security

Check your Gmail account for security alerts:

1. Log in to your Gmail account
2. Look for any security alerts or notifications
3. If prompted, confirm that the login attempt from Render was legitimate
4. Consider temporarily lowering your Gmail security settings for testing

## Need More Help?

If you're still experiencing issues:

1. Check the application logs for detailed error messages
2. Try using a different email provider temporarily to isolate Gmail-specific issues
3. Contact Render support if you suspect platform-specific restrictions