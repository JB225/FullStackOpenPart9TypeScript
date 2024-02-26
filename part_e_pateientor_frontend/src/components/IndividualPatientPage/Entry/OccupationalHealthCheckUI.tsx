import { Card, CardContent } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../../types";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[];
}

const OccupationalHealthCheckUI = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <Card sx={{ bgcolor: "#dddddd" }}>
        <CardContent>
          {entry.date} <WorkIcon /><i>{entry.employerName}</i><br/>
          <i>{entry.description}</i>
          {entry.diagnosisCodes && <div><br/></div>}
          {entry.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses.find(diag => diag.code === d)?.name}</li>)}
          {entry.diagnosisCodes && <br/>}
          {entry.sickLeave && <div><i>Took Sick Leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</i></div>}
          {entry.sickLeave && <br/>}
          Diagnosis by {entry.specialist}
        </CardContent>
      </Card><br/>
    </div>
  );
};

export default OccupationalHealthCheckUI;