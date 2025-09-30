# Task Manager (Java + React)

A simple full-stack project you can deploy and showcase on your portfolio.

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

## Deploy ideas
- Render.com / Railway for backend
- Netlify / Vercel for frontend (point proxy to deployed backend)
- Add CORS origins in `WebConfig.java` for your deployed domain.
