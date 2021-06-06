import React, { useState, useContext } from "react";
import { IUser } from "../types";

const AppContext = React.createContext<any>({ user: undefined });
type Props = { children: React.ReactNode };

const AppProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<IUser | undefined>();

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
