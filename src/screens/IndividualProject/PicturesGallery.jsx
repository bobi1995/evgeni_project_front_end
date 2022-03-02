import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import shareServer from "../../globals/shareServer";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, Typography, Paper } from "@material-ui/core";
import Pagination from "../IndividualProject/Budget/Pagination";

const PicturesGallery = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const imagesGallery = props.images.map((image) => {
    return {
      original: `${shareServer}\\${props.projectId}\\pictures\\${image}`,
      originalHeight: 500,
      //thumbnail: `${shareServer}\\${props.projectId}\\pictures\\${image}`,
    };
  });

  return (
    <Paper elevation={11} style={{ marginBottom: 30, marginTop: 30 }}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Галерия
      </Typography>

      <Box style={{ display: "flex", justifyContent: "space-around" }}>
        <Box style={{ width: "50%", margin: "3% auto" }}>
          {props.images && props.images.length > 0 ? (
            <ImageGallery
              items={imagesGallery}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          ) : null}
        </Box>

        <Box style={{ width: "50%", margin: "3% auto" }}>
          <Typography>Списък на снимките</Typography>
          {props.images && props.images.length > 0 ? (
            props.images
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((el) => (
                <React.Fragment>
                  <ListItem
                    key={el}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => props.deletePictures(el)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar
                      onClick={async () =>
                        window.open(
                          `${shareServer}\\${props.projectId}\\pictures\\${el}`
                        )
                      }
                    >
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={el} />
                  </ListItem>
                </React.Fragment>
              ))
          ) : (
            <Typography>Няма качени файлове</Typography>
          )}
          {props.images && props.images.length > 0 ? (
            <Pagination
              counter={props.images.length}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          ) : null}
        </Box>
      </Box>
      <input
        type="file"
        id="files"
        name="files"
        onChange={props.uploadPictures}
        multiple
        style={{ marginBottom: 15 }}
      />
    </Paper>
  );
};

export default PicturesGallery;
