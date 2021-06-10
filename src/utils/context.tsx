import React, { useState, useContext } from "react";
import { IIssue, IProject, IUser } from "../types";

const AppContext = React.createContext<any>({ user: undefined });
type Props = { children: React.ReactNode };

const AppProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<IUser | undefined>();
  const [project, setProject] = useState<IProject | undefined>();
  const [issue, setIssue] = useState<IIssue | undefined>();
  const [errors, setErrors] = useState();

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        project,
        setProject,
        issue,
        setIssue,
        errors,
        setErrors,
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
