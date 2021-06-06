import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import RegisterForm from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/">
              Home
            </Route>
            <Route exact path="/login">
              <RegisterForm />
            </Route>
            <Route exact path="/register">
              <RegisterForm />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
