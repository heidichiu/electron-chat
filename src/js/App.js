import React from "react";
import Home from "./views/Home";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Settings from "./views/Settings";
import Login from "./views/Login";
import Register from "./views/Register";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="content-wrapper">
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
