import React from "react";
import TablePagination from "@material-ui/core/TablePagination";

const Pagination = ({
  page,
  setPage,
  counter,
  setRowsPerPage,
  rowsPerPage,
  //rowsPerPageOptions = [5, 10, 20],
}) => {
  const handleChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TablePagination
      //rowsPerPageOptions={rowsPerPageOptions}
      rowsPerPageOptions={false}
      component="div"
      count={counter}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChange}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
