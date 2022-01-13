import React, { useEffect, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

import { CAMERA_RECOGNIZE } from "../../../socket/constants";
import DataTable from "../../../components/DataTable";
import useOnRecognize from "../hooks/useOnRecognize";
import useRenderRecognize from "../hooks/useRenderRecognize";
import useRequestRecognize from "../hooks/useRequestRecognize";

let source = axios.CancelToken.source();

const Recognize = React.memo(
  ({ selectedStore, searchFrom, searchTo, socket }) => {
    const theme = useTheme();

    const { attendances, pages, page } = useSelector(
      (state) => ({
        attendances: state.attendance.attendances,
        pages: state.attendance.pages,
        page: state.attendance.page,
      }),
      shallowEqual
    );

    const handleRequest = useRequestRecognize(
      searchFrom,
      searchTo,
      selectedStore,
      source
    );

    const renderData = useRenderRecognize(attendances);

    const loadMore = useCallback(() => {
      handleRequest(pages, page + 1);
    }, [handleRequest, page, pages]);

    const onRecognize = useOnRecognize(attendances);

    useEffect(() => {
      socket.on(CAMERA_RECOGNIZE, onRecognize);

      return () => {
        if (source) source.cancel();
        socket.off(CAMERA_RECOGNIZE, onRecognize);
      };
    }, [onRecognize, socket]);

    useEffect(() => {
      handleRequest(0, 0);
    }, [handleRequest]);

    return (
      <Box className="row">
        <Box className="col-sm-12">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">Thông tin check-in/out</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "Hình ảnh gốc",
                  "Hình ảnh nhận diện",
                  "Họ tên",
                  "Cửa hàng",
                  "Giới tính",
                  "Ngày sinh",
                  "Check-in",
                  "Check-out",
                ]}
                renderData={renderData}
                containerClass="attendance-table-container table-responsive"
              />

              <Box marginTop={5}>
                <Button
                  type="button"
                  variant="contained"
                  className="btn btn-success btn-rounded w-md m-b-5"
                  disabled={!(page < pages - 1)}
                  onClick={() => loadMore()}
                >
                  <Typography
                    variant="h5"
                    color={theme.palette.text.secondary}
                    component="span"
                  >
                    Load more
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default Recognize;
