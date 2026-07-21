# Task API

A RESTful CRUD API built with **Node.js** and **Express** for managing an in-memory task list. The project demonstrates the basic CRUD operations (Create, Read, Update, Delete) and includes interactive API documentation using **Swagger UI**.

## Running the Project

### Install dependencies

```bash
npm install
```

### Start the server

```bash
npm start
```

The application will be available at:

- **API:** `http://localhost:3000`
- **Swagger UI:** `http://localhost:3000/docs`

---

# API Routes

## GET /

Returns basic information about the API.

### Sample Response

```json
{
  "name": "Task API",
  "version": "1.0",
  "endpoints": ["/tasks"]
}
```

```bash
curl http://localhost:3000/
```

---

## GET /health

Checks whether the server is running.

### Sample Response

```json
{
  "status": "ok"
}
```

```bash
curl http://localhost:3000/health
```

---

## GET /tasks

Returns every task currently stored in memory.

### Optional Query Parameters

| Parameter | Description |
|-----------|-------------|
| `done=true` | Show completed tasks only |
| `done=false` | Show incomplete tasks only |
| `search=text` | Find tasks containing the given text |

Examples:

```text
/tasks?done=true
/tasks?search=milk
/tasks?done=false&search=book
```

```bash
curl http://localhost:3000/tasks
```

---

## GET /tasks/:id

Returns a single task matching the supplied ID.

### Success

```json
{
  "id": 1,
  "title": "Buy groceries",
  "done": false
}
```

### Not Found

```json
{
  "error": "Task 99 not found"
}
```

```bash
curl http://localhost:3000/tasks/1
```

---

## POST /tasks

Creates a new task.

### Request Body

```json
{
  "title": "Buy milk"
}
```

### Success (201)

```json
{
  "id": 4,
  "title": "Buy milk",
  "done": false
}
```

### Invalid Request (400)

```json
{
  "error": "title is required and cannot be empty"
}
```

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Buy milk"}'
```

---

## PUT /tasks/:id

Updates an existing task.

You may update the `title`, the `done` status, or both.

### Example Request

```json
{
  "done": true
}
```

### Success

```json
{
  "id": 1,
  "title": "Buy groceries",
  "done": true
}
```

```bash
curl -X PUT http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{"done":true}'
```

---

## DELETE /tasks/:id

Removes a task from the list.

### Success

Returns **204 No Content**.

### Not Found

```json
{
  "error": "Task 99 not found"
}
```

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

## GET /stats

Returns statistics about the current task list.

### Sample Response

```json
{
  "total": 7,
  "done": 3,
  "open": 4
}
```

```bash
curl http://localhost:3000/stats
```

---

## POST /reset

Restores the original sample tasks.

```bash
curl -X POST http://localhost:3000/reset
```

---

# Example cURL Output

```bash
curl -i http://localhost:3000/tasks
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "title": "Buy groceries",
    "done": false
  }
]
```

---



## Swagger UI


![alt text](image.png)

