import React, { Suspense, lazy, useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router";
import { useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";

import { getStores } from "../../actions/store.actions";
import { renderPagination } from "../../utils/handler";
import SuspenseLoading from "../../components/SuspenseLoading";
import useChange from "../../utils/Hooks/useChange";
import useHandleRequest from "../../utils/Hooks/useHandleRequest";
import useNext from "../../utils/Hooks/useNext";
import usePrev from "../../utils/Hooks/usePrev";
import useRefresh from "../../utils/Hooks/useRefresh";
import useRenderData from "./hooks/useRenderData";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import debounce from "lodash.debounce";

const DataTable = lazy(() => import("../../components/DataTable"));
const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const Store = React.memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(
    (state) => ({
      stores: state.store.stores,
      pages: state.store.pages,
      page: state.store.page,
      success: state.store.success,
      searchInput: state.store.search_input,
      errors: state.errors,
    }),
    shallowEqual
  );

  const { stores, pages, page, success, errors } = state;

  const [searchInput, setSearcInput] = useState(state.searchInput);

  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        input: searchInput,
        pages,
        page,
      };
      console.log(`Request với thông tin tìm kiếm là ${searchInput}`);
      dispatch(getStores(params, source.token, history));
    },
    [dispatch, history, searchInput]
  );

  useEffect(() => {
    window.loading();
    handleRequest(pages, page);
    return () => {
      source && source.cancel();
    };
  }, [handleRequest, pages, page]);
  // const handleRequest = useHandleRequest(searchInput, getStores);

  // const Update = useRefresh(handleRequest, pages, page, searchInput);

  const prev = usePrev(pages, page, handleRequest);

  const next = useNext(pages, page, handleRequest);

  const debounceChange = useCallback(
    debounce(() => console.log(searchInput), 1500),
    []
  );

  const onChange = (e) => {
    e.preventDefault();
    setSearcInput(e.target.value);
    debounceChange();
  };
  // const onChange = useChange(setSearcInput, handleRequest);

  const renderData = useRenderData(stores, handleRequest, errors, pages, page);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {/* Content header */}
      <MainHeader onClick={() => history.push("/stores/add")} />

      {/* Search panel */}
      <FilterPanel searchInput={searchInput} onChange={onChange} />

      <Box className="row">
        <Box className="col-sm-12 p-0">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">Thông tin cửa hàng</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "Tên cửa hàng",
                  "Người đại diện",
                  "Email",
                  "Số điện thoại",
                  "Địa chỉ",
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

Store.displayName = "Store";

export default withRouter(Store);
