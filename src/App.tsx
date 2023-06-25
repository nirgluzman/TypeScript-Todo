import React, { useState } from 'react';

import { Todo } from './components/model';
import InputField from './components/InputField';

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
      setTodos([...todos, { id: timestamp, todo, isDone: false }]);
      setTodo('');
    }
  };

  console.log(todos);

  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
    </div>
  );
};

export default App;
