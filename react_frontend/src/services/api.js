// src/components/services/apiWrapper.js

const API_URL = "http://127.0.0.1:8000/api";

export const apiWrapper = async (endpoint, method = 'GET', body = null) => {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const signal = new AbortController()
        const response = await fetch(`${API_URL}/${endpoint}`, config);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error: ${response.status} - ${errorMessage}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API ${method} Error on ${endpoint}:`, error);
        throw error;
    }
};

// src/components/services/api.js

// Fetch all data
export const fetchData = async (endpoint) => {
    return await apiWrapper(endpoint, 'GET');
};

// Create Todo
export const createTodo = async (todoData) => {
    return await apiWrapper('todos/store', 'POST', todoData);
};

// Update Todo
export const updateTodo = async (id, todoData) => {
    return await apiWrapper(`todos/update/${id}`, 'PUT', todoData);
};

// Delete Todo
export const deleteTodo = async (id) => {
    return await apiWrapper(`todos/delete/${id}`, 'DELETE');
};

