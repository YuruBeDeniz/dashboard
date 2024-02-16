import { ChangeEvent, SyntheticEvent, useState, useContext } from 'react';
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';


type LoginPopupProps = {
    onSignupClick: () => void;
    closeLoginPopup: () => void;
}

export default function LoginPopup({ onSignupClick, closeLoginPopup }: LoginPopupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { storeToken, verifyStoredToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = { email, password }
    axios.post("/api/auth/login", requestBody)
      .then(response => {
        const token = response.data.authToken;
        storeToken(token);
        verifyStoredToken();
        closeLoginPopup();
        navigate("/profile");
      })
      .catch(err => setErrorMessage(err.response.data.message));
  }


  return (
    <div className='login-popup'>
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
    </div>
  )
}
