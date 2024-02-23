import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { EntryWithoutId, HealthCheckRating } from "../../../types";

interface Props {
  submitNewEntry: (values: EntryWithoutId) => void;
  setEntryFormVisible: Dispatch<SetStateAction<boolean>>;
}

const HealthCheckEntryForm = ({ submitNewEntry, setEntryFormVisible } : Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthRating] = useState<HealthCheckRating>("Healthy" as unknown as HealthCheckRating);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    clearStates();
    setEntryFormVisible(false);

    const type = "HealthCheck";
    submitNewEntry({
      type, description, date, specialist, healthCheckRating, diagnosisCodes
    });
  };

  const handleCancel = (event: SyntheticEvent) => {
    event.preventDefault();
    clearStates();
    setEntryFormVisible(false);
  };

  const parseDiagnosisCodes = (diagnosisCodes: string) => {
    setDiagnosisCodes(diagnosisCodes.split(","));
  };

  const clearStates = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthRating("Healthy" as unknown as HealthCheckRating);
    setDiagnosisCodes([]);
  };

  return (
    <div>
      <Box m={1} p={2} sx={{ border: 2, borderStyle: "dotted" }}>
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
            label="Diagnosis Codes"
            fullWidth
            value={diagnosisCodes}
            variant="standard"
            onChange={({ target }) => parseDiagnosisCodes(target.value)}
          />
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