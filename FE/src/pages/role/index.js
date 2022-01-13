import "./styles/custom.css";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router";
import { useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";

import { getRoles } from "../../actions/role.actions";
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

const Role = React.memo(() => {
  const history = useHistory();

  const state = useSelector(
    (state) => ({
      roles: state.role.roles,
      pages: state.role.pages,
      page: state.role.page,
      success: state.role.success,
      searchInput: state.role.search_input,
      errors: state.errors,
    }),
    shallowEqual
  );

  const { roles, pages, page, success, errors } = state;

  const [searchInput, setSearchInput] = useState(state.searchInput);

  const handleRequest = useHandleRequest(searchInput, getRoles, source);

  useEffect(() => {
    window.loading();
    handleRequest(pages, page);
    return () => {
      source && source.cancel();
    };
  });

  const prev = usePrev(pages, page, handleRequest);

  const next = useNext(pages, page, handleRequest);

  const onChange = useChange(setSearchInput, handleRequest);

  const renderData = useRenderData(
    roles,
    handleRequest,
    errors,
    pages,
    page,
    source
  );

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {/* Content header */}
      <MainHeader onClick={() => history.push("/roles/add")} />

      {/* Search panel */}
      <FilterPanel searchInput={searchInput} onChange={onChange} />

      <Box className="row">
        <Box className="col-sm-12 p-0">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">
                  Thông tin vai trò người dùng
                </Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "Vai trò người dùng",
                  "Nhóm người dùng",
                  "Trạng thái",
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

export default withRouter(Role);
