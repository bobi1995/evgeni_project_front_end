import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import history from "../components/history";
import PrivateRoute from "./PrivateRoute";
import SideBar from "../components/SideBar";
import IndividualProject from "../screens/IndividualProject";

const MainRoute = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginScreen} />
        <PrivateRoute path="/home" component={SideBar} />
      </Switch>
    </Router>
  );
};

export default MainRoute;
