"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./index.css");
const axios_1 = __importDefault(require("axios"));
function SignupPopup({ onLoginClick }) {
    const [name, setName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)("");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    const handleName = (e) => setName(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { name, email, password };
        axios_1.default.post("/api/auth/signup", requestBody)
            .then(response => {
            onLoginClick();
        })
            .catch(err => setErrorMessage(err.response.data.message));
    };
    return (<div className='signup-popup'>
        <form onSubmit={handleSubmit}>
            <div className='signup-info'>
              <label>Name</label>
              <input type='text' value={name} onChange={handleName}/>
              <label>Email</label>
              <input type='email' value={email} onChange={handleEmail}/>
              <label>Password</label>
              <input type='password' value={password} onChange={handlePassword}/>
              <label>Confirm Password</label>
              <input type='password' value={confirmPassword} onChange={handleConfirmPassword}/>
              {password === confirmPassword
            ? <button className='signup-button'>Signup</button>
            : <h3>Passwords don't match</h3>}
              
            </div>
        </form>
        {errorMessage && <h3 style={{ textAlign: "center" }}>{errorMessage}!!</h3>}
        <span className='signupPopup-login-span' onClick={onLoginClick}>Go to login!</span>
    </div>);
}
exports.default = SignupPopup;
