import React, { useState } from "react"
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarMobile from './components/SidebarMobile';

function App() {

  const [ showMenu , setShowMenu ] = useState(false);

  const toogleMenu = ()=>{
      setShowMenu(!showMenu);
  }

  return (
    <div className={`bg-[#262837] min-h-screen w-full`}>
      <Router>
        <Sidebar showMenu={showMenu}/> 
        {/* Mobile menu */}
        <SidebarMobile showMenu={showMenu} functions={['','','',toogleMenu]} />
      </Router>
    </div>
  )
}

export default App
