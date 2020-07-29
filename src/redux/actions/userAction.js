import {
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_USER,
  LOADING_USER,
  SET_UNAUTHENTICATED,
} from "../types";
import axios from "axios";

export const GetUserData = (userId) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .get(`/user/${userId}`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const loginUser = (userData) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .post("/signin", userData)
    .then((res) => {
      const fireToken = `Bearer ${res.data.token}`;
      axios.defaults.headers.common["Authorization"] = fireToken;
      localStorage.setItem("Firetoken", fireToken);
      localStorage.setItem("UserId", res.data.userId);
      dispatch(GetUserData(res.data.userId));
      dispatch({
        type: CLEAR_ERRORS,
      });
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const resetPassword = (email) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .post("/resetPassword", email)
    .then((res) => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data.message,
      });
      console.log(res.data.message);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("Firetoken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};
