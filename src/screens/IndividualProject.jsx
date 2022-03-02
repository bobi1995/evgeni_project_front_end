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
import CloseProject from "./IndividualProject/CloseProject";
import DeleteProject from "./IndividualProject/DeleteProject";
import numeral from "numeral";
import PicturesGallery from "./IndividualProject/PicturesGallery";

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

          res.data.budget.map((el) => {
            if (el.total) {
              return null;
            } else return (temp = el.agreedPrice * el.quantity + temp);
          });
          setTotalBudget(temp);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setAlertMessage("Потребителят не може да бъде зареден");
      });
  }, []);

  const editProfit = () => {
    axios({
      method: "put",
      url: `${apiAddress}/project`,
      data: {
        projectId: props.match.params.projectId,
        contractSum,
        totalProfit:
          data.type === "3" ? contractSum - totalBudget : totalProfit,
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

  const uploadPictures = (event) => {
    // Create an object of formData
    const formData = new FormData();
    const selectedFile = event.target.files;
    console.log(selectedFile);
    // Update the formData object
    formData.append("projectId", props.match.params.projectId);

    if (selectedFile.length < 1) {
      return null;
    }

    for (let i = 0; i < selectedFile.length; i++) {
      console.log(selectedFile[i]);
      formData.append(`pictures`, selectedFile[i], selectedFile[i].name);
    }

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

  const uploadStandpoint = (selectedFile) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.match.params.projectId);
    formData.append("standpoint", selectedFile, selectedFile.name);

    axios({
      method: "post",
      url: `${apiAddress}/project/standpoint`,
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

  const deleteStandpoint = (selectedFile) => {
    axios({
      method: "delete",
      url: `${apiAddress}/project/standpoint`,
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

  const uploadPermission = (selectedFile) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.match.params.projectId);
    formData.append("permission", selectedFile, selectedFile.name);

    axios({
      method: "post",
      url: `${apiAddress}/project/permission`,
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
        console.log(e);
        setLoading(false);
        setAlertMessage(e);
      });
  };

  const deletePermission = (selectedFile) => {
    axios({
      method: "delete",
      url: `${apiAddress}/project/permission`,
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

  const uploadProjectDocs = (selectedFile) => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("projectId", props.match.params.projectId);
    formData.append("projectDocs", selectedFile, selectedFile.name);

    axios({
      method: "post",
      url: `${apiAddress}/project/projectDocs`,
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

  const deleteProjectDocs = (selectedFile) => {
    axios({
      method: "delete",
      url: `${apiAddress}/project/projectDocs`,
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
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <EditProject data={data} projectId={props.match.params.projectId} />
            <CloseProject
              projectId={props.match.params.projectId}
              data={data}
            />
            {localStorage.getItem("admin") === "true" ? (
              <DeleteProject projectId={props.match.params.projectId} />
            ) : null}
          </Box>
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
              flexWrap: "wrap",
            }}
          >
            <ListComponent
              heading="Оферта"
              data={data.offer}
              projectId={data._id}
              uploadFunction={uploadOffer}
              deleteFunction={deleteOffer}
              category="offer"
              status={data.status}
            />

            <ListComponent
              heading="График"
              data={data.schedule}
              projectId={data._id}
              uploadFunction={uploadSchedule}
              deleteFunction={deleteSchedule}
              category="schedule"
              status={data.status}
            />

            <ListComponent
              heading="Симулация"
              data={data.simulation}
              projectId={data._id}
              uploadFunction={uploadSimulation}
              deleteFunction={deleteSimulation}
              category="simulation"
              status={data.status}
            />
          </Box>

          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 30,
              marginBottom: 50,
              flexWrap: "wrap",
            }}
          >
            <ListComponent
              heading="Договор"
              data={data.contractAssigner}
              projectId={data._id}
              uploadFunction={uploadContract}
              deleteFunction={deleteContract}
              category="contract"
              status={data.status}
            />

            <ListComponent
              heading="Подизпълнител"
              data={data.contractSubcontractor}
              projectId={data._id}
              uploadFunction={uploadSubcontractor}
              deleteFunction={deleteSubcontractor}
              category="subcontractor"
              status={data.status}
            />

            {/* <ListComponent
              heading="Снимки"
              data={data.pictures}
              projectId={data._id}
              uploadFunction={uploadPictures}
              deleteFunction={deletePictures}
              category="pictures"
              status={data.status}
            /> */}
          </Box>

          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 30,
              marginBottom: 50,
              flexWrap: "wrap",
            }}
          >
            <ListComponent
              heading="Становище"
              data={data.standpoint}
              projectId={data._id}
              uploadFunction={uploadStandpoint}
              deleteFunction={deleteStandpoint}
              category="standpoint"
              status={data.status}
            />

            <ListComponent
              heading="Разрешително"
              data={data.permission}
              projectId={data._id}
              uploadFunction={uploadPermission}
              deleteFunction={deletePermission}
              category="permission"
              status={data.status}
            />

            <ListComponent
              heading="Документи"
              data={data.projectDocs}
              projectId={data._id}
              uploadFunction={uploadProjectDocs}
              deleteFunction={deleteProjectDocs}
              category="projectDocs"
              status={data.status}
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
                label={
                  data.type === "2" ? "Сума за финансиране" : "Сума по контракт"
                }
                value={contractSum ? contractSum : ""}
                onChange={(e) => setContractSum(e.target.value)}
              />
              <TextField
                disabled={data.type === "3" ? true : false}
                label="Печалба"
                value={
                  data.type === "3"
                    ? numeral(data.totalProfit).format("0,0.00")
                    : data.totalProfit
                }
                onChange={(e) => setTotalProfit(e.target.value)}
              />
            </Box>
            <Button
              disabled={data.status === 2 ? true : false}
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
            <Budget
              projectId={data._id}
              data={data.budget}
              status={data.status}
            />
          </Box>
          <PicturesGallery
            projectId={data._id}
            images={data.pictures}
            uploadPictures={uploadPictures}
            deletePictures={deletePictures}
          />
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
