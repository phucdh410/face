import React, {
  Suspense, lazy, useCallback, useEffect,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";

import SuspenseLoading from "./components/SuspenseLoading";

import { getSocket } from "./socket";
import { setHttpConfig } from "./utils";
import getStore from "./store";

import {
  FACE_R_APP_SOCKET_DOMAIN,
  FACE_R_APP_TOKEN,
} from "./config";

import theme from "./theme";

import("./styles/global.css");

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
  const initial = useCallback(
    async () => {
      // Get token from localStorage
      const token = await localStorage.getItem(FACE_R_APP_TOKEN);

      // Set auth token header auth
      setHttpConfig(token, store, window);
    },
    [],
  );

  useEffect(() => {
    initial();
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
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
  );
};

export default App;
