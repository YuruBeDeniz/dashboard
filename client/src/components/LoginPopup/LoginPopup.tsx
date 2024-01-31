import { ChangeEvent, useState } from 'react';
import './index.css';


type LoginPopupProps = {
    onSignupClick: () => void;
}

export default function LoginPopup({ onSignupClick }: LoginPopupProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);


  return (
    <div className='login-popup'>
        <form>
            <div className='login-info'>
              <label>Name</label>
              <input type='text' value={name} onChange={handleName}/>
              <label>Password</label>
              <input type='password' value={password} onChange={handlePassword}/>
              <button>Login</button>
            </div>
            <div>
                <p>Don't you have an account? <button onClick={onSignupClick}>Signup</button></p> 
            </div>
        </form>
    </div>
  )
}
