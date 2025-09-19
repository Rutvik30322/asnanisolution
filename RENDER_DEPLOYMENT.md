# Render Deployment and Email Troubleshooting Guide

## Current Status

- The main website is accessible at https://asnanimainpro.onrender.com/
- API routes are returning 404 errors (e.g., /api/test, /api/email-diagnostics)
- Email functionality is not working due to API routes not being accessible

## Immediate Fix for API Routes

### 1. Verify the Fix in Local Code

The fix for API routes has been implemented in `server/vite.ts` by modifying the catch-all route to skip API routes:

```typescript
app.use("*", (req, res, next) => {
  // Skip API routes to ensure they're handled by their own handlers
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.resolve(distPath, "index.html"));
});
```

This change prevents the static file serving middleware from intercepting API requests.

### 2. Deploy the Fix to Render

To deploy this fix to Render, you need to:

1. **Commit the changes to your Git repository:**
   ```bash
   git add server/vite.ts
   git commit -m "Fix API routes by skipping them in static file middleware"
   ```

2. **Push the changes to your remote repository:**
   ```bash
   git push origin main
   ```

3. **Verify the deployment on Render:**
   - Log in to your Render dashboard at https://dashboard.render.com/
   - Navigate to your web service
   - Check if a new deployment has started automatically
   - If not, manually trigger a deployment

### 3. Verify the Fix After Deployment

After the deployment completes, test the API routes:

```bash
curl https://asnanimainpro.onrender.com/api/test
```

If the fix was deployed successfully, this should return a JSON response instead of a 404 error.

## Email Configuration on Render

### Verify Environment Variables

Ensure the following environment variables are correctly set in your Render dashboard:

1. `SMTP_HOST`: smtp.gmail.com
2. `SMTP_PORT`: 465
3. `SMTP_SECURE`: true
4. `SMTP_USER`: Your Gmail address
5. `SMTP_PASS`: Your Gmail app password (not your regular password)
6. `OWNER_EMAIL`: Email address to receive contact form submissions
7. `FROM_EMAIL`: Should match your `SMTP_USER`

### Gmail App Password Setup

If you're using Gmail, you must use an app password:

1. Enable 2-Step Verification on your Google account
2. Go to your Google Account > Security > App passwords
3. Select "Mail" and your device, then generate
4. Copy the 16-character password
5. Set this as your `SMTP_PASS` environment variable in Render

## Troubleshooting Email Issues

### 1. Check API Routes

First, verify that the API routes are accessible:

```bash
curl https://your-app-name.onrender.com/api/test
```

If this returns a 404 error, the API routes fix hasn't been deployed correctly.

### 2. Email Diagnostics

Once API routes are working, check the email configuration:

```bash
curl https://your-app-name.onrender.com/api/email-diagnostics
```

This will provide detailed information about your email configuration and test the SMTP connection.

### 3. Test Email Functionality

Test sending an email:

```bash
curl https://your-app-name.onrender.com/api/test-email
```

### 4. Common Email Issues

#### Authentication Errors (535)

- Generate a new app password and update `SMTP_PASS`
- Ensure you're using an app password, not your regular Gmail password
- Check if your Google account has additional security restrictions

#### Connection Issues

- Verify `SMTP_HOST` and `SMTP_PORT` are correct
- For Gmail, use port 465 with `SMTP_SECURE` set to true
- Check if your Gmail account has blocked sign-in attempts from Render

#### Gmail-Specific Issues

- Gmail enforces specific settings: port 465 and secure=true
- Check your Gmail account for security alerts
- Ensure "Less secure app access" is enabled if not using an app password

## Checking Render Logs

If issues persist, check the Render logs for detailed error messages:

1. Go to your Render dashboard
2. Select your web service
3. Click on the "Logs" tab
4. Look for any errors related to email sending or API routes

## Manual Redeployment

If auto-deploy doesn't trigger or you need to force a redeployment:

1. Go to your Render dashboard
2. Select your web service
3. Click on the "Manual Deploy" button
4. Select "Deploy latest commit" or specify a commit
5. Monitor the deployment logs