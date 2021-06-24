import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useGlobalContext } from "../utils/context";

const useAuth = () => {
  const { user } = useGlobalContext();
  return user || null;
};

const withAuth = (Component: React.ElementType) => {
  return (props: any) => {
    const { user } = useGlobalContext();
    const location = useLocation();
    
    return user ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: "/login", state: { from: location } }} />
    );
  };
};

export function PrivateRoute({
  component,
  ...rest
}: {
  component: JSX.Element;
}) {
  let user = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          component
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default withAuth;
