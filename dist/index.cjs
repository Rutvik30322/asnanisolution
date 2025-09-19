"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// vite.config.ts
var vite_config_exports = {};
__export(vite_config_exports, {
  default: () => vite_config_default
});
var import_vite, import_plugin_react, import_path, runtimeErrorOverlay, _dirname, vite_config_default;
var init_vite_config = __esm({
  "vite.config.ts"() {
    "use strict";
    import_vite = require("vite");
    import_plugin_react = __toESM(require("@vitejs/plugin-react"), 1);
    import_path = __toESM(require("path"), 1);
    runtimeErrorOverlay = void 0;
    if (process.env.NODE_ENV !== "production") {
      try {
        runtimeErrorOverlay = require("@replit/vite-plugin-runtime-error-modal");
      } catch {
      }
    }
    _dirname = typeof __dirname !== "undefined" ? __dirname : process.cwd();
    vite_config_default = (0, import_vite.defineConfig)({
      plugins: [
        (0, import_plugin_react.default)(),
        ...runtimeErrorOverlay ? [
          typeof runtimeErrorOverlay === "function" ? runtimeErrorOverlay() : runtimeErrorOverlay.default ? runtimeErrorOverlay.default() : []
        ] : []
      ],
      resolve: {
        alias: {
          "@": import_path.default.resolve(_dirname, "client", "src"),
          "@shared": import_path.default.resolve(_dirname, "shared"),
          "@assets": import_path.default.resolve(_dirname, "attached_assets")
        }
      },
      root: import_path.default.resolve(_dirname, "client"),
      build: {
        outDir: import_path.default.resolve(_dirname, "client", "dist"),
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
  }
});

// server/index.ts
var import_config = require("dotenv/config");
var import_express2 = __toESM(require("express"), 1);

// server/routes.ts
var import_http = require("http");

// server/storage.ts
var import_crypto = require("crypto");
var MemStorage = class {
  contactSubmissions;
  constructor() {
    this.contactSubmissions = /* @__PURE__ */ new Map();
  }
  async createContactSubmission(insertSubmission) {
    const id = (0, import_crypto.randomUUID)();
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
var import_pg_core = require("drizzle-orm/pg-core");
var import_drizzle_orm = require("drizzle-orm");
var import_drizzle_zod = require("drizzle-zod");
var contactSubmissions = (0, import_pg_core.pgTable)("contact_submissions", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  firstName: (0, import_pg_core.text)("first_name").notNull(),
  lastName: (0, import_pg_core.text)("last_name").notNull(),
  email: (0, import_pg_core.text)("email").notNull(),
  phone: (0, import_pg_core.text)("phone").notNull(),
  industry: (0, import_pg_core.text)("industry").notNull(),
  message: (0, import_pg_core.text)("message").notNull(),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
});
var insertContactSubmissionSchema = (0, import_drizzle_zod.createInsertSchema)(contactSubmissions).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
var import_zod = require("zod");

// server/email.ts
var import_nodemailer = __toESM(require("nodemailer"), 1);
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
  return import_nodemailer.default.createTransport(transporterConfig);
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
        const nodemailer2 = require("nodemailer");
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
      if (error instanceof import_zod.z.ZodError) {
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
  const httpServer = (0, import_http.createServer)(app2);
  return httpServer;
}

// server/vite.ts
var import_express = __toESM(require("express"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_vite2 = require("vite");
var import_nanoid = require("nanoid");
var __dirname2 = typeof __dirname2 !== "undefined" ? __dirname2 : process.cwd();
var viteLogger = (0, import_vite2.createLogger)();
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
  const viteConfig = await Promise.resolve().then(() => (init_vite_config(), vite_config_exports)).then((m) => m.default).catch(() => ({}));
  const vite = await (0, import_vite2.createServer)({
    ...viteConfig,
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
      const clientTemplate = import_path2.default.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await import_fs.default.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${(0, import_nanoid.nanoid)()}"`
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
  const distPath = import_path2.default.resolve(__dirname2, "public");
  if (!import_fs.default.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(import_express.default.static(distPath));
  app2.use("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }
    res.sendFile(import_path2.default.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var import_cors = __toESM(require("cors"), 1);
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.use(import_express2.default.urlencoded({ extended: false }));
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
