import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@mui/material/Paper";
import { Button, Divider } from "@mui/material";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import apiAddress from "../globals/apiAddress";
import axios from "axios";
import FileBase64 from "react-file-base64";

export default function ListComponent(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const upload = (event) => {
    console.log(event);
    axios({
      url: apiAddress,
      method: "post",
      data: {
        query: `
        mutation uploadImage{
          uploadImage(image:"${event}"){
            _id
          }}  `,
      },
    })
      .then((result) => {
        if (result.data.errors) {
          return setAlertMessage(result.data.errors[0].message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setAlertMessage("Възникна проблем с визуализирането на данните.");
      });
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
      <Paper>
        <Grid item>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            {props.heading}
          </Typography>
          <List>
            {props.data.length > 0 ? (
              props.data.map((el) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={el} />
                </ListItem>
              ))
            ) : (
              <Typography>Няма качени файлове</Typography>
            )}
          </List>
          <Divider />
          {/* <Button startIcon={<CloudUploadIcon />} component="label">
            качи файл <input type="file" hidden onChange={upload} />
          </Button> */}
          <FileBase64 multiple={true} onDone={upload} />
        </Grid>
      </Paper>
    </Box>
  );
}
