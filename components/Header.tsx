
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Briefcase, X, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkStyles = "text-medium-text hover:text-light-text transition-colors duration-300 font-medium";
  const activeLinkStyles = { color: 'white', fontWeight: '600' };

  return (
    <header className="bg-dark-bg/70 backdrop-blur-lg shadow-lg shadow-black/20 sticky top-0 z-50 border-b border-slate-100/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <Briefcase className="h-8 w-8 text-secondary" />
            <span className="text-2xl font-bold font-display text-light-text">Reliable Staffing</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={linkStyles}
                style={({ isActive }) => (isActive ? activeLinkStyles : undefined)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/jobs"
              className="group inline-block bg-accent hover:bg-accent-dark text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu" className="text-light-text">
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-slate-800/95 backdrop-blur-xl transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col items-center space-y-6 py-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className="text-lg text-medium-text hover:text-light-text"
                style={({ isActive }) => (isActive ? activeLinkStyles : undefined)}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
             <Link
              to="/jobs"
              onClick={() => setIsMenuOpen(false)}
              className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-lg shadow-md mt-4 text-lg"
            >
              Get Started
            </Link>
          </nav>
      </div>
    </header>
  );
};

export default Header;
