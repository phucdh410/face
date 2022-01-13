import("./styles/global.css");
import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import { FACE_R_APP_SOCKET_DOMAIN, FACE_R_APP_TOKEN } from "./config";
import { getSocket } from "./socket";
import { LoadingContext } from "./context/LoadingContext";
import { setHttpConfig } from "./utils";
import CreateLoadingProvider from "./components/Loading/CreateLoadingProvider";
import CreatePopupProvider from "./components/popup/CreatePopupProvider";
import getStore from "./store";
import Popup from "./components/popup/Popup";
import SuspenseLoading from "./components/SuspenseLoading";
import theme from "./theme";

// Authorize user before redirect to Route
const AuthorizeRoute = lazy(() => import("./components/AuthorizeRoute"));
const LockRoute = lazy(() => import("./components/LockRoute"));
const Page404 = lazy(() => import("./components/Page404"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const Layout = lazy(() => import("./layout/Layout"));

const ChangePassword = lazy(() => import("./pages/auth/ChangePassword"));
const Login = lazy(() => import("./pages/auth/Login"));

const { store, persistor } = getStore();
const socket = getSocket(FACE_R_APP_SOCKET_DOMAIN, store);

const App = () => {
  const initial = useCallback(async () => {
    // Get token from localStorage
    const token = await localStorage.getItem(FACE_R_APP_TOKEN);

    // Set auth token header auth
    setHttpConfig(token, store, window);
  }, []);

  useEffect(() => {
    initial();
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);
  return (
    <CreatePopupProvider>
      <CreateLoadingProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Router>
                <Suspense fallback={<SuspenseLoading />}>
                  <Switch>
                    <LockRoute exact path="/login" component={Login} />

                    <PrivateRoute path="/" component={Layout} socket={socket} />

                    <AuthorizeRoute
                      exact
                      path="/change-password"
                      component={ChangePassword}
                    />

                    <Route component={Page404} />
                  </Switch>
                </Suspense>
              </Router>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </CreateLoadingProvider>
    </CreatePopupProvider>
  );
};

export default App;
