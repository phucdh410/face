import "./styles/custom.css";
import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router";
import { useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { renderSelect, renderPagination } from "../../utils/handler";
import SuspenseLoading from "../../components/SuspenseLoading";
import useInitialProps from "./hooks/useInitialProps";
import useRenderData from "./hooks/useRenderData";
import usePagination from "../../utils/Hooks/usePagination";
import useOnDelete from "../../utils/Hooks/useOnDelete";
import { getCameras, removeCamera } from "../../actions/camera.actions";
import useHandleRequest from "../../utils/Hooks/useHandleRequest";

const DataTable = lazy(() => import("../../components/DataTable"));
const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const Camera = React.memo(() => {
  const history = useHistory();
  const state = useSelector(
    (state) => ({
      cameras: state.camera.cameras,
      pages: state.camera.pages,
      page: state.camera.page,
      success: state.camera.success,
      searchStore: state.camera.search_store_id,
      errors: state.errors,
      stores: state.root.stores,
    }),
    shallowEqual
  );
  const { cameras, pages, page, success, errors, stores } = state;
  const [searchStore, setSearchStore] = useState(state.searchStore);
  const getInitialProps = useInitialProps(source);
  const handleRequest = useHandleRequest([searchStore, ""], getCameras, source);
  const { prev, next } = usePagination(pages, page, handleRequest);

  useEffect(() => {
    window.loading();
    getInitialProps();
    handleRequest(pages, page);
    return () => {
      source && source.cancel();
      source = null;
    };
  }, [getInitialProps, pages, page]);

  useEffect(() => {
    handleRequest(0, 0);
    return () => {
      source && source.cancel();
    };
  }, [handleRequest]);

  //Tạo hàm delete sử dụng cho renderData
  const onDelete = useOnDelete(
    removeCamera,
    "thiết bị",
    handleRequest,
    errors,
    pages,
    page,
    source
  );

  //Lấy dữ liệu bằng hook
  const data = useRenderData(cameras, onDelete);
  //Tạo hàm renderData lấy data từ hook useRenderData
  const renderData = useCallback(() => {
    if (cameras && cameras.length > 0) {
      return data;
    }
    return null;
  }, [cameras, onDelete]);

  const onChange = useCallback((e) => {
    e.preventDefault();
    setSearchStore(e.target.value);
  }, []);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {/* Content header */}
      <MainHeader onClick={() => history.push("/cameras/add")} />

      {/* Search Panel */}
      <FilterPanel
        stores={stores}
        renderStores={renderSelect}
        searchStore={searchStore}
        onChange={(e) => onChange(e)}
      />

      {/* Data container */}
      {/* <Loading /> */}
      <Box className="row">
        <Box className="col-sm-12 p-0">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">Thông tin camera</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "Host",
                  "Port",
                  "Cửa hàng",
                  "Path",
                  "Khu vực",
                  "Kết nối",
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

Camera.displayName = "Camera";

export default withRouter(Camera);
