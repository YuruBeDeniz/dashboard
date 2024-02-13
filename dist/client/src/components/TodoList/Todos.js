"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
const OneTodo_1 = __importDefault(require("./OneTodo"));
function Todos({ todos, deleteTodo }) {
    return (<div>
        {todos.map((todo, index) => (<OneTodo_1.default key={index} todo={todo} deleteTodo={deleteTodo}/>))}
    </div>);
}
exports.default = Todos;
