import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    marginTop: "3rem",
  },
  textStyle: {
    color: "blue",
  },
});
const YourProjects = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography className={classes.textStyle}>Home</Typography>
    </Box>
  );
};

export default YourProjects;
