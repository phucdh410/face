import React, {
  Suspense, lazy, useEffect, useCallback, useState,
} from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Box, TableCell, TableRow, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";

import axios from "axios";

import { getEmployees, removeEmployee } from "../../actions/employee.actions";

import {
  prevHandler,
  nextHandler,
  renderPagination,
  renderSelect,
} from "../../utils/handler";

import "./styles/custom.css";

import { FACE_R_APP_TITLE } from "../../config";
import SuspenseLoading from "../../components/SuspenseLoading";

const DataTable = lazy(() => import("../../components/DataTable"));

const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const Employee = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

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
    shallowEqual,
  );

  const {
    employees, pages, page, success, errors, stores,
  } = state;

  const [searchStore, setSearchStoreId] = useState(state.searchStore);
  const [searchInput, setSearcInput] = useState(state.searchInput);

  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        store_id: parseInt(searchStore),
        input: searchInput,
        pages,
        page,
      };

      dispatch(getEmployees(params, source.token, history));
    },
    [dispatch, history, searchStore, searchInput],
  );

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(pages, page);

    return () => {
      if (source) source.cancel();
    };
  }, [handleRequest, page, pages]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errors.message) {
        window.toast(FACE_R_APP_TITLE, errors.message, 4000, "error");
      }
    }
  }, [errors]);

  const prev = useCallback(
    (e) => {
      prevHandler(e, pages, page, handleRequest);
    },
    [handleRequest, page, pages],
  );

  const next = useCallback(
    (e) => {
      nextHandler(e, pages, page, handleRequest);
    },
    [handleRequest, page, pages],
  );

  const onDelete = useCallback(
    async (id) => {
      window.start_preloader();
      source = axios.CancelToken.source();
      await dispatch(removeEmployee(id, source.token, history));

      if (success) {
        window.toast(
          FACE_R_APP_TITLE,
          "Xo?? th??ng tin nh??n vi??n th??nh c??ng!",
          2000,
          "success",
          () => {
            handleRequest(0, 0);
            window.stop_preloader();
          },
        );
      } else window.stop_preloader();
    },
    [dispatch, handleRequest, history, success],
  );

  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      switch (e.target.name) {
        case "search_store_id":
          setSearchStoreId(e.target.value);
          break;
        case "search_input":
          setSearcInput(e.target.value);
          break;
        default:
          break;
      }

      handleRequest(0, 0);
    },
    [handleRequest],
  );

  const renderData = useCallback(() => {
    if (employees && employees.length > 0) {
      return employees.map((employee, index) => (
        <TableRow key={index}>
          <TableCell style={{ minWidth: 30, textAlign: "center" }}>
            <Link to={`/employees/edit/${employee.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {index + 1}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Link to={`/employees/edit/${employee.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {employee.fullname}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {employee.gender ? "Male" : "Female"}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {employee.mobile}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {employee.store_name}
            </Typography>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {employee.active ? (
              <Typography
                variant="h5"
                color={theme.palette.text.secondary}
                component="span"
                className="label label-pill label-success"
              >
                Active
              </Typography>
            ) : (
              <Typography
                variant="h5"
                color={theme.palette.text.secondary}
                component="span"
                className="label label-pill label-danger"
              >
                Disabled
              </Typography>
            )}
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            <a href="#/" onClick={() => onDelete(employee.id)}>
              <Typography
                variant="h5"
                color={theme.palette.success.main}
                component="i"
                fontFamily="Glyphicons Halflings"
                className="glyphicon glyphicon-erase"
              />
            </a>
          </TableCell>
        </TableRow>
      ));
    } return null;
  }, [employees, onDelete]);

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
                <Typography variant="h4">Th??ng tin nh??n vi??n</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "T??n nh??n vi??n",
                  "Gi???i t??nh",
                  "S??? ??i???n tho???i",
                  "C???a h??ng",
                  "Tr???ng th??i",
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
