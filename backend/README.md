# Task Manager API (Spring Boot)

## Endpoints
- `GET /api/tasks?status=OPEN|IN_PROGRESS|DONE` – list tasks (optional filter)
- `GET /api/tasks/{id}` – get one
- `POST /api/tasks` – create `{ "title": "...", "description": "...", "status": "OPEN" }`
- `PUT /api/tasks/{id}` – update
- `PATCH /api/tasks/{id}/complete` – mark done
- `DELETE /api/tasks/{id}` – delete

## Run
```bash
mvn spring-boot:run
```
Swagger UI: `http://localhost:8080/swagger-ui/index.html`
H2 console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:taskdb`)
