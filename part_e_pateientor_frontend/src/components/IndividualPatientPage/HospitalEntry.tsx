import { Card, CardContent } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <Card sx={{ bgcolor: '#ffe4e1' }}>
        <CardContent>
          {entry.date} <LocalHospitalIcon /><br/>
          <i>{entry.description}</i>
          {entry.diagnosisCodes && <div><br/></div>}
          {entry.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses.find(diag => diag.code === d)?.name}</li>)}<br/>
          Diagnosis by {entry.specialist}
        </CardContent>
      </Card><br/>
    </div>
  );
};

export default HospitalEntry;