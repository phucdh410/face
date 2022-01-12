import "./styles/custom.css";
import React, {
  Suspense,
  lazy,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";

import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

import {
  nextHandler,
  prevHandler,
  renderPagination,
} from "../../utils/handler";
import { FACE_R_APP_TITLE } from "../../config";
import { getUsers, removeUser } from "../../actions/user.actions";
import { LoadingContext } from "../../context/LoadingContext";
import SuspenseLoading from "../../components/SuspenseLoading";
import { PopupContext } from "../../context/PopupContext";
import useHandleRequest from "../../utils/Hooks/useHandleRequest";
import useRefresh from "../../utils/Hooks/useRefresh";
import usePrev from "../../utils/Hooks/usePrev";
import useNext from "../../utils/Hooks/useNext";
import useChange from "../../utils/Hooks/useChange";
import useRenderData from "./hooks/useRenderData";
const DataTable = lazy(() => import("../../components/DataTable"));

const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const User = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const state = useSelector(
    (state) => ({
      users: state.user.users,
      pages: state.user.pages,
      page: state.user.page,
      success: state.user.success,
      searchInput: state.user.search_input,
      errors: state.errors,
    }),
    shallowEqual
  );

  const { users, pages, page, success, errors } = state;

  const [searchInput, setSearcInput] = useState(state.searchInput);

  const handleRequest = useHandleRequest(searchInput, getUsers);

  const Update = useRefresh(handleRequest, pages, page);

  const prev = usePrev(pages, page, handleRequest);

  const next = useNext(pages, page, handleRequest);

  const onChange = useChange(setSearcInput, handleRequest);

  const renderData = useRenderData(users, handleRequest, errors, pages, page);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {/* Content header */}
      <MainHeader onClick={() => history.push("/users/add")} />

      {/* Search panel */}
      <FilterPanel searchInput={searchInput} onChange={onChange} />

      <Box className="row">
        <Box className="col-sm-12 p-0">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">Thông tin người dùng</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "Tên người dùng",
                  "Giới tính",
                  "Số điện thoại",
                  "Email",
                  "Nhóm người dùng",
                  "Trạng thái",
                  "",
                ]}
                renderData={renderData}
              />

              {renderPagination(pages, page, prev, next, handleRequest)}
            </Box>
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
});

export default withRouter(User);
