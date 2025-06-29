import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InternDetails from './pages/InternDetails';
import PostIntern from './pages/PostIntern';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interns/:id" element={<InternDetails />} />
        <Route path="/post-intern" element={<PostIntern />} />
      </Routes>
    </div>
  );
}

export default App;