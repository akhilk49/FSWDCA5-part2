import React, { useState, useRef } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Input from "./components/Input.jsx"
import Counter from "./components/Counter.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/input" element={<Input />} />
      </Routes>
    </Router>
  ); 
}

export default App