"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddTodo_1 = __importDefault(require("./AddTodo"));
const Todos_1 = __importDefault(require("./Todos"));
require("./index.css");
const useLocalStorage_1 = require("../../hooks/useLocalStorage");
function TodoCard() {
    const [todos, setTodos] = (0, useLocalStorage_1.useLocalStorage)("todo-list", []);
    const deleteTodo = (todoToDelete) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo !== todoToDelete));
    };
    return (<div className='todo-card'>
      <AddTodo_1.default setTodos={setTodos} todos={todos}/>
      <Todos_1.default todos={todos} deleteTodo={deleteTodo}/>
    </div>);
}
exports.default = TodoCard;
