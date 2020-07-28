import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import history from "./utils/history";
import AuthRoute from "./utils/authRoute";

import jwtDecode from "jwt-decode";

import Navbar from "./components/navbar";
import Home from "./components/defHome";
import UserHome from "./components/userHome";

import { Provider } from "react-redux";
import store from "./redux/store";

import axios from "axios";
import { GetUserData, logoutUser } from "./redux/actions/userAction";
import { SET_AUTHENTICATED } from "./redux/types";

const token = localStorage.Firetoken;
const userId = localStorage.UserId;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/";
    localStorage.clear();
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED,
    });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(GetUserData(userId));
  }
}

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Navbar></Navbar>
          <Switch>
            <AuthRoute path="/userHome" component={UserHome}></AuthRoute>
            <Route>{token ? <UserHome /> : <Home />}</Route>
          </Switch> 
        </Router>
      </div>
    </Provider>
  );
}

export default App;
