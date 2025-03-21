// src/components/CreateTodo.jsx
import React, { useState } from 'react';
import { createTodo } from '../services/api';  // Import createTodo function

function CreateTodo() {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newTodo = { title, completed };

    try {
      const createdTodo = await createTodo(newTodo);
      console.log('Todo created:', createdTodo);
      setTitle('');  
      setCompleted(false);  
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div>
      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          Completed
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
}

export default CreateTodo;
