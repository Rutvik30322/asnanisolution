# Overview

This is a recruitment agency website for Asnani HR Solutions, a manpower consultancy specializing in Gulf/Middle East recruitment since 2011. The application is built as a full-stack web application with a React frontend and Express backend, featuring a modern, responsive design for showcasing services across various industries including construction, oil & gas, hospitality, HVAC, manufacturing, and facility management.

## Recent Changes (August 2025)

- Added animated clients showcase section with 12+ major Gulf/Middle East companies
- Implemented responsive design with scrolling carousel for desktop and grid layout for mobile
- Added client testimonials with 5-star ratings and success statistics
- Enhanced animations with floating, pulsing, and horizontal scrolling effects
- Integrated "Clients" navigation menu item for easy access

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server. The frontend follows a component-based architecture with proper separation of concerns.

**Styling**: Uses Tailwind CSS with shadcn/ui components for a modern, consistent design system. Custom CSS variables support both light and dark themes, with Inter and Poppins fonts for typography.

**State Management**: React Query (@tanstack/react-query) handles server state management and API calls, providing caching, background updates, and error handling.

**Routing**: Wouter library provides lightweight client-side routing with a simple Switch/Route pattern.

**UI Components**: Extensive use of Radix UI primitives through shadcn/ui components, ensuring accessibility and consistent behavior across form controls, dialogs, and interactive elements.

## Backend Architecture

**Framework**: Express.js with TypeScript, using ES modules for modern JavaScript support.

**API Design**: RESTful API structure with a single contact form endpoint (`/api/contact`) that handles form submissions with validation.

**Request Handling**: Custom middleware for request logging, JSON parsing, and error handling. All API requests are logged with timing information.

**Development Setup**: Vite integration in development mode with HMR (Hot Module Replacement) support for seamless development experience.

## Data Storage

**Current Implementation**: In-memory storage using a Map-based storage class (`MemStorage`) for contact form submissions. This is suitable for development but not production-ready.

**Schema Definition**: Drizzle ORM is configured for PostgreSQL with a schema defined in `shared/schema.ts`. The contact submissions table includes fields for personal information, industry selection, and message content.

**Validation**: Zod schemas generated from Drizzle table definitions ensure type-safe data validation on both client and server sides.

## External Dependencies

**Database**: Neon serverless PostgreSQL configured through Drizzle ORM. The `drizzle.config.ts` file specifies PostgreSQL dialect and connection configuration via `DATABASE_URL` environment variable.

**UI Library**: shadcn/ui components built on Radix UI primitives provide comprehensive, accessible UI components including forms, dialogs, navigation, and feedback elements.

**Development Tools**: 
- Vite for frontend build tooling and development server
- TypeScript for type safety across the entire application
- Tailwind CSS for utility-first styling
- PostCSS for CSS processing and autoprefixing

**Third-party Services**: The application is set up to integrate with Replit's development environment, including error modal overlays and development banners.

**Build System**: The application uses a monorepo structure with shared TypeScript types and schemas between client and server. ESBuild handles server-side compilation for production builds.