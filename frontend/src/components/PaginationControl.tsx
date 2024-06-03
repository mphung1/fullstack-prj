import React from "react";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface PaginationControlProps {
  pageSize: string;
  pageSizeArray: number[];
  totalPages: number;
  currentPage: number;
  handlePageSizeChange: (event: SelectChangeEvent<string>) => void;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  pageSize,
  pageSizeArray,
  totalPages,
  currentPage,
  handlePageSizeChange,
  handlePageChange,
}) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      style={{ marginTop: "20px" }}
    >
      <Grid item>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="page-size-label">Page size</InputLabel>
            <Select
              labelId="page-size-label"
              id="page-size-select"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {pageSizeArray.map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
            sx={{ m: 1 }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default PaginationControl;
