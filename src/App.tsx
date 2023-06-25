import React, { useState } from 'react';

import { Todo } from './model';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

import './App.css';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      const timestamp = new Date().toLocaleString('en-GB', {
        timeZone: 'Europe/Berlin',
        timeStyle: 'long',
      });
      setTodos([
        ...todos,
        { id: Date.now(), createdAt: timestamp, text: todo, isDone: false },
      ]);
      setTodo('');
    }
  };

  console.log(todos);

  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
