import "./styles/custom.css";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router";
import { useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { getUsers } from "../../actions/user.actions";
import { renderPagination } from "../../utils/handler";
import SuspenseLoading from "../../components/SuspenseLoading";
import useChange from "../../utils/Hooks/useChange";
import useHandleRequest from "../../utils/Hooks/useHandleRequest";
import useNext from "../../utils/Hooks/useNext";
import usePrev from "../../utils/Hooks/usePrev";
import useRenderData from "./hooks/useRenderData";

const DataTable = lazy(() => import("../../components/DataTable"));
const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const User = React.memo(() => {
  const history = useHistory();

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

  const handleRequest = useHandleRequest(searchInput, getUsers, source);

  useEffect(() => {
    window.loading();
    handleRequest(pages, page);
    return () => {
      source && source.cancel();
    };
  }, [pages, page]);

  const prev = usePrev(pages, page, handleRequest);

  const next = useNext(pages, page, handleRequest);

  const onChange = useChange(setSearcInput, handleRequest);

  const renderData = useRenderData(
    users,
    handleRequest,
    errors,
    pages,
    page,
    source
  );

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
