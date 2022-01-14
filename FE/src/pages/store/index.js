import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useHistory } from "react-router";
import { useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { getStores, removeStore } from "../../actions/store.actions";
import { renderPagination } from "../../utils/handler";
import SuspenseLoading from "../../components/SuspenseLoading";
import useHandleRequest from "../../utils/Hooks/useHandleRequest";
import useOnDelete from "../../utils/Hooks/useOnDelete";
import useRenderData from "./hooks/useRenderData";
import usePagination from "../../utils/Hooks/usePagination";

const DataTable = lazy(() => import("../../components/DataTable"));
const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const Store = React.memo(() => {
  const history = useHistory();
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
  const [searchInput, setSearchInput] = useState(state.searchInput);
  const handleRequest = useHandleRequest(searchInput, getStores, source);
  const data = useRenderData(stores, onDelete);
  const { prev, next } = usePagination(pages, page, handleRequest);

  useEffect(() => {
    window.loading();
    handleRequest(pages, page);
    return () => {
      source && source.cancel();
    };
  }, [pages, page]);

  //Tạo hàm delete sử dụng cho renderData
  const onDelete = useOnDelete(
    removeStore,
    "cửa hàng",
    handleRequest,
    errors,
    pages,
    page,
    source
  );

  //Tạo hàm renderData lấy data từ hook useRenderData
  const renderData = useCallback(() => {
    if (stores && stores.length > 0) {
      return data;
    }
    return null;
  }, [stores, onDelete]);

  //Delay request cho đến khi người dùng ngưng nhập 0.5 giây
  useEffect(() => {
    debounceChange(handleRequest);
  }, [handleRequest]);
  const debounceChange = useCallback(
    debounce((handleRequest) => {
      handleRequest(0, 0);
    }, 500),
    []
  );

  // const onChange = useChange(setSearchInput, handleRequest);
  const onChange = useCallback((e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  }, []);

  // const [newStores, setNewStores] = useState([]); Danh sách cửa hàng mới theo input
  //Lọc danh sách cửa hàng theo input
  // useEffect(() => {
  //   if (searchInput !== "") {
  //     let tmp = stores.filter((item) => {
  //       return item.name.toLowerCase().includes(searchInput.toLowerCase());
  //     });
  //     setNewStores(tmp);
  //     console.log("index", searchInput);
  //   }
  // }, [searchInput]);

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
                // renderData={searchInput ? newRenderData : renderData}
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
