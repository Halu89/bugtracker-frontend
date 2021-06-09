import { NavLink } from "react-router-dom";
import NavUser from "./NavUser";

const NavLinks = () => {
  return (
    <>
      <ul className="nav__links">
        <li>
          <NavLink activeClassName="active" exact to="/" className="nav__link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            exact
            to="/projects"
            className="nav__link"
          >
            Projects
          </NavLink>
        </li>
      </ul>
      <ul className="nav__user">
        <NavUser />
      </ul>
    </>
  );
};

export default NavLinks;
