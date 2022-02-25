import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@mui/material";
import numeral from "numeral";

const useStyles = makeStyles(() => ({
  root: {
    width: 250,
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: "#35AEB6",
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: 2,
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: "#35AEB6",
  },
  differenceValue: {
    color: "red",
    marginRight: 1,
  },
}));

const PremiumSubs = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {props.name}
            </Typography>
            <Typography
              variant="h5"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: 230,
              }}
            >
              {props.data ? props.data : "Няма въведено"}
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <div className={classes.difference}>
          <props.staticon className={classes.differenceIcon} />
          {props.smallstat ? (
            <Typography className={classes.differenceValue} variant="body2">
              {numeral(props.smallstat).format("0,0")}%
            </Typography>
          ) : (
            ""
          )}
          <Typography className={classes.caption} variant="caption">
            {props.smalltext}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

PremiumSubs.propTypes = {
  className: PropTypes.string,
};

export default PremiumSubs;
