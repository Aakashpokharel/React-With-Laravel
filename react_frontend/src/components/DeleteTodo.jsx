import React, { useState } from 'react';
import { deleteTodo } from '../services/api';

function DeleteTodo() {
  const [id, setId] = useState('');

  const handleDelete = async () => {
    try {
      const response = await deleteTodo(id);
      console.log('Todo deleted:', response);
      setId('');  
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h2>Delete Todo</h2>
      <input
        type="number"
        placeholder="Todo ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Todo</button>
    </div>
  );
}

export default DeleteTodo;
