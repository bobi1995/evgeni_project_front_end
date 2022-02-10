import * as React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";

const styles = {
  root: {
    background: "linear-gradient(45deg, #008900 50%, #008900 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    height: 48,
    padding: "0 30px",
    margin: 8,
    width: 200,
  },
};

function MyButtonRaw(props) {
  const { onClick, classes, ...other } = props;
  return (
    <Button
      className={classes.root}
      onClick={onClick}
      {...other}
      style={{ color: "white", fontSize: 17 }}
    />
  );
}

MyButtonRaw.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MyButton = withStyles(styles)(MyButtonRaw);

export default function AdaptingHOC(props) {
  return <MyButton onClick={props.clicked}>Създай</MyButton>;
}
