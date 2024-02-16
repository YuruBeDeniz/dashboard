import './App.css';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import BerlinWeatherCard from './components/Weather/BerlinWeatherCard';
import BerlinMap from './components/Map/BerlinMap';
import WikiArticle from './components/WikiArticle/WikiArticle';
import RandomCountry from './components/RandomCountry/RandomCountry';
import Sidebar from './components/Sidebar/Sidebar';
import TodoCard from './components/TodoList/TodoCard';
import Profile from './components/Profile/Profile';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleHomeIconClick = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      <Sidebar onHomeClick={handleHomeIconClick} isSidebarOpen={isSidebarOpen} />
      <div className={`container ${isSidebarOpen ? 'content-shifted' : ''}`}> 
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
      </div>
    </div>
  );
};

function Home() {
  return (
    <>
      <div className="item-weather"><BerlinWeatherCard /></div>
      <div className="item-map"><BerlinMap /></div>
      <div className="item-country"><RandomCountry /></div>
      <div className="item-wiki"><WikiArticle /></div>
      <div className="item-todo"><TodoCard /></div>
    </>
  );
}

export default App;
