"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./index.css");
function AddTodo({ todos, setTodos }) {
    const [todo, setTodo] = (0, react_1.useState)("");
    const handleChange = (e) => {
        setTodo(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo.length > 0) {
            setTodos([...todos, { todoName: todo }]);
            setTodo("");
        }
    };
    return (<div className='todo-form-input'>
      <form className='todo-form' onSubmit={handleSubmit}>
        <input type='text' value={todo} onChange={handleChange} placeholder='add todo'/>
        <button className='add-button'>Add</button>
      </form>
    </div>);
}
exports.default = AddTodo;
