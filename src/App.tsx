import React, { useState } from 'react';

import InputField from './components/InputField';

import './App.css';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');

  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} />
    </div>
  );
};

export default App;
