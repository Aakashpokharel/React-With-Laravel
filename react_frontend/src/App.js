// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CreateTodoPage from './pages/CreateTodoPage';
import TodoListPage from './pages/TodoListPage';
import UpdateTodoPage from './pages/UpdateTodoPage';
import DeleteTodoPage from './pages/DeleteTodoPage';
import NewView from './components/NewView';

function App() {
  return (
    <div>
      <h1>React Todo App with Laravel API</h1>
      {/* <Routes>
        <Route path="/create" element={<CreateTodoPage />} />
        <Route path="/" element={<TodoListPage />} />
        <Route path="/update" element={<UpdateTodoPage />} />
        <Route path="/delete" element={<DeleteTodoPage />} />
      </Routes> */}

      <NewView />
    </div>
  );
}

export default App;
