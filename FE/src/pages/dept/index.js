import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";

import { getDepts } from "../../actions/dept.actions";
import { renderPagination } from "../../utils/handler";
import SuspenseLoading from "../../components/SuspenseLoading";
import useHandleRequest from "../../utils/Hooks/useHandleRequest";
import useRenderData from "./hooks/useRenderData";
import usePagination from "../../utils/Hooks/usePagination";
import useDebounce from "../../utils/Hooks/useDebounce";

const DataTable = lazy(() => import("../../components/DataTable"));
const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();
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

  const handleRequest = useHandleRequest([0, searchInput], getDepts, source);
  const { prev, next } = usePagination(pages, page, handleRequest);

  useEffect(() => {
    window.loading();
    handleRequest(pages, page);
    return () => {
      source && source.cancel();
    };
  }, [pages, page]);

  const onChange = useCallback((e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  }, []);
  // tạo hàm debounceChange từ hook useDebounce để request
  //  sau khi người dùng ngừng thay đổi input 0.5s
  const debounceChange = useDebounce();
  useEffect(() => {
    debounceChange(handleRequest);
  }, [searchInput]);

  const renderData = useRenderData(
    depts,
    handleRequest,
    errors,
    pages,
    page,
    source
  );

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
