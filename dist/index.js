var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// server/index.ts
import "dotenv/config";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  contactSubmissions;
  constructor() {
    this.contactSubmissions = /* @__PURE__ */ new Map();
  }
  async createContactSubmission(insertSubmission) {
    const id = randomUUID();
    const submission = {
      ...insertSubmission,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  industry: text("industry").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";

// server/email.ts
import nodemailer from "nodemailer";
function createTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST;
  if (!host) {
    throw new Error("SMTP_HOST environment variable must be set");
  }
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true;
  const transporterConfig = {
    host,
    port,
    secure,
    // true for 465, false for other ports
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
  if (host.includes("gmail")) {
    Object.assign(transporterConfig, {
      service: "gmail",
      // Gmail requires these specific settings
      secure: true,
      // Force secure for Gmail
      port: 465
      // Force port 465 for Gmail with SSL
      // OAuth2 could be implemented here for better security
    });
  }
  return nodemailer.createTransport(transporterConfig);
}
var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var MAX_RETRY_ATTEMPTS = 3;
async function sendContactEmail(submission) {
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
  if (!ownerEmail || !fromEmail) {
    throw new Error("OWNER_EMAIL and FROM_EMAIL (or SMTP_USER) environment variables must be set");
  }
  const subject = `New Contact Form Submission - ${submission.firstName} ${submission.lastName}`;
  const text2 = `New contact form submission

Name: ${submission.firstName} ${submission.lastName}
Email: ${submission.email}
Phone: ${submission.phone}
Industry: ${submission.industry}
Message:
${submission.message}
`;
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Phone:</strong> ${submission.phone}</p>
    <p><strong>Industry:</strong> ${submission.industry}</p>
    <p><strong>Message:</strong></p>
    <p>${submission.message.replace(/\n/g, "<br/>")}</p>
  `;
  let lastError = null;
  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
    try {
      const transporter = createTransporter();
      if (attempt === 1) {
        try {
          await transporter.verify();
        } catch (verifyErr) {
        }
      }
      const mailOptions = {
        to: ownerEmail,
        from: fromEmail,
        replyTo: submission.email,
        subject,
        text: text2,
        html
      };
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      lastError = err;
      if (err?.responseCode === 535) {
      } else if (err?.code === "ECONNREFUSED") {
      } else if (err?.code === "ETIMEDOUT") {
      } else if (err?.code === "ESOCKET") {
      }
      if (attempt < MAX_RETRY_ATTEMPTS) {
        const retryDelay = 1e3 * Math.pow(2, attempt - 1);
        await delay(retryDelay);
      }
    }
  }
  throw lastError;
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/test", (req, res) => {
    res.json({
      message: "Server is working!",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      env: process.env.NODE_ENV,
      smtpHost: process.env.SMTP_HOST,
      smtpUser: process.env.SMTP_USER
    });
  });
  app2.get("/api/test-email", async (req, res) => {
    try {
      const testSubmission = {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "123-456-7890",
        industry: "Testing",
        message: "This is a test email from the Asnani HR Solutions website."
      };
      const emailInfo = await sendContactEmail(testSubmission);
      return res.status(200).json({
        success: true,
        message: "Test email sent successfully",
        emailId: emailInfo?.messageId,
        response: emailInfo?.response
      });
    } catch (error) {
      const errorDetails = {
        message: error instanceof Error ? error.message : "Unknown error",
        code: error instanceof Error && "code" in error ? error.code : void 0,
        responseCode: error instanceof Error && "responseCode" in error ? error.responseCode : void 0,
        response: error instanceof Error && "response" in error ? error.response : void 0
      };
      return res.status(500).json({
        success: false,
        error: error.message || "Unknown error",
        details: errorDetails
      });
    }
  });
  app2.get("/api/email-diagnostics", async (req, res) => {
    try {
      const diagnostics = {
        environment: {
          nodeEnv: process.env.NODE_ENV,
          platform: process.platform,
          nodeVersion: process.version,
          isRender: process.env.RENDER === "true",
          renderServiceId: process.env.RENDER_SERVICE_ID,
          renderInstanceId: process.env.RENDER_INSTANCE_ID
        },
        emailConfig: {
          smtpHost: process.env.SMTP_HOST || "NOT SET",
          smtpPort: process.env.SMTP_PORT || "NOT SET",
          smtpSecure: process.env.SMTP_SECURE || "NOT SET",
          smtpUser: process.env.SMTP_USER ? "***SET***" : "NOT SET",
          smtpPass: process.env.SMTP_PASS ? "***SET***" : "NOT SET",
          ownerEmail: process.env.OWNER_EMAIL || "NOT SET",
          fromEmail: process.env.FROM_EMAIL || "NOT SET"
        },
        networkTest: {}
      };
      try {
        const nodemailer2 = __require("nodemailer");
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        const host = process.env.SMTP_HOST;
        const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
        const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true;
        const transporter = nodemailer2.createTransport({
          host,
          port,
          secure,
          auth: { user, pass },
          connectionTimeout: 5e3,
          // 5 seconds
          debug: true
        });
        const verification = await transporter.verify();
        diagnostics.networkTest.smtpVerification = {
          success: true,
          message: "SMTP connection successful"
        };
      } catch (err) {
        diagnostics.networkTest.smtpVerification = {
          success: false,
          message: err?.message,
          code: err?.code,
          responseCode: err?.responseCode
        };
      }
      return res.json({
        success: true,
        diagnostics
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to run email diagnostics",
        error: error?.message
      });
    }
  });
  app2.get("/api/test-email-alt", async (req, res) => {
    try {
      const testSubmission = {
        firstName: "Alternative",
        lastName: "Test",
        email: "alternative@example.com",
        phone: "987-654-3210",
        industry: "Oil & Gas",
        message: "This is an alternative test email from the Asnani HR Solutions website."
      };
      const emailInfo = await sendContactEmail(testSubmission);
      return res.status(200).json({
        success: true,
        message: "Alternative test email sent successfully",
        info: {
          messageId: emailInfo?.messageId,
          response: emailInfo?.response
        }
      });
    } catch (error) {
      const errorDetails = {
        message: error instanceof Error ? error.message : "Unknown error",
        code: error instanceof Error && "code" in error ? error.code : void 0,
        responseCode: error instanceof Error && "responseCode" in error ? error.responseCode : void 0,
        response: error instanceof Error && "response" in error ? error.response : void 0
      };
      return res.status(500).json({
        success: false,
        error: error.message || "Unknown error",
        details: errorDetails
      });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      let submission;
      try {
        submission = await storage.createContactSubmission(validatedData);
      } catch (dbError) {
        throw new Error(`Database error: ${dbError instanceof Error ? dbError.message : "Unknown error"}`);
      }
      try {
        const emailInfo = await sendContactEmail(validatedData);
        return res.status(200).json({
          success: true,
          id: submission.id,
          emailSent: true,
          emailId: emailInfo?.messageId,
          message: "Contact form submitted and email sent successfully"
        });
      } catch (emailError) {
        const errorDetails = {
          message: emailError instanceof Error ? emailError.message : "Unknown error",
          code: emailError instanceof Error && "code" in emailError ? emailError.code : void 0,
          responseCode: emailError instanceof Error && "responseCode" in emailError ? emailError.responseCode : void 0,
          response: emailError instanceof Error && "response" in emailError ? emailError.response : void 0
        };
        return res.status(207).json({
          success: true,
          id: submission.id,
          emailSent: false,
          message: "Contact form submitted but failed to send email notification",
          error: process.env.NODE_ENV === "production" ? "Email delivery failed" : errorDetails.message,
          ...process.env.NODE_ENV !== "production" && { details: errorDetails }
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      } else {
        const errorDetails = {
          message: error instanceof Error ? error.message : "Unknown error",
          stack: process.env.NODE_ENV !== "production" ? error instanceof Error ? error.stack : void 0 : void 0,
          code: error instanceof Error && "code" in error ? error.code : void 0,
          name: error instanceof Error ? error.name : "UnknownError"
        };
        res.status(500).json({
          success: false,
          message: "Failed to submit contact form",
          error: error instanceof Error ? error.message : "Unknown error",
          // Only include technical details in non-production environments
          ...process.env.NODE_ENV !== "production" && { details: errorDetails }
        });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "client", "dist"),
    // stays inside client
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import cors from "cors";
var app = express2();
app.use(cors());
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "production") {
}
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "10000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
