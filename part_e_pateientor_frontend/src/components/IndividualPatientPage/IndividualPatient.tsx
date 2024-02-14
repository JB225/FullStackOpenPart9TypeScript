import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnosis, Entry } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Male, Female, Transgender } from "@mui/icons-material";
import { Typography } from "@mui/material";
import diagnosisService from "../../services/diagnoses";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthCheck from "./OccupationalHealthCheck";
import HealthCheck from "./HealthCheck";
import { assertNever } from "../../utils";

const IndividualPatient = () => {
  const [patient, setPatient] = useState<Patient>({id: '', name: '', dateOfBirth: '', ssn: '',
    gender: Gender.Other, occupation: '', entries: []});
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const id: string = useParams().id as string;

  useEffect(() => {
    const fetchPatient = async () => {
      const patient: Patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    void fetchPatient();

    const fetchDiagnoses = async () => {
      const diagnosesData: Diagnosis[] = await diagnosisService.getAll();
      setDiagnoses(diagnosesData);
    };
    void fetchDiagnoses();

  }, [id]);

  const entryComponent = (entry: Entry) => {
    switch(entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthCheck entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses}/>;
    default:
      return assertNever(entry);
    }
  };

  return (
    <div>
      <br/>
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        {patient.name} 
        {{
          [Gender.Male]: <Male />,
          [Gender.Female]: <Female />,
          [Gender.Other]: <Transgender />
        } [patient.gender]}
      </Typography><br/>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div><br/>
      <Typography variant="h5">entries</Typography><br/>
      {patient.entries.map(e => entryComponent(e))}
    </div>
  );
};

export default IndividualPatient;