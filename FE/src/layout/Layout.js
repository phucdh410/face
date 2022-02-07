import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

import SuspenseLoading from "../components/SuspenseLoading";
import Wrapper from "./Wrapper";

const Camera = lazy(() => import("../pages/camera"));
const CreateCamera = lazy(() => import("../pages/camera/CreateCamera"));
const EditCamera = lazy(() => import("../pages/camera/EditCamera"));

const Employee = lazy(() => import("../pages/employee"));
const CreateEmployee = lazy(() => import("../pages/employee/CreateEmployee"));
const EditEmployee = lazy(() => import("../pages/employee/EditEmployee"));

const Home = lazy(() => import("../pages/home"));

const Role = lazy(() => import("../pages/role"));
const CreateRole = lazy(() => import("../pages/role/CreateRole"));
const EditRole = lazy(() => import("../pages/role/EditRole"));

const Store = lazy(() => import("../pages/store"));
const CreateStore = lazy(() => import("../pages/store/CreateStore"));
const EditStore = lazy(() => import("../pages/store/EditStore"));

const Dept = lazy(() => import("../pages/dept"));
const CreateDept = lazy(() => import("../pages/dept/CreateDept"));
const EditDept = lazy(() => import("../pages/dept/EditDept"));

const User = lazy(() => import("../pages/user"));
const CreateUser = lazy(() => import("../pages/user/CreateUser"));
const EditUser = lazy(() => import("../pages/user/EditUser"));
const FaceDetect = lazy(() => import("../FaceDetect"));

const Layout = React.memo(({ socket }) => (
  <Suspense fallback={<SuspenseLoading />}>
    <Wrapper>
      <Route exact path="/" component={Camera} />

      <Route exact path="/stores" component={Store} />
      <Route exact path="/stores/add" component={CreateStore} />
      <Route exact path="/stores/edit/:id" component={EditStore} />

      <Route exact path="/depts" component={Dept} />
      <Route exact path="/depts/add" component={CreateDept} />
      <Route exact path="/depts/edit/:id" component={EditDept} />

      <Route exact path="/cameras" component={Camera} />
      <Route exact path="/cameras/add" component={CreateCamera} />
      <Route exact path="/cameras/edit/:id" component={EditCamera} />

      <Route exact path="/employees" component={Employee} />
      <Route exact path="/employees/add" component={CreateEmployee} />
      <Route exact path="/employees/edit/:id" component={EditEmployee} />

      <Route exact path="/home" render={() => <Home socket={socket} />} />

      <Route exact path="/users" component={User} />
      <Route exact path="/users/add" component={CreateUser} />
      <Route exact path="/users/edit/:id" component={EditUser} />

      <Route exact path="/roles" component={Role} />
      <Route exact path="/roles/add" component={CreateRole} />
      <Route exact path="/roles/edit/:id" component={EditRole} />
      <Route exact path="/facedetect" component={FaceDetect} />
    </Wrapper>
  </Suspense>
));

export default Layout;
