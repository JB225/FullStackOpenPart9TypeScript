import { Button, Checkbox, ListItemText, MenuItem, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { EntryWithoutId, HealthCheckRating } from "../../../types";

interface Props {
  submitNewEntry: (values: EntryWithoutId) => void;
  setEntryFormVisible: Dispatch<SetStateAction<boolean>>;
  diagnoses: string[];
}

const HealthCheckEntryForm = ({ submitNewEntry, setEntryFormVisible, diagnoses} : Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("2024-01-01");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthRating] = useState<HealthCheckRating>("Healthy" as unknown as HealthCheckRating);
  const [selectedDiagCodes, setSelectedDiagCodes] = useState<string[]>([]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    clearStates();
    setEntryFormVisible(false);

    const type = "HealthCheck";
    submitNewEntry({
      type, description, date, specialist, healthCheckRating, diagnosisCodes: selectedDiagCodes
    });
  };

  const handleCancel = (event: SyntheticEvent) => {
    event.preventDefault();
    clearStates();
    setEntryFormVisible(false);
  };

  const clearStates = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthRating("Healthy" as unknown as HealthCheckRating);
    setSelectedDiagCodes([]);
  };

  const handleCodeChange = (event: SelectChangeEvent<typeof selectedDiagCodes>) => {
    const { target: { value }, } = event;
    setSelectedDiagCodes(
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <div>
      <Box m={1} p={2} sx={{ border: 2, borderStyle: "solid" }}>
        <Typography variant={"h6"}>Create New Health Check Entry</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            variant="standard"
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={date}
            variant="standard"
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            variant="standard"
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField 
            label="Health Rating"
            fullWidth
            value={healthCheckRating}
            variant="standard"
            select
            onChange={({ target }) => setHealthRating(target.value as unknown as HealthCheckRating)}>
            {(Object.keys(HealthCheckRating) as Array<keyof typeof HealthCheckRating>)
              .filter(key => isNaN(Number(key)))            
              .map(key => (
                <MenuItem key={key} value={key}>{key}</MenuItem>
              ))}
          </TextField>

          <TextField
            label="diagnoses"
            select
            fullWidth
            variant="standard"
            value={selectedDiagCodes}
            SelectProps={{
              multiple: true, 
              renderValue: (selected) => (selected as string[]).join(", "),
              onChange: (e) => handleCodeChange(e as SelectChangeEvent<string[]>)
            }}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis} value={diagnosis}>
                <Checkbox checked={selectedDiagCodes.indexOf(diagnosis) > -1} />
                <ListItemText primary={diagnosis} />
              </MenuItem>
            ))}
          </TextField>
          <Box p={1} display="flex" justifyContent="space-between">
            <Button
              sx={{ backgroundColor: "red" }}
              type="button"
              onClick={e => handleCancel(e)}
              variant="contained" >
              Cancel
            </Button>
            <Button
              sx={{ backgroundColor: "grey" }}
              name="add"
              type="submit"
              variant="contained" >
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );

     
};

export default HealthCheckEntryForm;