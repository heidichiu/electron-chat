import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Settings from "./views/Settings";
import Welcome from "./views/Welcome";
import Chat from "./views/Chat";
import configureStore from "./store";
import { listenToAuthChanges } from "./actions/auth";

export default function App() {
  useEffect(() => {
    store.dispatch(listenToAuthChanges());
  }, []);

  const store = configureStore();
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content-wrapper">
          <Switch>
            <Route path="/" exact>
              <Welcome />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/chat/:id">
              <Chat />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
