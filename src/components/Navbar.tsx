import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContext } from "../utils/context";

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { user, setUser } = useGlobalContext();
  const history = useHistory();
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
                <button
                  onClick={() => {
                    history.push("/");
                    localStorage.clear()
                    setUser(undefined);
                  }}
                >
                  Logout
                </button>
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
