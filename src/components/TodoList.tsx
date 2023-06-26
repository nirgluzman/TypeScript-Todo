import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className='todos-container'>
      <Droppable droppableId='ActiveTodos'>
        {(provided, snapshot) => (
          <div
            className={`todo-list active ${
              snapshot.isDraggingOver ? 'dragactive' : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className='todos__heading'>Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                key={todo.id}
                index={index}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='CompletedTodos'>
        {(provided, snapshot) => (
          <div
            className={`todo-list completed ${
              snapshot.isDraggingOver ? 'dragcompleted' : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className='todos__heading'>Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                key={todo.id}
                index={index}
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
