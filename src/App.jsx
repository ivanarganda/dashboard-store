import React from "react"
import colors from "./helpers/colors.json"
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className={`bg-[#${colors.body}] min-h-screen w-full`}>
      <Router>
        <Sidebar colors={colors}/> 
      </Router>
    </div>
  )
}

export default App
