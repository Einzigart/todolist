from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer

class TodoModelTest(TestCase):
    def setUp(self):
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="This is a test todo",
            completed=False
        )
    
    def test_todo_creation(self):
        self.assertEqual(self.todo.title, "Test Todo")
        self.assertEqual(self.todo.description, "This is a test todo")
        self.assertEqual(self.todo.completed, False)
    
    def test_todo_str_method(self):
        self.assertEqual(str(self.todo), "Test Todo")

class TodoAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.todo_data = {
            'title': 'API Test Todo',
            'description': 'This is a test todo created via API',
            'completed': False
        }
        self.todo = Todo.objects.create(
            title="Existing Todo",
            description="This is an existing todo",
            completed=False
        )
    
    def test_get_all_todos(self):
        response = self.client.get(reverse('todo-list'))
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_todo(self):
        response = self.client.post(
            reverse('todo-list'),
            self.todo_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), 2)
        self.assertEqual(Todo.objects.get(title='API Test Todo').description, 'This is a test todo created via API')
    
    def test_get_single_todo(self):
        response = self.client.get(reverse('todo-detail', kwargs={'pk': self.todo.id}))
        serializer = TodoSerializer(self.todo)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_update_todo(self):
        updated_data = {
            'title': 'Updated Todo',
            'description': 'This todo has been updated',
            'completed': True
        }
        response = self.client.put(
            reverse('todo-detail', kwargs={'pk': self.todo.id}),
            updated_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.title, 'Updated Todo')
        self.assertEqual(self.todo.completed, True)
    
    def test_delete_todo(self):
        response = self.client.delete(reverse('todo-detail', kwargs={'pk': self.todo.id}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)
