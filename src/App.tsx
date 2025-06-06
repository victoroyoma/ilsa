import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Speakers } from './pages/Speakers';
import { Tickets } from './pages/Tickets';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
export function App() {
  const [activePage, setActivePage] = useState('home');
  return <Router>
      <div className="relative w-full min-h-screen font-sans text-white overflow-hidden">
        <Background />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar activePage={activePage} setActivePage={setActivePage} />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/speakers" element={<Speakers />} />
              <Route path="/tickets" element={<Tickets />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>;
}