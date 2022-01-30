import React from "react";
import image from "../images/data.jpg";

const Header = (props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        margin: 0,
        height: "15vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "table",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontFamily: `"Cambria", cursive`,
          color: "white",
          fontSize: 35,
          margin: 0,
          verticalAlign: "middle",
          display: "table-cell",
        }}
      >
        {props.title}
      </h1>
    </div>
  );
};
export default Header;
