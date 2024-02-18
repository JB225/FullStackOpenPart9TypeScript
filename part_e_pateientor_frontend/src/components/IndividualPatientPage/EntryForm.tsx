import { Button, TextField, Typography } from "@mui/material";
import { Box } from '@mui/system';
import { SyntheticEvent, useState } from "react";

const EntryForm = () => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [HealthRating, setHealthRating] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('Add');
    clearStates();
  };

  const handleCancel = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('Cancel');
    clearStates();
  };

  const parseDiagnosisCodes = (diagnosisCodes: string) => {
    diagnosisCodes.split(',');
    setDiagnosisCodes(diagnosisCodes.split(','));
  };

  const clearStates = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthRating('');
    setDiagnosisCodes([]);
  };

  return (
    <div>
      <Box m={1} p={2} sx={{ border: 2, borderStyle: 'dotted' }}>
        <Typography variant={"h6"}>Create New Entry</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            key="Description"
            label="Description"
            fullWidth 
            value={description}
            variant="standard"
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            key="Date"
            label="Date"
            fullWidth 
            value={date}
            variant="standard"
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            key="specialist"
            label="Specialist"
            fullWidth 
            value={specialist}
            variant="standard"
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            key="HealthRating"
            label="Health Rating"
            fullWidth 
            value={HealthRating}
            variant="standard"
            onChange={({ target }) => setHealthRating(target.value)}
          />
          <TextField
            key="diagnosisCodes"
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

export default EntryForm;