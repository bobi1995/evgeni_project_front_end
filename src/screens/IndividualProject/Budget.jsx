import React, { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import apiAddress from "../../globals/apiAddress";
import AddRow from "./Budget/AddRow";
import BudgetTable from "./Budget/BudgetTable";
export default function ListComponent(props) {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  return (
    <Paper>
      <Typography
        sx={{ mt: 4, mb: 2 }}
        variant="h6"
        component="div"
        style={{ marginBottom: 50 }}
      >
        Бюджетна таблица
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {props.data.length > 0 ? (
          <BudgetTable
            data={props.data}
            projectId={props.projectId}
            status={props.status}
          />
        ) : (
          <Typography
            sx={{ mt: 4, mb: 2 }}
            variant="h6"
            component="div"
            style={{ marginBottom: 50 }}
          >
            Няма въведени позиции
          </Typography>
        )}
      </Box>
      <AddRow projectId={props.projectId} status={props.status} />
    </Paper>
  );
}
