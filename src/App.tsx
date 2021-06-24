import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useGlobalContext } from "./utils/context";

//Components
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";

// Unprotected components
import Home from "./components/Home";
import Docs from "./components/Docs";

// Protected components
import ProjectList from "./components/Projects/ProjectList";
import IssuesList from "./components/Issues/IssuesList";
import NewProjectForm from "./components/Projects/NewProjectForm";
import EditProjectForm from "./components/Projects/EditProjectForm";
import NewIssueForm from "./components/Issues/NewIssueForm";
import EditIssueForm from "./components/Issues/EditIssueForm";

import withAuth from "./hoc/WithAuth";


function App() {
  const { cursor } = useGlobalContext();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ cursor: cursor }}>
          <Switch>
            <Route path="/projects/new" component={withAuth(NewProjectForm)} />
            <Route
              path="/projects/:projectId/edit"
              component={withAuth(EditProjectForm)}
            />
            <Route
              path="/projects/:projectId/new"
              component={withAuth(NewIssueForm)}
            />
            <Route
              path="/projects/:projectId/:issueId/edit"
              component={withAuth(EditIssueForm)}
            />
            <Route
              path="/projects/:projectId"
              component={withAuth(IssuesList)}
            />
            <Route path="/projects" component={withAuth(ProjectList)} />

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
            {/* Default route not found */}
            <Route>
              <div style={{ placeSelf: "center" }}>
                Error 404 : We couldn't find that route.
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
