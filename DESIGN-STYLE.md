# Malls City Design & Style Guide

This document defines the UI/UX design principles, coding standards, and project patterns to be followed during the development of the Malls City application.

---

## 1. UI/UX Design Principles

### **Color Palette**
The application uses a modern, vibrant color scheme centered around purples and blues with gradients.
- **Primary**: Purple/Lavender (`#bd32ff`, `#6e8efb`, `#a777e3`)
- **Accent**: Green (Material `purple-green` theme)
- **Backgrounds**: Linear gradients for containers and sections.
- **Status Colors**:
    - **Success**: Emerald Green
    - **Warning**: Amber/Orange
    - **Danger/Error**: `#e63946` (Crimson)

### **Typography**
- **Primary Font**: `Roboto`, sans-serif (Standard Angular Material font).
- **Headings**: Bold weight (700), darker color (`#333`).
- **Body**: Normal weight (400), medium grey for secondary text (`#777`).

### **Components**
- **Buttons**: Use Material buttons (`mat-raised-button`, `mat-icon-button`) or Bootstrap styled buttons with custom gradients.
- **Cards/Containers**: Use `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2)` for a "floating" look. Border radius should be `15px` for containers and `8px` for smaller elements like inputs.
- **Forms**: Floating labels for inputs, subtle background (`#f9f9f9`), and clear validation error messages.

---

## 2. Frontend Development Standards (Angular)

### **Naming Conventions**
- **Components**: `kebab-case.component.ts` (e.g., `add-city.component.ts`).
- **Services**: `kebab-case.service.ts` (e.g., `auth.service.ts`).
- **Modules**: `kebab-case.module.ts`.
- **Classes/Interfaces/Models**: `CamelCase` (e.g., `AppStateModel`, `User`).
- **Variables/Functions**: `camelCase`.

### **Folder Structure**
Follow the established feature-based modular structure:
- `src/app/features/`: Contains feature-specific modules (e.g., `admin`, `auth`, `core`).
- `src/app/shared/`: Global reusable components, directives, guards, and the NgRx store.
- `src/app/core/`: Centralized services and models.

### **State Management (NgRx)**
- Use NgRx for global state that needs to be shared across multiple components or persisted during navigation.
- Follow the pattern: **Action -> Effect -> Reducer -> Selector**.
- Keep state immutable using the spread operator or utility libraries.

### **Styling (SCSS)**
- Use SCSS for all component styles.
- Define reusable variables in `src/styles.scss` (or a dedicated `_variables.scss`).
- Use BEM (Block Element Modifier) or a similar structured approach for local styles.
- Prefer Flexbox and CSS Grid for layouts.

---

## 3. Backend Development Standards (Node.js/Express)

### **Architecture**
- Follow the **Router-Controller-Model** pattern.
- Keep controllers thin; delegate complex business logic to service layers if needed.

### **Naming Conventions**
- **Files**: `camelCase.js` or `camelCase.ts` (e.g., `cityController.js`).
- **Routes**: `kebab-case` for URL paths (e.g., `/api/v1/mall-list`).

### **Error Handling**
- Use centralized error-handling middleware.
- Always return consistent JSON error responses: `{ error: "Message", code: 400 }`.

### **Logging**
- Use `Winston` for application logs and `Morgan` for HTTP request logging.

---

## 4. Best Practices & Workflow

- **Component Decomposition**: Break down large components into smaller, reusable ones.
- **Lazy Loading**: Always lazy load feature modules in `app-routing.module.ts`.
- **Environment Variables**: Use `environment.ts` and `environment.prod.ts` for configuration (API keys, URLs).
- **Validation**: Implement both frontend (Reactive Forms) and backend validation (Middleware).
- **Documentation**: Keep the `ARCHITECTURE.md` and `DESIGN-STYLE.md` up to date as the project evolves.
