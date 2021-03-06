import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./views/Home";
import Settings from "./views/Settings";
import Welcome from "./views/Welcome";
import Chat from "./views/Chat";
import { listenToAuthChanges } from "./actions/auth";
import StoreProvider from "./store/StoreProvider";
import LoadingView from "./components/shared/LoadingView";
import { listenToConnectionChanges } from "./actions/app";
import ChatCreate from "./views/ChatCreate";
import { checkUserConnection } from "./actions/connection";
import { loadInitialSettings } from "./actions/settings";

const AuthRoute = ({ children, ...rest }) => {
  const user = useSelector(({ auth }) => auth.user);
  const onlyChild = React.Children.only(children);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          React.cloneElement(onlyChild, { ...rest, ...props })
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const ContentWrapper = ({ children }) => {
  const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);
  return (
    <div className={`content-wrapper ${isDarkTheme ? "dark" : "light"}`}>
      {children}
    </div>
  );
};

const ChatApp = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const isOnline = useSelector(({ app }) => app.isOnline);
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    dispatch(loadInitialSettings());
    const unsubFromAuth = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());

    return () => {
      unsubFromAuth();
      unsubFromConnection();
    };
  }, [dispatch, isOnline]);

  useEffect(() => {
    let unsubFromUserConnection;
    if (user?.uid) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid));

      return () => {
        unsubFromUserConnection && unsubFromUserConnection();
      };
    }
  }, [dispatch, user]);

  if (!isOnline) {
    return (
      <LoadingView message="Application has been disconnected from the internet. Please reconnect..." />
    );
  }

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <Router>
      <ContentWrapper>
        <Switch>
          <Route path="/" exact>
            <Welcome />
          </Route>
          <AuthRoute path="/home">
            <Home />
          </AuthRoute>
          <AuthRoute path="/chatCreate">
            <ChatCreate />
          </AuthRoute>
          <AuthRoute path="/chat/:id">
            <Chat />
          </AuthRoute>
          <AuthRoute path="/settings">
            <Settings />
          </AuthRoute>
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
