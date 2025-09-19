import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { InsertContactSubmission, insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Test endpoint to verify server is working
  app.get("/api/test", (req, res) => {
    res.json({ 
      message: "Server is working!", 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      smtpHost: process.env.SMTP_HOST,
      smtpUser: process.env.SMTP_USER
    });
  });
  
  // Test endpoint for email functionality using sendContactEmail
  app.get('/api/test-email', async (req, res) => {
    try {
//console.log('Testing email functionality with sendContactEmail function');
      
      // Create a test submission
      const testSubmission = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '123-456-7890',
        industry: 'Testing',
        message: 'This is a test email from the Asnani HR Solutions website.',
      };
      
      // Use the sendContactEmail function
      const emailInfo = await sendContactEmail(testSubmission);
      
    //  console.log('Test email sent successfully:', emailInfo?.messageId);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Test email sent successfully',
        emailId: emailInfo?.messageId,
        response: emailInfo?.response
      });
    } catch (error: any) {
     // console.error('Error sending test email:', error);
      
      // Extract more detailed error information for debugging
      const errorDetails = {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: error instanceof Error && 'code' in error ? (error as any).code : undefined,
        responseCode: error instanceof Error && 'responseCode' in error ? (error as any).responseCode : undefined,
        response: error instanceof Error && 'response' in error ? (error as any).response : undefined
      };
      
    //  console.error('Detailed email error:', errorDetails);
      
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Unknown error',
        details: errorDetails
      });
    }
  });

  // Add a diagnostic endpoint to help troubleshoot email issues on Render
  app.get('/api/email-diagnostics', async (req, res) => {
    try {
      // Collect environment information
      const diagnostics = {
        environment: {
          nodeEnv: process.env.NODE_ENV,
          platform: process.platform,
          nodeVersion: process.version,
          isRender: process.env.RENDER === 'true',
          renderServiceId: process.env.RENDER_SERVICE_ID,
          renderInstanceId: process.env.RENDER_INSTANCE_ID
        },
        emailConfig: {
          smtpHost: process.env.SMTP_HOST || 'NOT SET',
          smtpPort: process.env.SMTP_PORT || 'NOT SET',
          smtpSecure: process.env.SMTP_SECURE || 'NOT SET',
          smtpUser: process.env.SMTP_USER ? '***SET***' : 'NOT SET',
          smtpPass: process.env.SMTP_PASS ? '***SET***' : 'NOT SET',
          ownerEmail: process.env.OWNER_EMAIL || 'NOT SET',
          fromEmail: process.env.FROM_EMAIL || 'NOT SET'
        },
        networkTest: {}
      };
      
      // Test SMTP connection
      try {
        const nodemailer = require('nodemailer');
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        const host = process.env.SMTP_HOST;
        const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
        const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true;
        
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: { user, pass },
          connectionTimeout: 5000, // 5 seconds
          debug: true
        });
        
        // Verify connection configuration
        const verification = await transporter.verify();
        diagnostics.networkTest.smtpVerification = {
          success: true,
          message: 'SMTP connection successful'
        };
      } catch (err: any) {
        diagnostics.networkTest.smtpVerification = {
          success: false,
          message: err?.message,
          code: err?.code,
          responseCode: err?.responseCode
        };
      }
      
      // Return diagnostics
      return res.json({
        success: true,
        diagnostics
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to run email diagnostics',
        error: error?.message
      });
    }
  });
  
  // Alternative test endpoint using sendContactEmail with different test data
  app.get('/api/test-email-alt', async (req, res) => {
    try {
    //  console.log('Testing alternative email method with sendContactEmail...');
      
      // Create a different test submission
      const testSubmission = {
        firstName: 'Alternative',
        lastName: 'Test',
        email: 'alternative@example.com',
        phone: '987-654-3210',
        industry: 'Oil & Gas',
        message: 'This is an alternative test email from the Asnani HR Solutions website.',
      };
      
      // Use the sendContactEmail function
      const emailInfo = await sendContactEmail(testSubmission);
      
     // console.log('Alternative test email sent successfully:', emailInfo?.messageId);
      
      return res.status(200).json({
        success: true,
        message: 'Alternative test email sent successfully',
        info: {
          messageId: emailInfo?.messageId,
          response: emailInfo?.response
        }
      });
    } catch (error: any) {
     // console.error('Failed to send alternative test email:', error);
      
      // Extract more detailed error information for debugging
      const errorDetails = {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: error instanceof Error && 'code' in error ? (error as any).code : undefined,
        responseCode: error instanceof Error && 'responseCode' in error ? (error as any).responseCode : undefined,
        response: error instanceof Error && 'response' in error ? (error as any).response : undefined
      };
      
    //  console.error('Detailed email error:', errorDetails);
      
      return res.status(500).json({
        success: false,
        error: error.message || 'Unknown error',
        details: errorDetails
      });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
     // console.log('Contact form submitted:', req.body);
      
      // Validate the request data
      const validatedData = insertContactSubmissionSchema.parse(req.body);
   //   console.log('Data validated:', validatedData);
      
      // Store the submission in the database
      let submission;
      try {
        submission = await storage.createContactSubmission(validatedData);
     //   console.log('Submission stored:', submission);
      } catch (dbError) {
    //    console.error('Database error storing submission:', dbError);
        throw new Error(`Database error: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`);
      }

      // Send email using the sendContactEmail function
      try {
      //  console.log('Sending contact email using sendContactEmail function');
        
        // Use the imported sendContactEmail function from email.ts
        const emailInfo = await sendContactEmail(validatedData);
     //   console.log('Email sent successfully:', emailInfo?.messageId);
        
        // Return success response
        
        return res.status(200).json({ 
          success: true, 
          id: submission.id,
          emailSent: true,
          emailId: emailInfo?.messageId,
          message: 'Contact form submitted and email sent successfully'
        });
      } catch (emailError) {
        //.error('Failed to send email:', emailError instanceof Error ? emailError.message : 'Unknown error');
       // console.error('Error details:', emailError);
        
        // Extract more detailed error information for debugging
        const errorDetails = {
          message: emailError instanceof Error ? emailError.message : 'Unknown error',
          code: emailError instanceof Error && 'code' in emailError ? (emailError as any).code : undefined,
          responseCode: emailError instanceof Error && 'responseCode' in emailError ? (emailError as any).responseCode : undefined,
          response: emailError instanceof Error && 'response' in emailError ? (emailError as any).response : undefined
        };
        
       // console.error('Detailed email error:', errorDetails);
        
        // Return partial success - form submitted but email failed
        return res.status(207).json({
          success: true,
          id: submission.id,
          emailSent: false,
          message: 'Contact form submitted but failed to send email notification',
          error: process.env.NODE_ENV === 'production' 
            ? 'Email delivery failed' 
            : errorDetails.message,
          ...(process.env.NODE_ENV !== 'production' && { details: errorDetails })
        });
      }
    } catch (error) {
    //  console.error('Contact form error:', error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        // Include more detailed error information for debugging
        const errorDetails = {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: process.env.NODE_ENV !== 'production' ? (error instanceof Error ? error.stack : undefined) : undefined,
          code: error instanceof Error && 'code' in error ? error.code : undefined,
          name: error instanceof Error ? error.name : 'UnknownError'
        };
        
     //   console.error('Detailed error:', errorDetails);
        
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form",
          error: error instanceof Error ? error.message : 'Unknown error',
          // Only include technical details in non-production environments
          ...(process.env.NODE_ENV !== 'production' && { details: errorDetails })
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
