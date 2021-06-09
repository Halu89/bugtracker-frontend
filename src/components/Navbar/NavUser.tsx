import { NavLink, useHistory } from "react-router-dom";
import { useGlobalContext } from "../../utils/context";

const NavUser = () => {
  const { user, setUser } = useGlobalContext();
  const history = useHistory();

  if (user) {
    return (
      <>
        <div className="user">Logged in as {user?.username}</div>
        <li>
          <button
            onClick={() => {
              history.push("/");
              localStorage.clear();
              setUser(undefined);
            }}
          >
            Logout
          </button>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li>
          <NavLink exact to="/login" className="nav__link">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/register" className="nav__link">
            Register
          </NavLink>
        </li>
      </>
    );
  }
};

export default NavUser;
