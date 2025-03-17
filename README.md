# Todo App

A simple, visually appealing to-do list application built with Django, React, and SQLite (configurable for PostgreSQL).

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- Expand tasks to view details
- Clean, modern UI with responsive design
- RESTful API backend

## Tech Stack

### Backend
- Django
- Django REST Framework
- SQLite (configurable for PostgreSQL)

### Frontend
- React
- Axios for API requests
- CSS for styling

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  FRONTEND (React)                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                                                                 │    │
│  │  Components                                                     │    │
│  │  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐        │    │
│  │  │  App.js     │     │  TodoList   │     │  TodoForm   │        │    │
│  │  │ (Main App)  │────▶│(List & CRUD)│────▶│(Add/Edit)   │       │    │
│  │  └─────────────┘     └──────┬──────┘     └─────────────┘        │    │
│  │                             │                                   │    │
│  │                             ▼                                   │    │
│  │                      ┌─────────────┐                            │    │
│  │                      │  TodoItem   │                            │    │
│  │                      │(Single Todo)│                            │    │
│  │                      └──────┬──────┘                            │    │
│  │                             │                                   │    │
│  └─────────────────────────────┼───────────────────────────────────┘    │
│                                │                                        │
│  HTTP Requests (Axios)         │                                        │
│  ┌─────────────────────────────┼───────────────────────────────────┐    │
│  │                             │                                   │    │
│  │  ┌─────────────┐    ┌──────▼──────┐    ┌─────────────┐          │    │
│  │  │ GET /todos/ │    │POST /todos/ │    │DELETE/PATCH │          │    │
│  │  │ (Fetch all) │    │(Create new) │    │(Update/Del) │          │    │
│  │  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘          │    │
│  │         │                  │                  │                 │    │
│  └─────────┼──────────────────┼──────────────────┼─────────────────┘    │
│            │                  │                  │                      │
└────────────┼──────────────────┼──────────────────┼──────────────────────┘
             │                  │                  │
             ▼                  ▼                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  BACKEND (Django)                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │  URLs (API Endpoints)                                           │   │
│  │  ┌─────────────────────────────────────────────────────────┐    │   │
│  │  │ /api/todos/                  /api/todos/{id}/           │    │   │
│  │  └───────────────┬─────────────────────────┬───────────────┘    │   │
│  │                  │                         │                    │   │
│  │                  ▼                         ▼                    │   │
│  │  Views (Controllers)                                            │   │
│  │  ┌─────────────────────────────────────────────────────────┐    │   │
│  │  │                                                         │    │   │
│  │  │  TodoViewSet (ModelViewSet)                             │    │   │
│  │  │  - list(): GET /todos/                                  │    │   │
│  │  │  - create(): POST /todos/                               │    │   │
│  │  │  - retrieve(): GET /todos/{id}/                         │    │   │
│  │  │  - update(): PUT/PATCH /todos/{id}/                     │    │   │
│  │  │  - destroy(): DELETE /todos/{id}/                       │    │   │
│  │  │                                                         │    │   │
│  │  └───────────────────────────┬─────────────────────────────┘    │   │
│  │                              │                                  │   │
│  │                              ▼                                  │   │
│  │  Serializers                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────┐    │   │
│  │  │                                                         │    │   │
│  │  │  TodoSerializer (ModelSerializer)                       │    │   │
│  │  │  - Converts Todo model to/from JSON                     │    │   │
│  │  │  - Fields: id, title, description, completed, created_at│    │   │
│  │  │                                                         │    │   │
│  │  └───────────────────────────┬─────────────────────────────┘    │   │
│  │                              │                                  │   │
│  │                              ▼                                  │   │
│  │  Models                                                         │   │
│  │  ┌─────────────────────────────────────────────────────────┐    │   │
│  │  │                                                         │    │   │
│  │  │  Todo Model                                             │    │   │
│  │  │  - title: CharField                                     │    │   │
│  │  │  - description: TextField                               │    │   │
│  │  │  - completed: BooleanField                              │    │   │
│  │  │  - created_at: DateTimeField                            │    │   │
│  │  │                                                         │    │   │
│  │  └───────────────────────────┬─────────────────────────────┘    │   │
│  │                              │                                  │   │
│  └──────────────────────────────┼──────────────────────────────────┘   │
│                                 │                                      │
│                                 ▼                                      │
│  Database                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │  SQLite (or PostgreSQL)                                         │   │
│  │  - Stores Todo records                                          │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **User Interaction**:
   - User interacts with the React frontend (adding, editing, completing, or deleting todos)
   - The TodoList component manages the overall state and operations
   - TodoForm handles creation of new todos
   - TodoItem displays individual todos and handles updates/deletions

2. **API Communication**:
   - Axios is used to make HTTP requests from React to Django
   - GET requests fetch todos
   - POST requests create new todos
   - PATCH requests update existing todos (e.g., marking as complete)
   - DELETE requests remove todos

3. **Backend Processing**:
   - Django REST Framework routes requests to appropriate views
   - TodoViewSet handles all CRUD operations
   - TodoSerializer converts between JSON and Python objects
   - Todo model defines the data structure and interacts with the database

4. **Database Operations**:
   - SQLite (or PostgreSQL if configured) stores all todo data
   - Django ORM handles database queries and transactions

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   pip install django djangorestframework django-cors-headers psycopg2-binary
   ```

3. Run migrations:
   ```
   python manage.py migrate
   ```

4. Create a superuser (optional):
   ```
   python manage.py createsuperuser
   ```

5. Start the development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## API Endpoints

- `GET /api/todos/` - List all todos
- `POST /api/todos/` - Create a new todo
- `GET /api/todos/{id}/` - Retrieve a specific todo
- `PUT /api/todos/{id}/` - Update a specific todo
- `DELETE /api/todos/{id}/` - Delete a specific todo

## Testing

Run the backend tests:
```
cd backend
python manage.py test
```

## License

MIT 