import { useState, useEffect, useRef } from 'react';

import { GrEdit } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import { Draggable } from 'react-beautiful-dnd';

import { Todo } from '../model';

import './styles.css';

type SingleTodoProps = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<SingleTodoProps> = ({
  index,
  todo,
  todos,
  setTodos,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.text);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editTodoText } : todo
      )
    );
    setEdit(false);
  };

  // Focus on input when edit is true
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onSubmit={(e) => handleEdit(e, todo.id)}>
          {edit ? (
            <input
              className='todos__single--text'
              ref={inputRef}
              value={editTodoText}
              onChange={(e) => setEditTodoText(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className='todos__single--text'>{todo.text}</s>
          ) : (
            <span className='todos__single--text'>{todo.text}</span>
          )}

          <div>
            <span
              className='icon'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(true);
                } else {
                  setEdit(false);
                }
              }}>
              <GrEdit />
            </span>
            <span
              className='icon'
              onClick={() => {
                handleDelete(todo.id);
              }}>
              <AiFillDelete />
            </span>
            <span
              className='icon'
              onClick={() => {
                handleDone(todo.id);
              }}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
