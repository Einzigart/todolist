import React, { useState } from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    toggleComplete(todo.id, todo.completed);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-header">
        <div className="todo-title-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="todo-checkbox"
          />
          <h3 
            className={`todo-title ${todo.completed ? 'completed-text' : ''}`}
            onClick={toggleExpand}
          >
            {todo.title}
          </h3>
        </div>
        <div className="todo-actions">
          <button 
            onClick={toggleExpand} 
            className="expand-btn"
          >
            {isExpanded ? '▲' : '▼'}
          </button>
          <button 
            onClick={handleDelete} 
            className="delete-btn"
          >
            ✖
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="todo-details">
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          <p className="todo-date">Created: {formatDate(todo.created_at)}</p>
        </div>
      )}
    </div>
  );
};

export default TodoItem; 