import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import apiAddress from "../globals/apiAddress";
import axios from "axios";
import DialogLoader from "../components/DialogLoader";
import AlertBox from "../components/AlertBox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import GridPaper from "../components/GridPaper";
import PowerIcon from "@material-ui/icons/Power";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import DateRangeIcon from "@material-ui/icons/DateRange";
import moment from "moment";
import ListComponent from "../components/ListComponent";
import { GET_PROJECT } from "../graphql/queries";
import { useQuery, gql } from "@apollo/client";
const useStyles = makeStyles({
  container: {
    textAlign: "center",
    marginTop: "3rem",
  },
  textStyle: {
    color: "blue",
  },
});
const IndividualProject = (props) => {
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState("");
  console.log(props);
  const { error, loading, data } = useQuery(GET_PROJECT, {
    variables: { projectId: props.project },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box className={classes.container}>
      {data ? (
        <Box>
          <Typography style={{ fontSize: 27, fontFamily: "Open Sans" }}>
            <FiberManualRecordIcon
              style={
                data.getProject.status === 0
                  ? { color: "red" }
                  : data.getProject.status === 1
                  ? { color: "yellow" }
                  : { color: "green" }
              }
            />
            {data.getProject.name}
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 30,
            }}
          >
            <GridPaper
              data={data.getProject.power}
              name="Мощност"
              icon={PowerIcon}
              smalltext="kWp"
              staticon={PowerIcon}
            />
            <GridPaper
              data={data.getProject.type}
              name="Тип"
              icon={FingerprintIcon}
              smalltext="типът на проекта"
              staticon={FingerprintIcon}
            />
            <GridPaper
              data={moment(
                new Date(parseInt(data.getProject.startDate)).toLocaleString()
              ).format("DD-MM-yyyy")}
              name="Старт"
              icon={DateRangeIcon}
              smalltext="стартираща дата"
              staticon={DateRangeIcon}
            />
            <GridPaper
              data={data.getProject.owner.name}
              name="Възложен"
              icon={AccessibilityIcon}
              smalltext="служител"
              staticon={AccessibilityIcon}
            />
          </Box>
          <ListComponent
            heading="Оферта"
            data={data.getProject.offer}
            projectId={data.getProject._id}
          />
        </Box>
      ) : null}
      {loading ? <DialogLoader /> : null}
      {alertMessage ? (
        <AlertBox
          success={false}
          text={alertMessage}
          display={setAlertMessage}
        />
      ) : null}
    </Box>
  );
};

export default IndividualProject;
