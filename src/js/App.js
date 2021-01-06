import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Settings from "./views/Settings";
import Welcome from "./views/Welcome";
import Chat from "./views/Chat";
import { listenToAuthChanges } from "./actions/auth";
import StoreProvider from "./store/StoreProvider";
import LoadingView from "./components/shared/LoadingView";

const ContentWrapper = ({ children }) => (
  <div className="content-wrapper">{children}</div>
);

const ChatApp = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, []);

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <Router>
      <Navbar />
      <ContentWrapper>
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
      </ContentWrapper>
    </Router>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <ChatApp />
    </StoreProvider>
  );
}
