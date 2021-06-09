import React from "react";
import NavLinks from "./NavLinks";

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="nav">
      <div className="nav__header">
        Issue<span>Tracker</span>
      </div>
      <NavLinks />
    </nav>
  );
};

export default Navbar;
