import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold">Project<span className="text-purple-300">Pulse</span></h2>
          <p className="text-purple-200 mt-3 text-sm leading-relaxed">
            A smart project management system that helps teams collaborate,
            track progress, and deliver efficiently with clarity and control.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-purple-200">
            <li><Link className="hover:text-white" to="/">Home</Link></li>
            <li><Link className="hover:text-white" to="/features">Features</Link></li>
            <li><Link className="hover:text-white" to="/dashboard">Dashboard</Link></li>
            <li><Link className="hover:text-white" to="/signup">Sign Up</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-purple-200 text-sm">
            <li>Email: support@projectpulse.app</li>
            <li>Phone: +250 796370747</li>
            <li>Location: Kigali, Rwanda</li>
          </ul>
        </div>
      </div>

      <div className="w-full bg-purple-800 py-4">
        <p className="text-center text-purple-200 text-sm">
          © {new Date().getFullYear()} ProjectPulse. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
