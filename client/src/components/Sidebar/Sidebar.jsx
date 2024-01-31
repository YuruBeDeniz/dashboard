import './index.css';
import { HiHome } from "react-icons/hi";
import { HiOutlineClipboard } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";

export default function Sidebar({ onHomeClick, isSidebarOpen }) {
  const handleHomeClick = () => {
    onHomeClick(!isSidebarOpen);
  };

  return (
    <div className={`sidebar-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="home-icon-wrapper">
      <HiHome className="home-icon" onClick={handleHomeClick} />
      {isSidebarOpen && <p>Home</p>}
      </div>
      {isSidebarOpen && (
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
      )}
    </div>
  );
}
