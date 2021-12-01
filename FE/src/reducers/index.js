import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

import { FACE_R_APP_PREFIX } from "../config";

import authReducer from "./auth.reducer";
import cameraReducer from "./camera.reducer";
import errorsReducer from "./error.reducer";
import employeeReducer from "./employee.reducer";
import faceReducer from "./face.reducer";
import profileReducer from "./profile.reducer";
import attendanceReducer from "./attendance.reducer";
import roleReducer from "./role.reducer";
import rootReducer from "./root.reducer";
import storeReducer from "./store.reducer";
import deptReducer from "./dept.reducer";
import userReducer from "./user.reducer";

const getPersistReducer = (key, reducer, blacklist = [], whitelist = []) => {
  const persistConfig = {
    key: key,
    storage: storage,
    stateReconciler: autoMergeLevel1,
    blacklist: blacklist.length > 0 ? blacklist : null,
    whitelist: whitelist.length > 0 ? whitelist : null
  };

  return persistReducer(persistConfig, reducer);
};

export default combineReducers({
  auth: getPersistReducer(`${FACE_R_APP_PREFIX}_auth`, authReducer, [
    "success"
  ]),

  camera: getPersistReducer(`${FACE_R_APP_PREFIX}_camera`, cameraReducer, [
    "camera",
    "success"
  ]),

  errors: errorsReducer,

  employee: getPersistReducer(
    `${FACE_R_APP_PREFIX}_employee`,
    employeeReducer,
    ["employee", "success"]
  ),

  face: faceReducer,

  profile: getPersistReducer(`${FACE_R_APP_PREFIX}_profile`, profileReducer),

  attendance: getPersistReducer(
    `${FACE_R_APP_PREFIX}_attendance`,
    attendanceReducer,
    ["attendance", "success"]
  ),

  root: getPersistReducer(`${FACE_R_APP_PREFIX}_root`, rootReducer),

  role: getPersistReducer(`${FACE_R_APP_PREFIX}_role`, roleReducer, [
    "role",
    "success"
  ]),

  store: getPersistReducer(`${FACE_R_APP_PREFIX}_store`, storeReducer, [
    "store",
    "success"
  ]),

  dept: getPersistReducer(`${FACE_R_APP_PREFIX}_dept`, deptReducer, [
    "dept",
    "success"
  ]),

  user: getPersistReducer(`${FACE_R_APP_PREFIX}_user`, userReducer, [
    "user",
    "success"
  ])
});
