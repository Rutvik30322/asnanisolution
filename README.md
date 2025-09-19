# Asnani Project

## API Routes and Static Files

This application serves both API routes and static files. When deployed to Render, it's important to ensure that API routes are properly handled and not overridden by the static file serving middleware.

### API Endpoints

The following API endpoints are available:

- `/api/test` - Test endpoint to verify server is working
- `/api/test-email` - Test endpoint for email functionality
- `/api/email-diagnostics` - Diagnostic endpoint for email configuration
- `/api/contact` - Contact form submission endpoint

### Troubleshooting API Routes on Render

If you encounter 404 errors when accessing API endpoints on Render, ensure that:

1. The static file serving middleware is configured to skip API routes
2. The build process correctly includes all API route handlers
3. The server is properly configured to handle API routes before serving static files

## Email Configuration for Deployment

### Local Development
For local development, the email functionality uses environment variables with fallbacks. You can set these in your `.env` file:

```
OWNER_EMAIL=your-email@example.com
FROM_EMAIL=your-sender-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-sender-email@gmail.com
SMTP_PASS=your-app-password
```

### Render Deployment
When deploying to Render, make sure to configure the following environment variables in the Render dashboard:

1. Go to your service in the Render dashboard
2. Navigate to the "Environment" tab
3. Add the following environment variables:
   - `OWNER_EMAIL`: The email address to receive contact form submissions
   - `FROM_EMAIL`: The email address to send from (should match SMTP_USER)
   - `SMTP_HOST`: smtp.gmail.com (for Gmail)
   - `SMTP_PORT`: 465 (for Gmail with SSL)
   - `SMTP_SECURE`: true (for port 465)
   - `SMTP_USER`: Your Gmail address
   - `SMTP_PASS`: Your Gmail app password

#### Critical Gmail Configuration for Render

When using Gmail on Render, you must ensure:

1. **Less Secure Apps**: If you're not using an app password, you need to enable "Less secure app access" in your Google account settings (not recommended for security reasons).

2. **App Password Setup**:
   - This is the recommended approach
   - You MUST use an app password instead of your regular Gmail password
   - The app password should be set as the `SMTP_PASS` environment variable
   - See the "App Password" section below for detailed instructions

3. **Gmail Account Settings**:
   - Ensure your Gmail account doesn't have additional security restrictions
   - Check if your Gmail account requires CAPTCHA for new sign-ins (disable this)
   - Try logging in to your Gmail account from a new device to ensure there are no security blocks

### Important Notes

1. **App Password**: For Gmail, you need to use an App Password, not your regular account password. To generate an App Password:
   - Enable 2-Step Verification on your Google account
   - Go to your Google Account > Security > App passwords
   - Select "Mail" and your device, then generate
   - Copy the 16-character password that appears
   - Set this as your SMTP_PASS environment variable in Render

2. **Verify Configuration**: After deployment, test the email functionality using the `/api/test-email` endpoint to ensure everything is configured correctly.

### Troubleshooting Email Issues on Render

1. **Use the Diagnostic Endpoint**:
   - Access `/api/email-diagnostics` on your deployed app
   - This will provide detailed information about your email configuration
   - Check if all environment variables are properly set
   - Verify if SMTP connection can be established

2. **Common Gmail Issues on Render**:
   - **Authentication Errors (535)**: Generate a new app password and update SMTP_PASS
   - **Connection Refused**: Verify SMTP_HOST and SMTP_PORT are correct
   - **Timeout Errors**: This could be due to network restrictions on Render
   - **Socket Errors**: For Gmail, use port 465 with secure=true OR port 587 with secure=false

3. **Gmail Security Settings**:
   - Check if your Gmail account has blocked sign-in attempts from Render
   - Sign in to your Gmail account and check for security alerts
   - Add Render's IP range to trusted sources if possible

4. **Render-Specific Configuration**:
   - Ensure SMTP_PASS is correctly set as a secret in Render
   - Try redeploying your application after updating environment variables
   - Check Render logs for detailed error messages
   - Contact Render support if you suspect network restrictions

## Deployment to Render

### Initial Deployment

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Log in to your Render account
3. Click "New" and select "Web Service"
4. Connect your Git repository
5. Configure the service:
   - Name: Choose a name for your service
   - Environment: Node
   - Build Command: `npm run build`
   - Start Command: `npm start`
6. Set environment variables as described in the "Render Deployment" section above
7. Click "Create Web Service"

### Updating Your Deployment

After making changes to fix API routes or other issues:

1. Commit and push your changes to your Git repository
2. Render will automatically deploy the new version if auto-deploy is enabled
3. If auto-deploy is disabled, manually deploy from the Render dashboard
4. Monitor the build logs for any errors
5. Test your API endpoints after deployment using the browser or tools like curl or Postman

### Troubleshooting Deployment Issues

1. **Build Failures**:
   - Check the build logs in the Render dashboard
   - Ensure all dependencies are correctly specified in package.json
   - Verify that the build command is correct

2. **Runtime Errors**:
   - Check the logs in the Render dashboard
   - Use the `/api/test` endpoint to verify the server is running
   - Check environment variables are correctly set

3. **API Route 404 Errors**:
   - Ensure the static file serving middleware is configured to skip API routes
   - Verify that API routes are registered before the static file middleware
   - Check that the build process correctly includes all API route handlers