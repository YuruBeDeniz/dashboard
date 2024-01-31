import { TodoType } from "./AddTodo";
import "./index.css";
import OneTodo from "./OneTodo";

type TodosType = {
  todos: TodoType[];
  deleteTodo: (todoToDelete: TodoType) => void;
}  

export default function Todos({ todos, deleteTodo }: TodosType) {
    
  return (
    <div>
        {todos.map((todo: TodoType, index: number) => (
             <OneTodo key={index} todo={todo} deleteTodo={deleteTodo} />
        )
        )}
    </div>
  )
}
