# Email Setup Instructions for Asnani HR Solutions

## GoDaddy Email Configuration

To enable the contact form to send emails to info@asnanihr.in, you need to configure the SMTP settings properly.

### Local Development (.env file)

Update your `.env` file with the following settings:

```
# Email Configuration for GoDaddy
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@asnanihr.in
SMTP_PASS=your_actual_godaddy_email_password
OWNER_EMAIL=info@asnanihr.in
FROM_EMAIL=info@asnanihr.in
```

Replace `your_actual_godaddy_email_password` with your actual GoDaddy email password.

### Production Deployment (Render)

The `render.yaml` file has been updated with the correct GoDaddy SMTP settings. However, for security reasons, the SMTP password should be set in the Render dashboard:

1. Go to your Render dashboard
2. Navigate to your service settings
3. Go to the "Environment Variables" section
4. Add a new environment variable:
   - Key: `SMTP_PASS`
   - Value: Your actual GoDaddy email password
   - Mark it as "Secret"

### GoDaddy SMTP Details

- **SMTP Server**: smtpout.secureserver.net
- **Port**: 465 (SSL required)
- **Encryption**: SSL/TLS
- **Authentication**: Required
- **Username**: Your full email address (info@asnanihr.in)
- **Password**: Your email account password

### Testing Email Functionality

You can test the email functionality using the built-in test endpoints:

1. `/api/test-email` - Sends a test email using the configured settings
2. `/api/email-diagnostics` - Provides detailed information about the email configuration and connection status

### Troubleshooting

If emails are not being sent:

1. Verify that all environment variables are correctly set
2. Check that your GoDaddy email password is correct
3. Ensure that your GoDaddy account allows SMTP access
4. Check the server logs for any error messages
5. Use the `/api/email-diagnostics` endpoint to get detailed information about the configuration

For more detailed troubleshooting, refer to the EMAIL_TROUBLESHOOTING.md file.