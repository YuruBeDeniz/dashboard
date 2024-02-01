import './index.css';
import { useState } from 'react';
import { HiHome } from "react-icons/hi";
import { HiOutlineClipboard } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import LoginPopup from '../LoginPopup/LoginPopup';
import SignupPopup from '../SignupPopup/SignupPopup';

export default function Sidebar({ onHomeClick, isSidebarOpen }) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

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
  

  const handleHomeIconClick = () => onHomeClick(!isSidebarOpen);
  

  return (
    <div className={`sticky-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="home-icon-wrapper">
        <HiHome className="home-icon" onClick={handleHomeIconClick} />
        {isSidebarOpen && <p>Home</p>}
        </div>
        {isSidebarOpen && 
          <>  
            <div className="user-icon-wrapper">
            <HiUserCircle className="user-icon" />
            <p>Jane Doe</p>
            </div>
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
        <div className="popup-overlay" onClick={() => setShowLoginPopup(false)}></div>
        <LoginPopup onSignupClick={handleSignupPopup} />
       </> 
      }
      {showSignupPopup && 
       <>
       <div className="popup-overlay" onClick={() => setShowSignupPopup(false)}></div>
        <SignupPopup onLoginClick={handleLoginPopup} /> 
       </>
      }
    </div>
  );
}
