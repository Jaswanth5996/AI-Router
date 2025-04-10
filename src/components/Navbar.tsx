
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm fixed top-0 z-50">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-gradient">
          AIR
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-air-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/chat" className="text-gray-700 hover:text-air-600 transition-colors">
              Chat Now
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-air-600 transition-colors">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
