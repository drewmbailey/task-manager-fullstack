# Task Manager (Java + React)

A simple full stack task manager using a Java backend and a React frontend.

## Stack
- **Backend**: Java 17, Spring Boot 3, JPA/H2, Validation, springdoc-openapi (Swagger UI)
- **Frontend**: React 18 + Vite + TypeScript

## Quickstart
### Backend
```bash
cd backend
mvn spring-boot:run
```
API: `http://localhost:8080/api/tasks`  
Swagger: `http://localhost:8080/swagger-ui/index.html`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App: `http://localhost:5173`

### Production
Test production setup locally: 
```bash
cd backend
mvn -Dspring-boot.run.profiles=prod spring-boot:run
```

## Hosting
