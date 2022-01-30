import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import SearchIcon from "@material-ui/icons/Search";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import YourProjects from "../screens/YourProjects";
import ProfileScreen from "../screens/ProfileScreen";
import React, { useState } from "react";
import Header from "./Header";
import SingOutBtn from "./SignOutBtn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IndividualProject from "../screens/IndividualProject";
const SideBar = () => {
  const [selected, setSelected] = useState("Профил");
  const [project, setProject] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [openSignOut, setOpenSignOut] = useState(false);

  const renderPage = (component) => {
    switch (component) {
      case "Твоите Проекти":
        return <YourProjects />;
      case "Профил":
        return (
          <ProfileScreen setSelected={setSelected} setProject={setProject} />
        );
      case "Filter":
        return;
      case "Compare":
        return;

      case "Проект":
        return <IndividualProject project={project} />;
      default:
        break;
    }
  };

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
          <NavItem eventKey="Профил">
            <NavIcon>
              <AccountCircleIcon />
            </NavIcon>
            <NavText>Профил</NavText>
          </NavItem>
          <NavItem eventKey="Твоите Проекти">
            <NavIcon>
              <DashboardIcon />
            </NavIcon>
            <NavText>Твоите Проекти</NavText>
          </NavItem>
          <NavItem eventKey="Проект" disabled={true}>
            <NavIcon>
              <SearchIcon />
            </NavIcon>
            <NavText>Проект</NavText>
          </NavItem>
          <NavItem eventKey="Compare">
            <NavIcon>
              <StarHalfIcon />
            </NavIcon>
            <NavText>Compare</NavText>
          </NavItem>

          <NavItem eventKey="SingOut">
            <NavIcon onClick={() => setOpenSignOut(true)}>
              <ExitToAppIcon />
            </NavIcon>
            <NavText onClick={() => setOpenSignOut(true)}>Sign Out</NavText>
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
          {renderPage(selected)}
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
