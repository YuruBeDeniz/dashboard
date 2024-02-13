"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
function OneTodo({ todo, deleteTodo }) {
    return (<div className="one-todo">
        <div>
          {todo.todoName} 
        </div>
        <button className="delete-button" onClick={() => deleteTodo(todo)}>
          X
        </button>
    </div>);
}
exports.default = OneTodo;
