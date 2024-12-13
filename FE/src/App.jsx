import { useState } from 'react'
import CountryList from './components/CountryList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryDetail from './components/CountryDetail';

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:code" element={<CountryDetail />} /> {/* Ruta dinámica para el detalle */}
      </Routes>
    </Router>
  )
}

export default App
