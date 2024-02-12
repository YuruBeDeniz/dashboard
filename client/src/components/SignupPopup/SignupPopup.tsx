import { ChangeEvent, SyntheticEvent, useState } from 'react';
import './index.css';
import axios from 'axios';

type SignupPopupProps = {
    onLoginClick: () => void;
} 

export default function SignupPopup({ onLoginClick }: SignupPopupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = { name, email, password }
    axios.post("/api/auth/signup", requestBody)
      .then(response => {
        console.log("response from backend", response)
        onLoginClick();
      })
      .catch(err => console.log(err))
  }
  
 
  return (
    <div className='signup-popup'>
        <form onSubmit={handleSubmit}>
            <div className='signup-info'>
              <label>Name</label>
              <input type='text' value={name} onChange={handleName}/>
              <label>Email</label>
              <input type='email' value={email} onChange={handleEmail}/>
              <label>Password</label>
              <input type='password' value={password} onChange={handlePassword}/>
              <button className='signup-button'>Signup</button>
            </div>
        </form>
        <span className='signupPopup-login-span' onClick={onLoginClick}>Go to login!</span>
    </div>
  )
}
