# Malls City Application Architecture

This document provides an overview of the technical architecture, project structure, and data flow of the Malls City application.

---

## 1. Overview

Malls City is a comprehensive platform for managing and exploring shopping malls and shops across different cities. It features a public-facing interface for users to discover malls and an administrative dashboard for managing cities, malls, and stores.

---

## 2. Technology Stack

### **Frontend**

- **Framework**: [Angular 16](https://angular.io/)
- **State Management**: [NgRx](https://ngrx.io/) (Store, Effects, Selectors)
- **UI Components**: [Angular Material](https://material.angular.io/), [Bootstrap 5](https://getbootstrap.com/)
- **Authentication**: [@auth0/angular-jwt](https://github.com/auth0/angular-jwt)
- **Notifications**: [ngx-toastr](https://github.com/scttcper/ngx-toastr)
- **Utilities**: RxJS, TypeScript

### **Backend**

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: TypeScript
- **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
- **Security**: [JSON Web Tokens (JWT)](https://jwt.io/), [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Logging**: [Winston](https://github.com/winstonjs/winston), [Morgan](https://github.com/expressjs/morgan)
- **File Upload**: [Multer](https://github.com/expressjs/multer)

---

## 3. Project Structure

The project is divided into two main directories: `Backend` and `malls-city-ui`.

### **Backend (`/Backend`)**

Follows a structured **Router-Controller-Model** pattern:

- **`src/server.ts`**: Application entry point, configures Express, connects to DB, and defines top-level routes.
- **`src/configs/`**: Database and environment configurations.
- **`src/controller/`**: Contains the business logic for each entity (e.g., `cityController.js`, `mallController.js`).
- **`src/models/`**: Mongoose schemas and TypeScript interfaces for data models.
- **`src/routers/`**: Express route definitions mapping URLs to controllers.
- **`src/middlewares/`**: Custom middlewares for authentication, error handling, and request validation.
- **`assets/`**: Static data and maintenance scripts (e.g., database indexing).

### **Frontend (`/malls-city-ui`)**

Organized into feature-based modules with **Lazy Loading**:

- **`src/app/admin/`**: Admin-only features (adding cities, managing malls/shops).
- **`src/app/auth/`**: Authentication logic, login component, and JWT interceptors.
- **`src/app/core/`**: Core business components like mall and shop listings.
- **`src/app/shared/`**: Global components (Header, Footer, Home), guards, directives, and services.
- **`src/app/shared/store/`**: Centralized state management using NgRx (Actions, Reducers, Effects, Selectors).
- **`src/environments/`**: Environment-specific configurations (API URLs, etc.).

---

## 4. Core Features & Data Flow

### **Data Flow Architecture**

1.  **Frontend**: User interacts with the Angular UI.
2.  **State Management**: NgRx Actions are dispatched to handle side effects (via Effects) or update the global state (via Reducers).
3.  **API Communication**: Angular services use `HttpClient` to send requests to the Backend. An `AuthInterceptor` automatically attaches the JWT token to authorized requests.
4.  **Backend Processing**: Express routers receive the request, pass it through middlewares (e.g., `verifyTokenMiddleware`), and delegate to the appropriate controller.
5.  **Database Interaction**: Controllers use Mongoose models to perform CRUD operations on MongoDB.
6.  **Response**: The backend sends a JSON response back to the frontend, which updates the NgRx state and triggers UI updates.

### **Key Features**

- **Dynamic Search**: Filter malls and shops by city and search terms.
- **Secure Admin Panel**: Protected routes and actions for managing the platform's data.
- **State Persistence**: Using NgRx to maintain application state across navigation.
- **Audit Logging**: Backend tracks system events and errors using Winston.

---

## 5. Deployment & Integration

The backend is designed to serve the production build of the Angular application:

- The compiled Angular files (from `malls-city-ui/dist`) are served as static assets from the `Backend/public` directory.
- A wildcard route in `server.ts` ensures that all non-API requests are redirected to `index.html`, enabling Angular's client-side routing.

---

## 6. Development Workflow

1.  **Backend**: `npm run dev` (starts server with `ts-node-dev`).
2.  **Frontend**: `ng serve` (starts Angular development server).
3.  **Database**: Requires a running MongoDB instance (configured in `.env`).
