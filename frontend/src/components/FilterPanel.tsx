import React from "react";
import { Grid, TextField, MenuItem, Button } from "@mui/material";

interface FilterPanelProps {
  filterId: string;
  filterName: string;
  filterGender: string;
  filterAge: string;
  filterEmail: string;
  filterPhoneNumber: string;
  setFilterId: (value: string) => void;
  setFilterName: (value: string) => void;
  setFilterGender: (value: string) => void;
  setFilterAge: (value: string) => void;
  setFilterEmail: (value: string) => void;
  setFilterPhoneNumber: (value: string) => void;
  applyFilters: () => void;
  filterButtonRef: React.RefObject<HTMLButtonElement>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterId,
  filterName,
  filterGender,
  filterAge,
  filterEmail,
  filterPhoneNumber,
  setFilterId,
  setFilterName,
  setFilterGender,
  setFilterAge,
  setFilterEmail,
  setFilterPhoneNumber,
  applyFilters,
  filterButtonRef,
}) => {
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    filterSetter: (value: string) => void
  ) => {
    filterSetter(e.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      style={{ marginTop: "20px" }}
    >
      <Grid item xs={12} sm={2}>
        <TextField
          label="Patient ID"
          value={filterId}
          onChange={(e) => handleFilterChange(e, setFilterId)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Name"
          value={filterName}
          onChange={(e) => handleFilterChange(e, setFilterName)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          select
          label="Gender"
          value={filterGender}
          onChange={(e) => handleFilterChange(e, setFilterGender)}
          fullWidth
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Age"
          value={filterAge}
          onChange={(e) => handleFilterChange(e, setFilterAge)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Email"
          value={filterEmail}
          onChange={(e) => handleFilterChange(e, setFilterEmail)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Phone Number"
          value={filterPhoneNumber}
          onChange={(e) => handleFilterChange(e, setFilterPhoneNumber)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={1}>
        <Button
          ref={filterButtonRef}
          variant="contained"
          color="primary"
          onClick={applyFilters}
        >
          Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterPanel;
