import React, { useEffect, useState } from 'react';
import { fetchData, createTodo, updateTodo, deleteTodo } from '../services/api';

function NewView() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    useEffect(() => {
        const getTodos = async () => {
            try {
                const todosData = await fetchData('todos');
                console.log('Fetched Todos Data:', todosData);

                if (Array.isArray(todosData)) {
                    setTodos(todosData);
                } else if (todosData && Array.isArray(todosData.data)) {
                    setTodos(todosData.data);
                } else {
                    console.error('Invalid Todos data format:', todosData);
                    setTodos([]);
                }

                localStorage.setItem('todos', JSON.stringify(todosData.data || []));
            } catch (error) {
                console.error('Error fetching todos, using localStorage fallback:', error);
                const localData = localStorage.getItem('todos');
                if (localData) {
                    setTodos(JSON.parse(localData));
                }
            }
        };

        getTodos();
    }, []);

    const handleCreateTodo = async () => {
        if (!newTodo.trim()) return;

        try {
            const createdTodo = await createTodo({ title: newTodo, completed: false });
            console.log('Created Todo:', createdTodo);

            setTodos(prevTodos => {
                const updatedTodos = [...prevTodos, createdTodo];
                localStorage.setItem('todos', JSON.stringify(updatedTodos));
                return updatedTodos;
            });

            setNewTodo('');
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const handleUpdateTodo = async () => {
        if (!currentTodo || !currentTodo.title.trim()) return;

        try {
            const updatedTodo = await updateTodo(currentTodo.id, {
                title: currentTodo.title,
                completed: currentTodo.completed
            });

            console.log('Updated Todo:', updatedTodo);

            setTodos(prevTodos => {
                const updatedTodos = prevTodos.map(todo =>
                    todo.id === updatedTodo.id ? updatedTodo : todo
                );
                localStorage.setItem('todos', JSON.stringify(updatedTodos));
                return updatedTodos;
            });

            setIsEditing(false);
            setCurrentTodo(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            console.log('Deleted Todo with ID:', id);

            setTodos(prevTodos => {
                const updatedTodos = prevTodos.filter(todo => todo.id !== id);
                localStorage.setItem('todos', JSON.stringify(updatedTodos));
                return updatedTodos;
            });
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo({ ...todo });
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded-xl">
            <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={isEditing ? currentTodo?.title : newTodo}
                    onChange={(e) =>
                        isEditing
                            ? setCurrentTodo({ ...currentTodo, title: e.target.value })
                            : setNewTodo(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            isEditing ? handleUpdateTodo() : handleCreateTodo();
                        }
                    }}
                    placeholder="Enter Todo"
                />
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={isEditing ? handleUpdateTodo : handleCreateTodo}
                >
                    {isEditing ? 'Update' : 'Add'}
                </button>
                {isEditing && (
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        onClick={() => {
                            setIsEditing(false);
                            setCurrentTodo(null);
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>

            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex justify-between items-center p-3 bg-gray-100 rounded hover:bg-gray-200"
                    >
                        <span>
                            {todo.title} —{' '}
                            <span className={`text-sm ${todo.completed ? 'text-green-600' : 'text-red-500'}`}>
                                {todo.completed ? 'Completed' : 'Pending'}
                            </span>
                        </span>
                        <div className="flex gap-2">
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => handleEdit(todo)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-600 hover:underline"
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NewView;
