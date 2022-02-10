import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DialogLoader from "../components/DialogLoader";
import AlertBox from "../components/AlertBox";
import history from "../components/history";
import CreateBtn from "../components/CreateBtn";
import axios from "axios";
import apiAddress from "../globals/apiAddress";

const useStyles = makeStyles(() => ({
  containerStyle: {
    textAlign: "center",
    marginTop: "2%",
  },
  inputBox: {
    width: 300,
  },
}));

const CreateProjectScreen = (props) => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [power, setPower] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(null);
  const [ownerId, setOwnerId] = useState(null);

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangePower = (event) => {
    setPower(event.target.value);
  };

  const onChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const onChangeOwnerId = (event) => {
    setOwnerId(event.target.value);
  };

  const addProject = () => {
    axios({
      method: "post",
      url: `${apiAddress}/project`,
      headers: {
        Authorization: "Basic " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: {
        name,
        power,
        location,
        type,
        ownerId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          history.push(`/project/${res.data}`);
        }
      })
      .catch((e) => {
        setLoading(false);
        setAlertMessage(e);
      });
  };

  useEffect(() => {
    axios
      .get(`${apiAddress}/user`, {
        headers: {
          Authorization: "Basic " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setAlertMessage("Потребителят не може да бъде зареден");
      });
  }, []);

  return (
    <Box style={{ marginTop: "2%", textAlign: "center" }}>
      {data ? (
        <Box>
          <Box style={{ marginTop: 10 }}>
            <TextField
              id="outlined-name"
              label="Име"
              className={classes.inputBox}
              onChange={onChangeName}
              value={name}
              required
            />
          </Box>
          <Box style={{ marginTop: 10 }}>
            <TextField
              id="outlined-email"
              label="Мощност"
              className={classes.inputBox}
              onChange={onChangePower}
              value={power}
              required
            />
          </Box>
          <Box style={{ marginTop: 10 }}>
            <TextField
              id="outlined-password"
              label="Локация"
              className={classes.inputBox}
              onChange={onChangeLocation}
              value={location}
              required
            />
          </Box>
          <Box style={{ marginTop: 10 }}>
            <FormControl className={classes.inputBox}>
              <InputLabel id="demo-simple-select-label" required>
                Потребител
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ownerId}
                label="Тип"
                onChange={onChangeOwnerId}
              >
                {data.length > 0 ? (
                  data.map((user) => (
                    <MenuItem value={user._id}>{user.name}</MenuItem>
                  ))
                ) : (
                  <MenuItem value={null} disabled>
                    -
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>

          <Box style={{ marginTop: 10 }}>
            <FormControl className={classes.inputBox}>
              <InputLabel id="demo-simple-select-label" required>
                Тип
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Тип"
                onChange={onChangeType}
              >
                <MenuItem value={1}>ЕСКО</MenuItem>
                <MenuItem value={2}>Собствен</MenuItem>
                <MenuItem value={3}>СМР</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box style={{ marginTop: 10 }}>
            <CreateBtn clicked={() => addProject()} />
          </Box>
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

export default CreateProjectScreen;
