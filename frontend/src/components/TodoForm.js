import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addTodo({
      title,
      description,
      completed: false
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  return (
    <div className="todo-form-container">
      {!showForm ? (
        <button 
          className="add-todo-btn"
          onClick={() => setShowForm(true)}
        >
          + Add New Todo
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              required
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Todo
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TodoForm; 