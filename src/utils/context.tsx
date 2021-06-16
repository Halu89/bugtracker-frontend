import React, { useState, useContext } from "react";
import { IIssue, IProject, IUser } from "../types";

const AppContext = React.createContext<any>({ user: undefined });
type Props = { children: React.ReactNode };

const AppProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<IUser | undefined>();
  const [currentProject, setCurrentProject] = useState<IProject | undefined>();
  const [issue, setIssue] = useState<IIssue | undefined>();
  const [errors, setErrors] = useState();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [cursor, setCursor] = useState("auto");

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
