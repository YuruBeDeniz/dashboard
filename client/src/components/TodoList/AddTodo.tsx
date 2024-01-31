import { useState, ChangeEvent, FormEvent} from 'react';
import "./index.css";

export type TodoType = {
  todoName: string;
}

type AddTodoProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export default function AddTodo({ todos, setTodos }: AddTodoProps) {
  const [todo, setTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(todo.length > 0) {
      setTodos([...todos, { todoName: todo }]);
      setTodo("");
    }
  }

  return (
    <div className='todo-form-input'>
      <form className='todo-form' onSubmit={handleSubmit}>
        <input type='text' value={todo} onChange={handleChange} placeholder='add todo'/>
        <button className='add-button'>Add</button>
      </form>
    </div>
  )
}
