import React, { useState, useContext } from "react";
import { IProject, IUser } from "../types";

const AppContext = React.createContext<any>({ user: undefined });
type Props = { children: React.ReactNode };

const AppProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<IUser | undefined>();
  const [project, setProject] = useState<IProject | undefined>();
  const [errors, setErrors] = useState();

  return (
    <AppContext.Provider value={{ user, setUser, project, setProject }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
