import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Buy milk', completed: false },
    { id: 2, text: 'Walk the dog', completed: false },
    { id: 3, text: 'Do homework', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: todos.length + 1, text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleToggleCompleted = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        >
          Add Todo
        </button>
      </form>
      <ul className="mt-4">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between p-2 border-b border-gray-300">
            <span
              className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
            >
              {todo.text}
            </span>
            <div className="flex items-center">
              <button
                onClick={() => handleToggleCompleted(todo.id)}
                className={`mr-2 ${todo.completed ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-300 hover:bg-gray-500'} text-white font-bold py-1 px-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500`}
              >
                {todo.completed ? 'Completed' : 'Mark as completed'}
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;