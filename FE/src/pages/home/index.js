import "./styles/custom.css";
import React, { Suspense, lazy, useCallback, useState } from "react";
import { Box } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { convertMilisecondsToDate, convertDateToString } from "../../utils";
import { renderSelect } from "../../utils/handler";
import SuspenseLoading from "../../components/SuspenseLoading";

const Breadcrum = lazy(() => import("./components/Breadcrum"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));
const Recognize = lazy(() => import("./components/Recognize"));
const Cameras = lazy(() => import("./components/Cameras"));
const Live = lazy(() => import("./components/Live"));

let source = axios.CancelToken.source();

const Home = React.memo(({ socket }) => {
  const state = useSelector(
    (state) => ({
      searchStore: state.attendance.search_store_id,
      searchFrom: state.attendance.search_from,
      searchTo: state.attendance.search_to,
      errors: state.errors,
      stores: state.root.stores,
    }),
    shallowEqual
  );

  const { errors, currentCamera, stores } = state;
  const [searchStore, setSearchStore] = useState(state.searchStore || 0);
  const [searchFrom, setSearchFrom] = useState(
    moment(convertMilisecondsToDate(state.searchFrom)).format("DD-MM-YYYY")
  );
  const [searchTo, setSearchTo] = useState(
    moment(convertMilisecondsToDate(state.searchTo)).format("DD-MM-YYYY")
  );

  const onChange = useCallback((name, value) => {
    switch (name) {
      case "search_from":
        setSearchFrom(convertDateToString(value));
        break;
      case "search_to":
        setSearchTo(convertDateToString(value));
        break;
      default:
        break;
    }
  }, []);

  const onSelect = useCallback((e) => {
    setSearchStore(e.target.value);
  }, []);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {/* Content header */}
      <Breadcrum />

      {/* Search panel */}
      <FilterPanel
        stores={stores}
        renderStores={renderSelect}
        searchStore={searchStore}
        searchFrom={searchFrom}
        searchTo={searchTo}
        onChange={onChange}
        onSelect={onSelect}
      />

      <Box className="row">
        <Box className="left-container col-md-12 col-xl-12">
          <Box className="row">
            {/* Live camera  */}
            <Box className="live-webcam-container col-md-12 col-xl-6 col-xxl-4">
              <Live currentCamera={currentCamera} />
            </Box>

            {/* Camera list */}
            <Box className="camera-container col-md-12 col-xl-6 col-xxl-8">
              <Cameras searchStore={searchStore} socket={socket} />
            </Box>
          </Box>
        </Box>

        {/* Check-in list */}
        <Box className="right-container col-md-12 col-xl-12">
          <Box className="row">
            <Box className="attendance-container col-md-12">
              <Recognize
                searchStore={searchStore}
                searchFrom={searchFrom}
                searchTo={searchTo}
                socket={socket}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
});

export default withRouter(Home);
