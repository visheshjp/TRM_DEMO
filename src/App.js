import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from './components/About';
import Contact from './components/Contact';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <About />
      <Contact />
    </div>
  );
}

export default App;
