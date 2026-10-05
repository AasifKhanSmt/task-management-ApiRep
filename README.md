 # Task Management API

A RESTful Task Management API built with Node.js, Express, and PostgreSQL.

This project provides task management with user authentication, JWT authorization, search, filtering, pagination, and production deployment.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt
- REST API
- Render
- Git & GitHub

## Features

- User registration
- Secure password hashing with bcrypt
- User login
- JWT-based authentication
- Protected API routes
- User-specific task management
- Create, read, update, and delete tasks
- Search tasks
- Filter tasks by status
- Pagination
- Request validation
- Centralized error handling
- PostgreSQL database integration
- Production deployment on Render

## Project Architecture

The project follows a layered architecture to keep the code clean, maintainable, and easy to scale.

```text
Client / Postman
       ↓
Express Server
       ↓
Middleware
 ├── JWT Authentication
 ├── Request Validation
 └── Error Handling
       ↓
Controller
       ↓
Service
       ↓
Repository
       ↓
PostgreSQL


### 📁 Add the project structure too

Right after that, add:

```md id="q9x4mf"
## Project Structure

```text
task-management-api/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── taskValidation.js
├── repositories/
│   ├── taskRepository.js
│   └── userRepository.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── services/
│   ├── authService.js
│   └── taskService.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
