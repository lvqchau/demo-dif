import {
  SET_METHODS_REQUEST,
  SET_METHODS_SUCCESS,
  SET_METHODS_FAILURE,
} from "../constants/methods";

import axios from "axios";

export const setMethods = () => {
  // return async (dispatch) => {
    // dispatch({ type: SET_METHODS_REQUEST });

    // try {
    //   const { data } = await axios({
    //     method: "GET",
    //     url:
    //       "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
    //   });

    //   dispatch({ type: SET_METHODS_SUCCESS, payload: { data } });
    // } catch (error) {
    //   dispatch({
    //     type: SET_METHODS_FAILURE,
    //     payload: { error: error.response.data },
    //   });
    // }
  // };
};