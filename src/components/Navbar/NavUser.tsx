import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { IUser } from "../../types";
import { useGlobalContext } from "../../utils/context";
import AuthForm from "../AuthForm";

const NavUser = ({ user }: { user: IUser }) => {
  const { setUser } = useGlobalContext();
  const [displayLogin, setDisplayLogin] = useState(false);

  const history = useHistory();

  //Listen for page changes to remove the login form
  useEffect(() => {
    const unlisten = history.listen((_, action) => {
      if (action === "PUSH") {
        setDisplayLogin(false);
      }
    });
    return unlisten;
  }, [history]);

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
          <button onClick={() => setDisplayLogin(!displayLogin)}>Login</button>
        </li>
        <li>
          <NavLink exact to="/register" className="nav__link">
            Register
          </NavLink>
        </li>

        <div className={displayLogin ? "login-form" : "login-form hide"}>
          <AuthForm type="signin" />
        </div>
      </>
    );
  }
};

export default NavUser;
