import React, { useState } from "react";
import { userStore } from "../store/userStore";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = userStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-purple-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link to="/" className="text-2xl font-bold tracking-wide">
          Project<span className="text-purple-200">Pulse</span>
        </Link>

        <ul className="hidden sm:flex items-center space-x-8 text-lg font-medium">
          <li><Link className="hover:text-purple-200" to="/">Home</Link></li>
          <li><Link className="hover:text-purple-200" to="/features">Features</Link></li>
          <li>
            <Link className="hover:text-purple-200" to={user ? "/dashboard" : "/signin"}>
              Dashboard
            </Link>
          </li>
        </ul>

        <div className="sm:hidden cursor-pointer">
          {isMenuOpen ? (
            <X size={28} onClick={() => setIsMenuOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setIsMenuOpen(true)} />
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-purple-700 absolute w-full top-full left-0 px-6 pb-4 shadow-md">
          <ul className="flex flex-col space-y-4 text-lg font-medium">
            <li onClick={() => setIsMenuOpen(false)}>
              <Link className="hover:text-purple-300" to="/">Home</Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link className="hover:text-purple-300" to="/features">Features</Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link className="hover:text-purple-300" to={user ? "/dashboard" : "/signin"}>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
