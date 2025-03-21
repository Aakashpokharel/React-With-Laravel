import React, { useState } from 'react';
import { updateTodo } from '../services/api'; 

function UpdateTodo() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleUpdate = async () => {
    const updatedTodo = { title, completed };

    try {
      const updated = await updateTodo(id, updatedTodo);
      console.log('Todo updated:', updated);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h2>Update Todo</h2>
      <input
        type="number"
        placeholder="Todo ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Todo Title"
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
      <button onClick={handleUpdate}>Update Todo</button>
    </div>
  );
}

export default UpdateTodo;
