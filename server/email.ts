import nodemailer from "nodemailer";
import { type InsertContactSubmission } from "@shared/schema";

function createTransporter() {
 // console.log('Creating email transporter');
  
  // Try to use environment variables first
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST;
  if (!host) {
    throw new Error("SMTP_HOST environment variable must be set");
  }
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true;
  
 // console.log(`Using SMTP with host: ${host}, port: ${port}, secure: ${secure}, user: ${user}`);
  
  // Create a transporter with configuration from environment variables
  // This ensures consistency between local and deployed environments
  // Create the transporter with appropriate configuration
  const transporterConfig = {
    host,
    port,
    secure, // true for 465, false for other ports
    auth: { 
      user, 
      pass 
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    },
    debug: true
  };
  
  // Add Gmail-specific settings if using Gmail
  if (host.includes('gmail')) {
 //   console.log('Using Gmail-specific settings');
    // For Gmail, these settings can help with authentication issues
    Object.assign(transporterConfig, {
      service: 'gmail',
      // Gmail requires these specific settings
      secure: true, // Force secure for Gmail
      port: 465, // Force port 465 for Gmail with SSL
      // OAuth2 could be implemented here for better security
    });
  }
  
//  console.log('Final transporter config:', transporterConfig);
  return nodemailer.createTransport(transporterConfig);
}

// Helper function to delay execution for retry logic
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Maximum number of retry attempts
const MAX_RETRY_ATTEMPTS = 3;

export async function sendContactEmail(submission: InsertContactSubmission) {
//console.log('==== EMAIL SENDING ATTEMPT STARTED ====');
//  console.log('Environment variables check:');
 // console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
 // console.log(`SMTP_HOST: ${process.env.SMTP_HOST || 'NOT SET'}`);
//console.log(`SMTP_PORT: ${process.env.SMTP_PORT || 'NOT SET'}`);
//console.log(`SMTP_USER: ${process.env.SMTP_USER ? '***SET***' : 'NOT SET'}`);
//console.log(`SMTP_PASS: ${process.env.SMTP_PASS ? '***SET***' : 'NOT SET'}`);
//  console.log(`SMTP_SECURE: ${process.env.SMTP_SECURE || 'NOT SET'}`);
//  console.log(`OWNER_EMAIL: ${process.env.OWNER_EMAIL || 'NOT SET'}`);
//  console.log(`FROM_EMAIL: ${process.env.FROM_EMAIL || 'NOT SET'}`);
  
  // Require environment variables for email addresses
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
  if (!ownerEmail || !fromEmail) {
    throw new Error("OWNER_EMAIL and FROM_EMAIL (or SMTP_USER) environment variables must be set");
  }
  
  // Log the email configuration being used
  // console.log('Email configuration:', { 
  //   ownerEmail, 
  //   fromEmail,
  //   host: process.env.SMTP_HOST || 'smtp.gmail.com',
  //   port: process.env.SMTP_PORT || '465',
  //   secure: process.env.SMTP_SECURE || 'true'
  // });

  // console.log('Sending email with config:', { 
  //   ownerEmail, 
  //   fromEmail,
  //   env: process.env.NODE_ENV
  // });

  const subject = `New Contact Form Submission - ${submission.firstName} ${submission.lastName}`;

  const text = `New contact form submission\n\n` +
    `Name: ${submission.firstName} ${submission.lastName}\n` +
    `Email: ${submission.email}\n` +
    `Phone: ${submission.phone}\n` +
    `Industry: ${submission.industry}\n` +
    `Message:\n${submission.message}\n`;

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Phone:</strong> ${submission.phone}</p>
    <p><strong>Industry:</strong> ${submission.industry}</p>
    <p><strong>Message:</strong></p>
    <p>${submission.message.replace(/\n/g, "<br/>")}</p>
  `;

  let lastError: any = null;
  
  // Try sending the email with retry logic
  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
    try {
     // console.log(`Email sending attempt ${attempt} of ${MAX_RETRY_ATTEMPTS}...`);
      
      // Create a new transporter for each attempt
      const transporter = createTransporter();
      
      // Verify SMTP connection before sending on first attempt
      if (attempt === 1) {
        try {
         // console.log('Verifying SMTP connection...');
          await transporter.verify();
       //   console.log('✓ SMTP connection verified successfully');
        } catch (verifyErr: any) {
          // console.error('✗ SMTP connection verification failed:', { 
          //   error: verifyErr?.message,
          //   code: verifyErr?.code
          // });
          // Continue with sending attempt anyway
        }
      }
      
      const mailOptions = {
        to: ownerEmail,
        from: fromEmail,
        replyTo: submission.email,
        subject,
        text,
        html,
      };
      
      // console.log('Sending mail with options:', {
      //   to: mailOptions.to,
      //   from: mailOptions.from,
      //   subject: mailOptions.subject
      // });
      
      const info = await transporter.sendMail(mailOptions);
      
      // console.log("✓ Contact email sent successfully", { 
      //   messageId: info.messageId,
      //   response: info.response
      // });
      
     // console.log('==== EMAIL SENDING COMPLETED SUCCESSFULLY ====');
      
      return info;
    } catch (err: any) {
      lastError = err;
      // console.error(`✗ Failed to send email (attempt ${attempt})`, { 
      //   error: err?.message, 
      //   code: err?.code,
      //   responseCode: err?.responseCode,
      //   response: err?.response,
      //   stack: process.env.NODE_ENV !== 'production' ? err?.stack : undefined
      // });
      
      // Log deployment-specific information to help diagnose issues
      // console.error('Deployment environment:', {
      //   nodeEnv: process.env.NODE_ENV,
      //   platform: process.platform,
      //   isRender: process.env.RENDER === 'true',
      //   renderServiceId: process.env.RENDER_SERVICE_ID,
      //   renderInstanceId: process.env.RENDER_INSTANCE_ID
      // });
      
      // Provide specific guidance for common Gmail errors
      if (err?.responseCode === 535) {
       // console.error('GMAIL AUTHENTICATION ERROR: This is likely due to one of these issues:');
//console.error('1. Incorrect password or app password');
        //console.error('2. "Less secure app access" is disabled');
      //  console.error('3. 2-factor authentication is enabled but no app password is being used');
      //  console.error('4. Google security blocked the sign-in attempt from Render');
      //  console.error('SOLUTION: Generate a new app password and update SMTP_PASS in Render environment variables');
      } else if (err?.code === 'ECONNREFUSED') {
      //  console.error('CONNECTION REFUSED: Check if SMTP_HOST and SMTP_PORT are correct');
      } else if (err?.code === 'ETIMEDOUT') {
      //  console.error('CONNECTION TIMEOUT: This could be due to network restrictions on Render');
      } else if (err?.code === 'ESOCKET') {
//console.error('SOCKET ERROR: This could be due to incorrect secure/port configuration');
      //  console.error('For Gmail, use port 465 with secure=true OR port 587 with secure=false');
      }
      
      // If this is not the last attempt, wait before retrying
      if (attempt < MAX_RETRY_ATTEMPTS) {
        const retryDelay = 1000 * Math.pow(2, attempt-1); // Exponential backoff
      //  console.log(`Retrying in ${retryDelay}ms...`);
        await delay(retryDelay);
      }
    }
  }
  
  // If we've exhausted all retry attempts, throw the last error
 // console.error(`==== FAILED TO SEND EMAIL AFTER ${MAX_RETRY_ATTEMPTS} ATTEMPTS ====`);
  throw lastError;
}