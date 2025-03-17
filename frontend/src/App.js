import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <main>
        <TodoList />
      </main>
      <footer>
        <p>Built with React, Django, and PostgreSQL</p>
      </footer>
    </div>
  );
}

export default App;
