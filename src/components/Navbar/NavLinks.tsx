import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../utils/context";
import NavUser from "./NavUser";

const NavLinks = () => {
  const { user } = useGlobalContext();
  return (
    <>
      <ul className="nav__links">
        <li>
          <NavLink activeClassName="active" exact to="/" className="nav__link">
            Home
          </NavLink>
        </li>
        {user && (
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
        )}
      </ul>
      <ul className="nav__user">
        <NavUser user={user} />
      </ul>
    </>
  );
};

export default NavLinks;
