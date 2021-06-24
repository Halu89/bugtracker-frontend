import { useEffect } from "react";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
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

const withAuth = (Component: React.ElementType) => {
  return (props: any) => {
    const { user } = useGlobalContext();
    return user ? <Component {...props} /> : <Redirect to="/login" />;
  };
};

export default withAuth;
