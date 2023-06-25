import './styles.css';

interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  todo,
  setTodo,
  handleAdd,
}) => {
  return (
    <form className='input' onSubmit={handleAdd}>
      <input
        className='input__box'
        type='text'
        placeholder='Enter a task'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className='input__submit' type='submit'>
        Go
      </button>
    </form>
  );
};

export default InputField;
