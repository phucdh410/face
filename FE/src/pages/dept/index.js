import React, { Suspense, lazy, useState } from "react";
import { Box, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";

import { getDepts } from "../../actions/dept.actions";
import { renderPagination } from "../../utils/handler";
import SuspenseLoading from "../../components/SuspenseLoading";
import useChange from "../../utils/Hooks/useChange";
import useHandleRequest from "../../utils/Hooks/useHandleRequest";
import useNext from "../../utils/Hooks/useNext";
import usePrev from "../../utils/Hooks/usePrev";
import useRefresh from "../../utils/Hooks/useRefresh";
import useRenderData from "./hooks/useRenderData";

const DataTable = lazy(() => import("../../components/DataTable"));
const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

const Dept = React.memo(() => {
  const history = useHistory();

  const state = useSelector(
    (state) => ({
      depts: state.dept.depts,
      pages: state.dept.pages,
      page: state.dept.page,
      success: state.dept.success,
      searchInput: state.dept.search_input,
      errors: state.errors,
    }),
    shallowEqual
  );

  const { depts, pages, page, success, errors } = state;
  const [searchInput, setSearchInput] = useState(state.searchInput);

  const handleRequest = useHandleRequest(searchInput, getDepts);

  const Update = useRefresh(handleRequest, pages, page, searchInput);

  const prev = usePrev(pages, page, handleRequest);

  const next = useNext(pages, page, handleRequest);

  const onChange = useChange(setSearchInput, handleRequest);

  const renderData = useRenderData(depts, handleRequest, errors, pages, page);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {/* Content header */}
      <MainHeader onClick={() => history.push("/depts/add")} />

      {/* Search panel */}
      <FilterPanel searchInput={searchInput} onChange={onChange} />

      <Box className="row">
        <Box className="col-lg-12 p-0">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">Thông tin phòng ban</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={["No.", "Tên phòng ban", "Cửa hàng", "Trạng thái", ""]}
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

Dept.displayName = "Dept";

export default withRouter(Dept);
