import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setAttendaces } from "../../../actions/attendance.actions";
import { greet } from "../../../utils";

const useOnRecognize = (attendances) => {
  const dispatch = useDispatch();
  const onRecognize = useCallback(
    (payload) => {
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
    [attendances]
  );

  return onRecognize;
};

export default useOnRecognize;
