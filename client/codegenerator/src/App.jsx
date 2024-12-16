import { useState } from 'react'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'

import './App.css'
import Navbar from './componenets/Navbar'
import Home from './pages/Home'
import PatternPage from './pages/PatternPage'
import DesignSelect from './pages/DesignSelect'
function App() {

  return (
    <>
    <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={< Home/>} />
          <Route path="/patternpage" element={<PatternPage />} />
          <Route path="/desginselect" element={<DesignSelect />} />
        </Routes>
      </div>
    </>
  )
}

export default App
