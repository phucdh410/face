import React, { useCallback } from "react";
import { FACE_R_APP_DOMAIN } from "../../../config";
import { TableRow, TableCell, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";

const useRenderRecognize = (attendances) => {
  const theme = useTheme();
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

            <TableCell
              style={{
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

            <TableCell
              style={{
                width: 90,
                textAlign: "center",
              }}
            >
              {face && <img className="user-avatar" src={face} alt="" />}
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
                {moment.utc(attendance.check_in).format("DD-MM-YYYY HH:mm:ss")}
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
    }
    return null;
  }, [attendances]);

  return renderData;
};

export default useRenderRecognize;
