import { NavLink } from "react-router-dom";
import NavUser from "./NavUser";

const NavLinks = () => {
  return (
    <div className="nav__links">
      <ul>
        <li>
          <NavLink
            activeStyle={{ color: "grey" }}
            exact
            to="/"
            className="nav__link"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ color: "grey" }}
            exact
            to="/projects"
            className="nav__link"
          >
            Projects
          </NavLink>
        </li>
        <NavUser />
      </ul>
    </div>
  );
};

export default NavLinks;
