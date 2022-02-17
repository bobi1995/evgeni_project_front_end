import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Paper, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import apiAddress from "../globals/apiAddress";
import axios from "axios";
import DialogLoader from "../components/DialogLoader";
import AlertBox from "../components/AlertBox";
import GridPaper from "../components/GridPaper";
import PowerIcon from "@material-ui/icons/Power";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import DateRangeIcon from "@material-ui/icons/DateRange";
import moment from "moment";
import ListComponent from "../components/ListComponent";
import Budget from "./IndividualProject/Budget";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import EditIcon from "@material-ui/icons/Edit";
import EditProject from "./IndividualProject/EditProject";
import GoogleMap from "./IndividualProject/GoogleMap";

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contractSum, setContractSum] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiAddress}/project/${props.match.params.projectId}`, {
        headers: {
          Authorization: "Basic " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setData(res.data);
        setContractSum(res.data.contractSum);
        setTotalProfit(res.data.totalProfit);
        if (res.data.budget.length > 0) {
          let temp = 0;

          res.data.budget.map((el) => (temp = parseInt(el.agreedPrice) + temp));
          setTotalBudget(temp);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setAlertMessage("Потребителят не може да бъде зареден");
      });
  }, []);

  const uploadOffer = (selectedFile) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.match.params.projectId);
    formData.append("offer", selectedFile, selectedFile.name);

    axios({
      method: "post",
      url: `${apiAddress}/project/offer`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с качването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const deleteOffer = (selectedFile) => {
    axios({
      method: "delete",
      url: `${apiAddress}/project/offer`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        fileName: selectedFile,
        projectId: props.match.params.projectId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с изтриването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const uploadSchedule = (selectedFile) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.match.params.projectId);
    formData.append("schedule", selectedFile, selectedFile.name);

    axios({
      method: "post",
      url: `${apiAddress}/project/schedule`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с качването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const deleteSchedule = (selectedFile) => {
    axios({
      method: "delete",
      url: `${apiAddress}/project/schedule`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        fileName: selectedFile,
        projectId: props.match.params.projectId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с изтриването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const uploadSimulation = (selectedFile) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.match.params.projectId);
    formData.append("simulation", selectedFile, selectedFile.name);

    axios({
      method: "post",
      url: `${apiAddress}/project/simulation`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с качването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const deleteSimulation = (selectedFile) => {
    axios({
      method: "delete",
      url: `${apiAddress}/project/simulation`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        fileName: selectedFile,
        projectId: props.match.params.projectId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с изтриването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const uploadContract = (selectedFile) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.match.params.projectId);
    formData.append("contract", selectedFile, selectedFile.name);

    axios({
      method: "post",
      url: `${apiAddress}/project/contract`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с качването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const deleteContract = (selectedFile) => {
    axios({
      method: "delete",
      url: `${apiAddress}/project/contract`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        fileName: selectedFile,
        projectId: props.match.params.projectId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с изтриването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const uploadSubcontractor = (selectedFile) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.match.params.projectId);
    formData.append("subcontractor", selectedFile, selectedFile.name);

    axios({
      method: "post",
      url: `${apiAddress}/project/subcontractor`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с качването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const deleteSubcontractor = (selectedFile) => {
    axios({
      method: "delete",
      url: `${apiAddress}/project/subcontractor`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        fileName: selectedFile,
        projectId: props.match.params.projectId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с изтриването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const uploadPictures = (selectedFile) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.match.params.projectId);
    formData.append("pictures", selectedFile, selectedFile.name);

    axios({
      method: "post",
      url: `${apiAddress}/project/pictures`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с качването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const deletePictures = (selectedFile) => {
    axios({
      method: "delete",
      url: `${apiAddress}/project/pictures`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        fileName: selectedFile,
        projectId: props.match.params.projectId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage("Възникна проблем с изтриването на файла");
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const editProfit = () => {
    axios({
      method: "put",
      url: `${apiAddress}/project`,
      data: {
        projectId: props.match.params.projectId,
        contractSum,
        totalProfit:
          data.type === "3"
            ? parseInt(contractSum) - parseInt(totalBudget)
            : totalProfit,
      },
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else setAlertMessage(res.data);
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  return (
    <Box className={classes.container}>
      {data ? (
        <Box>
          <Typography style={{ fontSize: 27, fontFamily: "Open Sans" }}>
            <Brightness1Icon
              style={
                data.status === 0
                  ? { color: "red" }
                  : data.status === 1
                  ? { color: "yellow" }
                  : { color: "green" }
              }
            />
            {data.name}
          </Typography>
          <EditProject data={data} projectId={props.match.params.projectId} />

          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 30,
            }}
          >
            <GridPaper
              data={data.power}
              name="Мощност"
              icon={PowerIcon}
              smalltext="kWp"
              staticon={PowerIcon}
            />
            <GridPaper
              data={
                data.type === "1"
                  ? "ЕСКО"
                  : data.type === "2"
                  ? "Собствен"
                  : "СМР"
              }
              name="Тип"
              icon={FingerprintIcon}
              smalltext="типът на проекта"
              staticon={FingerprintIcon}
            />
            <GridPaper
              data={moment(new Date(data.startDate)).format("DD-MMM-yyyy")}
              name="Старт"
              icon={DateRangeIcon}
              smalltext="стартираща дата"
              staticon={DateRangeIcon}
            />
            <GridPaper
              data={data.owner.name}
              name="Възложен"
              icon={AccessibilityIcon}
              smalltext="служител"
              staticon={AccessibilityIcon}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 30,
            }}
          >
            <ListComponent
              heading="Оферта"
              data={data.offer}
              projectId={data._id}
              uploadFunction={uploadOffer}
              deleteFunction={deleteOffer}
              category="offer"
            />

            <ListComponent
              heading="График"
              data={data.schedule}
              projectId={data._id}
              uploadFunction={uploadSchedule}
              deleteFunction={deleteSchedule}
              category="schedule"
            />

            <ListComponent
              heading="Симулация"
              data={data.simulation}
              projectId={data._id}
              uploadFunction={uploadSimulation}
              deleteFunction={deleteSimulation}
              category="simulation"
            />
          </Box>

          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 30,
              marginBottom: 50,
            }}
          >
            <ListComponent
              heading="Договор"
              data={data.contractAssigner}
              projectId={data._id}
              uploadFunction={uploadContract}
              deleteFunction={deleteContract}
              category="contract"
            />

            <ListComponent
              heading="Подизпълнител"
              data={data.contractSubcontractor}
              projectId={data._id}
              uploadFunction={uploadSubcontractor}
              deleteFunction={deleteSubcontractor}
              category="subcontractor"
            />

            <ListComponent
              heading="Снимки"
              data={data.pictures}
              projectId={data._id}
              uploadFunction={uploadPictures}
              deleteFunction={deletePictures}
              category="pictures"
            />
          </Box>
          <Paper
            elevation={10}
            style={{
              width: "50%",
              margin: "0 auto",
              padding: 20,
            }}
          >
            <Box
              style={{
                justifyContent: "space-around",
                display: "flex",
              }}
            >
              <TextField
                label="Сума по контракт"
                value={contractSum ? contractSum : ""}
                onChange={(e) => setContractSum(e.target.value)}
              />
              <TextField
                disabled={data.type === "3" ? true : false}
                label="Печалба"
                value={data.totalProfit}
                onChange={(e) => setTotalProfit(e.target.value)}
              />
            </Box>
            <Button
              style={{
                marginTop: "1%",
                textAlign: "center",
                backgroundColor: "#C0C0C0",
                color: "white",
                width: "12rem",
                marginBottom: 10,

                "&:hover": {
                  color: "#C0C0C0	",
                },
              }}
              onClick={editProfit}
            >
              <EditIcon />
              Запиши
            </Button>
          </Paper>
          <Box>
            <Budget projectId={data._id} data={data.budget} />
          </Box>
          <GoogleMap address={data.location} />
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
