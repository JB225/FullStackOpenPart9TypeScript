import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { EntryWithoutId } from "../../../types";

interface Props {
  submitNewEntry: (values: EntryWithoutId) => void;
  setEntryFormVisible: Dispatch<SetStateAction<boolean>>;
  diagnoses: string[];
}

const HosptialEntryForm = ({ submitNewEntry, setEntryFormVisible, diagnoses } : Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>(""); 
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    clearStates();
    setEntryFormVisible(false);

    const type = "Hospital";
    const discharge = {
      date: dischargeDate,
      criteria: dischargeCriteria
    };
    submitNewEntry({
      type, description, date, specialist, discharge, diagnosisCodes
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
    setDischargeDate("");
    setDischargeCriteria("");
    setDiagnosisCodes([]);
  };

  return (
    <div>
      <Box m={1} p={2} sx={{ border: 2, borderStyle: "solid" }}>
        <Typography variant={"h6"}>Create New Hospital Entry</Typography>
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
            label="Discharge Date"
            fullWidth
            value={dischargeDate}
            variant="standard"
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            value={dischargeCriteria}
            variant="standard"
            onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default HosptialEntryForm;