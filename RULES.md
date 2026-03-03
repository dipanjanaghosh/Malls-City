You are an expert in Angular, SASS, TypeScript, Node.js, and MongoDB, focusing on scalable enterprise web development.

This project follows strict architectural and coding standards to ensure scalability, maintainability, and production readiness.

🎯 Key Principles

Provide clear, precise Angular, TypeScript, and Node.js examples.

Apply immutability and pure functions where applicable.

Favor component composition for modularity.

Follow feature-based architecture (frontend) and layered architecture (backend).

Use meaningful variable names (e.g., isAuthenticated, hasAdminAccess, selectedCityId).

Use kebab-case for file names (e.g., city-list.component.ts).

Prefer named exports for components, services, and utilities.

Separate concerns strictly (UI, business logic, data access).

🅰️ TypeScript & Angular

Define data structures using interfaces.

Avoid any; fully leverage TypeScript’s type system.

Organize files in this order:

Imports

Interface/Type definitions

Component/Service implementation

Use template strings for multi-line literals.

Utilize optional chaining and nullish coalescing.

Prefer standalone components where applicable.

Use Angular Signals for reactive state management.

Use the inject() function for dependency injection.

Always use OnPush change detection unless justified.

Never perform API calls directly inside components; use services.

🗂 File Naming Conventions

\*.component.ts → Components

\*.service.ts → Services

\*.module.ts → Modules

\*.directive.ts → Directives

\*.pipe.ts → Pipes

\*.guard.ts → Route Guards

\*.interceptor.ts → HTTP Interceptors

\*.model.ts → Data Models

\*.spec.ts → Tests

All files must use kebab-case

🎨 Code Style

Use single quotes for string literals.

Indent with 2 spaces.

No trailing whitespace.

Use const whenever possible.

Use template strings for interpolation.

Avoid deeply nested conditionals.

Avoid magic numbers and hardcoded strings.

Extract reusable logic into utilities.

🅰️ Angular-Specific Guidelines

Use feature-based modular architecture.

Lazy load all feature modules.

Use async pipe for observables.

Use trackBy in ngFor.

Use pure pipes for expensive computations.

Use semantic HTML and proper ARIA labels.

Use deferrable views for non-critical rendering.

Use Angular Signals for state management.

Use NgOptimizedImage for all images.

Avoid direct DOM manipulation.

Never use inline styles.

Use Reactive Forms (not template-driven forms).

📦 Backend (Node.js + MongoDB)
Architecture Pattern

Must follow:

Route → Controller → Service → Model

Responsibilities

Routes → Define endpoints only

Controllers → Handle request/response

Services → Business logic

Models → Database schemas

Middlewares → Auth, validation, logging

🧠 Backend Coding Standards

Use async/await (no callbacks).

Use centralized error handling middleware.

Never expose stack traces in production.

Validate request body using a validation layer.

Hash passwords using bcrypt.

Use JWT for authentication.

Implement role-based authorization middleware.

Always return consistent API response format:

{
"success": true,
"message": "Description",
"data": {}
}
🗄 MongoDB Rules

Use Mongoose schemas.

Enable timestamps.

Add proper indexing for search fields.

Use references between collections.

Avoid deep nested documents.

Use lean() for read-heavy queries.

Use pagination for all list APIs.

📥 Import Order
Angular

Angular core and common modules

RxJS modules

Other Angular modules

Application core imports

Shared imports

Environment imports

Relative imports

Node.js

Core Node modules

External dependencies

Config imports

Middlewares

Routes

Utilities

⚠️ Error Handling & Validation
Angular

Use proper error handling in services.

Show user-friendly error messages.

Implement form validation with custom validators.

Do not suppress errors silently.

Backend

Use custom error classes.

Centralize error responses.

Return proper HTTP status codes.

Never trust client input.

🧪 Testing

Follow Arrange → Act → Assert pattern.

Write unit tests for services.

Mock dependencies.

Avoid testing implementation details.

⚡ Performance Optimization
Angular

Use OnPush change detection.

Use trackBy in loops.

Use async pipe.

Use Signals for efficient state management.

Defer non-critical views.

Optimize Web Vitals (LCP, INP, CLS).

Avoid unnecessary subscriptions.

Backend

Add MongoDB indexing.

Use pagination.

Limit selected fields.

Avoid unnecessary queries.

🔐 Security

Prevent XSS via Angular sanitization.

Avoid innerHTML usage.

Sanitize dynamic content.

Use JWT expiration.

Use rate limiting middleware.

Enable CORS configuration.

Never store sensitive data in frontend except JWT token.

📐 Architectural Conventions

Follow Angular official style guide.

Follow clean architecture principles.

Maintain modularity.

Maintain backward compatibility when extending features.

Do not refactor unrelated modules.

Keep the system scalable for:

Reviews & ratings

Search functionality

Analytics dashboard

Image uploads

Multi-language support

📘 Reference

Refer to:

Angular official documentation

TypeScript handbook

Node.js best practices

MongoDB performance guidelines

This RULES.md must be strictly followed by all AI assistants generating code for mallCity
