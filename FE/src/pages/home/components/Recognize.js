import React, { useEffect, useCallback } from "react";
import {
  Box, Button, TableCell, TableRow, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";

import axios from "axios";
import moment from "moment";

import {
  getAttendances,
  setAttendaces,
} from "../../../actions/attendance.actions";

import { convertStringToDate, greet } from "../../../utils";

import DataTable from "../../../components/DataTable";

import { FACE_R_APP_DOMAIN } from "../../../config";
import { CAMERA_RECOGNIZE } from "../../../socket/constants";

let source = axios.CancelToken.source();

const Recognize = React.memo(
  ({
    selectedStore, searchFrom, searchTo, socket,
  }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useTheme();

    const { attendances, pages, page } = useSelector(
      (state) => ({
        attendances: state.attendance.attendances,
        pages: state.attendance.pages,
        page: state.attendance.page,
      }),
      shallowEqual,
    );

    const handleRequest = useCallback(
      (pages, page) => {
        source = axios.CancelToken.source();
        const params = {
          store_id: parseInt(selectedStore),
          search_from: convertStringToDate(searchFrom),
          search_to: convertStringToDate(searchTo),
          pages,
          page,
        };

        dispatch(getAttendances(params, source.token, history));
      },
      [dispatch, history, selectedStore, searchFrom, searchTo],
    );

    const renderData = useCallback(() => {
      if (attendances) {
        let items = [];

        items = attendances.map((attendance, index) => {
          let avatar = "";
          let face = "";

          if (attendance.avatar && attendance.avatar.length > 0) {
            avatar = `${FACE_R_APP_DOMAIN}/resources/avatars/${attendance.avatar}`;
          } else if (attendance.gender) avatar = "/avatars/male.jpg";
          else avatar = "/avatars/female.jpg";

          if (attendance.detected_face && attendance.detected_face.length > 0) {
            face = `${FACE_R_APP_DOMAIN}/resources/logs/${attendance.detected_face}`;
          }

          return (
            <TableRow key={index}>
              <TableCell style={{ minWidth: 30, textAlign: "center" }}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.primary}
                  component="span"
                >
                  {index + 1}
                </Typography>
              </TableCell>

              <TableCell style={{
                width: 90,
                textAlign: "center",
              }}
              >
                <img
                  className="user-avatar"
                  src={avatar}
                  alt={attendance.face_path}
                />
              </TableCell>

              <TableCell style={{
                width: 90,
                textAlign: "center",
              }}
              >
                {face && (
                  <img
                    className="user-avatar"
                    src={face}
                    alt=""
                  />
                )}
              </TableCell>

              <TableCell style={{ minWidth: 200 }}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.primary}
                  component="span"
                >
                  {attendance.fullname.toUpperCase()}
                </Typography>
              </TableCell>

              <TableCell style={{ minWidth: 250 }}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.primary}
                  component="span"
                >
                  {attendance.store_name.toUpperCase()}
                </Typography>
              </TableCell>

              <TableCell style={{ textAlign: "center" }}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.primary}
                  component="span"
                >
                  {attendance.gender ? "Nam" : "Nữ"}
                </Typography>
              </TableCell>

              <TableCell style={{ minWidth: 100, textAlign: "center" }}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.primary}
                  component="span"
                >
                  {`${attendance.birth_day}-${attendance.birth_month}-${attendance.birth_year}`}
                </Typography>
              </TableCell>

              <TableCell style={{ minWidth: 150, textAlign: "center" }}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.primary}
                  component="span"
                >
                  {moment
                    .utc(attendance.check_in)
                    .format("DD-MM-YYYY HH:mm:ss")}
                </Typography>
              </TableCell>

              <TableCell style={{ minWidth: 150, textAlign: "center" }}>
                <Typography
                  variant="h5"
                  color={theme.palette.text.primary}
                  component="span"
                >
                  {moment(new Date(attendance.check_in))
                    .utc()
                    .format("DD-MM-YYYY HH:mm:ss")}
                </Typography>
              </TableCell>
            </TableRow>
          );
        });

        return items;
      } return null;
    }, [attendances]);

    const loadMore = useCallback(() => {
      handleRequest(pages, page + 1);
    }, [handleRequest, page, pages]);

    const onRecognize = useCallback(
      async (payload) => {
        console.log("payload: ", payload);

        const item = {
          accuracy: payload.accuracy,
          avatar: payload.avatar,
          birth_day: payload.birth_day,
          birth_month: payload.birth_month,
          birth_year: payload.birth_year,
          check_in: payload.check_in,
          detected_face: payload.detected_face,
          date: payload.date,
          employee_id: payload.employee_id,
          face_id: payload.face_id,
          fullname: payload.fullname,
          gender: payload.gender,
          path: payload.path,
          store_id: payload.store_id,
          store_name: payload.store_name,
        };

        const gender = payload.gender !== 0 ? "anh" : "chị";
        const arr = payload.fullname.split(" ");
        const name = arr[arr.length - 1];
        let greeting = `Chào ${gender} ${name}`;
        greeting += `. Chúc ${gender} một ngày làm việc vui vẻ!`;

        greet(greeting);

        const data = [item, ...attendances];
        dispatch(setAttendaces(data));
      },
      [attendances, dispatch],
    );

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
  },
);

export default Recognize;
