import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import SearchIcon from "@material-ui/icons/Search";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import YourProjects from "../screens/YourProjects";
import ProfileScreen from "../screens/ProfileScreen";
import CreateUserScreen from "../screens/CreateUserScreen";
import React, { useState } from "react";
import Header from "./Header";
import SingOutBtn from "./SignOutBtn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IndividualProject from "../screens/IndividualProject";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import history from "../components/history";
const SideBar = (props) => {
  const [selected, setSelected] = useState("Профил");
  const [expanded, setExpanded] = useState(false);
  const [openSignOut, setOpenSignOut] = useState(false);

  return (
    <div>
      <SideNav
        onSelect={(selected) => {
          setSelected(selected);
        }}
        onToggle={(expanded) => setExpanded(expanded)}
        style={{
          position: "fixed",
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="Профил" onClick={() => history.push("/profile")}>
            <NavIcon>
              <AccountCircleIcon />
            </NavIcon>
            <NavText>Профил</NavText>
          </NavItem>
          <NavItem
            eventKey="Твоите Проекти"
            onClick={() => history.push("/create-user")}
          >
            <NavIcon>
              <DashboardIcon />
            </NavIcon>
            <NavText>Твоите Проекти</NavText>
          </NavItem>
          <NavItem
            eventKey="Създай Проект"
            onClick={() => history.push("/create-project")}
          >
            <NavIcon>
              <CreateNewFolderIcon />
            </NavIcon>
            <NavText>Създай Проект</NavText>
          </NavItem>
          <NavItem
            eventKey="Създай Потребител"
            onClick={() => history.push("/create-user")}
          >
            <NavIcon>
              <PersonAddIcon />
            </NavIcon>
            <NavText>Създай Потребител</NavText>
          </NavItem>

          <NavItem eventKey="SingOut">
            <NavIcon onClick={() => setOpenSignOut(true)}>
              <ExitToAppIcon />
            </NavIcon>
            <NavText onClick={() => setOpenSignOut(true)}>Излез</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      <div>
        <Header title={selected} />

        <div
          style={{
            position: "relative",
            oveflow: "hidden",
            transition: "all .15s",
            padding: "0 20px",
            marginLeft: expanded ? 240 : 64,
          }}
        >
          {props.children}
        </div>
      </div>
      {openSignOut ? (
        <SingOutBtn
          openSignOut={openSignOut}
          setOpenSignOut={setOpenSignOut}
          setSelected={setSelected}
        />
      ) : null}
    </div>
  );
};

export default SideBar;
