import './index.css';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { HiHome } from "react-icons/hi";
import { HiOutlineClipboard } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import LoginPopup from '../LoginPopup/LoginPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import { capitalizeWords } from '../../utilities/capitalizeWords';

export default function Sidebar({ onHomeClick, isSidebarOpen }) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
    if (showSignupPopup) { 
      setShowSignupPopup(false);
    }
  };

  const handleSignupPopup = () => {
    setShowSignupPopup(!showSignupPopup);
    setShowLoginPopup(false);
  };
  
  const closeLoginPopup = () => setShowLoginPopup(false);
  const closeSignupPopup = () => setShowSignupPopup(false);


  const handleHomeIconClick = () => {
    onHomeClick(!isSidebarOpen);
    navigate("/");
  };
  

  return (
    <div className={`sticky-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="home-icon-wrapper">
        <HiHome className="home-icon" onClick={handleHomeIconClick} />
        {isSidebarOpen && <p>Home</p>}
        </div>
        {isSidebarOpen && 
          <>  
          {user &&
            <div className="user-icon-wrapper">
              <HiUserCircle className="user-icon" />
              <Link to="/profile" style={{"textDecoration": "none"}}>{capitalizeWords(user.name)}</Link>
            </div>
          }
            <div className="documents-icon-wrapper">
            <HiOutlineClipboard className="documents-icon" />
            <p>Documents</p>
            </div>
            <div className="settings-icon-wrapper">
            <HiOutlineCog className="settings-icon" />
            <p>Settings</p>
            </div>
          </>
        }
      </div>
      <span className='sidebar-login-span' onClick={handleLoginPopup}>Login</span>
      {showLoginPopup && 
       <>
        <div className="popup-overlay" onClick={closeLoginPopup}></div>
        <LoginPopup onSignupClick={handleSignupPopup} closeLoginPopup={closeLoginPopup} />
       </> 
      }
      {showSignupPopup && 
       <>
       <div className="popup-overlay" onClick={closeSignupPopup}></div>
        <SignupPopup onLoginClick={handleLoginPopup} /> 
       </>
      }
    </div>
  );
}
