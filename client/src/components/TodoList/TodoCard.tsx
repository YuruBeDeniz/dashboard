import AddTodo from './AddTodo';
import Todos from './Todos';
import { TodoType } from './AddTodo';
import "./index.css";
import { useLocalStorage } from '../../hooks/useLocalStorage';

function TodoCard() {
  const [todos, setTodos] = useLocalStorage<TodoType[]>("todo-list", []);

  const deleteTodo = (todoToDelete: TodoType) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo !== todoToDelete));
  }

  return (
    <div className='todo-card'>
      <AddTodo setTodos={setTodos} todos={todos} />
      <Todos todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default TodoCard;