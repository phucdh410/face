import "./styles/custom.css";
import React, {
  Suspense,
  lazy,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";

import { Box, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";

import { renderPagination, renderSelect } from "../../utils/handler";
import { getEmployees } from "../../actions/employee.actions";
import SuspenseLoading from "../../components/SuspenseLoading";
import usePrev from "../../utils/Hooks/usePrev";
import useNext from "../../utils/Hooks/useNext";
import useRenderData from "./hooks/useRenderData";
const DataTable = lazy(() => import("../../components/DataTable"));

const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const Employee = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector(
    (state) => ({
      employees: state.employee.employees,
      pages: state.employee.pages,
      page: state.employee.page,
      success: state.employee.success,
      searchStore: state.employee.search_store_id,
      searchInput: state.employee.search_input,
      errors: state.errors,
      stores: state.root.stores,
    }),
    shallowEqual
  );

  const { employees, pages, page, success, errors, stores } = state;
  const [searchStore, setSearchStore] = useState(state.searchStore);
  const [searchInput, setSearcInput] = useState(state.searchInput);

  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        store_id: searchStore,
        input: searchInput,
        pages,
        page,
      };

      dispatch(getEmployees(params, source.token, history));
    },
    [dispatch, history, searchStore, searchInput]
  );

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(pages, page);

    return () => {
      if (source) source.cancel("Đã cancel");
    };
  }, [handleRequest, page, pages]);

  const prev = usePrev(pages, page, handleRequest);

  const next = useNext(pages, page, handleRequest);

  const onChange = useCallback(
    (e) => {
      e.preventDefault();
      switch (e.target.name) {
        case "search_store_id":
          setSearchStore(e.target.value);
          break;
        case "search_input":
          setSearcInput(e.target.value);
          break;
        default:
          break;
      }

      handleRequest(0, 0);
    },
    [handleRequest]
  );

  const renderData = useRenderData(
    employees,
    handleRequest,
    errors,
    pages,
    page
  );

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {/* Content header */}
      <MainHeader onClick={() => history.push("/employees/add")} />

      {/* Search panel */}
      <FilterPanel
        searchStore={searchStore}
        searchInput={searchInput}
        stores={stores}
        onChange={onChange}
        renderStores={renderSelect}
      />

      <Box className="row">
        <Box className="col-sm-12 p-0">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">Thông tin nhân viên</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "Tên nhân viên",
                  "Giới tính",
                  "Số điện thoại",
                  "Cửa hàng",
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

Employee.displayName = "Employee";

export default withRouter(Employee);
