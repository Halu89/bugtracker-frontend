import jwtDecode from "jwt-decode";
import React, { useState, useContext } from "react";
import { IIssue, IProject, IUser } from "../types";

const AppContext = React.createContext<any>({ user: undefined });
type Props = { children: React.ReactNode };

// Needs to be before the component render to fix auth on page refresh
let userSession: IUser | undefined;
if (localStorage.getItem("token")) {
  try {
    const { id, username } = jwtDecode<{ id: string; username: string }>(
      localStorage.token
    );
    userSession = { id, username, _id: id };
  } catch (e) {
    //If the token has been tampered with
    userSession = undefined;
  }
}

const AppProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<IUser | undefined>(userSession);
  const [currentProject, setCurrentProject] = useState<IProject | undefined>();
  const [issue, setIssue] = useState<IIssue | undefined>();
  const [errors, setErrors] = useState();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [cursor, setCursor] = useState("auto");

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     console.log("Authenticating from the localStorage"); // XXX
  //     try {
  //       const { id, username } = jwtDecode<{ id: string; username: string }>(
  //         localStorage.token
  //       );
  //       setUser({ id, username, _id: id });

  //       //TODO fetch the user data from the token ?
  //     } catch (error) {
  //       setUser(undefined);
  //     }
  //   }
  //   return () => setUser(undefined);
  // }, [setUser]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        currentProject,
        setCurrentProject,
        issue,
        setIssue,
        errors,
        setErrors,
        setProjects,
        projects,
        cursor,
        setCursor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
