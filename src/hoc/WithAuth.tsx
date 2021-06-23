import { ReactElement, useEffect } from "react";
import { useHistory } from "react-router";
import { useGlobalContext } from "../utils/context";

const useAuth = () => {
  const history = useHistory();
  const { user } = useGlobalContext();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  return user || null;
};

const WithAuth = ({ component }: { component: ReactElement }) => {
  return useAuth() && component;
};

export default WithAuth;
