import { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";
import { useGlobalContext } from "./utils/context";
import jwtDecode from "jwt-decode";
import ProjectList from "./components/Projects/ProjectList";
import IssuesList from "./components/Issues/IssuesList";
import NewProjectForm from "./components/Projects/NewProjectForm";
import Home from "./components/Home";
import EditProjectForm from "./components/Projects/EditProjectForm";
import NewIssueForm from "./components/Issues/NewIssueForm";
import EditIssueForm from "./components/Issues/EditIssueForm";
import Docs from "./components/Docs";

import WithAuth from "./hoc/WithAuth";

function App() {
  const { setUser, cursor } = useGlobalContext();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("Authenticating from the localStorage"); // XXX
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
        <main style={{ cursor: cursor }}>
          <Switch>
            <Route path="/projects/new">
              <WithAuth component={<NewProjectForm />} />
            </Route>
            <Route path="/projects/:projectId/edit">
              <WithAuth component={<EditProjectForm />} />
            </Route>
            <Route path="/projects/:projectId/new">
              <WithAuth component={<NewIssueForm />} />
            </Route>
            <Route path="/projects/:projectId/:issueId/edit">
              <WithAuth component={<EditIssueForm />} />
            </Route>
            <Route path="/projects/:projectId">
              <WithAuth component={<IssuesList />} />
            </Route>
            <Route path="/projects">
              <WithAuth component={<ProjectList />} />
            </Route>
            <Route path="/login">
              <div className="register">
                <h2>You need to be signed in to view this page</h2>
                <AuthForm type="signin" />
              </div>
            </Route>
            <Route path="/docs">
              <Docs />
            </Route>
            <Route path="/register">
              <div className="register">
                <AuthForm type="signup" />
                <section className="illustration">
                  <div className="registration">
                    <h2>Simple and easy</h2>
                    <h2>No email validation</h2>
                    <h2>Get started in 20 seconds</h2>
                  </div>
                </section>
              </div>
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
