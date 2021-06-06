import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../utils/context";

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { user, setUser } = useGlobalContext();
  console.log(user);
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
          {user ? (
            <>
              <div className="user">{user?.username}</div>
              <li>
                <button onClick={() => setUser(undefined)}>Logout</button>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
