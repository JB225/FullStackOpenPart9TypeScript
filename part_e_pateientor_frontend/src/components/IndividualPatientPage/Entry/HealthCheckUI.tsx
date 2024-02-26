import { Card, CardContent } from "@mui/material";
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[];
}

const HealthCheckUI = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <Card sx={{ bgcolor: "#e6e6fa" }}>
        <CardContent>
          {entry.date} <MedicalServicesIcon /><br/>
          <i>{entry.description}</i><br/>
          {{
            [HealthCheckRating.Healthy]: <FavoriteIcon style={{ color: "green" }} />,
            [HealthCheckRating.LowRisk]: <FavoriteIcon style={{ color: "brown" }} />,
            [HealthCheckRating.HighRisk]: <FavoriteIcon style={{ color: "yellow" }} />,
            [HealthCheckRating.CriticalRisk]: <FavoriteIcon style={{ color: "red" }} />
          } [entry.healthCheckRating]}
          {entry.diagnosisCodes && <div><br/></div>}
          {entry.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses.find(diag => diag.code === d)?.name}</li>)}<br/>
          Diagnosis by {entry.specialist}
        </CardContent>
      </Card><br/>
    </div>
  );
};

export default HealthCheckUI;