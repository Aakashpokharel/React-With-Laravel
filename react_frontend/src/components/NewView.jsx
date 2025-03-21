import React, { useEffect, useState } from 'react';
import { fetchData, createTodo, updateTodo, deleteTodo } from '../services/api';


function NewView() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    // Fetch all todos
    useEffect(() => {
        const getTodos = async () => {
            try {
                const todosData = await fetchData('todos');
                setTodos(todosData);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        getTodos();
    }, []);

    // Create Todo
    const handleCreateTodo = async () => {
        if (!newTodo.trim()) return;

        try {
            const createdTodo = await createTodo({ title: newTodo, completed: false });
            setTodos([...todos, createdTodo]);
            setNewTodo(''); // clear input field
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    // Update Todo
    const handleUpdateTodo = async () => {
        if (!currentTodo || !currentTodo.title.trim()) return;

        try {
            const updatedTodo = await updateTodo(currentTodo.id, { title: currentTodo.title, completed: currentTodo.completed });
            setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
            setIsEditing(false);
            setCurrentTodo(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // Delete Todo
    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Handle edit
    const handleEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo({... todo});
    };

    return (
        <div>
            <div>

                {/* Todo input field for creating or editing */}
                <div>
                    <input
                        type="text"
                        value={isEditing ? currentTodo?.title : newTodo}
                        onChange={(e) => isEditing ? setCurrentTodo({ ...currentTodo, title: e.target.value }) : setNewTodo(e.target.value)}
                        placeholder="Enter Todo"
                    />
                    <button onClick={isEditing ? handleUpdateTodo : handleCreateTodo}>
                        {isEditing ? 'Update Todo' : 'Add Todo'}
                    </button>
                </div>

                {/* Todo list */}
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
                            <button onClick={() => handleEdit(todo)}>Edit</button>
                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NewView;
