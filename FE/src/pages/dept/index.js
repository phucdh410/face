import React, {
  Suspense,
  lazy,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";

import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

import {
  prevHandler,
  nextHandler,
  renderPagination,
} from "../../utils/handler";
import { FACE_R_APP_TITLE } from "../../config";
import { getDepts, removeDept } from "../../actions/dept.actions";
import { LoadingContext } from "../../context/LoadingContext";
import { PopupContext } from "../../context/PopupContext";
import SuspenseLoading from "../../components/SuspenseLoading";
const DataTable = lazy(() => import("../../components/DataTable"));

const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const Dept = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

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
  const [searchInput, setSearcInput] = useState(state.searchInput);

  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        input: searchInput,
        pages,
        page,
      };

      dispatch(getDepts(params, source.token, history));
    },
    [dispatch, history, searchInput]
  );

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(pages, page);

    return () => {
      if (source) source.cancel();
    };
  }, [handleRequest, page, pages]);

  const handlePopup = (title, message, expired, type, func) => {
    setInfo({
      title,
      message,
      expired,
      type,
    });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      if (typeof func === "function") {
        func();
      }
    }, expired * 1.5);
    clearTimeout();
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errors.message) {
        handlePopup(FACE_R_APP_TITLE, errors.message, 4000, "error");
      }
    }
  }, [errors]);

  const prev = useCallback(
    (e) => {
      prevHandler(e, pages, page, handleRequest);
    },
    [handleRequest, page, pages]
  );

  const next = useCallback(
    (e) => {
      nextHandler(e, pages, page, handleRequest);
    },
    [handleRequest, page, pages]
  );

  const onDelete = useCallback(
    async (id) => {
      // window.start_preloader();
      setLoading(true);
      source = axios.CancelToken.source();
      await dispatch(
        removeDept(id, source.token, history, (_success) => {
          if (_success) {
            handlePopup(
              FACE_R_APP_TITLE,
              "Xoá thông tin phòng ban thành công!",
              2000,
              "success",
              () => {
                handleRequest(pages, page);
                setLoading(false);
              }
            );

            // } else window.stop_preloader();
          } else setLoading(false);
        })
      );
    },
    [dispatch, handleRequest, history]
  );

  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      setSearcInput(e.target.value);
      handleRequest(0, 0);
    },
    [handleRequest]
  );

  const renderData = useCallback(() => {
    if (depts && depts.length > 0) {
      return depts.map((dept, index) => (
        <TableRow key={index}>
          <TableCell style={{ minWidth: 30, textAlign: "center" }}>
            <Link to={`/depts/edit/${dept.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {index + 1}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Link to={`/depts/edit/${dept.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {dept.name}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {dept.store_name}
            </Typography>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {dept.active ? (
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
            <a href="#/" onClick={() => onDelete(dept.id)}>
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
    }
    return null;
  }, [depts, onDelete]);

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
