"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./index.css");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
function LoginPopup({ onSignupClick }) {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };
        axios_1.default.post("/api/auth/login", requestBody)
            .then(response => {
            console.log(response.data);
            navigate("/");
        })
            .catch(err => setErrorMessage(err.response.data.message));
    };
    return (<div className='login-popup'>
        <form onSubmit={handleSubmit}>
            <div className='login-info'>
              <label>Email</label>
              <input type='email' value={email} onChange={handleEmail}/>
              <label>Password</label>
              <input type='password' value={password} onChange={handlePassword}/>
              <button className='login-button'>Login</button>
            </div>
        </form>
        <div>
          <p>Don't you have an account? <span className='signup-span' onClick={onSignupClick}>Signup</span></p> 
        </div>
        {errorMessage && <h5>{errorMessage}</h5>}
    </div>);
}
exports.default = LoginPopup;
