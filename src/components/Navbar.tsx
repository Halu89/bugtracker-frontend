import React from "react";
import { Link } from "react-router-dom";

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="nav">
      <div className="nav__header">
        Issue<span>tracker</span>
      </div>
      <div className="nav__links">
        <ul>
          <li>
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav__link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="nav__link">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
