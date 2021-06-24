import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
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

function App() {
  const { cursor, user } = useGlobalContext();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ cursor: cursor }}>
          {user && (
            // Protected Routes
            <>
              <Route exact path="/projects/new">
                <NewProjectForm />
              </Route>
              <Route exact path="/projects/:projectId/edit">
                <EditProjectForm />
              </Route>
              <Route exact path="/projects/:projectId/new">
                <NewIssueForm />
              </Route>
              <Route exact path="/projects/:projectId/:issueId/edit">
                <EditIssueForm />
              </Route>
              <Route exact path="/projects/:projectId">
                <IssuesList />
              </Route>
              <Route exact path="/projects">
                <ProjectList />
              </Route>
            </>
          )}
          <Route exact path="/login">
            <div className="register">
              <h2>You need to be signed in to view this page</h2>
              <AuthForm type="signin" />
            </div>
          </Route>
          <Route exact path="/docs">
            <Docs />
          </Route>
          <Route exact path="/register">
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
          <Route exact path="/">
            <Home />
          </Route>

          {/* Default route not found */}
          <Redirect to="/" />
        </main>
      </div>
    </Router>
  );
}

export default App;
