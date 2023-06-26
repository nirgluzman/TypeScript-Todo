import React, { useState } from 'react';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Todo } from './model';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

import './App.css';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add;
    let active = todos;
    let complete = completedTodos;

    if (source.droppableId === 'ActiveTodos') {
      add = active[source.index];
      active.splice(source.index, 1); // remove item at position source.index
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1); // remove item at position source.index
    }

    if (destination.droppableId === 'ActiveTodos') {
      active.splice(destination.index, 0, add); // add item at position destination.index
    } else {
      complete.splice(destination.index, 0, add); // add item at position destination.index
    }

    setTodos(active);
    setCompletedTodos(complete);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
