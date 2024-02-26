import { Card, CardContent } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface Props {
    entry: HospitalEntry;
    diagnoses: Diagnosis[];
}

const HospitalEntryUI = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <Card sx={{ bgcolor: "#ffe4e1" }}>
        <CardContent>
          {entry.date} <LocalHospitalIcon /><br/>
          <i>{entry.description}</i>
          {entry.diagnosisCodes && <div><br/></div>}
          {entry.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses.find(diag => diag.code === d)?.name}</li>)}<br/>
          <b>Discharge Date:</b> {entry.discharge.date}<br/>
          <b>Discharge Criteria:</b> {entry.discharge.criteria}<br/><br/>
          Diagnosis by {entry.specialist}
        </CardContent>
      </Card><br/>
    </div>
  );
};

export default HospitalEntryUI;