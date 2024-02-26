import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { EntryWithoutId } from "../../../types";

interface Props {
  submitNewEntry: (values: EntryWithoutId) => void;
  setEntryFormVisible: Dispatch<SetStateAction<boolean>>;
  diagnoses: Diagnosis[];
}

const OccupationalHealthCheckEntryForm = ({ submitNewEntry, setEntryFormVisible, diagnoses } : Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    clearStates();
    setEntryFormVisible(false);

    const type = "OccupationalHealthcare";

    if (sickLeaveStartDate && sickLeaveEndDate) {
      const sickLeave = {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate
      };
      submitNewEntry({
        type, description, date, specialist, employerName, sickLeave, diagnosisCodes
      });
    }
    
    submitNewEntry({
      type, description, date, specialist, employerName, diagnosisCodes
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
    setDiagnosisCodes([]);
  };

  return (
    <div>
      <Box m={1} p={2} sx={{ border: 2, borderStyle: "solid" }}>
        <Typography variant={"h6"}>Create New Occupational Health Check Entry</Typography>
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
            label="Employer Name"
            fullWidth
            value={employerName}
            variant="standard"
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <TextField
            label="Sick Leave Start Date"
            fullWidth
            value={sickLeaveStartDate}
            variant="standard"
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
          />
          <TextField
            label="Sick Leave End Date"
            fullWidth
            value={sickLeaveEndDate}
            variant="standard"
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
          />
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

export default OccupationalHealthCheckEntryForm;