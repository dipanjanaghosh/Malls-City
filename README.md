## Malls-City

It is a one-stop portal to unlock the vibrant and diverse world of shopping malls across the globe.
Users can select a city to see all available malls, then explore shops within those malls.

---

## 🏗️ Project Architecture & Design

For detailed technical information, please refer to the following documents:
- **[ARCHITECTURE.md](ARCHITECTURE.md)**: Overview of the technology stack, project structure, and data flow.
- **[DESIGN-STYLE.md](DESIGN-STYLE.md)**: UI/UX design principles, color palettes, and frontend/backend coding standards.
- **[RULES.md](RULES.md)**: Mandatory architectural and coding rules for the development of this project.

---

## 🚀 Key Features

### **Backend**
- **Admin APIs**: Secure endpoints for managing cities, malls, and shops.
- **User APIs**: Public and authorized endpoints for data retrieval and user actions.
- **Audit Logging**: Integrated Winston/Morgan logging for system events.

### **Frontend**
- **Admin Panel**: Feature-rich dashboard for managing platform data.
- **Authentication**: Secure login/signup with JWT and route guards.
- **Modern UI**: Redesigned pages with hero sections, grid layouts, and glassmorphism components.
- **State Management**: Robust state handling using NgRx (Actions, Effects, Reducers, Selectors).
- **Reusable Components**: Centralized component library (e.g., `CardComponent`) for a consistent look and feel.

---

## 📜 Available NPM Scripts

        At First use cd Backend and then run any of the scripts

## 🧑‍💻 Run the Development Server

        Command: npm run dev
        Starts the backend directly from TypeScript source files using ts-node-dev.
        This mode automatically reloads the server on file changes, providing a fast and efficient development workflow without needing to rebuild.

## 🔄 Run the Server with Nodemon (Development Mode)

        Command: npm run start:dev
        Launches the backend server using nodemon from the src directory.
        This setup automatically detects code changes and restarts the server, making it ideal for active development.

## 🏗️ Build the Entire Project (Frontend + Backend)

        Command: npm run build
        Executes both the Angular frontend build (build:ui) and backend build (build:server) sequentially.
        This prepares a production-ready version of the complete application, generating compiled assets in the dist folder.

## ⚙️ Build Only the Backend

        Command: npm run build:server
        Compiles only the backend TypeScript files into JavaScript.
        The output is saved in the dist directory and can be started using npm start.

## 💻 Run the Compiled Production Server

        Command: npm start
        Starts the backend server from the compiled files located in the dist directory.
        Use this after running the build process to serve the production-ready application.

## 🧹 Clean Build Artifacts

        Command: npm run prebuild
        Removes old or cached files from the public and dist directories before running a new build.
        Helps avoid issues caused by outdated compiled files or assets.

## 🧩 Synchronize MongoDB Indexes

        Command: npm run sync:indexes
        Runs the safe MongoDB index synchronization script.
        This command updates database indexes for all Mongoose models while automatically backing up existing ones to ensure no data loss.

## 🧾 Restore MongoDB Indexes

        Command: npm run restore:indexes
        Executes a recovery script that restores MongoDB indexes from previously created backups.
        Use this if an index sync fails or you need to roll back to an earlier index state.

## 🌐 Build Only the Frontend (Angular)

        Command: npm run build:ui
        Builds only the Angular frontend application using the Angular CLI.
        The compiled production-ready frontend files are placed in the appropriate output directory for deployment.

## 🚀 Run Production Server with Nodemon

        Command: npm run start:prod
        Runs the backend server in production mode using nodemon, setting NODE_ENV=production.
        This command is useful for local production testing or staging environments.

## 🧰 Developer Workflow

## Set Up Environment Variables

    Copy the .env file to the correct location inside the src directory.
    Ensure that it contains valid entries for keys like MONGO_URI, PORT, and JWT_SECRET.

## Run the Development Server

    Use npm run dev for instant development reloads.
    Alternatively, use npm run start:dev if you prefer working with nodemon.

## Build the Project

    Before building, clean up old builds:
        npm run prebuild


    Then build both backend and frontend together:
        npm run build

## Run the Production Server

    Start the compiled backend:
    npm start
    This ensures your app runs using the optimized, compiled JavaScript files.

## Manage MongoDB Indexes

    After updating or adding new Mongoose models, run:
        npm run sync:indexes

    If something goes wrong during sync, restore the previous backup using:
        npm run restore:indexes

## Test and Deploy

    Test locally using the production server (npm run start:prod).
    Once verified, deploy the compiled files in the dist folder to your production environment

## Start Backend Only:

    Step 1: use cd Backend
    Step 2: npm start

## Start Frontend Only:

    step 1 : use cd malls-city-ui
    Strp 2 : npm start

## logging error :

    morgan logger middleware has been used to log errors on the server side

    A simple and universal logging library with support for multiple transports has been used called winston.
    A transport is essentially a storage device for your logs. Each winston logger can have multiple transports.
    winston aims to decouple parts of the logging process to make it more flexible and extensible. Attention is given to supporting flexibility in log formatting & level.

    Logs can be rotated based on a date, size limit, and old logs can be removed based on count or elapsed days.
    winston-daily-rotate-file has been used to rotate log files.
