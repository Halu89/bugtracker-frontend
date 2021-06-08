import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";
import { useGlobalContext } from "./utils/context";
import jwtDecode from "jwt-decode";
import ProjectList from "./components/ProjectList";
import Project from "./components/Project";
import NewProjectForm from "./components/NewProjectForm";
import Home from "./components/Home";

function App() {
  const { setUser } = useGlobalContext();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("Authenticating from the cookie"); // XXX
      try {
        const { id, username } = jwtDecode<{ id: string; username: string }>(
          localStorage.token
        );
        setUser({ id, username });

        //TODO fetch the user data from the token ?
      } catch (error) {
        setUser(undefined);
      }
    }
  }, [setUser]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Switch>
            <Route path="/projects/new">
              <NewProjectForm />
            </Route>
            <Route path="/projects/:projectId">
              <Project />
            </Route>
            <Route path="/projects">
              <ProjectList />
            </Route>
            <Route path="/login">
              <AuthForm type="signin" />
            </Route>
            <Route path="/register">
              <AuthForm type="signup" />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
