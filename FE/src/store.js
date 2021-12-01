import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { FACE_R_APP_PREFIX } from "./config";

const persistConfig = {
  key: `${FACE_R_APP_PREFIX}_sys`,
  storage,
};

const initialState = {};
const middleware = [thunk];

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__())
      || compose,
  ),
);

const getStore = () => {
  const persistor = persistStore(store);
  return { store, persistor };
};

export default getStore;
