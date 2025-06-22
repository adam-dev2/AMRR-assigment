import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddItem from './pages/AddItem.jsx';
import ViewItems from './pages/ViewItems.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0D1117] text-gray-200 p-4">
        <nav className="flex gap-6 mb-6 border-b border-[#30363d] pb-3">
          <Link
            to="/"
            className="text-[#58a6ff] hover:underline hover:text-blue-400 transition"
          >
            View Items
          </Link>
          <Link
            to="/add"
            className="text-[#58a6ff] hover:underline hover:text-blue-400 transition"
          >
            Add Item
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<ViewItems />} />
          <Route path="/add" element={<AddItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
