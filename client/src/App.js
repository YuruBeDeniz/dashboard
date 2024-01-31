import './App.css';
import { useState } from 'react';
import BerlinWeatherCard from './components/Weather/BerlinWeatherCard';
import BerlinMap from './components/Map/BerlinMap';
import WikiArticle from './components/WikiArticle/WikiArticle';
import RandomCountry from './components/RandomCountry/RandomCountry';
import Sidebar from './components/Sidebar/Sidebar';
import TodoCard from './components/TodoList/TodoCard';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleHomeClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <div className="sticky-sidebar"><Sidebar onHomeClick={handleHomeClick} isSidebarOpen={isSidebarOpen} /></div>
      <div className={`container ${isSidebarOpen ? 'content-shifted' : ''}`}> 
        <div className="item-weather"><BerlinWeatherCard /></div>
        <div className="item-map"><BerlinMap /></div>
        <div className="item-country"><RandomCountry /></div>
        <div className="item-wiki"><WikiArticle /></div>
        <div className="item-wiki"><TodoCard /></div>
      </div>
    </div>
  );
}

export default App;
