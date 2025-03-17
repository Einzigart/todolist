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