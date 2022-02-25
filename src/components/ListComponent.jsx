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
import fileDownload from "js-file-download";
import shareServer from "../globals/shareServer";

export default function ListComponent(props) {
  const onChange = (event) => {
    props.uploadFunction(event.target.files[0]);
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
      <Paper
        style={{
          backgroundColor:
            props.data.length > 0 ? "rgba(0,128,0,0.5)" : "rgba(255,0,0,0.5)",
        }}
      >
        <Grid item>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            {props.heading}
          </Typography>
          <List>
            {props.data.length > 0 ? (
              props.data.map((el) => (
                <ListItem
                  key={el}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => props.deleteFunction(el)}
                      disabled={
                        props.status === 2 || props.heading === "График"
                          ? true
                          : false
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar
                    onClick={async () =>
                      window.open(
                        `${shareServer}\\${props.projectId}\\${props.category}\\${el}`
                      )
                    }
                  >
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
          <input
            type="file"
            required
            onChange={onChange}
            disabled={props.status === 2 ? true : false}
          />
        </Grid>
      </Paper>
    </Box>
  );
}
