import React from "react";
import { Route, Redirect } from "react-router-dom";
import SideBar from "../components/SideBar";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={function (props) {
        return localStorage.getItem("token") ? (
          <SideBar>
            <Component {...props} />
          </SideBar>
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}
export default PrivateRoute;
