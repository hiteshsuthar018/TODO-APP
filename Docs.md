# Application Architecture

This document describes the high-level architecture of the Todo Board application.

The project follows a clear separation of concerns between frontend, backend, and shared responsibilities.

---

## High-Level Overview

The application is divided into two main parts:

- `client` – Frontend application
- `server` – Backend API and database layer

Each part is developed and run independently.

---

## Frontend Architecture

### Technology Stack
- React + TypeScript
- Vite
- Zustand for state management
- React Router
- Tailwind CSS

### Folder Responsibilities

- `components/`  
  Reusable UI components such as boards, todos, layout, and common UI elements.

- `pages/`  
  Route-level components like Dashboard and Board page.

- `store/`  
  Zustand stores that manage global application state:
  - `authStore` – authentication and user session
  - `boardStore` – board CRUD and state
  - `todoStore` – todo CRUD and state
  - `themeStore` – dark/light mode state

- `api/`  
  Functions responsible for communicating with backend APIs.  
  UI components never call `axios` directly.

### State Management Philosophy

Shared and asynchronous state (auth, boards, todos, theme) is managed using Zustand.

This avoids:
- prop drilling
- duplicated state
- complex context providers

UI components remain stateless and focus only on rendering and user interactions.

---

## Backend Architecture

### Technology Stack
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication

### Folder Responsibilities

- `routes/`  
  Defines API routes and request mapping.

- `controllers/`  
  Handles request validation and HTTP response logic.

- `services/`  
  Contains business logic and database operations.

- `middlewares/`  
  Authentication and request-related middleware.

- `prisma/`  
  Database schema and migrations.

### Request Flow

Client Request  
→ Express Route  
→ Controller  
→ Service  
→ Prisma  
→ Database  
→ Response

---

## Authentication Flow

- Users authenticate using JWT.
- JWT is issued by the backend and stored on the client.
- Auth state is restored on page refresh.
- Protected routes are handled on the client side.

---

## Design Principles

- Clear separation of concerns
- Single source of truth for shared state
- No direct database or API access from UI
- Scalable and maintainable structure

---

## Summary

This architecture is designed to be:
- simple to understand
- easy to extend
- suitable for real-world applications

The structure allows frontend and backend to evolve independently while maintaining a clean integration layer.
